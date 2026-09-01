import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import HowWeTransform from '@/components/sections/HowWeTransform'
import ProblemsSection from '@/components/sections/ProblemsSection'
import IntelligentPlatform from '@/components/sections/IntelligentPlatform'
import Testimonials from '@/components/sections/Testimonials'

export const metadata: Metadata = {
  title: { absolute: 'CredMatrix - Financial Due Diligence, Made Simple' },
  description:
    'Instant, affordable credit and risk checks on any Indian company.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'CredMatrix - Financial Due Diligence, Made Simple',
    description:
      'Instant, affordable credit and risk checks on any Indian company.',
    type: 'website',
    url: '/',
  },
}

export default function Home() {
  return (
    <>
      <Hero />
         

   <ProblemsSection />
      <IntelligentPlatform />
            <HowWeTransform />
      {/* <Testimonials /> */}
    </>
  )
}
