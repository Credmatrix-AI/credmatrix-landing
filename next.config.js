/**
 * Strapi serves uploads from its own origin, so next/image needs that host
 * allow-listed. We derive it from STRAPI_URL rather than hardcoding it, so
 * preview/production point at their own CMS without a code change.
 */
function strapiImagePattern() {
  const raw = process.env.STRAPI_URL
  if (!raw) return []

  try {
    const url = new URL(raw)
    return [
      {
        protocol: url.protocol.replace(':', ''),
        hostname: url.hostname,
        port: url.port || '',
        pathname: '/uploads/**',
      },
    ]
  } catch {
    console.warn(`[next.config] STRAPI_URL is not a valid URL: ${raw}`)
    return []
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Local Strapi during development.
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      // Strapi Cloud / S3-backed uploads.
      {
        protocol: 'https',
        hostname: '**.media.strapiapp.com',
        pathname: '/**',
      },
      ...strapiImagePattern(),
    ],
  },
}

module.exports = nextConfig
