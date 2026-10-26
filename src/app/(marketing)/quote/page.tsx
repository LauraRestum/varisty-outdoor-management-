import { QuoteForm } from '@/components/quote/QuoteForm'
import { Shield, Clock, Check } from 'lucide-react'
import type { Metadata } from 'next'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Detailed Quote Request',
  description: `Request a free, no-obligation quote from ${SITE.name}. Tell us about your property and we will follow up within 24 hours.`,
}

const TRUST = [
  { icon: Check, title: 'No Obligation', desc: 'Your quote is 100% free with zero pressure.' },
  { icon: Clock, title: '24-Hour Response', desc: 'We follow up fast, every time.' },
  { icon: Shield, title: 'Fully Insured', desc: 'Insured for your protection.' },
]

export default function QuotePage() {
  return (
    <section className="bg-cream">
      <div className="container-site py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="space-y-8">
            <div>
              <p className="eyebrow text-olive mb-4">Free Quote</p>
              <h1 className="heading-xl text-forest">Let&apos;s get started.</h1>
              <p className="mt-5 text-charcoal/75 leading-relaxed">
                Tell us about your property and the services you need. We&apos;ll put together a custom quote and reach out
                within 24 hours.
              </p>
            </div>

            <ul className="hidden lg:block space-y-4">
              {TRUST.map(({ icon: Icon, title, desc }) => (
                <li key={title} className="flex items-start gap-4 bg-white border border-sand/70 p-5">
                  <span className="w-10 h-10 rounded-full bg-forest text-gold flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span>
                    <span className="block font-bold text-sm text-forest uppercase tracking-[0.12em]">{title}</span>
                    <span className="block text-sm text-charcoal/70">{desc}</span>
                  </span>
                </li>
              ))}
            </ul>

            <p className="hidden lg:block text-sm text-charcoal/70">
              Prefer to talk? Call{' '}
              <a href={SITE.phoneHref} className="font-semibold text-forest underline underline-offset-4 decoration-gold">
                {SITE.phone}
              </a>
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-forest text-white p-6 md:p-10 shadow-xl">
              <QuoteForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
