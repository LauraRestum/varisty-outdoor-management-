import Link from 'next/link'
import { ArrowRight, Check, Trees } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Landscaping Design & Installation | Varsity Outdoor Management',
  description: 'Full-service landscaping from design through installation. Plant beds, mulching, shrubs, and seasonal color. Central Ohio landscaping pros.',
}

const FEATURES = [
  'Custom landscape design consultation',
  'Native and ornamental plant selection',
  'Full bed installation and edging',
  'Mulching with quality hardwood mulch',
  'Drainage solutions for wet areas',
  'Seasonal color rotation available',
  'Ongoing landscape maintenance plans',
]

export default function LandscapingPage() {
  return (
    <div className="bg-dark-bg min-h-screen">
      <section className="py-20 md:py-28 bg-dark-card border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Link href="/services" className="text-gray-500 hover:text-white text-sm transition-colors">Services</Link>
            <span className="text-gray-600">/</span>
            <span className="text-brand-green text-sm font-semibold">Landscaping</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-brand-green/20 border border-brand-green/30 flex items-center justify-center mb-6">
                <Trees className="w-8 h-8 text-brand-green" />
              </div>
              <h1 className="font-condensed text-5xl md:text-6xl font-black uppercase text-white mb-4">
                LANDSCAPES THAT <span className="text-brand-green">WOW</span>
              </h1>
              <p className="text-gray-400 text-xl leading-relaxed mb-8">
                From a simple bed refresh to a complete property transformation, our landscaping team brings your vision to life with quality plants, expert installation, and lasting results.
              </p>
              <Link href="/quote" className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-black font-black px-8 py-4 rounded-xl transition-colors text-lg uppercase">
                Get Your Free Quote <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="bg-dark-bg rounded-2xl border border-dark-border p-6">
              <h3 className="font-condensed text-lg font-bold uppercase text-brand-green mb-4">What&apos;s Included</h3>
              <ul className="space-y-3">
                {FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-green/20 border border-brand-green/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-brand-green" />
                    </div>
                    <span className="text-gray-300 text-sm">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-dark-card border-t border-dark-border">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-condensed text-4xl font-black uppercase text-white mb-4">
            Let&apos;s Design Your <span className="text-brand-green">Dream Yard</span>
          </h2>
          <p className="text-gray-400 mb-8">Tell us about your property and we&apos;ll put together a custom landscaping proposal.</p>
          <Link href="/quote" className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-black font-black px-10 py-5 rounded-xl transition-colors text-xl uppercase">
            Start My Free Quote <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  )
}
