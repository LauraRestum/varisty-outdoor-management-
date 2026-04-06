import Link from 'next/link'
import { ArrowRight, Check, Sparkles } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Seasonal Cleanup Services | Spring & Fall | Varsity Outdoor',
  description: 'Spring and fall property cleanups including leaf removal, bed prep, debris hauling, and gutter cleaning. Ready your property for every season.',
}

const SPRING_FEATURES = [
  'Leaf and debris removal from lawn and beds',
  'Bed edging and mulch refresh',
  'Dethatch and aeration preparation',
  'Prune winter-damaged shrubs',
  'First mow of the season',
  'Property walkthrough and assessment',
]

const FALL_FEATURES = [
  'Complete leaf removal and hauling',
  'Final mowing and edging',
  'Bed clearing and prep for winter',
  'Perennial cutback',
  'Gutter cleaning (optional add-on)',
  'Irrigation winterization coordination',
]

export default function SeasonalCleanupPage() {
  return (
    <div className="bg-dark-bg min-h-screen">
      <section className="py-20 md:py-28 bg-dark-card border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Link href="/services" className="text-gray-500 hover:text-white text-sm transition-colors">Services</Link>
            <span className="text-gray-600">/</span>
            <span className="text-brand-green text-sm font-semibold">Seasonal Cleanup</span>
          </div>
          <div className="mb-12 max-w-2xl">
            <div className="w-16 h-16 rounded-2xl bg-brand-green/20 border border-brand-green/30 flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-brand-green" />
            </div>
            <h1 className="font-condensed text-5xl md:text-6xl font-black uppercase text-white mb-4">
              SPRING INTO SUMMER, <span className="text-brand-green">FALL INTO WINTER</span>
            </h1>
            <p className="text-gray-400 text-xl leading-relaxed mb-8">
              Our seasonal cleanup services make sure your property starts every season looking its best — and ends every season prepared for what&apos;s next.
            </p>
            <Link href="/quote" className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-black font-black px-8 py-4 rounded-xl transition-colors text-lg uppercase">
              Get Your Free Quote <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-dark-card border border-dark-border rounded-2xl p-7">
              <span className="inline-block text-xs bg-green-900/50 border border-green-800 text-green-400 font-bold px-3 py-1 rounded-full mb-4">
                🌱 SPRING CLEANUP
              </span>
              <h2 className="font-condensed text-2xl font-bold uppercase text-white mb-4">Wake Your Property Up</h2>
              <ul className="space-y-3">
                {SPRING_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-green/20 border border-brand-green/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-brand-green" />
                    </div>
                    <span className="text-gray-300 text-sm">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-dark-card border border-dark-border rounded-2xl p-7">
              <span className="inline-block text-xs bg-orange-900/50 border border-orange-800 text-orange-400 font-bold px-3 py-1 rounded-full mb-4">
                🍂 FALL CLEANUP
              </span>
              <h2 className="font-condensed text-2xl font-bold uppercase text-white mb-4">Put Your Property to Bed</h2>
              <ul className="space-y-3">
                {FALL_FEATURES.map((f) => (
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
            Book Your <span className="text-brand-green">Seasonal Cleanup</span>
          </h2>
          <p className="text-gray-400 mb-8">Spring and fall slots fill up fast. Get your quote and lock in your date now.</p>
          <Link href="/quote" className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-black font-black px-10 py-5 rounded-xl transition-colors text-xl uppercase">
            Get My Free Quote <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  )
}
