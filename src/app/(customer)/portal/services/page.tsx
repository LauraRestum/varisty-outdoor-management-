import { JobStatusBadge } from '@/components/ui/Badge'
import { CalendarCheck, Clock, MapPin, DollarSign } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Services | Varsity Outdoor Portal',
}

const JOBS = [
  { id: '1', service: 'Lawn Mowing', date: new Date(Date.now() + 3 * 86400000).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }), time: '8:00 AM', status: 'scheduled' as const, city: 'Dublin', price: 65 },
  { id: '2', service: 'Fertilization', date: new Date(Date.now() + 17 * 86400000).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }), time: '10:00 AM', status: 'scheduled' as const, city: 'Dublin', price: 55 },
  { id: '3', service: 'Lawn Mowing', date: 'March 24, 2026', time: '8:00 AM', status: 'completed' as const, city: 'Dublin', price: 65 },
  { id: '4', service: 'Lawn Mowing', date: 'March 10, 2026', time: '8:00 AM', status: 'completed' as const, city: 'Dublin', price: 65 },
  { id: '5', service: 'Lawn Mowing', date: 'February 24, 2026', time: '9:00 AM', status: 'completed' as const, city: 'Dublin', price: 65 },
  { id: '6', service: 'Seasonal Cleanup', date: 'February 1, 2026', time: '8:00 AM', status: 'completed' as const, city: 'Dublin', price: 280 },
]

export default function PortalServicesPage() {
  const upcoming = JOBS.filter((j) => j.status === 'scheduled')
  const completed = JOBS.filter((j) => j.status === 'completed')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-condensed text-3xl font-black uppercase text-white">My Services</h1>
        <p className="text-gray-400 mt-1">All upcoming and completed service visits</p>
      </div>

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <div>
          <h2 className="font-condensed text-xl font-bold uppercase text-white mb-4 flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-blue-400" />
            Upcoming ({upcoming.length})
          </h2>
          <div className="space-y-3">
            {upcoming.map((job) => (
              <div key={job.id} className="bg-dark-card border border-blue-800/30 rounded-xl p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-bold text-white text-lg">{job.service}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm">
                      <span className="flex items-center gap-1.5 text-gray-400"><Clock className="w-3.5 h-3.5" />{job.date} at {job.time}</span>
                      <span className="flex items-center gap-1.5 text-gray-400"><MapPin className="w-3.5 h-3.5" />{job.city}, OH</span>
                      <span className="flex items-center gap-1.5 text-brand-green font-semibold"><DollarSign className="w-3.5 h-3.5" />${job.price}</span>
                    </div>
                  </div>
                  <JobStatusBadge status={job.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed */}
      <div>
        <h2 className="font-condensed text-xl font-bold uppercase text-white mb-4">Service History ({completed.length})</h2>
        <div className="space-y-2">
          {completed.map((job) => (
            <div key={job.id} className="bg-dark-card border border-dark-border rounded-xl p-4 flex items-center gap-4">
              <div className="flex-1">
                <p className="font-semibold text-white">{job.service}</p>
                <p className="text-gray-500 text-sm">{job.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-brand-green text-sm font-semibold">${job.price}</span>
                <JobStatusBadge status={job.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
