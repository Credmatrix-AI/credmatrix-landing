'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Heading from '@/components/ui/Heading'
import { ProductSection } from '@/types'
import { cn } from '@/lib/utils'
import {
  EASING,
  DURATION,
  STAGGER_DELAY,
  VIEWPORT_CONFIG,
  createSlideVariant,
} from '@/lib/animations'
import {
  Database,
  Brain,
  Zap,
  Wallet,
  ScanSearch,
  AlertTriangle,
  BellRing,
  Building,
  ShieldCheck,
  BarChart3,
  Search,
  ClipboardList,
  Calculator,
  FolderSearch,
  Compass,
  LucideIcon,
} from 'lucide-react'

interface ProductShowcaseProps {
  section: ProductSection
  index?: number
}

const iconMap: Record<string, LucideIcon> = {
  'database': Database,
  'brain': Brain,
  'zap': Zap,
  'wallet': Wallet,
  'scan-search': ScanSearch,
  'alert-triangle': AlertTriangle,
  'bell-ring': BellRing,
  'building': Building,
  'shield-check': ShieldCheck,
  'bar-chart-3': BarChart3,
  'search': Search,
  'clipboard-list': ClipboardList,
  'calculator': Calculator,
  'folder-search': FolderSearch,
  'compass': Compass,
}

export default function ProductShowcase({ section, index = 0 }: ProductShowcaseProps) {
  const isImageLeft = index % 2 === 1
  const isEven = index % 2 === 0
  const ref = useRef(null)
  const isInView = useInView(ref, VIEWPORT_CONFIG)

  const contentVariants = createSlideVariant(isImageLeft ? 'right' : 'left')
  const imageVariants = createSlideVariant(isImageLeft ? 'left' : 'right')

  return (
    <Section
      id={section.id}
      background={isEven ? 'white' : 'grey'}
      size="md"
      className="overflow-hidden"
    >
      <Container>
        <div
          ref={ref}
          className={cn(
            'flex flex-col lg:flex-row items-center gap-24 md:gap-48',
            isImageLeft && 'lg:flex-row-reverse'
          )}
        >
          {/* Content Side */}
          <motion.div
            className="flex-1 w-full"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={contentVariants}
            transition={{ duration: DURATION.slow, ease: EASING }}
          >
            <Heading as="h2" size="lg" className="mb-16 font-bold">
              {section.title}
            </Heading>
            <p className="text-sm sm:text-base md:text-lg text-neutral-600 mb-24 md:mb-32">
              {section.description}
            </p>

            {/* Feature Cards - 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-16 mb-24 md:mb-32">
              {section.features.map((feature, idx) => {
                const Icon = iconMap[feature.icon] || Database
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{
                      duration: DURATION.fast,
                      delay: 0.3 + idx * STAGGER_DELAY,
                      ease: EASING,
                    }}
                  >
                    <Card size="sm" className="h-full">
                      <div className="flex items-start gap-6">
                        <div className="p-3 md:p-6 rounded-md bg-neutral-100 shrink-0 flex items-center justify-center">
                          <Icon className="w-12 h-12 md:w-16 md:h-16 text-neutral-500" />
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-semibold text-neutral-900 mb-2 md:mb-4">
                            {feature.title}
                          </h4>
                          <p className="text-[10px] sm:text-xs text-neutral-500">{feature.description}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )
              })}
            </div>

            {/* Action Buttons */}
            <motion.div
              className="flex gap-12"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: DURATION.fast, delay: 0.7, ease: EASING }}
            >
              <Link href="/solutions">
                <Button variant="outline" size="sm">Explore</Button>
              </Link>
              <Button variant="ghost" size="sm" className="text-neutral-600 hover:text-[#0E6EBE]">
                Watch Tutorial
              </Button>
            </motion.div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            className="flex-1 w-full"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={imageVariants}
            transition={{ duration: DURATION.slow, delay: 0.2, ease: EASING }}
          >
            {section.image ? (
              <Image
                src={section.image}
                alt={section.title}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto rounded-xl border border-neutral-200"
              />
            ) : (
              <div className="w-full aspect-[4/3] rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50 flex items-center justify-center">
                <span className="text-neutral-400 text-sm">Product Screenshot</span>
              </div>
            )}
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
