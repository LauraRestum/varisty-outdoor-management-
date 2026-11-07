import type { Metadata } from 'next'
import { PageHero, QuoteCta, ValueIcons, BrokerBand, PreBookBand } from '@/components/site/Blocks'
import { ServiceCard } from '@/components/site/ServiceCard'
import { SERVICES } from '@/lib/services'

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Fall cleanup, 2027 Spring Refresh pre-booking, lawn care, shrub trimming, mulching, storm cleanup, and guest-ready visits in Wichita from Varsity Outdoor Services.',
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title={
          <>
            Complete outdoor
            <br />
            solutions.
          </>
        }
        lead="Fall cleanups are booking now, and so is the 2027 season. One point of contact for everything outside your home."
        image="/images/photos/home-lawn.jpg"
      />

      <section className="bg-cream">
        <div className="container-site py-16 md:py-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
          <BrokerBand />
        </div>
      </section>

      <PreBookBand />
      <ValueIcons />
      <QuoteCta />
    </>
  )
}
