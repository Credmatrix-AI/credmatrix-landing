import { formatPostDate } from '@/lib/blog'
import { cn } from '@/lib/utils'
import AuthorAvatar from './AuthorAvatar'

interface AuthorBylineProps {
  author: string
  date: string
  avatar?: string
  readingTime?: string
  size?: 'sm' | 'md'
  className?: string
}

export default function AuthorByline({
  author,
  date,
  avatar,
  readingTime,
  size = 'sm',
  className,
}: AuthorBylineProps) {
  return (
    <div className={cn('flex items-center gap-12', className)}>
      <AuthorAvatar
        author={author}
        src={avatar}
        className={cn(size === 'md' ? 'w-40 h-40 text-sm' : 'w-32 h-32 text-xs')}
      />

      <div className="min-w-0">
        <p
          className={cn(
            'font-medium text-secondary truncate',
            size === 'md' ? 'text-sm md:text-base' : 'text-xs'
          )}
        >
          {author}
        </p>
        <p className={cn('text-neutral-500', size === 'md' ? 'text-xs md:text-sm' : 'text-xs')}>
          <time dateTime={date}>{formatPostDate(date)}</time>
          {readingTime && (
            <>
              <span aria-hidden="true"> · </span>
              {readingTime}
            </>
          )}
        </p>
      </div>
    </div>
  )
}
