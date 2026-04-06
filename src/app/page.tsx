import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/home/HeroSection'
import { ServicesSection } from '@/components/home/ServicesSection'
import { WhyVarsitySection } from '@/components/home/WhyVarsitySection'
import { BeforeAfterSection } from '@/components/home/BeforeAfterSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { QuoteFormSection } from '@/components/home/QuoteFormSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Varsity Outdoor Management | Professional Lawn & Landscape Services',
  description:
    'Championship-level lawn care, landscaping, snow removal, and outdoor management. Serving Central Ohio with precision and professionalism. Get your free quote today.',
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <WhyVarsitySection />
      <BeforeAfterSection />
      <TestimonialsSection />
      <QuoteFormSection />
      <Footer />
    </>
  )
}
