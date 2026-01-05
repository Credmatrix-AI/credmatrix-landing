'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, Compass } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import AnimateOnScroll from '@/components/shared/AnimateOnScroll'
import RotatingText from '@/components/shared/RotatingText'
import { HOME_STATS } from '@/constants'

const rotatingWords = ['accessible', 'affordable', 'instant']

function StatsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HOME_STATS.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className="text-center bg-white border border-neutral-200 rounded-xl py-24 px-16"
        >
          <h3 className="text-2xl sm:text-3xl text-secondary mb-4">
            {HOME_STATS[currentIndex].value}
          </h3>
          {HOME_STATS[currentIndex].label && (
            <div className="text-xs sm:text-sm text-neutral-600">
              {HOME_STATS[currentIndex].label}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {HOME_STATS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-primary' : 'bg-neutral-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <div className="relative">
      {/* Blue background - only top portion with side margins */}
      <div className="absolute top-0 left-8 right-8 md:left-32 md:right-32 lg:left-64 lg:right-64 h-[500px] bg-accent-blue rounded-b-[32px] md:rounded-b-[48px]"></div>

      {/* Content */}
      <div className="relative pt-64 pb-80">
        <Container>
          <AnimateOnScroll animation="fadeUp" className="max-w-3xl mx-auto text-left md:text-center mb-48">
            <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-normal text-secondary mb-32 leading-tight">
              Transforming financial due-diligence intelligence into{' '}
              {/* <RotatingText words={rotatingWords} interval={2500} />{' '} */}
              <span className='font-bold'>accessible, affordable & instant </span>
              resource for every decision - maker
            </h1>
            <div className="flex flex-col sm:flex-row justify-start md:justify-center gap-12 sm:gap-16">
              <a href="https://app.credmatrix.ai/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button variant="primary" size="sm" className="w-full sm:w-auto whitespace-nowrap hover:scale-105 transition-transform">
                  Get Started
                  <ArrowRight className="w-16 h-16 md:w-6 md:h-6 ml-4 md:ml-8" />
                </Button>
              </a>
              <a href="https://app.credmatrix.ai/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button variant="outline" size="sm" className="w-full sm:w-auto whitespace-nowrap hover:scale-105 transition-transform">
                  <Compass className="w-16 h-16 md:w-6 md:h-6 mr-4 md:mr-8" />
                  Explore Product
                </Button>
              </a>
            </div>
          </AnimateOnScroll>

          {/* Product Demo Image */}
          <AnimateOnScroll animation="scale" delay={200} className="max-w-5xl mx-auto mb-80">
            <img
              src="/hero-banner.png"
              alt="CredMatrix Platform"
              className="w-full h-auto"
            />
          </AnimateOnScroll>

          {/* Stats - Carousel on mobile, Grid on desktop */}
          <div className="max-w-5xl mx-auto">
            {/* Mobile Carousel */}
            <div className="md:hidden">
              <StatsCarousel />
            </div>
            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-3 gap-24">
              {HOME_STATS.map((stat, index) => (
                <AnimateOnScroll key={index} animation="fadeUp" delay={300 + index * 100}>
                  <div className="text-center bg-white border border-neutral-200 rounded-xl py-32 px-24 hover:shadow-lg transition-shadow">
                    <h3 className="text-4xl text-secondary mb-8">
                      {stat.value}
                    </h3>
                    {stat.label && (
                      <div className="text-sm text-neutral-600">{stat.label}</div>
                    )}
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}
