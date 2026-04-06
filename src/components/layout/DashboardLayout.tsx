'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  CalendarDays,
  MessageSquare,
  FileText,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-react'
import { BottomTabBar } from '@/components/dashboard/BottomTabBar'

const SIDEBAR_LINKS = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/dashboard/jobs', label: 'Jobs', icon: ClipboardList },
  { href: '/dashboard/customers', label: 'Customers', icon: Users },
  { href: '/dashboard/schedule', label: 'Schedule', icon: CalendarDays },
  { href: '/dashboard/quotes', label: 'Quote Requests', icon: MessageSquare },
  { href: '/dashboard/invoices', label: 'Invoices', icon: FileText },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-dark-bg flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-dark-card border-r border-dark-border fixed h-full">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-dark-border">
          <Link href="/dashboard" className="font-condensed text-xl font-black uppercase">
            <span className="text-brand-green">VARSITY</span>{' '}
            <span className="text-white">OUTDOOR</span>
          </Link>
          <p className="text-xs text-gray-500 mt-1">Owner Dashboard</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto dashboard-scroll">
          {SIDEBAR_LINKS.map((link) => {
            const active = isActive(link.href, link.exact)
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group',
                  active
                    ? 'bg-brand-green/10 text-brand-green border border-brand-green/20'
                    : 'text-gray-400 hover:text-white hover:bg-dark-muted/30 border border-transparent'
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-semibold text-sm">{link.label}</span>
                {active && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-dark-border px-3 py-4 space-y-1">
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-dark-muted/30 transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span className="font-semibold text-sm">Settings</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-semibold text-sm">View Public Site</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 min-h-screen pb-20 md:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <BottomTabBar />
    </div>
  )
}
