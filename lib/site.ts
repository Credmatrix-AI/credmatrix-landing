/**
 * Canonical origin for the site. Metadata in app/layout.tsx sets this as
 * `metadataBase`, which resolves the relative URLs Next emits for canonical and
 * og:url tags. Structured data gets no such treatment — JSON-LD must carry
 * fully-qualified URLs — so absoluteUrl() exists for those call sites.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://credmatrix.ai'

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString()
}
