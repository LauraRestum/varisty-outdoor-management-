import Image from 'next/image'
import Link from 'next/link'
import { clsx } from 'clsx'
import {
  ArrowRight,
  Trees,
  Home,
  Snowflake,
  Shovel,
  Shield,
  Users,
  Leaf,
  type LucideIcon,
} from 'lucide-react'
import { GrassIcon } from './Logo'
import { SITE } from '@/lib/site'

// Line-icon service strip shown under the home hero (dark forest band)
const STRIP: { label: string; href: string; icon: LucideIcon | 'grass' }[] = [
  { label: 'Lawn Care', href: '/services/lawn-mowing', icon: 'grass' },
  { label: 'Landscaping', href: '/services/landscaping', icon: Trees },
  { label: 'Tree & Shrub Care', href: '/services/tree-shrub-care', icon: Home },
  { label: 'Snow Removal', href: '/services/snow-removal', icon: Snowflake },
  { label: 'Clean Ups', href: '/services/seasonal-cleanup', icon: Shovel },
]

export function ServiceIconStrip({ className }: { className?: string }) {
  return (
    <div className={clsx('bg-forest text-white', className)}>
      <div className="container-site py-10 md:py-12">
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-8 gap-x-4">
          {STRIP.map(({ label, href, icon: Icon }) => (
            <li key={label} className="last:col-span-2 sm:last:col-span-1">
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
  { label: 'Professional Team', icon: Users },
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
        <div className="mt-6 flex items-center justify-center gap-4">
          <span className="h-px w-12 bg-gold" />
          <span className="eyebrow text-gold">{SITE.name}</span>
          <span className="h-px w-12 bg-gold" />
        </div>
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
  body = 'Tell us about your outdoor needs and our team will get back to you quickly with a free quote.',
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
              Call {SITE.phone}
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
