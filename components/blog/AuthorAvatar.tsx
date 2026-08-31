'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface AuthorAvatarProps {
  author: string
  src?: string
  className?: string
}

function initialsFor(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

/**
 * Author photo that degrades to initials on a brand chip — both when a post
 * declares no `authorAvatar` and when the declared file fails to load. Content
 * paths are hand-written in frontmatter, so a missing or misnamed photo must
 * never render as a broken image.
 */
export default function AuthorAvatar({ author, src, className }: AuthorAvatarProps) {
  const [failed, setFailed] = useState(false)
  const showImage = Boolean(src) && !failed

  return (
    <div
      className={cn(
        'relative shrink-0 rounded-full overflow-hidden flex items-center justify-center',
        'bg-primary text-white font-semibold',
        className
      )}
    >
      {showImage ? (
        <Image
          src={src as string}
          alt={author}
          fill
          sizes="40px"
          unoptimized={src!.endsWith('.svg')}
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <span aria-hidden="true">{initialsFor(author)}</span>
      )}
    </div>
  )
}
