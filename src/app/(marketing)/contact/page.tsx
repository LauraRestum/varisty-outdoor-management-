import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { ContactForm } from '@/components/site/ContactForm'
import { Logo } from '@/components/site/Logo'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Get a Quote',
  description: `Request a free quote from ${SITE.name}. Tell us about your outdoor needs and our team will get back to you quickly.`,
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
              Fill out the form and our team will get back to you quickly.
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
            <p className="mt-10 text-sm text-charcoal/70">
              Want to give us property details up front?{' '}
              <Link href="/quote" className="font-semibold text-forest underline underline-offset-4 decoration-gold hover:text-gold-dark">
                Use our detailed quote form
              </Link>
              .
            </p>
          </div>

          <div className="bg-white">
            <ContactForm />
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
