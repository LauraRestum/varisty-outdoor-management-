import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Instagram, Star } from 'lucide-react'

const SERVICES = [
  { href: '/services/lawn-mowing', label: 'Lawn Mowing' },
  { href: '/services/landscaping', label: 'Landscaping' },
  { href: '/services/snow-removal', label: 'Snow Removal' },
  { href: '/services/irrigation', label: 'Irrigation' },
  { href: '/services/tree-shrub-care', label: 'Tree & Shrub Care' },
  { href: '/services/hardscaping', label: 'Hardscaping' },
  { href: '/services/fertilization', label: 'Fertilization' },
  { href: '/services/seasonal-cleanup', label: 'Seasonal Cleanup' },
]

const COMPANY_LINKS = [
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'All Services' },
  { href: '/contact', label: 'Contact' },
  { href: '/quote', label: 'Get a Quote' },
  { href: '/login', label: 'Client Login' },
]

const SERVICE_AREAS = [
  'Columbus, OH',
  'Dublin, OH',
  'Westerville, OH',
  'Hilliard, OH',
  'Grove City, OH',
  'Gahanna, OH',
  'New Albany, OH',
  'Pickerington, OH',
]

export function Footer() {
  return (
    <footer className="bg-dark-bg border-t border-dark-border">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="font-condensed text-2xl font-black uppercase tracking-tight block mb-4"
            >
              <span className="text-brand-green">VARSITY</span>{' '}
              <span className="text-white">OUTDOOR</span>
              <br />
              <span className="text-gray-400 font-light text-base normal-case tracking-normal">
                Management
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Professional lawn care, landscaping, and outdoor management services.
              We treat every property like it&apos;s our own.
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-brand-green">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-white font-bold">5.0</span>
              <span className="text-gray-400 text-sm">(120+ reviews)</span>
            </div>

            {/* Social */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-dark-card border border-dark-border flex items-center justify-center text-gray-400 hover:text-brand-green hover:border-brand-green/30 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-dark-card border border-dark-border flex items-center justify-center text-gray-400 hover:text-brand-green hover:border-brand-green/30 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-condensed text-sm font-bold uppercase tracking-widest text-brand-green mb-5">
              Services
            </h3>
            <ul className="space-y-2.5">
              {SERVICES.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors hover:text-brand-green"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-condensed text-sm font-bold uppercase tracking-widest text-brand-green mb-5">
              Company
            </h3>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-brand-green text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Areas Column */}
          <div>
            <h3 className="font-condensed text-sm font-bold uppercase tracking-widest text-brand-green mb-5">
              Contact
            </h3>
            <ul className="space-y-3 mb-8">
              <li>
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
                >
                  <Phone className="w-4 h-4 text-brand-green flex-shrink-0" />
                  <span className="text-sm">(123) 456-7890</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:bergkampw@gmail.com"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
                >
                  <Mail className="w-4 h-4 text-brand-green flex-shrink-0" />
                  <span className="text-sm">bergkampw@gmail.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-gray-400">
                  <MapPin className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Columbus, OH &amp; Surrounding Areas</span>
                </div>
              </li>
            </ul>

            <h3 className="font-condensed text-sm font-bold uppercase tracking-widest text-gray-500 mb-3">
              Service Areas
            </h3>
            <p className="text-gray-500 text-xs leading-relaxed">
              {SERVICE_AREAS.join(' • ')}
            </p>
          </div>
        </div>
      </div>

      {/* Local SEO Band */}
      <div className="border-t border-dark-border bg-dark-card/50 py-4">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <p className="text-gray-600 text-xs text-center leading-relaxed">
            Varsity Outdoor Management — Professional Lawn Care &amp; Landscaping Services in Columbus OH, Dublin OH, Westerville OH, Hilliard OH, Grove City OH, Gahanna OH, New Albany OH, Pickerington OH and surrounding Central Ohio communities.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Varsity Outdoor Management. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-gray-500 hover:text-gray-400 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-gray-400 text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
