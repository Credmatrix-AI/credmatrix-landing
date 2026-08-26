import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { HEADING_SIZE_CLASSES } from '@/components/ui/Heading'
import ArticleMeta from '@/components/blog/ArticleMeta'
import { coverSrc } from '@/lib/strapi'
import { cn } from '@/lib/utils'
import type { Article } from '@/types/blog'

interface ArticleCardProps {
  article: Article
  /** `lead` is the large editorial block at the top of the listing. */
  variant?: 'default' | 'lead'
  readingTime?: number
}

/**
 * Text-first article card.
 *
 * The cover is optional by design: most posts ship without one, and reserving a
 * 16:9 hero for a placeholder makes the largest element on every card carry no
 * information. Without a cover the card is a clean typographic block; with one
 * it gains a framed thumbnail.
 *
 * Exactly one link per card — the title, stretched over the whole surface via
 * `after:inset-0`. The category is a label, not a second link; filtering lives
 * in the pill bar above the grid.
 */
export default function ArticleCard({
  article,
  variant = 'default',
  readingTime,
}: ArticleCardProps) {
  const image = coverSrc(article.cover)
  const isLead = variant === 'lead'

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col rounded-lg border border-neutral-200 bg-white transition-all duration-200',
        // Border as the resting state, shadow only on hover — if every card is
        // elevated at rest, elevation stops meaning anything.
        'hover:border-primary/40 hover:shadow-card-hover',
        'has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-primary has-[a:focus-visible]:ring-offset-2',
        isLead && 'rounded-xl bg-neutral-50',
        isLead && image && 'overflow-hidden lg:grid lg:grid-cols-2 lg:items-stretch'
      )}
    >
      {image && (
        <div
          className={cn(
            'relative overflow-hidden bg-neutral-100',
            isLead ? 'aspect-[16/10] lg:aspect-auto lg:h-full' : 'mx-24 mt-24 aspect-video rounded-md'
          )}
        >
          <Image
            src={image}
            alt={article.cover?.alternativeText ?? ''}
            fill
            sizes={
              isLead
                ? '(min-width: 1024px) 620px, 100vw'
                : '(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw'
            }
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
      )}

      <div
        className={cn(
          'flex flex-1 flex-col',
          isLead ? 'p-24 md:p-40 lg:justify-center lg:p-48' : 'p-24'
        )}
      >
        {(article.category || isLead) && (
          <p className="mb-12 flex flex-wrap items-center gap-x-12 gap-y-4 text-xs font-medium uppercase tracking-wide">
            {isLead && <span className="text-neutral-500">Featured</span>}
            {isLead && article.category && <span className="text-neutral-300">·</span>}
            {article.category && <span className="text-primary">{article.category.name}</span>}
          </p>
        )}

        <h3
          className={cn(
            'font-heading tracking-tight text-secondary transition-colors group-hover:text-primary',
            isLead
              ? 'text-2xl sm:text-3xl lg:text-4xl'
              : HEADING_SIZE_CLASSES.sm
          )}
        >
          <Link
            href={`/blog/${article.slug}`}
            className="after:absolute after:inset-0 after:rounded-lg focus-visible:outline-none"
          >
            {article.title}
          </Link>
        </h3>

        {article.excerpt && (
          <p
            className={cn(
              'mt-12 text-sm text-neutral-600',
              isLead ? 'max-w-2xl leading-relaxed md:text-base' : 'line-clamp-3'
            )}
          >
            {article.excerpt}
          </p>
        )}

        {/* mt-auto keeps bylines on a common baseline across cards whose
            excerpts wrap to different heights. The gap lives on this outer
            element because mt-auto collapses to 0 on a full card, which would
            otherwise leave the rule sitting on the excerpt's last line. */}
        <div className="mt-auto pt-24">
          <div
            className={cn(
              'flex flex-wrap items-center justify-between gap-x-16 gap-y-8',
              // More space above the rule than below it, so it reads as the top
              // of the byline group rather than an underline on the excerpt.
              !isLead && 'border-t border-neutral-200 pt-16'
            )}
          >
            <ArticleMeta article={article} readingTime={readingTime} />

            {isLead && (
              <span className="inline-flex items-center gap-8 text-sm font-medium text-primary">
                Read article
                <ArrowRight className="h-16 w-16 transition-transform duration-200 group-hover:translate-x-4" />
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
