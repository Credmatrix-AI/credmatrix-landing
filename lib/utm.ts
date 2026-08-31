/**
 * Campaign attribution.
 *
 * Captures utm_* params and ad-platform click IDs on landing, then keeps two
 * records:
 *   - first touch (localStorage) — how this person originally found us
 *   - last touch  (sessionStorage) — the campaign that drove this visit
 *
 * Both are attached to every lead (contact form, demo booking) and appended to
 * outbound links so attribution survives the hop to app.credmatrix.ai.
 */

export const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
] as const

export const CLICK_ID_KEYS = ['gclid', 'fbclid', 'li_fat_id', 'msclkid'] as const

const TRACKED_KEYS = [...UTM_KEYS, ...CLICK_ID_KEYS] as const

export type TrackedKey = (typeof TRACKED_KEYS)[number]

export interface Attribution extends Partial<Record<TrackedKey, string>> {
  landingPage?: string
  referrer?: string
  capturedAt?: string
}

export interface AttributionPair {
  first: Attribution | null
  last: Attribution | null
}

const FIRST_TOUCH_KEY = 'cm_attr_first'
const LAST_TOUCH_KEY = 'cm_attr_last'

function isBrowser(): boolean {
  return typeof window !== 'undefined'
}

function safeRead(storage: Storage, key: string): Attribution | null {
  try {
    const raw = storage.getItem(key)
    return raw ? (JSON.parse(raw) as Attribution) : null
  } catch {
    return null
  }
}

function safeWrite(storage: Storage, key: string, value: Attribution): void {
  try {
    storage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage disabled (private mode, blocked cookies) — attribution is
    // best-effort and must never break the page.
  }
}

/** True when the referrer is a different site, i.e. worth recording as a source. */
function isExternalReferrer(referrer: string): boolean {
  if (!referrer) return false
  try {
    return new URL(referrer).hostname !== window.location.hostname
  } catch {
    return false
  }
}

function readParamsFromUrl(): Partial<Record<TrackedKey, string>> {
  const params = new URLSearchParams(window.location.search)
  const found: Partial<Record<TrackedKey, string>> = {}

  for (const key of TRACKED_KEYS) {
    const value = params.get(key)
    if (value) found[key] = value.slice(0, 200)
  }

  return found
}

/**
 * Records attribution for the current page view. Safe to call on every route
 * change — first touch is only ever written once, and last touch is only
 * overwritten by a genuinely new source.
 */
export function captureAttribution(): void {
  if (!isBrowser()) return

  const params = readParamsFromUrl()
  const referrer = document.referrer
  const hasUtms = Object.keys(params).length > 0
  const hasExternalReferrer = isExternalReferrer(referrer)

  // Nothing new to attribute — an internal navigation with no campaign params.
  if (!hasUtms && !hasExternalReferrer) return

  const attribution: Attribution = {
    ...params,
    landingPage: window.location.pathname,
    referrer: hasExternalReferrer ? referrer : undefined,
    capturedAt: new Date().toISOString(),
  }

  if (!safeRead(window.localStorage, FIRST_TOUCH_KEY)) {
    safeWrite(window.localStorage, FIRST_TOUCH_KEY, attribution)
  }

  // Last touch always reflects the most recent campaign for this session.
  safeWrite(window.sessionStorage, LAST_TOUCH_KEY, attribution)
}

export function getAttribution(): AttributionPair {
  if (!isBrowser()) return { first: null, last: null }

  return {
    first: safeRead(window.localStorage, FIRST_TOUCH_KEY),
    last: safeRead(window.sessionStorage, LAST_TOUCH_KEY),
  }
}

/** Flat key/value pairs for the current visit — used for analytics and Cal.com. */
export function getAttributionParams(): Record<string, string> {
  const { first, last } = getAttribution()
  const source = last ?? first
  if (!source) return {}

  const flat: Record<string, string> = {}
  for (const key of TRACKED_KEYS) {
    const value = source[key]
    if (value) flat[key] = value
  }
  if (source.referrer) flat.referrer = source.referrer
  if (source.landingPage) flat.landing_page = source.landingPage

  return flat
}

function describe(attribution: Attribution | null): string {
  if (!attribution) return 'Direct / unknown'

  const parts = TRACKED_KEYS.filter((key) => attribution[key]).map(
    (key) => `${key}=${attribution[key]}`
  )

  if (attribution.referrer) parts.push(`referrer=${attribution.referrer}`)
  if (attribution.landingPage) parts.push(`landing=${attribution.landingPage}`)

  return parts.length ? parts.join(' | ') : 'Direct / unknown'
}

/** Human-readable attribution block appended to lead emails. */
export function formatAttributionForEmail(): string {
  const { first, last } = getAttribution()

  return [
    '--- Attribution ---',
    `First touch: ${describe(first)}`,
    `Last touch: ${describe(last)}`,
    `Page: ${isBrowser() ? window.location.pathname : 'unknown'}`,
  ].join('\n')
}

/**
 * Appends current attribution to an outbound URL so campaign context survives
 * the hop to another domain (the app, WhatsApp, Cal.com).
 */
export function appendAttributionToUrl(url: string): string {
  if (!isBrowser()) return url

  const params = getAttributionParams()
  if (Object.keys(params).length === 0) return url

  try {
    const target = new URL(url, window.location.origin)
    for (const [key, value] of Object.entries(params)) {
      if (!target.searchParams.has(key)) target.searchParams.set(key, value)
    }
    return target.toString()
  } catch {
    return url
  }
}

/**
 * WhatsApp deep links only honour a `text` param, so campaign context is folded
 * into the prefilled message rather than appended as query params.
 */
export function buildWhatsAppUrl(phone: string, message: string): string {
  const params = getAttributionParams()
  const source = params.utm_source || params.utm_campaign

  const text = source ? `${message}\n\n[via ${source}]` : message

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
}
