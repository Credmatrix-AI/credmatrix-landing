'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { AlertTriangle, IndianRupee, Clock, EyeOff, ChevronLeft, ChevronRight, TrendingDown } from 'lucide-react'
import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import Heading from '@/components/ui/Heading'
import AnimateOnScroll from '@/components/shared/AnimateOnScroll'
import { EASING, DURATION, VIEWPORT_CONFIG } from '@/lib/animations'

export default function ProblemsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, VIEWPORT_CONFIG)

  const costs = [
    {
      title: 'Blind Decision-Making Without Data',
      shortLabel: 'Blind Decisions',
      details: [
        "Majority of corporates rely on gut feel and word-of-mouth instead of objective data",
        "Limited access to real-time counterparty financial health information",
        "Subjective parameters replace data-driven creditworthiness intelligence",
        "Lack of standardized frameworks for risk evaluation",
        "Decision-makers struggle to determine deal viability and appropriate exposure values"
      ],
      icon: AlertTriangle,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-300',
    },
    {
      title: 'Prohibitive Cost of In-House Expertise',
      shortLabel: 'High Costs',
      details: [
        "In-house credit teams cost ₹50L+ annually—unviable for most businesses",
        "SMBs and mid-market players cannot afford dedicated risk infrastructure",
        "Limited talent pool with deep credit and risk expertise",
        "Specialized talent (analysts, risk managers) commands premium salaries",
        "High overhead makes proper credit assessment economically unfeasible"
      ],
      icon: IndianRupee,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-300',
    },
    {
      title: 'Time-Intensive Manual Processes',
      shortLabel: 'Slow Process',
      details: [
        "Manual assessments take days to complete",
        "Missed deals to competitors in time-sensitive markets due to delayed decisions",
        "Manual processes prone to inconsistencies and oversight",
        "High risk of human errors leading to wrong evaluations",
        "No scalability—each assessment requires the same time investment"
      ],
      icon: Clock,
      color: 'text-amber-500',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-300',
    },
    {
      title: 'Zero Visibility After Onboarding',
      shortLabel: 'No Visibility',
      details: [
        "No continuous tracking or monitoring post-deal closure",
        "Silent portfolio risk accumulation without visibility",
        "Early warning signs of counterparty distress go undetected",
        "Inability to respond proactively to deteriorating credit profiles",
        "High exposure to bad debt and defaults due to reactive approach"
      ],
      icon: EyeOff,
      color: 'text-rose-500',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-300',
    }
  ]

  // Auto-cycle every 3 seconds (paused when hovering right section)
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % costs.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [costs.length, isPaused])


  return (
    <Section background="white">
      <Container>
        <AnimateOnScroll animation="fadeUp">
          <Heading as="h2" align="center" className="mb-32 md:mb-48">
            The current struggle to spot risks correctly
          </Heading>
        </AnimateOnScroll>

        <div ref={ref} className="flex flex-col lg:flex-row items-center gap-32 md:gap-64">
          {/* Left Side - Clean Circular Layout */}
          <motion.div
            className="flex-1 w-full flex justify-center"
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
            transition={{ duration: DURATION.slow, ease: EASING }}
          >
            <div className="relative w-[340px] h-[340px] md:w-[420px] md:h-[420px]">
              {/* Background circle */}
              <div className="absolute inset-[8%] rounded-full bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200/50" />

              {/* Center Degrowth Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-56 h-56 md:w-56 md:h-56 rounded-full bg-white flex items-center justify-center shadow-lg"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <TrendingDown className="w-28 h-28 md:w-28 md:h-28 text-red-400" />
                </motion.div>
              </div>

              {/* Icons positioned around - rotate so active is at top */}
              {costs.map((cost, index) => {
                const Icon = cost.icon
                const isActive = activeIndex === index

                // Calculate angle: active item always at right (0°), others spread around
                const angleOffset = (index - activeIndex) * 90
                const finalAngle = angleOffset * (Math.PI / 180)

                const radius = 40 // percentage from center
                const x = Math.cos(finalAngle) * radius
                const y = Math.sin(finalAngle) * radius

                return (
                  <motion.div
                    key={index}
                    className="absolute"
                    animate={{
                      left: `${50 + x}%`,
                      top: `${50 + y}%`,
                    }}
                    transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                    style={{
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <motion.div
                      className={`flex items-center gap-3 px-12 py-12 md:px-16 md:py-16 rounded-2xl cursor-pointer transition-all duration-300 ${
                        isActive
                          ? `${cost.bgColor} border ${cost.borderColor}`
                          : 'bg-white border border-neutral-200'
                      }`}
                      onClick={() => setActiveIndex(index)}
                      whileHover={{ scale: 1.05 }}
                      animate={{
                        scale: isActive ? 1.08 : 1,
                        boxShadow: isActive
                          ? '0 20px 40px -12px rgba(0,0,0,0.15)'
                          : '0 4px 12px -2px rgba(0,0,0,0.08)',
                      }}
                      transition={{ duration: 0.3, ease: EASING }}
                    >
                      <Icon className={`w-5 h-5 md:w-6 md:h-6 shrink-0 transition-colors duration-300 ${isActive ? cost.color : 'text-neutral-400'}`} />
                      <span
                        className={`text-xs md:text-sm whitespace-nowrap transition-all duration-300 ${
                          isActive ? 'text-neutral-900 font-semibold' : 'text-neutral-500 font-medium'
                        }`}
                      >
                        {cost.shortLabel}
                      </span>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Right Side - Active Item Only */}
          <motion.div
            className="flex-1 w-full"
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{ duration: DURATION.slow, delay: 0.2, ease: EASING }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <motion.div
              layout
              transition={{ duration: 0.3, ease: EASING }}
              className="flex flex-col"
            >
              {(() => {
                const cost = costs[activeIndex]
                const Icon = cost.icon

                return (
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, ease: EASING }}
                    className="bg-white rounded-md overflow-hidden"
                  >
                    {/* Header */}
                    <div className={`px-20 md:px-24 py-16 md:py-20 ${cost.bgColor} rounded border ${cost.borderColor}`}>
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 rounded-xl bg-white/80 shrink-0">
                          <Icon className={`w-6 h-6 ${cost.color}`} />
                        </div>
                        <h3 className="text-base md:text-lg font-semibold text-neutral-900">
                          {cost.title}
                        </h3>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="px-20 md:px-24 py-20 md:py-24">
                      <ul className="space-y-2">
                        {cost.details.map((detail, detailIndex) => (
                          <motion.li
                            key={detailIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: detailIndex * 0.05, ease: EASING }}
                            className="flex items-start gap-6"
                          >
                            <span className={`${cost.color} shrink-0 mt-1.5`}>
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" />
                                <circle cx="6" cy="6" r="2" fill="currentColor" />
                              </svg>
                            </span>
                            <span className="text-sm md:text-base text-neutral-600 leading-relaxed">{detail}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )
              })()}

              {/* Navigation Controls */}
              <motion.div layout className="flex items-center justify-center gap-16 mt-20 px-16 md:px-0">
              <button
                onClick={() => setActiveIndex((prev) => (prev - 1 + costs.length) % costs.length)}
                className="p-8 rounded-full border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-20 h-20 text-neutral-600" />
              </button>

              {/* Carousel Indicators */}
              <div className="flex items-center gap-8">
                {costs.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-8 rounded-full transition-all duration-300 ${
                      activeIndex === index
                        ? 'w-24 bg-neutral-800'
                        : 'w-8 bg-neutral-300 hover:bg-neutral-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setActiveIndex((prev) => (prev + 1) % costs.length)}
                className="p-8 rounded-full border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="w-20 h-20 text-neutral-600" />
              </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
