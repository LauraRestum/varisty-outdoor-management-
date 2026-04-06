import Link from 'next/link'
import { ArrowRight, Plus } from 'lucide-react'
import { StatsStrip } from '@/components/dashboard/StatsStrip'
import { JobCard } from '@/components/dashboard/JobCard'
import { WeatherWidget } from '@/components/dashboard/WeatherWidget'
import { QuoteRequestCard } from '@/components/dashboard/QuoteRequestCard'
import type { DashboardStats, Job, Quote } from '@/types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard Overview | Varsity Outdoor Management',
}

// Sample data — replace with real Supabase queries
const SAMPLE_STATS: DashboardStats = {
  todayJobs: 8,
  pendingQuotes: 12,
  activeCustomers: 87,
  monthRevenue: 18450,
  overdueInvoices: 3,
  completedThisWeek: 34,
}

const TODAY = new Date().toISOString().split('T')[0]

const SAMPLE_JOBS: Job[] = [
  {
    id: '1',
    customer_id: 'c1',
    customer: { id: 'c1', profile_id: null, full_name: 'Sarah Mitchell', email: 'sarah@email.com', phone: '(614) 555-0101', address: '123 Oak St', city: 'Dublin', state: 'OH', zip: '43016', property_size: '1/4-to-1/2-acre', property_type: 'residential', notes: null, created_at: TODAY, updated_at: TODAY },
    service_type: 'lawn-mowing',
    status: 'scheduled',
    scheduled_date: TODAY,
    scheduled_time: '8:00 AM',
    completed_at: null,
    address: '123 Oak St',
    city: 'Dublin',
    state: 'OH',
    zip: '43016',
    notes: 'Gate code: 1234',
    internal_notes: null,
    crew_size: 2,
    estimated_hours: 1.5,
    actual_hours: null,
    price: 65,
    created_at: TODAY,
    updated_at: TODAY,
  },
  {
    id: '2',
    customer_id: 'c2',
    customer: { id: 'c2', profile_id: null, full_name: 'James Rodriguez', email: 'james@email.com', phone: '(614) 555-0102', address: '456 Elm Ave', city: 'Westerville', state: 'OH', zip: '43081', property_size: '1/2-to-1-acre', property_type: 'residential', notes: null, created_at: TODAY, updated_at: TODAY },
    service_type: 'landscaping',
    status: 'in_progress',
    scheduled_date: TODAY,
    scheduled_time: '9:30 AM',
    completed_at: null,
    address: '456 Elm Ave',
    city: 'Westerville',
    state: 'OH',
    zip: '43081',
    notes: 'Phase 2 bed installation',
    internal_notes: null,
    crew_size: 3,
    estimated_hours: 6,
    actual_hours: null,
    price: 850,
    created_at: TODAY,
    updated_at: TODAY,
  },
  {
    id: '3',
    customer_id: 'c3',
    customer: { id: 'c3', profile_id: null, full_name: 'Tom Kowalski', email: 'tom@email.com', phone: '(614) 555-0103', address: '789 Maple Dr', city: 'Hilliard', state: 'OH', zip: '43026', property_size: 'under-1/4-acre', property_type: 'residential', notes: null, created_at: TODAY, updated_at: TODAY },
    service_type: 'fertilization',
    status: 'scheduled',
    scheduled_date: TODAY,
    scheduled_time: '1:00 PM',
    completed_at: null,
    address: '789 Maple Dr',
    city: 'Hilliard',
    state: 'OH',
    zip: '43026',
    notes: null,
    internal_notes: null,
    crew_size: 1,
    estimated_hours: 0.75,
    actual_hours: null,
    price: 55,
    created_at: TODAY,
    updated_at: TODAY,
  },
]

const SAMPLE_QUOTES: Quote[] = [
  {
    id: 'q1',
    customer_id: null,
    first_name: 'Linda',
    last_name: 'Park',
    email: 'linda@email.com',
    phone: '(614) 555-0201',
    address: '321 Pine St',
    city: 'Columbus',
    state: 'OH',
    zip: '43215',
    property_size: '1/4-to-1/2-acre',
    property_type: 'residential',
    services: ['lawn-mowing', 'fertilization'],
    frequency: 'bi-weekly',
    details: 'Looking for consistent service',
    has_fence: true,
    has_gate: false,
    gate_code: null,
    has_irrigation: false,
    snow_removal_priority: null,
    is_commercial: false,
    status: 'pending',
    estimated_price_low: null,
    estimated_price_high: null,
    notes: null,
    created_at: new Date(Date.now() - 3600000).toISOString(),
    updated_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'q2',
    customer_id: null,
    first_name: 'Marcus',
    last_name: 'Williams',
    email: 'marcus@bizco.com',
    phone: '(614) 555-0202',
    address: '555 Business Pkwy',
    city: 'Dublin',
    state: 'OH',
    zip: '43016',
    property_size: '3+-acres',
    property_type: 'commercial',
    services: ['lawn-mowing', 'snow-removal', 'landscaping'],
    frequency: 'weekly',
    details: 'Large office complex — need reliable team',
    has_fence: false,
    has_gate: false,
    gate_code: null,
    has_irrigation: true,
    snow_removal_priority: 'priority',
    is_commercial: true,
    status: 'pending',
    estimated_price_low: null,
    estimated_price_high: null,
    notes: null,
    created_at: new Date(Date.now() - 7200000).toISOString(),
    updated_at: new Date(Date.now() - 7200000).toISOString(),
  },
]

export default function DashboardPage() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="p-5 md:p-8 space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-condensed text-3xl md:text-4xl font-black uppercase text-white">
            Good Morning 👋
          </h1>
          <p className="text-gray-400 mt-1">{today}</p>
        </div>
        <Link
          href="/dashboard/jobs"
          className="hidden sm:flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-black font-bold px-4 py-2.5 rounded-xl transition-colors text-sm uppercase"
        >
          <Plus className="w-4 h-4" /> New Job
        </Link>
      </div>

      {/* Stats Strip */}
      <StatsStrip stats={SAMPLE_STATS} />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Jobs */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-condensed text-xl font-bold uppercase text-white">
              Today&apos;s Jobs
              <span className="ml-2 text-brand-green">({SAMPLE_JOBS.length})</span>
            </h2>
            <Link
              href="/dashboard/jobs"
              className="text-sm text-brand-green hover:text-brand-green-light font-semibold flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {SAMPLE_JOBS.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Weather */}
          <WeatherWidget
            city="Columbus, OH"
            temp={62}
            description="Partly Cloudy"
            humidity={58}
            windSpeed={9}
          />

          {/* Recent Quote Requests */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-condensed text-xl font-bold uppercase text-white">
                New Quotes
                <span className="ml-2 text-yellow-400">({SAMPLE_QUOTES.length})</span>
              </h2>
              <Link
                href="/dashboard/quotes"
                className="text-sm text-brand-green hover:text-brand-green-light font-semibold flex items-center gap-1"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {SAMPLE_QUOTES.map((quote) => (
                <QuoteRequestCard key={quote.id} quote={quote} compact />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions (mobile) */}
      <div className="md:hidden grid grid-cols-2 gap-3">
        {[
          { href: '/dashboard/jobs', label: 'All Jobs', count: '8 today' },
          { href: '/dashboard/quotes', label: 'Quotes', count: '12 pending' },
          { href: '/dashboard/customers', label: 'Customers', count: '87 active' },
          { href: '/dashboard/invoices', label: 'Invoices', count: '3 overdue' },
        ].map(({ href, label, count }) => (
          <Link
            key={href}
            href={href}
            className="bg-dark-card border border-dark-border rounded-xl p-4 flex flex-col gap-1 hover:border-brand-green/30 transition-colors"
          >
            <span className="text-white font-bold text-sm">{label}</span>
            <span className="text-brand-green text-xs font-semibold">{count}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
