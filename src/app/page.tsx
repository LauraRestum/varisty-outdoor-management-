import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ServiceIconStrip, WinningTeamBanner, QuoteCta, SectionHeading } from '@/components/site/Blocks'
import { ServiceCard } from '@/components/site/ServiceCard'
import { SERVICES } from '@/lib/services'
import { GALLERY } from '@/lib/gallery'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: `${SITE.name} | Professional Outdoor Services in ${SITE.city}`,
}

const HERO_SERVICES = ['Lawn Care', 'Landscaping', 'Tree & Shrub Care', 'Snow Removal', 'Clean Ups']

const WHY = [
  'Locally owned and operated',
  'Consistent crew on your property',
  'Clear communication and scheduling',
  'Fully insured for your protection',
]

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-forest-dark text-white">
          <Image
            src="/images/photos/hero-mower.jpg"
            alt="Lawn mower on a freshly cut lawn"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[70%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-dark/90 via-forest-dark/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-forest/80 to-transparent" />
          <div className="relative container-site pt-24 pb-28 md:pt-36 md:pb-40">
            <h1 className="heading-xl max-w-2xl drop-shadow-sm">
              Professional
              <br />
              Outdoor Services
              <br />
              For a Higher Standard.
            </h1>
            <p className="mt-6 max-w-2xl text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-white/90 leading-loose">
              {HERO_SERVICES.map((s, i) => (
                <span key={s}>
                  {s}
                  {i < HERO_SERVICES.length - 1 && <span className="mx-2 text-gold">|</span>}
                </span>
              ))}
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="btn-gold">
                Get a Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/services" className="btn-outline-light">
                Our Services
              </Link>
            </div>
          </div>
        </section>

        <ServiceIconStrip />

        {/* Intro */}
        <section className="bg-cream">
          <div className="container-site py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <SectionHeading
                eyebrow="About Us"
                title={<>Built on hard work and a higher standard.</>}
                lead={`${SITE.name} is a locally owned and operated outdoor service company committed to quality work, reliable service and great looking properties across ${SITE.city}.`}
              />
              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {WHY.map((w) => (
                  <li key={w} className="flex items-start gap-3 text-sm text-charcoal/85">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-forest text-white flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3" />
                    </span>
                    {w}
                  </li>
                ))}
              </ul>
              <Link href="/about" className="btn-gold mt-9">
                Our Story <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] overflow-hidden shadow-2xl">
                <Image
                  src="/images/photos/home-lawn.jpg"
                  alt="Modern home with a manicured lawn"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="hidden sm:block absolute -bottom-6 -left-6 bg-forest text-white px-7 py-6 shadow-xl">
                <p className="font-display text-4xl font-bold text-gold leading-none">100%</p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em]">Satisfaction Focused</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="bg-white border-y border-sand/50">
          <div className="container-site py-20 md:py-28">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <SectionHeading
                eyebrow="Our Services"
                title="Complete outdoor solutions."
                lead="From routine maintenance to full property care, we keep your outdoor spaces looking their best."
              />
              <Link href="/services" className="link-arrow flex-shrink-0">
                View all services <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.slice(0, 6).map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          </div>
        </section>

        <WinningTeamBanner />

        {/* Gallery preview */}
        <section className="bg-cream">
          <div className="container-site py-20 md:py-28">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
              <SectionHeading
                eyebrow="Our Work"
                title="Real results."
                lead="Take a look at some of our recent projects and see the difference professional outdoor services can make."
              />
              <Link href="/gallery" className="link-arrow flex-shrink-0">
                View gallery <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
              {GALLERY.slice(0, 6).map((g) => (
                <div key={g.src} className="relative aspect-[4/3] overflow-hidden group">
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <QuoteCta />
      </main>
      <Footer />
    </>
  )
}
