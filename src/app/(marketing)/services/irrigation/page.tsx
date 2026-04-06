import Link from 'next/link'
import { ArrowRight, Check, Droplets } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Irrigation System Installation & Repair | Varsity Outdoor',
  description: 'Smart sprinkler system installation, repair, spring startup, and fall winterization. Save water, save money, keep your lawn green.',
}

const FEATURES = [
  'Custom system design for your property layout',
  'Quality Hunter or Rainbird equipment',
  'Smart controller installation (Wi-Fi enabled)',
  'Spring startup & backflow testing',
  'Fall blowout & winterization',
  'Leak detection and head repair',
  'Water-saving zone optimization',
]

export default function IrrigationPage() {
  return (
    <div className="bg-dark-bg min-h-screen">
      <section className="py-20 md:py-28 bg-dark-card border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Link href="/services" className="text-gray-500 hover:text-white text-sm transition-colors">Services</Link>
            <span className="text-gray-600">/</span>
            <span className="text-brand-green text-sm font-semibold">Irrigation</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-blue-900/30 border border-blue-700/30 flex items-center justify-center mb-6">
                <Droplets className="w-8 h-8 text-blue-400" />
              </div>
              <h1 className="font-condensed text-5xl md:text-6xl font-black uppercase text-white mb-4">
                SMART WATER, <span className="text-brand-green">GREENER LAWN</span>
              </h1>
              <p className="text-gray-400 text-xl leading-relaxed mb-8">
                A properly designed irrigation system saves water, reduces your bill, and keeps your lawn consistently green — without the daily hassle of manual watering.
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
            Stop Dragging Hoses. <span className="text-brand-green">Automate It.</span>
          </h2>
          <p className="text-gray-400 mb-8">Get a free quote for irrigation installation or service today.</p>
          <Link href="/quote" className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-black font-black px-10 py-5 rounded-xl transition-colors text-xl uppercase">
            Get My Irrigation Quote <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  )
}
