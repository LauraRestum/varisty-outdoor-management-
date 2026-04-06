import Link from 'next/link'
import { ArrowRight, Check, Scissors } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Professional Lawn Mowing Service | Varsity Outdoor Management',
  description:
    'Regular lawn mowing, edging, trimming, and cleanup. Weekly and bi-weekly plans available. Serving Central Ohio with sharp-blade precision every visit.',
}

const FEATURES = [
  'Fresh sharp blades on every mow — no tearing',
  'Mowing, string trimming, and edging included',
  'Clipping cleanup and full blow-off after each visit',
  'Consistent crew assigned to your property',
  'Skip notifications via text for vacations or weather',
  'Before/after photos sent after each service',
]

const PLANS = [
  { name: 'Weekly', price: 'Starting at $45/visit', tag: 'Best Results', description: 'Perfect for fast-growing seasons. Keep your lawn looking pristine every week.' },
  { name: 'Bi-Weekly', price: 'Starting at $55/visit', tag: 'Most Popular', description: 'The sweet spot — regular enough to stay beautiful, flexible enough for most budgets.' },
  { name: 'Monthly', price: 'Starting at $70/visit', tag: '', description: 'Minimum maintenance for larger, slower-growing properties.' },
  { name: 'One-Time', price: 'Custom Quote', tag: '', description: 'Moving in, selling your home, or just need a cleanup? We handle single visits too.' },
]

export default function LawnMowingPage() {
  return (
    <div className="bg-dark-bg min-h-screen">
      {/* Hero */}
      <section className="py-20 md:py-28 bg-dark-card border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Link href="/services" className="text-gray-500 hover:text-white text-sm transition-colors">
              Services
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-brand-green text-sm font-semibold">Lawn Mowing</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-brand-green/20 border border-brand-green/30 flex items-center justify-center mb-6">
                <Scissors className="w-8 h-8 text-brand-green" />
              </div>
              <h1 className="font-condensed text-5xl md:text-6xl font-black uppercase text-white mb-4">
                LAWN MOWING <span className="text-brand-green">DONE RIGHT</span>
              </h1>
              <p className="text-gray-400 text-xl leading-relaxed mb-8">
                Sharp blades. Consistent crew. On-time every time. Varsity&apos;s mowing service sets the standard for professional lawn care.
              </p>
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-black font-black px-8 py-4 rounded-xl transition-colors text-lg uppercase"
              >
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

      {/* Plans */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-condensed text-4xl md:text-5xl font-black uppercase text-white mb-3">
              Choose Your <span className="text-brand-green">Plan</span>
            </h2>
            <p className="text-gray-400">All plans include mowing, edging, trimming, and cleanup.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PLANS.map((plan) => (
              <div key={plan.name} className={`bg-dark-card border rounded-2xl p-6 ${plan.tag === 'Most Popular' ? 'border-brand-green shadow-lg shadow-brand-green/10' : 'border-dark-border'}`}>
                {plan.tag && (
                  <span className="inline-block text-xs bg-brand-green text-black font-bold px-2 py-0.5 rounded-full mb-3">
                    {plan.tag}
                  </span>
                )}
                <h3 className="font-condensed text-2xl font-black uppercase text-white">{plan.name}</h3>
                <p className="text-brand-green font-bold my-2">{plan.price}</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">{plan.description}</p>
                <Link
                  href="/quote"
                  className="block text-center bg-dark-bg hover:bg-dark-muted border border-dark-border hover:border-brand-green/30 text-white font-semibold py-2.5 px-4 rounded-xl transition-all text-sm"
                >
                  Get Quote
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-dark-card border-t border-dark-border">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-condensed text-4xl font-black uppercase text-white mb-4">
            Ready for a <span className="text-brand-green">Championship Lawn?</span>
          </h2>
          <p className="text-gray-400 mb-8">Get your personalized quote in under 3 minutes. We&apos;ll follow up within 24 hours.</p>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-black font-black px-10 py-5 rounded-xl transition-colors text-xl uppercase"
          >
            Start My Free Quote <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  )
}
