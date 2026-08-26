import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { Category } from '@/types/blog'

interface CategoryFilterProps {
  categories: Category[]
  /** Currently selected category slug, or undefined for "All". */
  active?: string
}

export default function CategoryFilter({ categories, active }: CategoryFilterProps) {
  if (!categories.length) return null

  const options = [{ slug: undefined, name: 'All' }, ...categories]

  return (
    <nav
      aria-label="Filter articles by category"
      // Single row that scrolls on narrow screens — wrapping pills to three
      // lines pushes the articles themselves below the fold on a phone. The
      // negative margin lets the row bleed to the container edge while keeping
      // the first and last pill clear of it.
      className={cn(
        '-mx-16 flex gap-8 overflow-x-auto px-16 md:mx-0 md:flex-wrap md:px-0',
        '[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
      )}
    >
      {options.map((option) => {
        const isActive = option.slug === active
        return (
          <Link
            key={option.slug ?? 'all'}
            href={option.slug ? `/blog?category=${option.slug}` : '/blog'}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'shrink-0 rounded-full border px-16 py-8 text-sm font-medium transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
              isActive
                ? 'border-secondary bg-secondary text-white'
                : 'border-neutral-200 bg-white text-neutral-600 hover:border-primary hover:text-primary'
            )}
          >
            {option.name}
          </Link>
        )
      })}
    </nav>
  )
}
