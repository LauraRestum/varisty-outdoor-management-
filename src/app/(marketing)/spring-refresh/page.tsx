import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, Check, Gift, MessageSquare, Phone, Mail, Plus, CalendarCheck } from 'lucide-react'
import { QuoteCta } from '@/components/site/Blocks'
import { FREE_ADD_ONS, PAID_ADD_ONS, PROMO, SPRING_REFRESH_INCLUDES } from '@/lib/promo'
import { SITE, mailLink, smsLink } from '@/lib/site'

export const metadata: Metadata = {
  title: `${PROMO.season} Spring Refresh Pre-Book`,
  description: `Prepay your ${PROMO.season} Spring Refresh by ${PROMO.deadline} and save ${PROMO.discount}, plus pick ${PROMO.freeAddOnCount} free add-ons. Winter debris cleanup, shrub trimming, bed edging, and mulch refresh in ${SITE.city}.`,
}

const PREBOOK_TEXT = `Hi Varsity, I'd like to pre-book a ${PROMO.season} Spring Refresh.\nName:\nAddress:\nMy ${PROMO.freeAddOnCount} free add-ons:`

const STEPS = [
  { title: 'Reach out', body: `Call, text, or email us by ${PROMO.deadline} with your address.` },
  { title: 'Get your price', body: 'We look at your yard and send you a quote with the early-bird savings built in.' },
  { title: 'Prepay to lock it in', body: `Pick your ${PROMO.freeAddOnCount} free add-ons and prepay to hold your spot and your price.` },
  { title: 'We handle spring', body: `We come out ${PROMO.window}, as soon as the weather is right. You don't have to think about it.` },
]

const FAQ = [
  {
    q: 'When does the Spring Refresh happen?',
    a: `Usually ${PROMO.window}. Kansas weather decides the exact day, and pre-booked yards go on the schedule first.`,
  },
  {
    q: 'Why pay now?',
    a: `Prepaying is what earns the ${PROMO.discount} savings and the free add-ons. It also guarantees your spot before the spring rush.`,
  },
  {
    q: 'Can I add weekly mowing for next season?',
    a: `Yes. We only take on as many yards as we can keep looking great, so ${PROMO.season} mowing spots are limited. Ask about prepaying the season for our best per-cut rate.`,
  },
  {
    q: 'What if I need something you don’t do?',
    a: 'Tell us. If it is outside what we do, we will connect you with a trusted local pro and manage it so you only deal with us.',
  },
]

export default function SpringRefreshPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-forest text-white">
        <Image src="/images/photos/crew-planting.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-dark/95 via-forest-dark/85 to-forest-dark/40" />
        <div className="relative container-site py-20 md:py-28">
          <p className="eyebrow text-gold mb-4">{PROMO.season} Season Pre-Book</p>
          <h1 className="heading-xl max-w-3xl">The Spring Refresh.</h1>
          <p className="mt-5 max-w-xl text-white/90 text-base md:text-lg leading-relaxed">
            One visit that clears out everything winter left behind. Prepay by {PROMO.deadline} and save{' '}
            {PROMO.discount}, plus pick {PROMO.freeAddOnCount} free add-ons.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <a href={smsLink(PREBOOK_TEXT)} className="btn-gold">
              <MessageSquare className="w-4 h-4" /> Text to Pre-Book
            </a>
            <a href={SITE.phoneHref} className="btn-outline-light">
              <Phone className="w-4 h-4" /> Call {SITE.phone}
            </a>
            <a href={mailLink(`${PROMO.season} Spring Refresh pre-book`, PREBOOK_TEXT)} className="btn-outline-light">
              <Mail className="w-4 h-4" /> Email Us
            </a>
          </div>
        </div>
      </section>

      {/* Offer strip */}
      <section className="bg-gold text-forest-dark">
        <div className="container-site py-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <p className="font-display text-xl md:text-2xl font-bold uppercase tracking-[0.06em]">Save {PROMO.discount}</p>
          <p className="font-display text-xl md:text-2xl font-bold uppercase tracking-[0.06em]">
            + {PROMO.freeAddOnCount} free add-ons
          </p>
          <p className="font-display text-xl md:text-2xl font-bold uppercase tracking-[0.06em]">Book by {PROMO.deadline}</p>
        </div>
      </section>

      {/* What's included */}
      <section className="bg-white">
        <div className="container-site py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-olive mb-3">What&apos;s included</p>
            <h2 className="heading-lg text-forest">Winter-worn to spring-ready in one visit.</h2>
            <p className="mt-5 text-charcoal/75 leading-relaxed">
              Dead limbs, matted leaves, and shaggy shrubs are the first things your neighbors notice in spring. We
              take care of all of it before your grass even starts growing, so your yard starts the season ahead.
            </p>
          </div>
          <ul className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {SPRING_REFRESH_INCLUDES.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[15px] text-charcoal">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-forest text-white flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Free add-ons */}
      <section className="bg-cream border-y border-sand/60">
        <div className="container-site py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="eyebrow text-olive mb-3">Pre-book bonus</p>
            <h2 className="heading-lg text-forest">Pick {PROMO.freeAddOnCount} free add-ons.</h2>
            <p className="mt-4 text-charcoal/75 leading-relaxed">
              Prepay by {PROMO.deadline} and choose any {PROMO.freeAddOnCount} of these, on us.
            </p>
          </div>
          <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FREE_ADD_ONS.map((a) => (
              <li key={a.name} className="bg-white border border-sand/70 border-t-4 border-t-gold p-6">
                <Gift strokeWidth={1.5} className="w-7 h-7 text-forest" />
                <h3 className="mt-4 font-display text-lg font-bold uppercase tracking-[0.06em] text-forest">{a.name}</h3>
                <p className="mt-1.5 text-sm text-charcoal/75 leading-relaxed">{a.detail}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10 bg-white border border-sand/70 p-6 md:p-8">
            <h3 className="font-display text-xl font-bold uppercase tracking-[0.06em] text-forest">Want more? Add it on.</h3>
            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PAID_ADD_ONS.map((a) => (
                <li key={a} className="flex items-start gap-3 text-[15px] text-charcoal">
                  <Plus className="w-4 h-4 mt-1 text-gold flex-shrink-0" />
                  {a}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-charcoal/75">Ask for pricing when you book.</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-forest text-white">
        <div className="container-site py-16 md:py-24">
          <p className="eyebrow text-gold mb-3">How it works</p>
          <h2 className="heading-lg">Book it now. Forget about it until spring.</h2>
          <ol className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <li key={step.title} className="border border-white/15 p-6">
                <span className="font-display text-4xl font-bold text-gold leading-none">{i + 1}</span>
                <h3 className="mt-3 font-display text-xl font-bold uppercase tracking-[0.06em]">{step.title}</h3>
                <p className="mt-2 text-sm text-white/85 leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <a href={smsLink(PREBOOK_TEXT)} className="btn-gold">
              <MessageSquare className="w-4 h-4" /> Text to Pre-Book
            </a>
            <Link href="/contact?service=spring-refresh" className="btn-outline-light">
              <CalendarCheck className="w-4 h-4" /> Pick My Add-Ons
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <div className="container-site py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="eyebrow text-olive mb-3">Questions</p>
            <h2 className="heading-lg text-forest">Good to know.</h2>
          </div>
          <dl className="lg:col-span-8 divide-y divide-sand/70 border-y border-sand/70">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="py-6">
                <dt className="font-display text-xl font-bold uppercase tracking-[0.04em] text-forest">{q}</dt>
                <dd className="mt-2 text-charcoal/80 leading-relaxed">{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <QuoteCta
        title={`Lock in your ${PROMO.season} season.`}
        body={`Spring Refresh pre-booking ends ${PROMO.deadline}. Call, text, or email to get your spot.`}
      />
    </>
  )
}
