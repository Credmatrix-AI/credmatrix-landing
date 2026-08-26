import type {
  Article,
  BlocksContent,
  Category,
  StrapiCollectionResponse,
  StrapiImage,
} from '@/types/blog'

/**
 * Strapi 5 REST client.
 *
 * Server-only: `STRAPI_API_TOKEN` is a secret and must never reach the browser,
 * so every helper here is called from Server Components / Route Handlers.
 *
 * Caching strategy: responses are cached indefinitely and invalidated two ways —
 * a time-based `revalidate` window (see REVALIDATE_SECONDS) and tag-based
 * invalidation triggered by the Strapi webhook at /api/revalidate.
 */

const STRAPI_URL = (process.env.STRAPI_URL ?? '').replace(/\/$/, '')
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN ?? ''

/** Fallback ISR window; the publish webhook is what makes content appear fast. */
export const REVALIDATE_SECONDS = 300

export const CACHE_TAGS = {
  articles: 'strapi:articles',
  categories: 'strapi:categories',
  article: (slug: string) => `strapi:article:${slug}`,
}

export function isStrapiConfigured(): boolean {
  return Boolean(STRAPI_URL)
}

/** Turns a Strapi media path into an absolute URL (local provider returns relative paths). */
export function strapiMedia(url: string | null | undefined): string | null {
  if (!url) return null
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return `${STRAPI_URL}${url}`
}

interface FetchOptions {
  params?: Record<string, string | number | boolean | undefined>
  tags?: string[]
}

async function strapiFetch<T>(
  path: string,
  { params = {}, tags = [] }: FetchOptions = {}
): Promise<T | null> {
  if (!isStrapiConfigured()) {
    console.warn(
      `[strapi] STRAPI_URL is not set — skipping request to ${path}. ` +
        'Blog pages will render empty until it is configured.'
    )
    return null
  }

  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) search.set(key, String(value))
  }

  const query = search.toString()
  const url = `${STRAPI_URL}/api${path}${query ? `?${query}` : ''}`

  try {
    const res = await fetch(url, {
      headers: {
        ...(STRAPI_API_TOKEN
          ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` }
          : {}),
      },
      next: { revalidate: REVALIDATE_SECONDS, tags: [CACHE_TAGS.articles, ...tags] },
    })

    if (!res.ok) {
      console.error(`[strapi] ${res.status} ${res.statusText} for ${path}`)
      return null
    }

    return (await res.json()) as T
  } catch (error) {
    console.error(`[strapi] request failed for ${path}:`, error)
    return null
  }
}

/* ------------------------------------------------------------------ */
/* Field selection                                                     */
/* ------------------------------------------------------------------ */

/** Only what a card needs — keeps the list payload small. */
const LIST_POPULATE: Record<string, string> = {
  'populate[cover][fields][0]': 'url',
  'populate[cover][fields][1]': 'alternativeText',
  'populate[cover][fields][2]': 'width',
  'populate[cover][fields][3]': 'height',
  'populate[category][fields][0]': 'name',
  'populate[category][fields][1]': 'slug',
  'populate[author][fields][0]': 'name',
  'populate[author][fields][1]': 'role',
  'fields[0]': 'title',
  'fields[1]': 'slug',
  'fields[2]': 'excerpt',
  'fields[3]': 'featured',
  'fields[4]': 'publishedAt',
  'fields[5]': 'updatedAt',
}

const DETAIL_POPULATE: Record<string, string> = {
  'populate[cover]': 'true',
  'populate[category]': 'true',
  'populate[author][populate][avatar]': 'true',
  'populate[seo][populate][ogImage]': 'true',
}

/* ------------------------------------------------------------------ */
/* Queries                                                             */
/* ------------------------------------------------------------------ */

export interface GetArticlesOptions {
  page?: number
  pageSize?: number
  /** Category slug filter. */
  category?: string
  featured?: boolean
  /** Exclude a slug — used for "related articles". */
  excludeSlug?: string
}

export interface ArticlesResult {
  articles: Article[]
  pageCount: number
  total: number
  page: number
}

const EMPTY_RESULT: ArticlesResult = {
  articles: [],
  pageCount: 0,
  total: 0,
  page: 1,
}

export async function getArticles({
  page = 1,
  pageSize = 9,
  category,
  featured,
  excludeSlug,
}: GetArticlesOptions = {}): Promise<ArticlesResult> {
  const response = await strapiFetch<StrapiCollectionResponse<Article>>(
    '/articles',
    {
      params: {
        ...LIST_POPULATE,
        sort: 'publishedAt:desc',
        'pagination[page]': page,
        'pagination[pageSize]': pageSize,
        ...(category ? { 'filters[category][slug][$eq]': category } : {}),
        ...(featured !== undefined ? { 'filters[featured][$eq]': featured } : {}),
        ...(excludeSlug ? { 'filters[slug][$ne]': excludeSlug } : {}),
      },
    }
  )

  if (!response) return EMPTY_RESULT

  return {
    articles: response.data ?? [],
    pageCount: response.meta?.pagination?.pageCount ?? 0,
    total: response.meta?.pagination?.total ?? 0,
    page: response.meta?.pagination?.page ?? page,
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const response = await strapiFetch<StrapiCollectionResponse<Article>>(
    '/articles',
    {
      params: {
        ...DETAIL_POPULATE,
        'filters[slug][$eq]': slug,
        'pagination[pageSize]': 1,
      },
      tags: [CACHE_TAGS.article(slug)],
    }
  )

  return response?.data?.[0] ?? null
}

/** Slugs for `generateStaticParams`. Capped — the ISR fallback covers the rest. */
export async function getArticleSlugs(): Promise<string[]> {
  const response = await strapiFetch<StrapiCollectionResponse<Pick<Article, 'slug'>>>(
    '/articles',
    {
      params: {
        'fields[0]': 'slug',
        'pagination[pageSize]': 100,
        sort: 'publishedAt:desc',
      },
    }
  )

  return (response?.data ?? []).map((entry) => entry.slug).filter(Boolean)
}

export async function getCategories(): Promise<Category[]> {
  const response = await strapiFetch<StrapiCollectionResponse<Category>>(
    '/categories',
    {
      params: {
        'fields[0]': 'name',
        'fields[1]': 'slug',
        sort: 'name:asc',
        'pagination[pageSize]': 50,
      },
      tags: [CACHE_TAGS.categories],
    }
  )

  return response?.data ?? []
}

/* ------------------------------------------------------------------ */
/* Presentation helpers                                                */
/* ------------------------------------------------------------------ */

export function formatArticleDate(date: string): string {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/** Rough reading time from the blocks payload, at 200 wpm. */
export function estimateReadingTime(body: BlocksContent | null | undefined): number {
  if (!body) return 1

  let words = 0

  const walk = (nodes: unknown[]): void => {
    for (const node of nodes) {
      if (!node || typeof node !== 'object') continue
      const candidate = node as { text?: string; children?: unknown[] }
      if (typeof candidate.text === 'string') {
        words += candidate.text.trim().split(/\s+/).filter(Boolean).length
      }
      if (Array.isArray(candidate.children)) walk(candidate.children)
    }
  }

  walk(body)

  return Math.max(1, Math.round(words / 200))
}

export interface HeadingOutlineItem {
  id: string
  text: string
  level: number
  /** Index into the blocks array, so the renderer can look the id back up. */
  blockIndex: number
}

function flattenText(nodes: unknown[]): string {
  let out = ''
  for (const node of nodes) {
    if (!node || typeof node !== 'object') continue
    const candidate = node as { text?: string; children?: unknown[] }
    if (typeof candidate.text === 'string') out += candidate.text
    if (Array.isArray(candidate.children)) out += flattenText(candidate.children)
  }
  return out
}

/**
 * Anchor ids for every heading in a body, in document order.
 *
 * Both the renderer and the table of contents call this, so the ids they
 * produce can never drift apart — including the `-2` suffix on repeats.
 */
export function getHeadingOutline(
  body: BlocksContent | null | undefined
): HeadingOutlineItem[] {
  if (!body) return []

  const seen = new Map<string, number>()
  const items: HeadingOutlineItem[] = []

  body.forEach((block, blockIndex) => {
    if (block.type !== 'heading') return

    const text = flattenText(block.children).trim()
    if (!text) return

    const base =
      text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .slice(0, 60) || 'section'

    const count = seen.get(base) ?? 0
    seen.set(base, count + 1)

    items.push({
      id: count === 0 ? base : `${base}-${count + 1}`,
      text,
      level: block.level,
      blockIndex,
    })
  })

  return items
}

/** Best-available rendition for a card thumbnail. */
export function coverSrc(cover: StrapiImage | null | undefined): string | null {
  if (!cover) return null
  return strapiMedia(cover.formats?.medium?.url ?? cover.url)
}
