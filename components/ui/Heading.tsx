import { cn } from '@/lib/utils'

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
type HeadingSize = 'xl' | 'lg' | 'md' | 'sm' | 'xs'
type HeadingAlign = 'left' | 'center' | 'right'

interface HeadingProps {
  as?: HeadingTag
  size?: HeadingSize
  align?: HeadingAlign
  className?: string
  children: React.ReactNode
}

const sizeClasses: Record<HeadingSize, string> = {
  xl: 'text-2xl sm:text-3xl md:text-3xl lg:text-4xl',      // Page titles
  lg: 'text-xl sm:text-2xl md:text-2xl lg:text-3xl',       // Section titles
  md: 'text-lg sm:text-xl md:text-2xl',                // Subsection titles
  sm: 'text-base sm:text-lg md:text-xl',               // Card titles
  xs: 'text-sm sm:text-base',                          // Small titles
}

const alignClasses: Record<HeadingAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

// Default size based on heading level
const defaultSizeMap: Record<HeadingTag, HeadingSize> = {
  h1: 'xl',
  h2: 'lg',
  h3: 'md',
  h4: 'sm',
  h5: 'xs',
  h6: 'xs',
}

export default function Heading({
  as: Tag = 'h2',
  size,
  align = 'left',
  className,
  children,
}: HeadingProps) {
  // Use provided size or default based on tag
  const resolvedSize = size ?? defaultSizeMap[Tag]

  return (
    <Tag
      className={cn(
        'text-secondary',
        sizeClasses[resolvedSize],
        alignClasses[align],
        className
      )}
    >
      {children}
    </Tag>
  )
}
