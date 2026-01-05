'use client'

import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import Heading from '@/components/ui/Heading'
import Card from '@/components/ui/Card'
import AnimateOnScroll from '@/components/shared/AnimateOnScroll'

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        'CredMatrix has transformed how we assess credit risk. The platform is intuitive and the insights are actionable.',
      author: 'John Doe',
      position: 'CFO, Tech Corp',
    },
    {
      quote:
        'The speed and accuracy of the reports have helped us make better lending decisions and reduce defaults.',
      author: 'Jane Smith',
      position: 'Risk Manager, Finance Co',
    },
  ]

  return (
    <Section background="white">
      <Container>
        <AnimateOnScroll animation="fadeUp">
          <Heading as="h2" align="center" className="mb-32 md:mb-48">
            Voices from the customers
          </Heading>
        </AnimateOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <AnimateOnScroll key={index} animation={index === 0 ? 'fadeLeft' : 'fadeRight'} delay={index * 150}>
              <Card variant="default" className="h-full hover:shadow-lg transition-shadow duration-300">
                <p className="text-sm sm:text-base text-neutral-700 mb-16 md:mb-24 italic">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div>
                  <p className="text-sm sm:text-base font-semibold text-neutral-900">
                    {testimonial.author}
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-600">{testimonial.position}</p>
                </div>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </Section>
  )
}
