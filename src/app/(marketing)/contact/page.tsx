import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock, Gift } from 'lucide-react'
import { QuoteOptions } from '@/components/site/QuoteOptions'
import { Logo } from '@/components/site/Logo'
import { SITE } from '@/lib/site'
import { SPRING_REFRESH as SR } from '@/lib/spring-refresh'

export const metadata: Metadata = {
  title: 'Get a Quote',
  description: `Request a free quote from ${SITE.name}. Email, call or text ${SITE.owner} and get a quick response.`,
}

const DETAILS = [
  { icon: Phone, value: SITE.phone, href: SITE.phoneHref },
  { icon: Mail, value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: MapPin, value: SITE.city, href: null },
  { icon: Clock, value: SITE.hours, href: null },
]

export default function ContactPage() {
  return (
    <>
      <section className="bg-white">
        <div className="container-site py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <p className="eyebrow text-olive mb-4">Get a Quote</p>
            <h1 className="heading-xl text-forest">
              Let&apos;s talk
              <br />
              about your
              <br />
              outdoor needs.
            </h1>
            <p className="mt-6 text-charcoal/75 leading-relaxed max-w-md">
              Email, text or call {SITE.owner} directly. Send your address and what you need, and you&apos;ll hear
              back quickly with a free quote. Photos of the area help too!
            </p>
            <ul className="mt-8 space-y-4">
              {DETAILS.map(({ icon: Icon, value, href }) => (
                <li key={value} className="flex items-center gap-4 text-sm font-medium text-charcoal">
                  <Icon className="w-5 h-5 text-forest flex-shrink-0" />
                  {href ? (
                    <a href={href} className="hover:text-forest transition-colors break-all">{value}</a>
                  ) : (
                    <span>{value}</span>
                  )}
                </li>
              ))}
            </ul>
            <Link
              href="/spring-refresh"
              className="mt-10 flex items-start gap-4 border-2 border-gold/60 bg-cream p-5 hover:border-gold transition-colors"
            >
              <Gift className="w-6 h-6 text-gold-dark flex-shrink-0 mt-0.5" />
              <span className="text-sm text-charcoal/80 leading-relaxed">
                <span className="block font-bold uppercase tracking-[0.12em] text-forest">
                  Pre-book your {SR.season} Spring Refresh
                </span>
                Prepay by {SR.bookBy} to save {SR.discount} and get {SR.freeAddOns} free add-ons.
              </span>
            </Link>
          </div>

          <div className="bg-forest text-white p-6 md:p-10 shadow-xl self-start">
            <p className="eyebrow text-gold mb-3">Request a Quote</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-[0.06em]">
              Pick whatever&apos;s easiest.
            </h2>
            <p className="mt-2 mb-7 text-sm text-white/75 leading-relaxed">
              Email and text open with a short template, so all you have to do is fill in the blanks.
            </p>
            <QuoteOptions tone="dark" />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <Image src="/images/photos/cottage-garden.jpg" alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-forest-dark/60" />
        <div className="relative container-site py-20 md:py-28 flex justify-center">
          <Logo variant="light" className="h-32 md:h-44 drop-shadow-lg" />
        </div>
      </section>
    </>
  )
}
