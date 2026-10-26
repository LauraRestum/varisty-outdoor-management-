import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Trophy, Heart, Shield, Users } from 'lucide-react'
import type { Metadata } from 'next'
import { ValueIcons, WinningTeamBanner, QuoteCta } from '@/components/site/Blocks'
import { Badge } from '@/components/site/Logo'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About Us',
  description: `${SITE.name} is a locally owned and operated outdoor service company in ${SITE.city}, committed to quality work and reliable service.`,
}

const VALUES = [
  {
    icon: Trophy,
    title: 'A Higher Standard',
    description: 'Every job, every visit, done the right way. We hold our work to the standard we would want at our own homes.',
  },
  {
    icon: Heart,
    title: 'We Care',
    description: 'We treat every property like it is our own, and go the extra mile even when no one is watching.',
  },
  {
    icon: Shield,
    title: 'Reliability',
    description: 'We do what we say we will do, when we say we will do it. No surprises and no no-shows.',
  },
  {
    icon: Users,
    title: 'Community',
    description: `We are a local business that roots for ${SITE.city.split(',')[0]}. We hire locally and give back whenever we can.`,
  },
]

export default function AboutPage() {
  return (
    <>
      <section className="bg-cream">
        <div className="container-site grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-16 md:py-24">
          <div>
            <p className="eyebrow text-olive mb-4">About Us</p>
            <h1 className="heading-xl text-forest">
              Built on
              <br />
              hard work
              <br />
              and a higher
              <br />
              standard.
            </h1>
            <p className="mt-6 text-charcoal/75 leading-relaxed max-w-lg">
              {SITE.name} is a locally owned and operated outdoor service company committed to quality work,
              reliable service and great looking properties.
            </p>
            <Link href="#story" className="btn-gold mt-8">
              Our Story <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] overflow-hidden shadow-2xl">
            <Image
              src="/images/photos/brick-home.jpg"
              alt="Well maintained home and lawn"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <ValueIcons />

      <section id="story" className="bg-white scroll-mt-28">
        <div className="container-site py-20 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4 flex justify-center">
            <Badge className="w-56 h-56 md:w-72 md:h-72" />
          </div>
          <div className="lg:col-span-8">
            <p className="eyebrow text-olive mb-3">Our Story</p>
            <h2 className="heading-lg text-forest">Go with the winning team.</h2>
            <div className="mt-6 space-y-4 text-charcoal/80 leading-relaxed">
              <p>
                Varsity started with a simple idea: homeowners and businesses deserve outdoor services they can count on.
                Crews that show up when they say they will, do the job right, and leave every property looking sharp.
              </p>
              <p>
                Like any good team, we win through preparation, consistency and pride in the details. That is the
                standard we bring to every lawn, bed and walkway we touch across {SITE.city}.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream border-t border-sand/60">
        <div className="container-site py-20 md:py-24">
          <p className="eyebrow text-olive mb-3">What We Stand For</p>
          <h2 className="heading-lg text-forest mb-12">Our values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-white border border-sand/60 p-7 border-t-4 border-t-forest">
                <Icon strokeWidth={1.5} className="w-8 h-8 text-gold" />
                <h3 className="mt-5 font-display text-xl font-bold uppercase tracking-[0.06em] text-forest">{title}</h3>
                <p className="mt-2 text-sm text-charcoal/70 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WinningTeamBanner image="/images/photos/garden-path.jpg" />
      <QuoteCta />
    </>
  )
}
