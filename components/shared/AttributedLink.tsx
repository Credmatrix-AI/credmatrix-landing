'use client'

import { useEffect, useState, AnchorHTMLAttributes } from 'react'
import { track } from '@vercel/analytics'
import { appendAttributionToUrl, getAttributionParams } from '@/lib/utm'

interface AttributedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  /** Custom event name recorded when the link is clicked. */
  event?: string
  children: React.ReactNode
}

/**
 * Outbound link that carries campaign attribution across to another domain.
 *
 * The href is rewritten after hydration rather than during render, so the
 * server and client markup match and middle-click / open-in-new-tab still work.
 */
export default function AttributedLink({
  href,
  event,
  children,
  ...props
}: AttributedLinkProps) {
  const [resolvedHref, setResolvedHref] = useState(href)

  useEffect(() => {
    setResolvedHref(appendAttributionToUrl(href))
  }, [href])

  return (
    <a
      href={resolvedHref}
      onClick={() => {
        if (event) track(event, getAttributionParams())
      }}
      {...props}
    >
      {children}
    </a>
  )
}
