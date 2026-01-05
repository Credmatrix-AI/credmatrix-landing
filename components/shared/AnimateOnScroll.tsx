'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  VARIANTS,
  EASING,
  DURATION,
  VIEWPORT_CONFIG,
} from '@/lib/animations'

type AnimationType = 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale' | 'fade'

interface AnimateOnScrollProps {
  children: React.ReactNode
  className?: string
  animation?: AnimationType
  delay?: number
  duration?: keyof typeof DURATION
}

export default function AnimateOnScroll({
  children,
  className,
  animation = 'fadeUp',
  delay = 0,
  duration = 'normal',
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    once: VIEWPORT_CONFIG.once,
    margin: VIEWPORT_CONFIG.margin,
  })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={VARIANTS[animation]}
      transition={{
        duration: DURATION[duration],
        delay: delay / 1000,
        ease: EASING,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
