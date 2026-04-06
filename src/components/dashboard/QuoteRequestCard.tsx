import { clsx } from 'clsx'
import { Mail, Phone, MapPin, Clock, AlertTriangle, ChevronRight } from 'lucide-react'
import { QuoteStatusBadge } from '@/components/ui/Badge'
import type { Quote } from '@/types'

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

function timeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return `${Math.floor(seconds / 86400)}d ago`
}

interface QuoteRequestCardProps {
  quote: Quote
  onClick?: () => void
  compact?: boolean
}

export function QuoteRequestCard({ quote, onClick, compact = false }: QuoteRequestCardProps) {
  const isCommercial = quote.is_commercial || quote.property_size === '3+-acres'

  return (
    <div
      className={clsx(
        'bg-dark-card border border-dark-border rounded-xl transition-all duration-200',
        onClick && 'cursor-pointer hover:border-brand-green/30',
        compact ? 'p-4' : 'p-5'
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <QuoteStatusBadge status={quote.status} />
            {isCommercial && (
              <span className="inline-flex items-center gap-1 text-xs bg-red-900/40 border border-red-800 text-red-400 px-2 py-0.5 rounded-full font-semibold">
                <AlertTriangle className="w-3 h-3" />
                Commercial
              </span>
            )}
            {quote.services.includes('snow-removal') && (
              <span className="text-xs bg-blue-900/40 border border-blue-800 text-blue-400 px-2 py-0.5 rounded-full font-semibold">
                Snow
              </span>
            )}
          </div>

          {/* Name */}
          <p className="font-bold text-white text-base">
            {quote.first_name} {quote.last_name}
          </p>

          {/* Services */}
          <p className="text-brand-green text-sm font-semibold mt-0.5">
            {quote.services.map((s) => SERVICE_LABELS[s] || s).join(', ')}
          </p>

          {/* Details */}
          <div className={clsx('flex flex-wrap gap-x-4 gap-y-1 mt-2', compact ? 'text-xs' : 'text-sm')}>
            <span className="flex items-center gap-1.5 text-gray-400">
              <MapPin className="w-3.5 h-3.5" />
              {quote.city}, {quote.state}
            </span>
            <span className="flex items-center gap-1.5 text-gray-400">
              <Clock className="w-3.5 h-3.5" />
              {timeAgo(quote.created_at)}
            </span>
          </div>

          {/* Contact (non-compact) */}
          {!compact && (
            <div className="flex gap-4 mt-2">
              <a
                href={`mailto:${quote.email}`}
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Mail className="w-3 h-3" />
                {quote.email}
              </a>
              <a
                href={`tel:${quote.phone}`}
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Phone className="w-3 h-3" />
                {quote.phone}
              </a>
            </div>
          )}
        </div>

        {onClick && <ChevronRight className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1" />}
      </div>
    </div>
  )
}
