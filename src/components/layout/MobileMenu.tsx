'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { clsx } from 'clsx'
import { X, Phone, ArrowRight } from 'lucide-react'
import { Logo } from '@/components/site/Logo'
import { NAV_LINKS, SITE } from '@/lib/site'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <div
      className={clsx(
        'fixed inset-0 z-50 flex flex-col bg-forest text-white transition-transform duration-300 ease-in-out lg:hidden',
        open ? 'translate-x-0' : 'translate-x-full'
      )}
      aria-hidden={!open}
    >
      <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
        <Link href="/" onClick={onClose} aria-label="Home">
          <Logo variant="light" className="h-12" />
        </Link>
        <button
          onClick={onClose}
          className="p-2 text-white/80 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Close menu"
        >
          <X className="w-7 h-7" />
        </button>
      </div>

      <nav className="flex-1 flex flex-col justify-center px-6 gap-1">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="group flex items-center justify-between py-4 border-b border-white/10 font-display text-3xl font-bold uppercase tracking-[0.06em] hover:text-gold transition-colors"
          >
            {link.label}
            <ArrowRight className="w-5 h-5 text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}
      </nav>

      <div className="px-6 py-6 space-y-3">
        <Link href="/contact" onClick={onClose} className="btn-gold w-full">
          Get a Quote <ArrowRight className="w-4 h-4" />
        </Link>
        <a href={SITE.phoneHref} className="btn-outline-light w-full">
          <Phone className="w-4 h-4" /> {SITE.phone}
        </a>
      </div>
    </div>
  )
}
