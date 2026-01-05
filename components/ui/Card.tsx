import { CardProps } from '@/types'
import { cn } from '@/lib/utils'

const variants = {
  default: 'bg-white border border-neutral-200',
  blue: 'bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 border border-blue-200',
  green: 'bg-gradient-to-br from-emerald-50 via-green-100 to-teal-100 border border-green-200',
  pink: 'bg-gradient-to-br from-rose-50 via-pink-100 to-red-100 border border-red-200',
  grey: 'bg-gradient-to-br from-neutral-50 via-neutral-100 to-slate-100 border border-neutral-200',
}

const sizes = {
  sm: 'p-12 md:p-16',
  md: 'p-16 md:p-24',
  lg: 'p-24 md:p-32',
}

export default function Card({
  title,
  description,
  children,
  variant = 'default',
  size = 'md',
  className,
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg shadow-card hover:shadow-card-hover transition-shadow duration-200',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {title && (
        <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-4 md:mb-8">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-xs sm:text-sm text-neutral-600 mb-12 md:mb-16">
          {description}
        </p>
      )}
      {children}
    </div>
  )
}
