import Image from 'next/image'
import Link from 'next/link'
import { clsx } from 'clsx'
import {
  ArrowRight,
  Home,
  Shield,
  Users,
  Leaf,
  Sprout,
  Scissors,
  Flower2,
  CloudLightning,
  Handshake,
  Gift,
  MessageSquare,
  type LucideIcon,
} from 'lucide-react'
import { GrassIcon } from './Logo'
import { SITE } from '@/lib/site'
import { PROMO } from '@/lib/promo'

// Line-icon service strip shown under the home hero (dark forest band)
const STRIP: { label: string; href: string; icon: LucideIcon | 'grass' }[] = [
  { label: 'Fall Cleanup', href: '/services/seasonal-cleanup', icon: Leaf },
  { label: 'Spring Refresh', href: '/spring-refresh', icon: Sprout },
  { label: 'Lawn Care', href: '/services/lawn-mowing', icon: 'grass' },
  { label: 'Shrub Trimming', href: '/services/tree-shrub-care', icon: Scissors },
  { label: 'Mulching', href: '/services/landscaping', icon: Flower2 },
  { label: 'Storm Cleanup', href: '/services/storm-cleanup', icon: CloudLightning },
]

export function ServiceIconStrip({ className }: { className?: string }) {
  return (
    <div className={clsx('bg-forest text-white', className)}>
      <div className="container-site py-10 md:py-12">
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-8 gap-x-4">
          {STRIP.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <Link href={href} className="group flex flex-col items-center text-center gap-3">
                {Icon === 'grass' ? (
                  <GrassIcon className="w-11 h-11 text-white group-hover:scale-110 transition-transform" />
                ) : (
                  <Icon strokeWidth={1.25} className="w-11 h-11 text-white group-hover:text-gold group-hover:scale-110 transition-all" />
                )}
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/90 group-hover:text-gold transition-colors">
                  {label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// Four-up value props with thin line icons (About page, home)
const VALUES: { label: string; icon: LucideIcon }[] = [
  { label: 'Reliable Service', icon: Shield },
  { label: 'One Point of Contact', icon: Users },
  { label: 'Quality Work', icon: Leaf },
  { label: 'Beautiful Results', icon: Home },
]

export function ValueIcons({ className }: { className?: string }) {
  return (
    <div className={clsx('bg-sand-light', className)}>
      <div className="container-site py-12">
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {VALUES.map(({ label, icon: Icon }) => (
            <li key={label} className="flex flex-col items-center gap-3 text-center">
              <Icon strokeWidth={1.25} className="w-10 h-10 text-forest" />
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-forest">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// Photo band with the brand slogan
export function WinningTeamBanner({ image = '/images/photos/cottage-garden.jpg' }: { image?: string }) {
  return (
    <section className="relative overflow-hidden">
      <Image src={image} alt="" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-forest-dark/70" />
      <div className="relative container-site py-20 md:py-28 text-center">
        <p className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-[0.12em] text-white">
          {SITE.slogan}
        </p>
        <p className="mt-6 eyebrow text-gold">{SITE.name}</p>
      </div>
    </section>
  )
}

// Inner-page header: forest band with photo, eyebrow, headline, and lead copy
interface PageHeroProps {
  eyebrow: string
  title: React.ReactNode
  lead?: string
  image: string
}

export function PageHero({ eyebrow, title, lead, image }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-forest text-white">
      <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-dark/95 via-forest-dark/80 to-forest-dark/30" />
      <div className="relative container-site py-20 md:py-28">
        <p className="eyebrow text-white/80 mb-4">{eyebrow}</p>
        <h1 className="heading-xl max-w-2xl">{title}</h1>
        {lead && <p className="mt-5 max-w-xl text-white/85 text-base md:text-lg leading-relaxed">{lead}</p>}
      </div>
    </section>
  )
}

// Closing call to action
export function QuoteCta({
  title = 'Ready for a better looking property?',
  body = 'Call, text, or email and we will get back to you quickly with a free quote.',
}: {
  title?: string
  body?: string
}) {
  return (
    <section className="bg-cream">
      <div className="container-site pt-10 pb-16 md:pt-12 md:pb-20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 border-t-2 border-gold pt-10">
          <div className="max-w-2xl">
            <h2 className="heading-lg text-forest">{title}</h2>
            <p className="mt-3 text-charcoal/75 leading-relaxed">{body}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link href="/contact" className="btn-gold">
              Get a Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center justify-center border border-forest text-forest hover:bg-forest hover:text-white text-xs sm:text-sm font-bold uppercase tracking-[0.16em] px-6 py-3.5 rounded-sm transition-colors min-h-[44px]"
            >
              Call or text {SITE.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  className,
}: {
  eyebrow: string
  title: React.ReactNode
  lead?: string
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <div className={clsx(align === 'center' && 'text-center mx-auto', 'max-w-2xl', className)}>
      <p className="eyebrow text-olive mb-3">{eyebrow}</p>
      <h2 className="heading-lg text-forest">{title}</h2>
      {lead && <p className="mt-4 text-charcoal/75 leading-relaxed">{lead}</p>}
    </div>
  )
}

// "We broker what we don't do" band (Services page)
export function BrokerBand() {
  return (
    <div className="mt-10 bg-forest text-white grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 items-center p-7 md:p-9">
      <Handshake strokeWidth={1.25} className="w-12 h-12 text-gold" />
      <div>
        <h3 className="font-display text-2xl font-bold uppercase tracking-[0.06em]">Need something else?</h3>
        <p className="mt-2 text-white/85 text-sm leading-relaxed max-w-2xl">
          Big tree removal, sprinklers, lawn treatments: if it is outside what we do ourselves, we connect you with a
          trusted local pro and manage it start to finish. One point of contact for everything outside your home.
        </p>
      </div>
      <Link href="/contact" className="btn-gold">
        Ask Us <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}

// 2027 pre-book offer band (home page and service pages)
export function PreBookBand() {
  return (
    <section className="bg-forest-dark text-white">
      <div className="container-site py-16 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <p className="eyebrow text-gold mb-4">Booking now for the {PROMO.season} season</p>
          <h2 className="heading-lg">Get ahead of spring before winter even starts.</h2>
          <p className="mt-5 text-white/85 leading-relaxed max-w-xl">
            Prepay your {PROMO.season} Spring Refresh by {PROMO.deadline} and save {PROMO.discount}, plus pick{' '}
            {PROMO.freeAddOnCount} free add-ons. We clear out everything winter left behind so your yard is ready the
            moment it starts growing.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/spring-refresh" className="btn-gold">
              See the Spring Refresh <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={SITE.smsHref} className="btn-outline-light">
              <MessageSquare className="w-4 h-4" /> Text {SITE.phone}
            </a>
          </div>
        </div>
        <ul className="lg:col-span-5 grid grid-cols-1 gap-3">
          {[
            { icon: Sprout, title: `Save ${PROMO.discount}`, body: `Prepay by ${PROMO.deadline} to lock in the early-bird price.` },
            { icon: Gift, title: `${PROMO.freeAddOnCount} free add-ons`, body: 'Curb number repaint, LED bulb swap, extra mulch, and more.' },
            { icon: Shield, title: 'Your spot, locked in', body: `We schedule pre-booked yards first, ${PROMO.window}.` },
          ].map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex items-start gap-4 border border-white/15 p-5">
              <Icon strokeWidth={1.5} className="w-8 h-8 text-gold flex-shrink-0" />
              <span>
                <span className="block font-display text-xl font-bold uppercase tracking-[0.06em]">{title}</span>
                <span className="block text-sm text-white/80">{body}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
