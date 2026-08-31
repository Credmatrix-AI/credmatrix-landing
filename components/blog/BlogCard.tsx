import Link from 'next/link'
import { Clock } from 'lucide-react'
import { BlogPostMeta } from '@/types/blog'
import { cn } from '@/lib/utils'
import CoverImage from './CoverImage'
import AuthorByline from './AuthorByline'

interface BlogCardProps {
  post: BlogPostMeta
  featured?: boolean
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        'group flex flex-col h-full bg-white border border-neutral-200 rounded-lg shadow-card',
        'hover:shadow-card-hover transition-shadow duration-200 overflow-hidden',
        featured && 'md:flex-row'
      )}
    >
      <CoverImage
        src={post.cover}
        seed={post.slug}
        category={post.category}
        priority={featured}
        sizes={
          featured
            ? '(max-width: 768px) 100vw, 40vw'
            : '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
        }
        className={cn(
          'shrink-0',
          featured ? 'h-[200px] md:h-auto md:w-2/5' : 'h-[180px]'
        )}
      />

      <div className={cn('flex flex-col flex-1 p-16 md:p-24', featured && 'md:p-32')}>
        <div className="flex items-center gap-12 mb-12">
          <span className="inline-flex items-center rounded-full bg-accent-blue px-12 py-4 text-xs font-medium text-primary-dark">
            {post.category}
          </span>
          <span className="inline-flex items-center gap-4 text-xs text-neutral-500">
            <Clock className="w-12 h-12" />
            {post.readingTime}
          </span>
        </div>

        <h3
          className={cn(
            'font-heading font-bold text-secondary group-hover:text-primary transition-colors mb-8',
            featured ? 'text-xl md:text-3xl' : 'text-lg md:text-xl'
          )}
        >
          {post.title}
        </h3>

        <p className="text-sm text-neutral-600 mb-16 flex-1">{post.description}</p>

        <AuthorByline
          author={post.author}
          date={post.date}
          avatar={post.authorAvatar}
        />
      </div>
    </Link>
  )
}
