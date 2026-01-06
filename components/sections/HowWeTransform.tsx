'use client'

import { Shield, TrendingUp, CheckCircle, PieChart } from 'lucide-react'
import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import Heading from '@/components/ui/Heading'
import FeatureCard from '@/components/shared/FeatureCard'
import AnimateOnScroll from '@/components/shared/AnimateOnScroll'

export default function HowWeTransform() {
  const features = [
      {
      title: 'Credit Analysis',
      description: 'Evaluate credit worthiness with our advanced AI analytics',
      icon: <TrendingUp className="w-24 h-24 md:w-32 md:h-32 text-gray-500" />,
      href: '/solutions#risk-assessment',
    },
     {
      title: 'Compliance',
      description: 'Verify counterparty regulatory standing via automated compliance screening.',
      icon: <CheckCircle className="w-24 h-24 md:w-32 md:h-32 text-gray-500" />,
      href: '/solutions#risk-assessment',
    },
    {
      title: 'Risk Screening',
      description: 'Screen your potential counter-party for comprehensive risk assessment',
      icon: <Shield className="w-24 h-24 md:w-32 md:h-32 text-gray-500" />,
      href: '/solutions#risk-assessment',
    },
    {
      title: 'Portfolio',
      description: 'Monitor your entire portfolio in real-time',
      icon: <PieChart className="w-24 h-24 md:w-32 md:h-32 text-gray-500" />,
      href: '/solutions#portfolio-monitoring',
    },
  ]

  return (
    <Section background="blue">
      <Container>
        <AnimateOnScroll animation="fadeUp">
          <Heading as="h2" align="center" className="mb-32 md:mb-48">
            See How We Transform Credit Risk
          </Heading>
        </AnimateOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-24">
          {features.map((feature, index) => (
            <AnimateOnScroll key={index} animation="fadeUp" delay={index * 100}>
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                variant="default"
                href={feature.href}
                linkText="See More"
              />
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </Section>
  )
}
