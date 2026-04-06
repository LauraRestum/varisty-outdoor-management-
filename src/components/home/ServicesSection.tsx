import Link from 'next/link'
import { ArrowRight, Scissors, Trees, Snowflake, Droplets, TreePine, Building2, Leaf, Sparkles } from 'lucide-react'

const SERVICES = [
  {
    icon: Scissors,
    title: 'Lawn Mowing',
    description: 'Precision cuts with sharp blades every time. Weekly, bi-weekly, or custom schedule.',
    href: '/services/lawn-mowing',
    featured: true,
  },
  {
    icon: Trees,
    title: 'Landscaping',
    description: 'Full design and installation of beds, borders, plants, and hardscape features.',
    href: '/services/landscaping',
  },
  {
    icon: Snowflake,
    title: 'Snow Removal',
    description: 'Never get stuck again. 24/7 winter coverage with plowing, salting, and ice management.',
    href: '/services/snow-removal',
  },
  {
    icon: Droplets,
    title: 'Irrigation',
    description: 'Smart system installation, repair, and seasonal startup/winterization.',
    href: '/services/irrigation',
  },
  {
    icon: TreePine,
    title: 'Tree & Shrub Care',
    description: 'Pruning, trimming, and health treatments to keep your trees and shrubs thriving.',
    href: '/services/tree-shrub-care',
  },
  {
    icon: Building2,
    title: 'Hardscaping',
    description: 'Patios, walkways, retaining walls, and outdoor living spaces built to last.',
    href: '/services/hardscaping',
  },
  {
    icon: Leaf,
    title: 'Fertilization',
    description: 'Customized nutrient programs for a thick, green, weed-free lawn all season.',
    href: '/services/fertilization',
  },
  {
    icon: Sparkles,
    title: 'Seasonal Cleanup',
    description: 'Spring and fall cleanups including leaf removal, bed prep, and debris hauling.',
    href: '/services/seasonal-cleanup',
  },
]

export function ServicesSection() {
  return (
    <section className="py-20 md:py-28 bg-dark-bg" id="services">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-brand-green text-sm font-bold uppercase tracking-widest mb-3">
            What We Do
          </span>
          <h2 className="font-condensed text-4xl md:text-6xl font-black uppercase text-white mb-4">
            Full-Service Outdoor<br />
            <span className="text-brand-green">Management</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From routine lawn care to complete landscape transformations — we handle everything outdoors so you don&apos;t have to.
          </p>
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {SERVICES.map((service) => {
            const Icon = service.icon
            return (
              <Link
                key={service.href}
                href={service.href}
                className={`group relative block p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                  service.featured
                    ? 'border-brand-green bg-brand-green/5 hover:bg-brand-green/10 shadow-lg shadow-brand-green/10'
                    : 'border-dark-border bg-dark-card hover:border-brand-green/50 hover:bg-dark-muted/20'
                }`}
              >
                {service.featured && (
                  <span className="absolute top-4 right-4 text-xs bg-brand-green text-black font-bold px-2 py-0.5 rounded-full">
                    #1 Service
                  </span>
                )}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all ${
                    service.featured
                      ? 'bg-brand-green/20 text-brand-green'
                      : 'bg-dark-muted/50 text-gray-400 group-hover:bg-brand-green/20 group-hover:text-brand-green'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3
                  className={`font-condensed text-lg font-bold uppercase mb-2 group-hover:text-brand-green transition-colors ${
                    service.featured ? 'text-white' : 'text-white'
                  }`}
                >
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{service.description}</p>
                <span className="inline-flex items-center gap-1 text-brand-green text-sm font-semibold group-hover:gap-2 transition-all">
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 border-2 border-dark-border hover:border-brand-green/50 text-white hover:text-brand-green font-bold px-8 py-4 rounded-xl transition-all duration-200 uppercase text-sm tracking-wide"
          >
            View All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
