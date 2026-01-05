import { ButtonProps } from '@/types'
import { cn } from '@/lib/utils'

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary',
    secondary: 'bg-secondary text-white hover:bg-secondary-light focus:ring-secondary',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary',
    ghost: 'text-primary hover:bg-accent-blue focus:ring-primary',
  }

  const sizes = {
    sm: 'px-8 py-3 text-xs md:px-24 md:py-12 md:text-sm',
    md: 'px-10 py-3 text-xs md:px-24 md:py-12 md:text-base',
    lg: 'px-12 py-3 text-sm md:px-32 md:py-16 md:text-lg',
  }

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  )
}
