import { clsx } from 'clsx'
import {
  CalendarCheck,
  MessageSquare,
  Users,
  DollarSign,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react'
import type { DashboardStats } from '@/types'

interface StatCardProps {
  label: string
  value: string | number
  icon: React.ElementType
  trend?: string
  trendUp?: boolean
  accent?: 'green' | 'yellow' | 'blue' | 'red'
}

const accentClasses = {
  green: 'bg-green-900/30 border-green-800 text-green-400',
  yellow: 'bg-yellow-900/30 border-yellow-800 text-yellow-400',
  blue: 'bg-blue-900/30 border-blue-800 text-blue-400',
  red: 'bg-red-900/30 border-red-800 text-red-400',
}

function StatCard({ label, value, icon: Icon, trend, trendUp, accent = 'green' }: StatCardProps) {
  return (
    <div className="bg-dark-card border border-dark-border rounded-xl p-5 flex items-center gap-4">
      <div
        className={clsx(
          'w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0',
          accentClasses[accent]
        )}
      >
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide">{label}</p>
        <p className="font-condensed text-3xl font-black text-white leading-tight">{value}</p>
        {trend && (
          <p
            className={clsx(
              'text-xs font-semibold mt-0.5',
              trendUp ? 'text-green-400' : 'text-red-400'
            )}
          >
            {trendUp ? '↑' : '↓'} {trend}
          </p>
        )}
      </div>
    </div>
  )
}

interface StatsStripProps {
  stats: DashboardStats
}

export function StatsStrip({ stats }: StatsStripProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
      <StatCard
        label="Today's Jobs"
        value={stats.todayJobs}
        icon={CalendarCheck}
        accent="green"
      />
      <StatCard
        label="Pending Quotes"
        value={stats.pendingQuotes}
        icon={MessageSquare}
        accent="yellow"
        trend="2 new today"
        trendUp={true}
      />
      <StatCard
        label="Active Clients"
        value={stats.activeCustomers}
        icon={Users}
        accent="blue"
      />
      <StatCard
        label="Month Revenue"
        value={`$${stats.monthRevenue.toLocaleString()}`}
        icon={DollarSign}
        accent="green"
        trend="vs last month"
        trendUp={true}
      />
      <StatCard
        label="Overdue Invoices"
        value={stats.overdueInvoices}
        icon={AlertCircle}
        accent={stats.overdueInvoices > 0 ? 'red' : 'green'}
      />
      <StatCard
        label="Completed / Week"
        value={stats.completedThisWeek}
        icon={CheckCircle2}
        accent="green"
      />
    </div>
  )
}
