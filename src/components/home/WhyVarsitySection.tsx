import Image from 'next/image'
import { Shield, Clock, Smartphone, Star, Users, Leaf } from 'lucide-react'

const DIFFERENTIATORS = [
  {
    icon: Shield,
    title: 'Fully Insured',
    stat: '$2M+',
    statLabel: 'Coverage',
    description:
      'Comprehensive liability and workers&apos; comp insurance protects you on every visit. No corners cut.',
  },
  {
    icon: Clock,
    title: 'On-Time Guarantee',
    stat: '98%',
    statLabel: 'On-Time Rate',
    description:
      'We show up when we say we will, every time. No more waiting around or rescheduled no-shows.',
  },
  {
    icon: Smartphone,
    title: 'Real-Time Updates',
    stat: '24/7',
    statLabel: 'Tracking',
    description:
      'Job notifications, before/after photos, and invoice management — all from your phone.',
  },
  {
    icon: Star,
    title: 'Five-Star Quality',
    stat: '5.0',
    statLabel: '120+ Reviews',
    description:
      'Our standards are non-negotiable. Every job is inspected before we consider it done.',
  },
  {
    icon: Users,
    title: 'Dedicated Crew',
    stat: 'Same',
    statLabel: 'Crew Every Time',
    description:
      'You&apos;ll recognize the faces at your property. Consistent teams mean consistent results.',
  },
  {
    icon: Leaf,
    title: 'Eco-Conscious',
    stat: '100%',
    statLabel: 'Responsible',
    description:
      'Electric equipment options, organic fertilizers, and responsible chemical practices available.',
  },
]

export function WhyVarsitySection() {
  return (
    <section className="py-20 md:py-28 bg-dark-card border-y border-dark-border" id="why-varsity">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header: 2-col on desktop — text left, brand photo right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
          <div>
            <span className="inline-block text-brand-green text-sm font-bold uppercase tracking-widest mb-3">
              Why Choose Us
            </span>
            <h2 className="font-condensed text-4xl md:text-6xl font-black uppercase text-white leading-none">
              WE&apos;RE NOT YOUR{' '}
              <span className="text-brand-green">AVERAGE</span>{' '}
              LAWN GUY
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mt-6">
              Varsity Outdoor Management was built on the idea that professional landscaping should
              be exactly that — professional. From our communication to our cut quality, we operate
              like a championship team.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-dark-muted border-2 border-dark-card flex items-center justify-center text-xs font-bold text-brand-green"
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex text-brand-green text-sm mb-0.5">
                  {'★★★★★'}
                </div>
                <p className="text-gray-400 text-sm">
                  Trusted by <strong className="text-white">500+</strong> homeowners
                </p>
              </div>
            </div>
          </div>

          {/* Brand photo — lawn sign on perfectly mowed lawn */}
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-dark-border">
            <Image
              src="/images/yard-sign.png"
              alt="Varsity Outdoor Management yard sign planted in perfectly mowing-striped lawn"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Differentiator Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {DIFFERENTIATORS.map(({ icon: Icon, title, stat, statLabel, description }) => (
            <div
              key={title}
              className="bg-dark-bg rounded-xl p-6 border border-dark-border hover:border-brand-green/30 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-green/20 transition-colors">
                  <Icon className="w-6 h-6 text-brand-green" />
                </div>
                <div>
                  <div className="font-condensed text-3xl font-black text-brand-green leading-none">
                    {stat}
                  </div>
                  <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide">
                    {statLabel}
                  </div>
                </div>
              </div>
              <h3 className="font-condensed text-lg font-bold uppercase text-white mb-2 group-hover:text-brand-green transition-colors">
                {title}
              </h3>
              <p
                className="text-gray-400 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
