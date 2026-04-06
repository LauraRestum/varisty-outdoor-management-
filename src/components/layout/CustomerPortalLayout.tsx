'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import { LayoutDashboard, List, FileText, MessageSquare, LogOut } from 'lucide-react'

const PORTAL_LINKS = [
  { href: '/portal', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/portal/services', label: 'My Services', icon: List },
  { href: '/portal/invoices', label: 'Invoices', icon: FileText },
]

interface CustomerPortalLayoutProps {
  children: React.ReactNode
}

export function CustomerPortalLayout({ children }: CustomerPortalLayoutProps) {
  const pathname = usePathname()

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Top Nav */}
      <header className="sticky top-0 z-40 bg-dark-card border-b border-dark-border">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/portal" className="font-condensed text-xl font-black uppercase">
              <span className="text-brand-green">VARSITY</span>{' '}
              <span className="text-white">PORTAL</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {PORTAL_LINKS.map((link) => {
                const active = isActive(link.href, link.exact)
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={clsx(
                      'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors',
                      active
                        ? 'text-brand-green bg-brand-green/10'
                        : 'text-gray-400 hover:text-white hover:bg-dark-muted/30'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            <Link
              href="/login"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:block">Sign Out</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 md:px-6 py-8 pb-24 md:pb-8">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-dark-card border-t border-dark-border md:hidden">
        <div className="flex min-h-[60px]">
          {PORTAL_LINKS.map((link) => {
            const active = isActive(link.href, link.exact)
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'flex-1 flex flex-col items-center justify-center gap-1 py-2',
                  active ? 'text-brand-green' : 'text-gray-500'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-semibold">{link.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
