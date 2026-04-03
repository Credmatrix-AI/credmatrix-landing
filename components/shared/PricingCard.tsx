'use client'

import { motion } from 'framer-motion'
import { User, Users, Building2, Check, Sparkles } from 'lucide-react'
import { PricingTier } from '@/types'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface PricingCardProps {
  tier: PricingTier
}

const iconMap: Record<string, React.ElementType> = {
  user: User,
  users: Users,
  building: Building2,
}

export default function PricingCard({ tier }: PricingCardProps) {
  const Icon = iconMap[tier.icon] || User

  const variants = {
    grey: {
      card: 'bg-gradient-to-br from-neutral-50 via-slate-50 to-neutral-100 border-neutral-200',
      icon: 'bg-neutral-200 text-neutral-600',
      price: 'text-neutral-900',
      button: 'primary' as const,
    },
    blue: {
      card: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 border-primary/30 shadow-lg shadow-primary/10',
      icon: 'bg-primary text-white',
      price: 'text-primary',
      button: 'primary' as const,
    },
    pink: {
      card: 'bg-gradient-to-br from-rose-50 via-pink-50 to-red-100 border-rose-200',
      icon: 'bg-rose-500 text-white',
      price: 'text-rose-600',
      button: 'primary' as const,
    },
  }

  const style = variants[tier.variant]

  return (
    <motion.div
      className={cn(
        'relative rounded-2xl border-2 p-24 transition-all duration-300 h-full flex flex-col',
        style.card,
        tier.highlighted && 'ring-2 ring-primary ring-offset-2'
      )}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      {/* Popular Badge */}
      {tier.highlighted && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-4 bg-primary text-white text-xs font-semibold px-12 py-4 rounded-full">
            <Sparkles className="w-12 h-12" />
            Most Popular
          </span>
        </div>
      )}

      {/* Icon */}
      <div className={cn('w-48 h-48 rounded-xl flex items-center justify-center mb-16', style.icon)}>
        <Icon className="w-24 h-24" />
      </div>

      {/* Plan Name */}
      <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-8">
        {tier.name}
      </h3>

      {/* Description */}
      <p className="text-sm text-neutral-500 mb-16 leading-relaxed">{tier.description}</p>

      {/* Price */}
      <div className="mb-24 pb-24 border-b border-neutral-200">
        <span className={cn('text-3xl md:text-4xl font-bold', style.price)}>
          {tier.price}
          {tier.variant !== 'pink' && <span className='text-lg text-black regular'> + GST</span>}
        </span>
        {tier.period && (
          <span className="text-sm text-neutral-500 ml-4">/{tier.period}</span>
        )}
      </div>

      {/* Features */}
      <div className="flex-1 mb-24">
        <p className="text-sm font-semibold text-neutral-700 mb-16">What&apos;s included:</p>
        <ul className="space-y-12">
          {tier.features.map((feature, index) => (
            <motion.li
              key={index}
              className="flex items-start gap-12"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Check className="w-18 h-18 text-primary flex-shrink-0 mt-2" strokeWidth={2.5} />
              <span className="text-sm text-neutral-600 leading-relaxed">{feature}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <a href="https://app.credmatrix.ai/" target="_blank" rel="noopener noreferrer" className="w-full mt-auto">
        <Button
          variant={style.button}
          size="md"
          className={cn(
            'w-full',
            tier.highlighted && 'shadow-lg shadow-primary/25'
          )}
        >
          {tier.ctaText}
        </Button>
      </a>
    </motion.div>
  )
}
