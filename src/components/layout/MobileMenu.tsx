'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { clsx } from 'clsx'
import { X, Phone, ArrowRight } from 'lucide-react'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <div
      className={clsx(
        'fixed inset-0 z-50 flex flex-col bg-dark-bg transition-transform duration-300 ease-in-out md:hidden',
        open ? 'translate-x-0' : 'translate-x-full'
      )}
      aria-hidden={!open}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-dark-border">
        <Link
          href="/"
          onClick={onClose}
          className="font-condensed text-2xl font-black uppercase tracking-tight"
        >
          <span className="text-brand-green">VARSITY</span>{' '}
          <span className="text-white">OUTDOOR</span>
        </Link>
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-dark-card text-gray-400 hover:text-white transition-colors"
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 flex flex-col justify-center px-6 space-y-2">
        {NAV_LINKS.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className={clsx(
              'group flex items-center justify-between',
              'px-4 py-5 rounded-xl',
              'font-condensed text-4xl font-black uppercase text-white',
              'hover:bg-dark-card hover:text-brand-green transition-all duration-200',
              'border border-transparent hover:border-dark-border',
              'animate-slide-up'
            )}
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <span>{link.label}</span>
            <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity text-brand-green" />
          </Link>
        ))}
      </nav>

      {/* CTA Section */}
      <div className="px-6 py-6 space-y-3 border-t border-dark-border">
        <Link
          href="/quote"
          onClick={onClose}
          className="flex items-center justify-center gap-2 w-full bg-brand-green hover:bg-brand-green-dark text-black font-black text-lg uppercase py-4 px-6 rounded-xl transition-colors min-h-[56px]"
        >
          Get a Free Quote
        </Link>
        <a
          href="tel:+1234567890"
          className="flex items-center justify-center gap-2 w-full border border-dark-border text-white hover:bg-dark-card font-semibold py-4 px-6 rounded-xl transition-colors min-h-[56px]"
        >
          <Phone className="w-5 h-5 text-brand-green" />
          Call Us Now
        </a>
      </div>
    </div>
  )
}
