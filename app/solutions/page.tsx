'use client'

import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import Heading from '@/components/ui/Heading'
import ProductShowcase from '@/components/sections/ProductShowcase'
import CTA from '@/components/sections/CTA'
import AnimateOnScroll from '@/components/shared/AnimateOnScroll'
import { PRODUCT_SECTIONS } from '@/constants'

export default function SolutionsPage() {
  return (
    <>
      <div className="relative">
        {/* Blue background */}
        <div className="absolute top-0 left-8 right-8 md:left-32 md:right-32 lg:left-64 lg:right-64 h-[200px] md:h-[240px] bg-accent-blue rounded-b-[32px] md:rounded-b-[48px]"></div>

        <Section background="white" className="pt-80 relative bg-transparent">
          <Container>
            <AnimateOnScroll animation="fadeUp" className="text-center mb-64">
              <Heading as="h1" align="center" className="mb-24">
                Meet the Definitive Risk Assessment Platform
              </Heading>
            </AnimateOnScroll>
          </Container>
        </Section>
      </div>

      {PRODUCT_SECTIONS.map((section, index) => (
        <ProductShowcase key={index} section={section} index={index} />
      ))}

      <CTA />
    </>
  )
}
