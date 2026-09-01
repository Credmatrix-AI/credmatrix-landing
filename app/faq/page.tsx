'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import Heading from '@/components/ui/Heading'
import FAQAccordion from '@/components/shared/FAQAccordion'
import { FAQ_ITEMS } from '@/constants'
import { EASING, DURATION, VIEWPORT_CONFIG } from '@/lib/animations'

export default function FAQPage() {
  const headerRef = useRef(null)
  const faqRef = useRef(null)
  const isHeaderInView = useInView(headerRef, VIEWPORT_CONFIG)
  const isFaqInView = useInView(faqRef, VIEWPORT_CONFIG)

  return (
    <>
      {/* Hero Section with Blue Background */}
      <div className="relative">
        <div className="absolute top-0 left-8 right-8 md:left-32 md:right-32 lg:left-64 lg:right-64 h-[200px] md:h-[240px] bg-accent-blue rounded-b-[32px] md:rounded-b-[48px]"></div>

        <div className="relative pt-80 pb-32">
          <Container>
            <motion.div
              ref={headerRef}
              initial={{ opacity: 0, y: 30 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: DURATION.normal, ease: EASING }}
            >
              <Heading as="h1" align="center">
                Frequently Asked Questions
              </Heading>
              <p className="mt-12 text-center text-base md:text-lg text-neutral-600 max-w-2xl mx-auto">
                What we cover, where our data comes from, and how to get started.
              </p>
            </motion.div>
          </Container>
        </div>
      </div>

      {/* FAQ Section */}
      <Section background="grey" size="lg">
        <Container>
          <div id="faq" ref={faqRef} className="max-w-3xl mx-auto scroll-mt-80">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isFaqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: DURATION.normal, ease: EASING }}
            >
              <FAQAccordion items={FAQ_ITEMS} />
            </motion.div>
          </div>
        </Container>
      </Section>
    </>
  )
}
