import type { Metadata } from 'next'
import { PageHero, QuoteCta, ValueIcons } from '@/components/site/Blocks'
import { ServiceCard } from '@/components/site/ServiceCard'
import { SERVICES } from '@/lib/services'

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Lawn care, landscaping, tree and shrub care, snow removal, clean ups, hardscaping, fertilization and irrigation from Varsity Outdoor Services.',
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
        lead="From routine maintenance to full property care, we keep your outdoor spaces looking their best."
        image="/images/photos/home-lawn.jpg"
      />

      <section className="bg-cream">
        <div className="container-site py-16 md:py-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      <ValueIcons />
      <QuoteCta />
    </>
  )
}
