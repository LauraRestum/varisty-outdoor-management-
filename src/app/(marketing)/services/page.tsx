import Link from 'next/link'
import { ArrowRight, Scissors, Trees, Snowflake, Droplets, TreePine, Building2, Leaf, Sparkles } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Services | Complete Outdoor Management',
  description:
    'Lawn mowing, landscaping, snow removal, irrigation, tree care, hardscaping, fertilization, and seasonal cleanup. Full-service outdoor management in Central Ohio.',
}

const SERVICES = [
  {
    icon: Scissors,
    title: 'Lawn Mowing',
    href: '/services/lawn-mowing',
    description:
      'Professional mowing, edging, trimming, and blowing on your schedule. Consistent crew, consistent results, every single visit.',
    features: ['Sharp blade cuts every visit', 'Edging & string trimming', 'Clipping cleanup & blow-off', 'Weekly or bi-weekly plans'],
    ideal: 'Residential & commercial properties of all sizes',
  },
  {
    icon: Trees,
    title: 'Landscaping',
    href: '/services/landscaping',
    description:
      'From concept to completion — design, planting, bed installation, and ongoing care for stunning curb appeal.',
    features: ['Custom landscape design', 'Plant selection & installation', 'Mulching & bed edging', 'Seasonal plantings'],
    ideal: 'New builds, renovations, and property refreshes',
  },
  {
    icon: Snowflake,
    title: 'Snow Removal',
    href: '/services/snow-removal',
    description:
      'Never worry about winter again. Driveways, walks, and parking lots cleared quickly with plowing, salting, and de-icing.',
    features: ['24/7 winter monitoring', 'Priority 4-hour SLA available', 'Plowing & salting', 'Sidewalk & stair clearing'],
    ideal: 'Residential driveways & commercial lots',
  },
  {
    icon: Droplets,
    title: 'Irrigation',
    href: '/services/irrigation',
    description:
      'Smart irrigation systems that save water and keep your lawn green. Installation, repair, and seasonal startup/shutdown.',
    features: ['System design & installation', 'Spring startup & fall winterization', 'Smart controller upgrades', 'Leak detection & repair'],
    ideal: 'Properties with established lawns and landscaping',
  },
  {
    icon: TreePine,
    title: 'Tree & Shrub Care',
    href: '/services/tree-shrub-care',
    description:
      'Expert pruning, trimming, and health treatments to keep your trees and shrubs looking their best and living longer.',
    features: ['Structural pruning', 'Seasonal trimming', 'Disease & pest treatment', 'Deep root fertilization'],
    ideal: 'Properties with mature trees and ornamental shrubs',
  },
  {
    icon: Building2,
    title: 'Hardscaping',
    href: '/services/hardscaping',
    description:
      'Transform your outdoor space with patios, walkways, retaining walls, and outdoor living features built to last decades.',
    features: ['Paver patios & walkways', 'Retaining walls', 'Fire pit installation', 'Outdoor kitchen prep'],
    ideal: 'Homeowners looking to enhance outdoor living',
  },
  {
    icon: Leaf,
    title: 'Fertilization',
    href: '/services/fertilization',
    description:
      'A thick, green, weed-free lawn starts with proper nutrition. Our customized programs feed your turf all season long.',
    features: ['Soil testing & analysis', '6-step annual program', 'Weed control included', 'Organic options available'],
    ideal: 'Any lawn wanting to reach its full potential',
  },
  {
    icon: Sparkles,
    title: 'Seasonal Cleanup',
    href: '/services/seasonal-cleanup',
    description:
      'Spring and fall cleanups that prep your property for the season ahead — leaf removal, bed prep, and debris hauling.',
    features: ['Complete leaf removal', 'Bed clearing & prep', 'Debris hauling', 'Gutters available'],
    ideal: 'All properties before and after peak seasons',
  },
]

export default function ServicesPage() {
  return (
    <div className="bg-dark-bg min-h-screen">
      {/* Hero */}
      <section className="py-20 md:py-28 border-b border-dark-border bg-dark-card">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <span className="inline-block text-brand-green text-sm font-bold uppercase tracking-widest mb-4">
            All Services
          </span>
          <h1 className="font-condensed text-5xl md:text-7xl font-black uppercase text-white mb-6">
            EVERYTHING YOUR <span className="text-brand-green">PROPERTY</span> NEEDS
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-8">
            One company, one call, complete outdoor management from spring through winter.
          </p>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-black font-black px-8 py-4 rounded-xl transition-colors text-lg uppercase"
          >
            Get a Free Quote <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES.map((service) => {
              const Icon = service.icon
              return (
                <div
                  key={service.href}
                  className="bg-dark-card border border-dark-border rounded-2xl p-7 hover:border-brand-green/30 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-green/20 transition-colors">
                      <Icon className="w-7 h-7 text-brand-green" />
                    </div>
                    <div className="flex-1">
                      <h2 className="font-condensed text-2xl font-bold uppercase text-white mb-2 group-hover:text-brand-green transition-colors">
                        {service.title}
                      </h2>
                      <p className="text-gray-400 leading-relaxed mb-4">{service.description}</p>

                      <ul className="space-y-1.5 mb-5">
                        {service.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-green flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>

                      <p className="text-xs text-gray-500 mb-4">
                        <span className="text-gray-400 font-semibold">Ideal for:</span>{' '}
                        {service.ideal}
                      </p>

                      <Link
                        href={service.href}
                        className="inline-flex items-center gap-2 text-brand-green font-bold text-sm hover:gap-3 transition-all"
                      >
                        Learn More <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-dark-card border-t border-dark-border">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-condensed text-4xl md:text-5xl font-black uppercase text-white mb-4">
            Not Sure What You Need?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Fill out our quick quote form and we&apos;ll recommend the right services for your property.
          </p>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-black font-black px-10 py-5 rounded-xl transition-colors text-xl uppercase"
          >
            Get My Free Quote <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  )
}
