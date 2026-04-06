'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import { CalendarDays, Users, MessageSquare, ClipboardList, LayoutDashboard } from 'lucide-react'

const TABS = [
  { href: '/dashboard', label: 'Today', icon: LayoutDashboard, exact: true },
  { href: '/dashboard/jobs', label: 'Jobs', icon: ClipboardList },
  { href: '/dashboard/customers', label: 'Customers', icon: Users },
  { href: '/dashboard/schedule', label: 'Schedule', icon: CalendarDays },
  { href: '/dashboard/quotes', label: 'Quotes', icon: MessageSquare },
]

export function BottomTabBar() {
  const pathname = usePathname()

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 bg-dark-card border-t border-dark-border md:hidden"
      aria-label="Bottom navigation"
    >
      <div className="flex min-h-[64px] safe-area-inset-bottom">
        {TABS.map((tab) => {
          const active = isActive(tab.href, tab.exact)
          const Icon = tab.icon
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={clsx(
                'flex-1 flex flex-col items-center justify-center gap-1 pt-2 pb-3',
                'transition-colors duration-200',
                active ? 'text-brand-green' : 'text-gray-500 hover:text-gray-300'
              )}
              aria-current={active ? 'page' : undefined}
            >
              <Icon
                className={clsx(
                  'w-5 h-5 transition-transform',
                  active ? 'scale-110' : 'scale-100'
                )}
              />
              <span className="text-[10px] font-semibold tracking-wide uppercase">
                {tab.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
