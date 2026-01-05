'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EASING, DURATION } from '@/lib/animations'

interface RotatingTextProps {
  words: string[]
  interval?: number
  className?: string
}

export default function RotatingText({
  words,
  interval = 2500,
  className = '',
}: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [maxWidth, setMaxWidth] = useState(0)
  const measureRef = useRef<HTMLSpanElement>(null)

  // Measure all words to find the widest one
  useEffect(() => {
    if (measureRef.current) {
      let max = 0
      words.forEach((word) => {
        measureRef.current!.textContent = word
        const width = measureRef.current!.offsetWidth
        if (width > max) max = width
      })
      setMaxWidth(max)
    }
  }, [words])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length)
    }, interval)

    return () => clearInterval(timer)
  }, [words.length, interval])

  return (
    <>
      {/* Hidden span to measure text width */}
      <span
        ref={measureRef}
        className="absolute invisible whitespace-nowrap italic"
        aria-hidden="true"
      />

      <span
        className={`inline-block relative mr-4 md:mr-8 ${className}`}
        style={{ width: maxWidth > 0 ? maxWidth + 4 : 'auto' }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: DURATION.fast,
              ease: EASING,
            }}
            className="inline-block text-secondary italic underline decoration-primary decoration-2 md:decoration-4 underline-offset-4 md:underline-offset-8"
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </span>
    </>
  )
}
