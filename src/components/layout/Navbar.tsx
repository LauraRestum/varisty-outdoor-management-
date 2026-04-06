'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import { Menu, Phone } from 'lucide-react'
import { MobileMenu } from './MobileMenu'

const NAV_LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={clsx(
          'sticky top-0 z-40 w-full transition-all duration-300',
          scrolled
            ? 'backdrop-blur-md bg-dark-bg/90 border-b border-dark-border shadow-lg shadow-black/20'
            : 'bg-dark-bg/70 backdrop-blur-sm border-b border-dark-border/50'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex-shrink-0 flex items-center"
              aria-label="Varsity Outdoor Management — home"
            >
              <Image
                src="/images/logo-white.png"
                alt="Varsity Outdoor Management"
                width={160}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    'px-4 py-2 rounded-lg font-semibold text-sm transition-colors duration-200',
                    pathname === link.href || pathname.startsWith(link.href + '/')
                      ? 'text-brand-green bg-brand-green/10'
                      : 'text-gray-300 hover:text-white hover:bg-dark-card'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="tel:+1234567890"
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-green" />
                <span className="font-semibold">(123) 456-7890</span>
              </a>
              <Link
                href="/quote"
                className={clsx(
                  'bg-brand-green hover:bg-brand-green-dark text-black font-black',
                  'px-5 py-2.5 rounded-xl text-sm uppercase tracking-wide',
                  'transition-colors duration-200 min-h-[44px] flex items-center',
                  'shadow-lg shadow-brand-green/20'
                )}
              >
                Get a Free Quote
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-dark-card text-gray-300 hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
