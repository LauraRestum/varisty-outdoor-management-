import Link from 'next/link'
import { CalendarCheck, FileText, List, ArrowRight, CheckCircle2, Clock } from 'lucide-react'
import { JobStatusBadge } from '@/components/ui/Badge'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Dashboard | Varsity Outdoor Management',
}

const TODAY = new Date().toISOString().split('T')[0]

// Sample customer portal data
const CUSTOMER = { name: 'Sarah', lastName: 'Mitchell' }
const UPCOMING_JOBS = [
  { id: '1', service: 'Lawn Mowing', date: new Date(Date.now() + 3 * 86400000).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }), time: '8:00 AM', status: 'scheduled' as const },
  { id: '2', service: 'Fertilization', date: new Date(Date.now() + 17 * 86400000).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }), time: '10:00 AM', status: 'scheduled' as const },
]

const RECENT_JOBS = [
  { id: '3', service: 'Lawn Mowing', date: 'March 24, 2026', status: 'completed' as const },
  { id: '4', service: 'Lawn Mowing', date: 'March 10, 2026', status: 'completed' as const },
]

export default function PortalPage() {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="font-condensed text-3xl font-black uppercase text-white">
          Welcome back, {CUSTOMER.name}! 👋
        </h1>
        <p className="text-gray-400 mt-1">
          Here&apos;s what&apos;s happening with your property.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: CalendarCheck, label: 'Upcoming Jobs', value: '2', color: 'text-blue-400', bg: 'bg-blue-900/20 border-blue-800/50' },
          { icon: CheckCircle2, label: 'Completed', value: '24', color: 'text-brand-green', bg: 'bg-green-900/20 border-green-800/50' },
          { icon: FileText, label: 'Open Invoices', value: '1', color: 'text-yellow-400', bg: 'bg-yellow-900/20 border-yellow-800/50' },
        ].map(({ icon: Icon, label, value, color, bg }) => (
          <div key={label} className={`rounded-xl border p-4 text-center ${bg}`}>
            <Icon className={`w-6 h-6 ${color} mx-auto mb-2`} />
            <div className={`font-condensed text-3xl font-black ${color}`}>{value}</div>
            <div className="text-gray-400 text-xs mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Upcoming Jobs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-condensed text-xl font-bold uppercase text-white">Upcoming Jobs</h2>
          <Link href="/portal/services" className="text-brand-green text-sm font-semibold flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="space-y-3">
          {UPCOMING_JOBS.map((job) => (
            <div key={job.id} className="bg-dark-card border border-dark-border rounded-xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-900/30 border border-blue-800/50 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-white">{job.service}</p>
                <p className="text-gray-400 text-sm">{job.date} at {job.time}</p>
              </div>
              <JobStatusBadge status={job.status} />
            </div>
          ))}
        </div>
      </div>

      {/* Recent Jobs */}
      <div>
        <h2 className="font-condensed text-xl font-bold uppercase text-white mb-4">Recent Service History</h2>
        <div className="space-y-2">
          {RECENT_JOBS.map((job) => (
            <div key={job.id} className="bg-dark-card border border-dark-border rounded-xl p-4 flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-brand-green/20 border border-brand-green/30 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 text-brand-green" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white text-sm">{job.service}</p>
                <p className="text-gray-500 text-xs">{job.date}</p>
              </div>
              <JobStatusBadge status={job.status} />
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Link href="/quote" className="block bg-brand-green hover:bg-brand-green-dark text-black font-black py-4 px-5 rounded-xl text-center transition-colors uppercase text-sm">
          Request New Service
        </Link>
        <Link href="/portal/invoices" className="block bg-dark-card border border-dark-border hover:border-brand-green/30 text-white font-bold py-4 px-5 rounded-xl text-center transition-colors text-sm">
          View Invoices
        </Link>
        <Link href="/contact" className="block bg-dark-card border border-dark-border hover:border-brand-green/30 text-white font-bold py-4 px-5 rounded-xl text-center transition-colors text-sm">
          Contact Support
        </Link>
      </div>
    </div>
  )
}
