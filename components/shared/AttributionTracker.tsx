'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { captureAttribution } from '@/lib/utm'

/**
 * Records campaign attribution on first load and on every client-side
 * navigation. Renders nothing.
 *
 * Reads window.location.search directly rather than useSearchParams() so it
 * does not opt every page out of static rendering.
 */
export default function AttributionTracker() {
  const pathname = usePathname()

  useEffect(() => {
    captureAttribution()
  }, [pathname])

  return null
}
