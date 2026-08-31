import Image from 'next/image'
import { cn } from '@/lib/utils'

interface CoverImageProps {
  src?: string
  /** Used to pick a deterministic placeholder tint and initials. */
  seed: string
  category?: string
  className?: string
  sizes?: string
  priority?: boolean
}

const PLACEHOLDER_TINTS = [
  'from-primary via-primary-dark to-secondary',
  'from-secondary via-primary-dark to-primary',
  'from-primary-light via-primary to-secondary',
  'from-secondary-light via-secondary to-primary-dark',
]

function tintFor(seed: string): string {
  const sum = Array.from(seed).reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return PLACEHOLDER_TINTS[sum % PLACEHOLDER_TINTS.length]
}

/**
 * Post cover art. Falls back to a branded gradient panel when a post has no
 * cover, so every card and article header keeps the same shape.
 *
 * SVG art bypasses the image optimizer — Next refuses to process SVG without
 * `dangerouslyAllowSVG`, and vector art gains nothing from resizing anyway.
 * Raster covers (jpg/png/webp) still go through the optimizer normally.
 */
export default function CoverImage({
  src,
  seed,
  category,
  className,
  sizes,
  priority = false,
}: CoverImageProps) {
  if (!src) {
    return (
      <div
        className={cn(
          'relative flex items-center justify-center bg-gradient-to-br overflow-hidden',
          tintFor(seed),
          className
        )}
        aria-hidden="true"
      >
        <svg
          className="absolute inset-0 h-full w-full opacity-25"
          viewBox="0 0 400 200"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0 150 L60 120 L120 135 L180 85 L240 105 L300 55 L360 75 L400 45"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <g stroke="#D4E9FF" strokeOpacity="0.5" strokeWidth="1">
            <path d="M0 40 H400 M0 80 H400 M0 120 H400 M0 160 H400" />
          </g>
        </svg>
        {category && (
          <span className="relative font-heading text-sm md:text-base font-bold uppercase tracking-widest text-white/90">
            {category}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className={cn('relative overflow-hidden bg-accent-blue', className)}>
      <Image
        src={src}
        alt=""
        fill
        priority={priority}
        sizes={sizes}
        unoptimized={src.endsWith('.svg')}
        className="object-cover"
      />
    </div>
  )
}
