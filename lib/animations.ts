import { Variants } from 'framer-motion'

/**
 * Centralized animation configuration for consistent animations across the site
 */

// Standard easing curve - smooth deceleration
export const EASING = [0.25, 0.46, 0.45, 0.94] as const

// Animation durations
export const DURATION = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.7,
} as const

// Stagger delay for sequential animations
export const STAGGER_DELAY = 0.1

// Viewport configuration for scroll-triggered animations
export const VIEWPORT_CONFIG = {
  once: true,
  margin: '-80px' as const,
}

// Standard animation variants
export const VARIANTS: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
}

// Helper to create slide variants with custom offset
export const createSlideVariant = (
  direction: 'left' | 'right',
  offset: number = 100
): Variants => ({
  hidden: {
    opacity: 0,
    x: direction === 'left' ? -offset : offset,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
})

// Standard transition configuration
export const getTransition = (
  duration: keyof typeof DURATION = 'normal',
  delay: number = 0
) => ({
  duration: DURATION[duration],
  delay,
  ease: EASING,
})

// Staggered children configuration
export const getStaggerTransition = (
  index: number,
  baseDelay: number = 0
) => ({
  duration: DURATION.normal,
  delay: baseDelay + index * STAGGER_DELAY,
  ease: EASING,
})
