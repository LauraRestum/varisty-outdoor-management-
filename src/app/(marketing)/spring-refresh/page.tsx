import Image from 'next/image'
import type { Metadata } from 'next'
import { CalendarCheck, Check, Gift, Percent, Plus } from 'lucide-react'
import { SectionHeading } from '@/components/site/Blocks'
import { QuoteOptions } from '@/components/site/QuoteOptions'
import { SITE } from '@/lib/site'
import {
  SPRING_REFRESH as SR,
  SPRING_REFRESH_INCLUDES,
  FREE_ADD_ONS,
  PAID_UPGRADES,
  SPRING_REFRESH_EMAIL,
} from '@/lib/spring-refresh'

export const metadata: Metadata = {
  title: `${SR.season} Spring Refresh: Pre-Book & Save`,
  description: `Prepay your ${SR.season} Spring Refresh by ${SR.bookBy} and save ${SR.discount} plus get ${SR.freeAddOns} free add-ons. Pruning, clean out, trimming, fertilizing and mulch from ${SITE.name}.`,
}

const PERKS = [
  { icon: Percent, title: `Save ${SR.discount}`, desc: `Off the ${SR.season} Spring Refresh when you prepay.` },
  { icon: Gift, title: `${SR.freeAddOns} Free Add-Ons`, desc: 'Pick any two from the list below.' },
  { icon: CalendarCheck, title: 'First on the Schedule', desc: `Early-bird customers get first pick of spring dates.` },
]

const STEPS = [
  { title: 'Reach out', desc: `Email, text or call ${SITE.owner} by ${SR.bookBy}. Tell us your address and your two free add-ons.` },
  { title: 'Get your price', desc: `${SITE.owner} sends your Spring Refresh price with the ${SR.discount} discount already applied.` },
  { title: 'Prepay & relax', desc: `Once you prepay, you're locked in. We'll reach out in early spring to set your date.` },
]

export default function SpringRefreshPage() {
  const subject = `${SR.season} Spring Refresh pre-book`
  const textBody = `Hi ${SITE.owner}, I'd like to pre-book the ${SR.season} Spring Refresh. My name is ___, my address is ___, and my 2 free add-ons are ___ and ___.`

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-forest-dark text-white">
        <Image src="/images/photos/crew-planting.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-dark/95 via-forest-dark/85 to-forest-dark/40" />
        <div className="relative container-site py-20 md:py-28">
          <p className="eyebrow text-gold mb-4">Pre-Book Now · Book by {SR.bookBy}</p>
          <h1 className="heading-xl max-w-3xl">
            The {SR.season}
            <br />
            Spring Refresh.
          </h1>
          <p className="mt-5 max-w-xl text-white/85 text-base md:text-lg leading-relaxed">
            Winter is hard on a yard. Book your spring clean up now, before the season starts, and save {SR.discount}{' '}
            plus get {SR.freeAddOns} free add-ons. We take care of everything that died back over the winter so your
            property is ready the moment spring hits.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <a href="#book" className="btn-gold">Lock In My Spot</a>
            <a href="#included" className="btn-outline-light">What&apos;s Included</a>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="bg-forest text-white">
        <div className="container-site py-10 md:py-12">
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {PERKS.map(({ icon: Icon, title, desc }) => (
              <li key={title} className="flex flex-col items-center text-center gap-3">
                <Icon strokeWidth={1.25} className="w-11 h-11 text-gold" />
                <span className="text-sm font-bold uppercase tracking-[0.18em]">{title}</span>
                <span className="text-sm text-white/75 max-w-xs">{desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Included */}
      <section id="included" className="bg-cream scroll-mt-28">
        <div className="container-site py-20 md:py-24">
          <SectionHeading
            eyebrow="Every Spring Refresh Includes"
            title="Everything winter left behind, handled."
            lead={`One visit in ${SR.serviceWindow} (weather dependent) to get your beds, shrubs and landscaping ready for the growing season.`}
          />
          <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SPRING_REFRESH_INCLUDES.map(({ title, detail }) => (
              <li key={title} className="flex items-start gap-4 bg-white border border-sand/70 p-5">
                <span className="mt-0.5 w-6 h-6 rounded-full bg-forest text-white flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span>
                  <span className="block font-bold text-sm text-forest uppercase tracking-[0.1em]">{title}</span>
                  <span className="mt-1 block text-sm text-charcoal/70 leading-relaxed">{detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Free add-ons */}
      <section className="bg-white border-y border-sand/50">
        <div className="container-site py-20 md:py-24">
          <SectionHeading
            eyebrow={`Prepay Bonus · Pick ${SR.freeAddOns}`}
            title={`Choose ${SR.freeAddOns} free add-ons.`}
            lead={`Prepay by ${SR.bookBy} and pick any ${SR.freeAddOns} of these, on us. The little things that make your place look finished.`}
          />
          <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FREE_ADD_ONS.map(({ title, detail }) => (
              <li key={title} className="flex flex-col border-2 border-gold/60 bg-cream p-5">
                <Gift strokeWidth={1.5} className="w-7 h-7 text-gold-dark" />
                <span className="mt-3 font-display text-lg font-bold uppercase tracking-[0.06em] text-forest leading-tight">
                  {title}
                </span>
                <span className="mt-1.5 text-sm text-charcoal/70 leading-relaxed">{detail}</span>
              </li>
            ))}
          </ul>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div>
              <p className="eyebrow text-olive mb-3">Want More?</p>
              <h3 className="font-display text-2xl font-bold uppercase tracking-[0.06em] text-forest">
                Add an upgrade
              </h3>
              <p className="mt-2 text-sm text-charcoal/70 leading-relaxed">
                Bigger projects can be added to your Spring Refresh and done on the same visit. Just ask and we&apos;ll
                include them in your price.
              </p>
            </div>
            <ul className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PAID_UPGRADES.map((u) => (
                <li key={u} className="flex items-center gap-3 text-sm text-charcoal/85">
                  <Plus className="w-4 h-4 text-gold-dark flex-shrink-0" />
                  {u}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How it works + book */}
      <section id="book" className="bg-forest text-white scroll-mt-28">
        <div className="container-site py-20 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <p className="eyebrow text-gold mb-4">How It Works</p>
            <h2 className="heading-lg">Book by {SR.bookBy}.</h2>
            <ol className="mt-10 space-y-8">
              {STEPS.map(({ title, desc }, i) => (
                <li key={title} className="flex gap-5">
                  <span className="font-display text-4xl font-bold text-gold leading-none w-8 flex-shrink-0">{i + 1}</span>
                  <span>
                    <span className="block text-sm font-bold uppercase tracking-[0.16em]">{title}</span>
                    <span className="mt-1.5 block text-white/75 leading-relaxed">{desc}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <p className="eyebrow text-gold mb-4">Lock In Your Spot</p>
            <p className="text-white/80 leading-relaxed mb-6">
              Reach out to {SITE.owner} directly. Email and text open with a short template ready to fill in.
            </p>
            <QuoteOptions tone="dark" subject={subject} emailBody={SPRING_REFRESH_EMAIL} textBody={textBody} />
            <p className="mt-6 text-xs text-white/60 leading-relaxed">
              Offer valid for prepaid {SR.season} Spring Refresh bookings made by {SR.bookBy}. Service performed{' '}
              {SR.serviceWindow}, weather dependent. Free add-ons have no cash value.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
