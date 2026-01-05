'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import Heading from '@/components/ui/Heading'
import CTA from '@/components/sections/CTA'
import {
  EASING,
  DURATION,
  VIEWPORT_CONFIG,
} from '@/lib/animations'
import { ShieldCheck, Lightbulb, Users, Lock, TrendingUp, Target, Rocket } from 'lucide-react'

const VALUES = [
  {
    title: 'Data Integrity',
    description:
      'We believe accuracy is non-negotiable. Every assessment, every insight, and every alert is built on verified data from authorized sources. We never compromise on the quality and reliability of information that drives critical business decisions.',
    icon: ShieldCheck,
    color: 'text-neutral-600',
    bgColor: 'bg-neutral-100',
  },
  {
    title: 'Innovation with Purpose',
    description:
      'We harness the power of AI and automation not for technology\'s sake, but to solve real problems. Our innovation is always guided by one question: How does this help our clients make better, faster decisions?',
    icon: Lightbulb,
    color: 'text-neutral-600',
    bgColor: 'bg-neutral-100',
  },
  {
    title: 'Client Empowerment',
    description:
      'We measure our success by our clients\' success. Every feature, every update, and every interaction is designed to give businesses the confidence and clarity they need to seize opportunities and mitigate risks effectively.',
    icon: Users,
    color: 'text-neutral-600',
    bgColor: 'bg-neutral-100',
  },
  {
    title: 'Confidentiality & Trust',
    description:
      'Our clients\' trust is our most valuable asset. We maintain the highest standards of data security and confidentiality, ensuring that sensitive business information is protected with unwavering diligence.',
    icon: Lock,
    color: 'text-neutral-600',
    bgColor: 'bg-neutral-100',
  },
  {
    title: 'Continuous Excellence',
    description:
      'The financial landscape evolves constantly, and so do we. We\'re committed to continuous learning, improvement, and adaptation—ensuring our platform stays ahead of market needs and delivers exceptional value every day.',
    icon: TrendingUp,
    color: 'text-neutral-600',
    bgColor: 'bg-neutral-100',
  },
]

function ValueCard({ value }: { value: typeof VALUES[0] }) {
  const Icon = value.icon
  return (
    <div className="bg-white rounded-2xl md:rounded-3xl p-24 md:p-32 shadow-sm border border-neutral-100 min-w-[280px] md:min-w-[380px] max-w-[380px] flex-shrink-0">
      <div className="flex items-center gap-12 mb-16">
        <div className={`w-48 h-48 ${value.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-24 h-24 ${value.color}`} />
        </div>
        <Heading as="h3" size="sm">
          {value.title}
        </Heading>
      </div>
      <p className="text-neutral-600 leading-relaxed text-xs sm:text-sm md:text-base">
        {value.description}
      </p>
    </div>
  )
}

function ValuesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, VIEWPORT_CONFIG)
  const [showAll, setShowAll] = useState(false)

  // Triple the values for seamless loop
  const duplicatedValues = [...VALUES, ...VALUES, ...VALUES]

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: DURATION.normal, ease: EASING }}
      >
        <Heading as="h2" align="center" className="mb-24 md:mb-32">
          The values that drive everything we do
        </Heading>
      </motion.div>

      {/* Desktop: Marquee animation - breaks out of container */}
      <div className="hidden md:block overflow-hidden -mx-64 lg:-mx-[calc(50vw-50%)] px-0 group">
        <div
          className="flex gap-24 pl-64 lg:pl-[calc(50vw-50%)] animate-marquee group-hover:[animation-play-state:paused]"
          style={{ width: 'fit-content' }}
        >
          {duplicatedValues.map((value, index) => (
            <ValueCard key={`${value.title}-${index}`} value={value} />
          ))}
        </div>
      </div>

      {/* Mobile: Grid with View More */}
      <div className="md:hidden">
        <div className="flex flex-col items-center gap-16">
          {(showAll ? VALUES : VALUES.slice(0, 3)).map((value) => (
            <ValueCard key={value.title} value={value} />
          ))}
        </div>
        {!showAll && VALUES.length > 3 && (
          <button
            onClick={() => setShowAll(true)}
            className="mt-24 w-full py-12 text-sm font-medium text-primary border border-primary rounded-xl hover:bg-primary/5 transition-colors"
          >
            View More ({VALUES.length - 3} more)
          </button>
        )}
      </div>
    </div>
  )
}

function FoundersSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, VIEWPORT_CONFIG)

  return (
    <div ref={ref}>
      <div className="grid md:grid-cols-2 gap-16 md:gap-24">
        {/* Uday Gatty */}
        <motion.div
          className="bg-white rounded-2xl md:rounded-3xl p-24 md:p-32 shadow-sm border border-neutral-100"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: DURATION.normal, delay: 0.3, ease: EASING }}
        >
          <Heading as="h3" size="sm" className="mb-4">
            Uday Gatty
          </Heading>
          <p className="text-xs sm:text-sm text-neutral-500 mb-12">Co-Founder</p>
          <p className="text-neutral-600 leading-relaxed text-xs sm:text-sm md:text-base">
            Uday brings over 20 years of experience in credit, risk management, and business development across leading banks, NBFCs, and startups including Zetwerk, KredX, Kotak Bank, IndusInd Bank, and Ashv Finance. A Chartered Accountant with a B.B.A. degree, Uday&apos;s deep understanding of both institutional banking practices and startup agility uniquely positions him to lead CredMatrix&apos;s vision of making professional-grade credit intelligence accessible to businesses of all sizes.
          </p>
        </motion.div>

        {/* Raman Kirdolia */}
        <motion.div
          className="bg-white rounded-2xl md:rounded-3xl p-24 md:p-32 shadow-sm border border-neutral-100"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: DURATION.normal, delay: 0.4, ease: EASING }}
        >
          <Heading as="h3" size="sm" className="mb-4">
            Raman Kirdolia
          </Heading>
          <p className="text-xs sm:text-sm text-neutral-500 mb-12">Co-Founder</p>
          <p className="text-neutral-600 leading-relaxed text-xs sm:text-sm md:text-base">
            Raman contributes a decade of specialized expertise in credit risk, portfolio monitoring, and business finance across NBFCs, fintech companies, and B2B platforms including Zetwerk, Udaan, Flexiloans, and Ashv Finance. A Chartered Accountant with a B.Com degree and CFA Level 1 certification, Raman&apos;s background in building and managing credit portfolios for high-growth companies drives CredMatrix&apos;s focus on scalable, technology-driven solutions that address real-world business challenges.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default function AboutPage() {
  const headerRef = useRef(null)
  const missionRef = useRef(null)
  const teamHeaderRef = useRef(null)
  const isHeaderInView = useInView(headerRef, VIEWPORT_CONFIG)
  const isMissionInView = useInView(missionRef, VIEWPORT_CONFIG)
  const isTeamHeaderInView = useInView(teamHeaderRef, VIEWPORT_CONFIG)

  return (
    <>
      {/* About Company */}
      <div className="mx-8 md:mx-32 lg:mx-64 bg-accent-blue rounded-b-[32px] md:rounded-b-[48px]">
        <Section background="white" className="pt-80 pb-32 relative bg-transparent">
          <Container>
            <motion.div
              ref={headerRef}
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: DURATION.normal, ease: EASING }}
            >
              <Heading as="h1" align="center" className="mb-24">
                About CredMatrix
              </Heading>
            </motion.div>
            <motion.div
              className="max-w-4xl mx-auto space-y-16 md:space-y-24"
              initial={{ opacity: 0, y: 30 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: DURATION.normal, delay: 0.2, ease: EASING }}
            >
              <div>
                <Heading as="h3" size="sm" className="mb-12 md:mb-16">
                  We are building the future of credit intelligence
                </Heading>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mb-12">
                  CredMatrix is a cutting-edge SaaS platform revolutionizing counterparty due diligence and credit assessment for modern businesses. We empower organizations to make faster, smarter, and more confident business decisions by delivering institutional-grade credit intelligence that is accessible, affordable, and actionable.
                </p>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mb-12">
                  Traditional credit assessment methods are prohibitively expensive, painfully slow, and often rely on subjective judgment. CredMatrix bridges this gap by combining the expertise of seasoned banking professionals with AI-powered intelligence to deliver comprehensive counterparty assessments in minutes, not days. Our platform provides real-time financial monitoring, industry-specific insights, and early warning alerts—enabling businesses to move with speed while maintaining prudent risk management.
                </p>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                  What sets us apart is our commitment to eliminating the trade-off between cost and quality. Our clients save over 90% compared to traditional methods while gaining access to more comprehensive, accurate, and timely intelligence—delivering enterprise-grade solutions without enterprise-grade price tags.
                </p>
              </div>
            </motion.div>
          </Container>
        </Section>
      </div>

      {/* Mission & Vision */}
      <Section background="grey" size="md">
        <Container>
          <div ref={missionRef} className="grid md:grid-cols-2 gap-16 md:gap-24">
            <motion.div
              className="bg-white rounded-2xl md:rounded-3xl p-24 md:p-32 shadow-sm border border-neutral-100"
              initial={{ opacity: 0, y: 30 }}
              animate={isMissionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: DURATION.normal, ease: EASING }}
            >
              <div className="flex items-center gap-12 mb-12 md:mb-16">
                <div className="w-48 h-48 bg-neutral-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target className="w-24 h-24 text-neutral-600" />
                </div>
                <Heading as="h2" size="md">
                  Our Mission
                </Heading>
              </div>
              <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
                To democratize access to institutional-grade credit intelligence by delivering fast, affordable, and accurate counterparty assessments powered by expert-curated AI insights—enabling businesses of all sizes to make confident, data-driven decisions without compromise.
              </p>
            </motion.div>
            <motion.div
              className="bg-white rounded-2xl md:rounded-3xl p-24 md:p-32 shadow-sm border border-neutral-100"
              initial={{ opacity: 0, y: 30 }}
              animate={isMissionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: DURATION.normal, delay: 0.1, ease: EASING }}
            >
              <div className="flex items-center gap-12 mb-12 md:mb-16">
                <div className="w-48 h-48 bg-neutral-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Rocket className="w-24 h-24 text-neutral-600" />
                </div>
                <Heading as="h2" size="md">
                  Our Vision
                </Heading>
              </div>
              <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
                To transform counterparty due diligence from a costly, time-intensive barrier into a sustainable competitive advantage—creating a world where every business decision is backed by real-time, comprehensive credit intelligence, and where no organization is left vulnerable to preventable financial risks.
              </p>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section background="grey" size="md">
        <Container>
          <ValuesSection />
        </Container>
      </Section>

      {/* Team */}
      <Section background="white" size="md" className="overflow-hidden">
        <Container>
          <motion.div
            ref={teamHeaderRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isTeamHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: DURATION.normal, ease: EASING }}
          >
            <Heading as="h2" align="center" className="mb-24 md:mb-32">
              Meet the team behind CredMatrix
            </Heading>
          </motion.div>
          <FoundersSection />
        </Container>
      </Section>

      <CTA />
    </>
  )
}
