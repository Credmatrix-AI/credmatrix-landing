import { NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { CACHE_TAGS } from '@/lib/strapi'

/**
 * Webhook target for Strapi.
 *
 * Strapi POSTs here on entry create/update/delete/publish/unpublish; we drop the
 * matching cache tags so the affected pages rebuild on their next request
 * instead of waiting out the ISR window.
 *
 * Configure in Strapi under Settings → Webhooks (or let the CMS bootstrap
 * register it from NEXT_REVALIDATE_URL / NEXT_REVALIDATE_SECRET) with the
 * header `x-webhook-secret: <STRAPI_REVALIDATE_SECRET>`.
 */

interface StrapiWebhookPayload {
  event?: string
  model?: string
  entry?: {
    slug?: string
    [key: string]: unknown
  }
}

function isAuthorized(request: Request): boolean {
  const secret = process.env.STRAPI_REVALIDATE_SECRET

  // Fail closed: without a configured secret the endpoint stays shut.
  if (!secret) return false

  const headerSecret = request.headers.get('x-webhook-secret')
  const querySecret = new URL(request.url).searchParams.get('secret')

  return headerSecret === secret || querySecret === secret
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ revalidated: false, message: 'Invalid secret' }, { status: 401 })
  }

  let payload: StrapiWebhookPayload = {}
  try {
    payload = (await request.json()) as StrapiWebhookPayload
  } catch {
    // Strapi always sends JSON, but a manual ping without a body should still
    // be able to flush the listing.
  }

  const revalidated: string[] = []

  const invalidate = (tag: string) => {
    revalidateTag(tag)
    revalidated.push(tag)
  }

  // The listing aggregates every model, so it always goes.
  invalidate(CACHE_TAGS.articles)

  if (payload.model === 'category') {
    invalidate(CACHE_TAGS.categories)
  }

  if (payload.model === 'article' && payload.entry?.slug) {
    invalidate(CACHE_TAGS.article(payload.entry.slug))
    revalidatePath(`/blog/${payload.entry.slug}`)
  }

  revalidatePath('/blog')

  return NextResponse.json({
    revalidated: true,
    event: payload.event ?? null,
    model: payload.model ?? null,
    tags: revalidated,
  })
}

/** Convenience probe so you can confirm the route is deployed. */
export async function GET() {
  return NextResponse.json({
    ok: true,
    configured: Boolean(process.env.STRAPI_REVALIDATE_SECRET),
    message: 'POST here from a Strapi webhook with the x-webhook-secret header.',
  })
}
