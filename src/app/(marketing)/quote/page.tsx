import { QuoteForm } from '@/components/quote/QuoteForm'
import { Shield, Clock, Check } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get a Free Quote | Varsity Outdoor Management',
  description: 'Request a free, no-obligation quote for lawn care, landscaping, snow removal, and other outdoor services. We respond within 24 hours.',
}

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-dark-bg py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Trust sidebar (desktop only) */}
          <div className="hidden lg:block space-y-6">
            <div>
              <span className="inline-block text-brand-green text-xs font-bold uppercase tracking-widest mb-3">
                Free Quote
              </span>
              <h1 className="font-condensed text-4xl font-black uppercase text-white mb-3">
                LET&apos;S GET STARTED
              </h1>
              <p className="text-gray-400 leading-relaxed">
                Fill out the form to tell us about your property. We&apos;ll put together a custom quote and reach out within 24 hours.
              </p>
            </div>

            {/* Trust items */}
            <div className="space-y-4">
              {[
                { icon: Check, title: 'No Obligation', desc: 'Your quote is 100% free with zero pressure.' },
                { icon: Clock, title: '24-Hour Response', desc: 'We follow up fast, every time.' },
                { icon: Shield, title: 'Fully Insured', desc: 'Licensed, bonded & insured for your protection.' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4 p-4 bg-dark-card border border-dark-border rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-brand-green/10 border border-brand-green/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-brand-green" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{title}</p>
                    <p className="text-gray-400 text-sm">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="bg-dark-card border border-dark-border rounded-xl p-5">
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-4">Why Varsity</p>
              <div className="space-y-3">
                {[
                  { stat: '500+', label: 'Properties served' },
                  { stat: '5.0 ★', label: 'Google rating' },
                  { stat: '8+', label: 'Years in business' },
                ].map(({ stat, label }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-brand-green font-black font-condensed text-xl">{stat}</span>
                    <span className="text-gray-400 text-sm">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-2">
            {/* Mobile header */}
            <div className="lg:hidden mb-8 text-center">
              <h1 className="font-condensed text-4xl font-black uppercase text-white mb-2">
                GET A FREE QUOTE
              </h1>
              <p className="text-gray-400">No obligation. We respond within 24 hours.</p>
            </div>

            <div className="bg-dark-card border border-dark-border rounded-2xl p-6 md:p-8">
              <QuoteForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
