import { cn } from '@/lib/utils'

type SectionSize = 'sm' | 'md' | 'lg'
type SectionBackground = 'white' | 'grey' | 'blue' | 'green' | 'pink'

interface SectionProps {
  children: React.ReactNode
  className?: string
  background?: SectionBackground
  size?: SectionSize
  id?: string
}

const backgrounds: Record<SectionBackground, string> = {
  white: 'bg-white',
  grey: 'bg-neutral-50',
  blue: 'bg-accent-blue',
  green: 'bg-accent-green',
  pink: 'bg-accent-pink',
}

const sizes: Record<SectionSize, string> = {
  sm: 'py-32 md:py-48',
  md: 'py-48 md:py-80',
  lg: 'py-64 md:py-96',
}

export default function Section({
  children,
  className,
  background = 'white',
  size = 'md',
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(sizes[size], backgrounds[background], className)}
    >
      {children}
    </section>
  )
}
