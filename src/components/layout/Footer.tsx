import Link from 'next/link'
import { Facebook, Instagram, Linkedin, ArrowRight, Phone, Mail, MapPin } from 'lucide-react'
import { Logo } from '@/components/site/Logo'
import { NAV_LINKS, SITE } from '@/lib/site'
import { SERVICES } from '@/lib/services'

const SOCIAL = [
  { href: SITE.social.facebook, label: 'Facebook', icon: Facebook },
  { href: SITE.social.instagram, label: 'Instagram', icon: Instagram },
  { href: SITE.social.linkedin, label: 'LinkedIn', icon: Linkedin },
]

export function Footer() {
  return (
    <footer className="bg-forest text-white">
      <div className="container-site py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4 text-center md:text-left">
            <Link href="/" aria-label="Home" className="inline-block">
              <Logo variant="light" className="h-24 md:h-28" />
            </Link>
            <p className="mt-5 text-white/80 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              {SITE.tagline}
            </p>
            <div className="mt-6 flex gap-3 justify-center md:justify-start">
              {SOCIAL.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-gold hover:border-gold hover:text-forest-dark transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="eyebrow text-gold mb-5">Navigate</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80 hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="eyebrow text-gold mb-5">Services</h3>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-sm text-white/80 hover:text-gold transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="eyebrow text-gold mb-5">Contact</h3>
            <ul className="space-y-4 text-sm text-white/80">
              <li>
                <a href={SITE.phoneHref} className="flex items-center gap-3 hover:text-gold transition-colors">
                  <Phone className="w-4 h-4 text-gold" /> {SITE.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 hover:text-gold transition-colors break-all">
                  <Mail className="w-4 h-4 text-gold flex-shrink-0" /> {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gold" /> {SITE.city}
              </li>
            </ul>
            <Link href="/contact" className="btn-gold mt-7">
              Get a Quote <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="mt-14 h-px bg-gold/50" />

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/login" className="hover:text-gold transition-colors">Client Login</Link>
            <span>{SITE.city}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
