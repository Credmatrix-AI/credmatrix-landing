import Hero from '@/components/sections/Hero'
import HowWeTransform from '@/components/sections/HowWeTransform'
import ProblemsSection from '@/components/sections/ProblemsSection'
import IntelligentPlatform from '@/components/sections/IntelligentPlatform'
import CTA from '@/components/sections/CTA'
import Testimonials from '@/components/sections/Testimonials'

export default function Home() {
  return (
    <>
      <Hero />
         

   <ProblemsSection />
      <IntelligentPlatform />
            <HowWeTransform />
      <CTA />
      {/* <Testimonials /> */}
    </>
  )
}
