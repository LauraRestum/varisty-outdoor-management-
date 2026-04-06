import { clsx } from 'clsx'
import { MapPin, Clock, Users, DollarSign, ChevronRight } from 'lucide-react'
import { JobStatusBadge } from '@/components/ui/Badge'
import type { Job } from '@/types'

const SERVICE_LABELS: Record<string, string> = {
  'lawn-mowing': 'Lawn Mowing',
  landscaping: 'Landscaping',
  'snow-removal': 'Snow Removal',
  irrigation: 'Irrigation',
  'tree-shrub-care': 'Tree & Shrub Care',
  hardscaping: 'Hardscaping',
  fertilization: 'Fertilization',
  'seasonal-cleanup': 'Seasonal Cleanup',
}

interface JobCardProps {
  job: Job
  compact?: boolean
  onClick?: () => void
}

export function JobCard({ job, compact = false, onClick }: JobCardProps) {
  return (
    <div
      className={clsx(
        'bg-dark-card border border-dark-border rounded-xl transition-all duration-200',
        onClick && 'cursor-pointer hover:border-brand-green/30 hover:bg-dark-muted/20',
        compact ? 'p-4' : 'p-5'
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <JobStatusBadge status={job.status} />
            <span className="text-brand-green text-xs font-bold uppercase tracking-wide">
              {SERVICE_LABELS[job.service_type] || job.service_type}
            </span>
          </div>

          {/* Customer Name */}
          <p className="font-bold text-white text-base truncate">
            {job.customer?.full_name || 'Unknown Customer'}
          </p>

          {/* Details */}
          <div className={clsx('flex flex-wrap gap-x-4 gap-y-1 mt-2', compact ? 'text-xs' : 'text-sm')}>
            <span className="flex items-center gap-1 text-gray-400">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              {job.city}, {job.state}
            </span>
            {job.scheduled_time && (
              <span className="flex items-center gap-1 text-gray-400">
                <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                {job.scheduled_time}
              </span>
            )}
            <span className="flex items-center gap-1 text-gray-400">
              <Users className="w-3.5 h-3.5 flex-shrink-0" />
              {job.crew_size} crew
            </span>
            {job.price && (
              <span className="flex items-center gap-1 text-brand-green font-semibold">
                <DollarSign className="w-3.5 h-3.5 flex-shrink-0" />
                {job.price.toFixed(0)}
              </span>
            )}
          </div>

          {/* Notes */}
          {!compact && job.notes && (
            <p className="mt-2 text-sm text-gray-500 truncate">{job.notes}</p>
          )}
        </div>

        {onClick && <ChevronRight className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1" />}
      </div>
    </div>
  )
}
