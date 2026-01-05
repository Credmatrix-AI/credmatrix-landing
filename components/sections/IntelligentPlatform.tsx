'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Database, Brain, Activity, BarChart3, ClipboardCheck, FileText } from 'lucide-react'
import Image from 'next/image'
import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import Heading from '@/components/ui/Heading'
import AnimateOnScroll from '@/components/shared/AnimateOnScroll'
import { EASING, DURATION, VIEWPORT_CONFIG } from '@/lib/animations'

export default function IntelligentPlatform() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, VIEWPORT_CONFIG)

  const features = [
    {
      title: 'Relevant Data + Intelligence',
      description: 'Curated by Ex-Bankers & Credit-Risk Experts',
      icon: Database,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
      image: '/solutions/relevant-data-intellegence.png',
    },
    {
      title: 'Industry-Specific Assessments',
      description: 'Tailored insights based on sector trends & benchmarks',
      icon: Brain,
      color: 'text-teal-500',
      bgColor: 'bg-teal-50',
      image: '/solutions/industry-breakdown.png',
    },
    {
      title: 'Real-Time Reports',
      description: 'AI-driven updates with latest financials, news, and regulatory filings',
      icon: Activity,
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-50',
      image: '/solutions/realtime-report.png',
    },
    {
      title: 'Faster Turnaround',
      description: 'Automation speeds up decision-making from days to minutes',
      icon: BarChart3,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      image: '/solutions/faster-turnaround.png',
    },
    {
      title: 'Active Portfolio Monitoring',
      description: 'Early Warning Alerts & API integrations for dynamic risk tracking',
      icon: ClipboardCheck,
      color: 'text-lime-600',
      bgColor: 'bg-lime-50',
      image: '/solutions/portfolio-monitoring.png',
    },
    {
      title: 'Zero Human Error',
      description: 'AI-driven insights based on Proprietary scoring models, no manual intervention',
      icon: FileText,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      image: '/solutions/zero-human-error.png',
    },
  ]

  // Auto-cycle carousel every 2 seconds when no item is hovered
  useEffect(() => {
    if (hoveredIndex !== null) {
      setActiveSlide(hoveredIndex)
      return
    }

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % features.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [hoveredIndex, features.length])

  // Get current image to display
  const currentImage = features[activeSlide]?.image

  return (
    <Section background="white" className="bg-green-50/40">
      <Container>
        <AnimateOnScroll animation="fadeUp">
          <Heading as="h2" align="center" className="mb-32 md:mb-48">
            The Intelligent Platform for Due Diligence
          </Heading>
        </AnimateOnScroll>

        <div ref={ref} className="flex flex-col lg:flex-row items-stretch gap-24 md:gap-48">
          {/* Left Side - Image Carousel */}
          <motion.div
            className="flex-1 w-full"
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
            transition={{ duration: DURATION.slow, ease: EASING }}
          >
            <div className="h-full flex flex-col justify-center items-center">
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5, ease: EASING }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={currentImage}
                      alt={features[activeSlide]?.title}
                      fill
                      className="object-contain p-4"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Carousel Indicators */}
              <div className="flex gap-2 mt-16">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeSlide === index
                        ? 'bg-emerald-500 w-6'
                        : 'bg-neutral-300 hover:bg-neutral-400'
                    }`}
                  />
                ))}
              </div>

              {/* Current Feature Title */}
              <motion.p
                key={activeSlide}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 text-sm font-medium text-neutral-600 text-center"
              >
                {features[activeSlide]?.title}
              </motion.p>
            </div>
          </motion.div>

          {/* Right Side - List */}
          <motion.div
            className="flex-1 w-full"
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{ duration: DURATION.slow, delay: 0.2, ease: EASING }}
          >
            <div className="space-y-3">
              {features.map((feature, index) => {
                const Icon = feature.icon
                const isActive = activeSlide === index

                return (
                  <motion.div
                    key={index}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{
                      duration: DURATION.fast,
                      delay: 0.3 + index * 0.1,
                      ease: EASING,
                    }}
                    className="group"
                  >
                    <motion.div
                      animate={{
                        scale: isActive ? 1.02 : 1,
                        boxShadow: isActive
                          ? '0 10px 40px -10px rgba(0,0,0,0.1)'
                          : '0 1px 3px rgba(0,0,0,0.05)',
                      }}
                      transition={{ duration: 0.3, ease: EASING }}
                      className={`rounded-xl border p-16 md:p-24 cursor-pointer transition-colors duration-300 ${
                        isActive
                          ? 'bg-gradient-to-br from-emerald-50 via-green-100 to-teal-100 border-green-200'
                          : 'bg-white border-neutral-100'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2.5 rounded-lg ${feature.bgColor} shrink-0`}>
                          <Icon className={`w-5 h-5 ${feature.color}`} />
                        </div>
                        <div>
                          <h3 className="text-sm md:text-base font-semibold text-neutral-900">
                            {feature.title}
                          </h3>
                          <p className="text-xs md:text-sm text-neutral-600 mt-1">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
