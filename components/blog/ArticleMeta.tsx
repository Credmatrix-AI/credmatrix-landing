import { Fragment } from 'react'
import { formatArticleDate } from '@/lib/strapi'
import { cn } from '@/lib/utils'
import type { Article } from '@/types/blog'

interface ArticleMetaProps {
  article: Pick<Article, 'publishedAt' | 'author'>
  readingTime?: number
  className?: string
}

/**
 * Byline as one quiet line: `Author · 12 August 2026 · 5 min read`.
 *
 * Middots rather than an icon per field — two icons decorating two short
 * strings adds visual weight without adding meaning.
 */
export default function ArticleMeta({ article, readingTime, className }: ArticleMetaProps) {
  const parts = [
    article.author?.name,
    formatArticleDate(article.publishedAt),
    readingTime ? `${readingTime} min read` : null,
  ].filter(Boolean) as string[]

  return (
    <p className={cn('text-xs text-neutral-500', className)}>
      {parts.map((part, index) => (
        <Fragment key={part}>
          {index > 0 && <span className="px-8 text-neutral-300">·</span>}
          <span className={index === 0 ? 'font-medium text-neutral-700' : undefined}>{part}</span>
        </Fragment>
      ))}
    </p>
  )
}
