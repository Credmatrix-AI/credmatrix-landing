import { cn } from '@/lib/utils'
import type { HeadingOutlineItem } from '@/lib/strapi'

interface TableOfContentsProps {
  items: HeadingOutlineItem[]
}

/**
 * Sticky section index for long articles.
 *
 * These pieces are 1,000+ word analyses with named sections; without an index
 * the reader has to scroll the whole thing to find out whether the part they
 * need is in there. Pure anchor links — no scroll-spy, so it costs no client JS.
 */
export default function TableOfContents({ items }: TableOfContentsProps) {
  if (items.length === 0) return null

  return (
    <nav aria-labelledby="toc-heading" className="sticky top-80">
      <p
        id="toc-heading"
        className="text-xs font-medium uppercase tracking-wide text-neutral-500"
      >
        On this page
      </p>
      <ul className="mt-16 space-y-4 border-l border-neutral-200">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                '-ml-px block border-l-2 border-transparent py-4 pl-16 text-sm text-neutral-600',
                'transition-colors hover:border-primary hover:text-primary',
                'focus-visible:outline-none focus-visible:text-primary focus-visible:border-primary',
                item.level > 2 && 'pl-32'
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
