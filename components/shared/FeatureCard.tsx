import Link from 'next/link'
import { FeatureCardProps } from '@/types'
import Card from '@/components/ui/Card'

export default function FeatureCard({
  title,
  description,
  icon,
  variant = 'default',
  href,
  linkText,
}: FeatureCardProps) {
  return (
    <Card variant={variant} className="h-full hover:scale-105 transition-transform duration-300 group">
      {icon && <div className="mb-12 md:mb-16 group-hover:scale-110 transition-transform duration-300">{icon}</div>}
      <h4 className="text-base sm:text-lg font-semibold text-neutral-900 mb-4 md:mb-8">{title}</h4>
      <p className="text-xs sm:text-sm text-neutral-600">{description}</p>
      {href && linkText && (
        <Link
          href={href}
          className="mt-12 md:mt-16 inline-block text-xs sm:text-sm font-medium text-neutral-500 hover:text-neutral-700 transition-colors"
        >
          {linkText} &rarr;
        </Link>
      )}
    </Card>
  )
}
