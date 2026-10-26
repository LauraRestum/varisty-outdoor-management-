'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import { Menu, ArrowRight } from 'lucide-react'
import { MobileMenu } from './MobileMenu'
import { Logo } from '@/components/site/Logo'
import { NAV_LINKS } from '@/lib/site'

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  function isActive(href: string) {
    return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <>
      <div className="h-1.5 bg-forest" />
      <header
        className={clsx(
          'sticky top-0 z-40 w-full bg-white transition-shadow duration-300',
          scrolled ? 'shadow-md shadow-black/5' : 'border-b border-sand/50'
        )}
      >
        <div className="container-site">
          <div className="flex items-center justify-between h-20 md:h-24">
            <Link href="/" className="flex-shrink-0" aria-label="Varsity Outdoor Services home">
              <Logo className="h-12 md:h-16" priority />
            </Link>

            <nav className="hidden lg:flex items-center gap-9" aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    'relative text-[11px] font-bold uppercase tracking-[0.2em] py-2 transition-colors',
                    isActive(link.href) ? 'text-forest' : 'text-charcoal/80 hover:text-forest',
                    isActive(link.href) &&
                      'after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5 after:bg-gold'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:block">
              <Link href="/contact" className="btn-gold">
                Get a Quote <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 -mr-2 text-forest min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
