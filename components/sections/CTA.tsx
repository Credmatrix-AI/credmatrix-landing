'use client'

import { ArrowRight, Sparkles } from 'lucide-react'
import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import Heading from '@/components/ui/Heading'
import Button from '@/components/ui/Button'
import AnimateOnScroll from '@/components/shared/AnimateOnScroll'

export default function CTA() {
  return (
    <Section background="grey">
      <Container>
        <AnimateOnScroll animation="fadeUp" className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl md:rounded-3xl p-24 md:p-32 shadow-sm border border-neutral-100 text-center">
            <div className="flex justify-center mb-16 md:mb-24">
              <Sparkles className="w-32 h-32 md:w-40 md:h-40 text-primary animate-pulse-slow" />
            </div>
            <Heading as="h2" align="center" className="mb-16 md:mb-24">
              Generate your first report for free
            </Heading>
            <p className="text-sm sm:text-base md:text-lg text-neutral-600 mb-24 md:mb-32">
              We replace guesswork with quantifiable certainty. Our AI-powered platform
              embeds intelligence, precision, and security directly into your assessment
              process.
            </p>
            <a href="https://app.credmatrix.ai/" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="sm" className="hover:scale-105 transition-transform">
                Get Started <ArrowRight className="w-16 h-16 md:w-20 md:h-20 ml-4 md:ml-8" />
              </Button>
            </a>
          </div>
        </AnimateOnScroll>
      </Container>
    </Section>
  )
}
