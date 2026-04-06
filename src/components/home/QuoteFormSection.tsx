import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Check } from 'lucide-react'

const INCLUDED = [
  'Free on-site assessment',
  'Custom pricing for your property',
  'No obligation, no pressure',
  'Response within 24 hours',
]

export function QuoteFormSection() {
  return (
    <section className="py-20 md:py-28 bg-dark-bg" id="quote">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-dark-card border border-dark-border">
          {/* Background photo — branded truck in action */}
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src="/images/hero-truck-action.jpg"
              alt="Varsity branded truck and operator on riding mower at a premium home"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/60" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 p-8 md:p-12 lg:p-16 items-center">
            {/* Left: Content */}
            <div>
              <span className="inline-block text-brand-green text-sm font-bold uppercase tracking-widest mb-4">
                Free Estimate
              </span>
              <h2 className="font-condensed text-4xl md:text-6xl font-black uppercase text-white leading-none mb-6">
                READY TO GET{' '}
                <span className="text-brand-green">STARTED?</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Tell us about your property and the services you need. We&apos;ll put together a custom quote — no pressure, no obligation, just a clear picture of what your outdoor space can look like.
              </p>
              <ul className="space-y-3 mb-8">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-green/20 border border-brand-green/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-brand-green" />
                    </div>
                    <span className="text-gray-300 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-500 text-sm">
                Questions?{' '}
                <Link href="/contact" className="text-brand-green hover:underline font-semibold">
                  Contact us directly
                </Link>
              </p>
            </div>

            {/* Right: CTA Card */}
            <div className="bg-dark-bg border border-dark-border rounded-2xl p-8 shadow-2xl">
              <h3 className="font-condensed text-2xl font-bold uppercase text-white mb-2">
                Get Your Free Quote
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                3-minute form. We&apos;ll follow up within 24 hours.
              </p>

              {/* Service Quick Select */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                {['Lawn Mowing', 'Landscaping', 'Snow Removal', 'More Services'].map((service) => (
                  <Link
                    key={service}
                    href="/quote"
                    className="flex items-center justify-center text-center text-sm font-semibold text-gray-300 bg-dark-card hover:bg-dark-muted/50 border border-dark-border hover:border-brand-green/30 rounded-xl py-3 px-3 transition-all duration-200 hover:text-white"
                  >
                    {service}
                  </Link>
                ))}
              </div>

              <Link
                href="/quote"
                className="flex items-center justify-center gap-2 w-full bg-brand-green hover:bg-brand-green-dark text-black font-black text-lg uppercase py-5 px-6 rounded-xl transition-colors shadow-lg shadow-brand-green/20 group min-h-[60px]"
              >
                Start My Free Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <p className="text-center text-gray-500 text-xs mt-4">
                No credit card required. No spam. Ever.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
