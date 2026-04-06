import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Trophy, Heart, Shield, Users } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Varsity Outdoor Management | Our Story & Values',
  description: 'Learn about Varsity Outdoor Management — our story, our team, and our commitment to championship-level outdoor care. Serving Central Ohio.',
}

const VALUES = [
  {
    icon: Trophy,
    title: 'Championship Standards',
    description: 'We hold ourselves to the same standard athletes use to win championships. Every job, every visit — no exceptions.',
  },
  {
    icon: Heart,
    title: 'We Care',
    description: 'We treat every property like it\'s our own. That means going the extra mile even when no one is watching.',
  },
  {
    icon: Shield,
    title: 'Reliability',
    description: 'We do what we say we\'ll do, when we say we\'ll do it. No surprises, no excuses, no no-shows.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'We\'re a local business that roots for our community. We hire locally, buy locally, and give back whenever we can.',
  },
]

export default function AboutPage() {
  return (
    <div className="bg-dark-bg min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-dark-border">
        {/* Background photo */}
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/images/hero-shirt-house.png"
            alt="Varsity Outdoor Management team member in branded shirt in front of a well-landscaped home"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/65" />
        </div>

        <div className="relative z-10 py-24 md:py-36 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block text-brand-green text-sm font-bold uppercase tracking-widest mb-4">
              About Us
            </span>
            <h1 className="font-condensed text-5xl md:text-7xl font-black uppercase text-white mb-6">
              WE&apos;RE NOT IN THE LAWN BUSINESS.<br />
              <span className="text-brand-green">WE&apos;RE IN THE TRUST BUSINESS.</span>
            </h1>
            <p className="text-gray-300 text-xl leading-relaxed">
              Varsity Outdoor Management was founded with a simple belief: homeowners deserve a lawn care company they can actually rely on. One that shows up, does excellent work, and treats every property with respect.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-condensed text-4xl font-black uppercase text-white mb-6">
                Our <span className="text-brand-green">Story</span>
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  Varsity Outdoor Management started with a pickup truck, a mower, and a commitment to doing things right. While other companies cut corners, we cut grass — with sharp blades, consistent crews, and real communication.
                </p>
                <p>
                  Over the years, we&apos;ve grown into a full-service outdoor management company serving hundreds of properties across Central Ohio. But we haven&apos;t lost sight of what made us great: showing up when we say we will and doing work we&apos;re proud of.
                </p>
                <p>
                  Today, Varsity offers everything from weekly lawn mowing to complete landscape installations, snow removal, irrigation, fertilization, and beyond. One company. One relationship. Complete care.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: '8+', label: 'Years in Business' },
                { number: '500+', label: 'Properties Served' },
                { number: '5.0', label: 'Star Google Rating' },
                { number: '12mo', label: 'Year-Round Service' },
              ].map(({ number, label }) => (
                <div key={label} className="bg-dark-card border border-dark-border rounded-2xl p-6 text-center">
                  <div className="font-condensed text-5xl font-black text-brand-green mb-1">{number}</div>
                  <div className="text-gray-400 text-sm">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-dark-card border-y border-dark-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-condensed text-4xl md:text-5xl font-black uppercase text-white">
              What We <span className="text-brand-green">Stand For</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-dark-bg rounded-xl p-6 border border-dark-border">
                <div className="w-12 h-12 rounded-xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-brand-green" />
                </div>
                <h3 className="font-condensed text-lg font-bold uppercase text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-condensed text-4xl font-black uppercase text-white mb-4">
            Ready to Work with <span className="text-brand-green">a Team You Can Trust?</span>
          </h2>
          <p className="text-gray-400 mb-8">Get your free quote and see the Varsity difference for yourself.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote" className="inline-flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-dark text-black font-black px-8 py-4 rounded-xl transition-colors text-lg uppercase">
              Get a Free Quote <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-dark-border hover:border-brand-green/50 text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg uppercase">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
