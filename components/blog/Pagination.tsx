import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PaginationProps {
  page: number
  pageCount: number
  /** Preserved across page links so the category filter survives paging. */
  category?: string
}

function hrefFor(page: number, category?: string): string {
  const params = new URLSearchParams()
  if (category) params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `/blog?${query}` : '/blog'
}

export default function Pagination({ page, pageCount, category }: PaginationProps) {
  if (pageCount <= 1) return null

  const pages = Array.from({ length: pageCount }, (_, index) => index + 1)
  const arrowClasses =
    'inline-flex items-center gap-4 rounded-full border border-neutral-200 px-16 py-8 text-sm text-neutral-600 transition-colors hover:border-primary hover:text-primary'

  return (
    <nav aria-label="Pagination" className="flex flex-wrap items-center justify-center gap-8">
      {page > 1 ? (
        <Link href={hrefFor(page - 1, category)} rel="prev" className={arrowClasses}>
          <ChevronLeft className="h-16 w-16" />
          Previous
        </Link>
      ) : (
        <span className={cn(arrowClasses, 'cursor-not-allowed opacity-40 hover:border-neutral-200 hover:text-neutral-600')}>
          <ChevronLeft className="h-16 w-16" />
          Previous
        </span>
      )}

      <div className="flex flex-wrap items-center gap-4">
        {pages.map((value) => (
          <Link
            key={value}
            href={hrefFor(value, category)}
            aria-current={value === page ? 'page' : undefined}
            className={cn(
              'inline-flex h-32 min-w-32 items-center justify-center rounded-full px-8 text-sm transition-colors',
              value === page
                ? 'bg-primary text-white'
                : 'text-neutral-600 hover:bg-accent-blue hover:text-primary-dark'
            )}
          >
            {value}
          </Link>
        ))}
      </div>

      {page < pageCount ? (
        <Link href={hrefFor(page + 1, category)} rel="next" className={arrowClasses}>
          Next
          <ChevronRight className="h-16 w-16" />
        </Link>
      ) : (
        <span className={cn(arrowClasses, 'cursor-not-allowed opacity-40 hover:border-neutral-200 hover:text-neutral-600')}>
          Next
          <ChevronRight className="h-16 w-16" />
        </span>
      )}
    </nav>
  )
}
