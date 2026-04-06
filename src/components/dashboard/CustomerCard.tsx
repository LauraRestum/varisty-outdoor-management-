import { clsx } from 'clsx'
import { Mail, Phone, MapPin, Home, Building2, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import type { Customer } from '@/types'

interface CustomerCardProps {
  customer: Customer
  onClick?: () => void
  jobCount?: number
}

export function CustomerCard({ customer, onClick, jobCount }: CustomerCardProps) {
  return (
    <div
      className={clsx(
        'bg-dark-card border border-dark-border rounded-xl p-5 transition-all duration-200',
        onClick && 'cursor-pointer hover:border-brand-green/30 hover:bg-dark-muted/10'
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center text-brand-green font-black text-lg flex-shrink-0">
          {customer.full_name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)}
        </div>

        <div className="flex-1 min-w-0">
          {/* Name & type */}
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <p className="font-bold text-white text-base truncate">{customer.full_name}</p>
            <Badge
              variant={customer.property_type === 'commercial' ? 'blue' : 'gray'}
              size="sm"
            >
              {customer.property_type === 'commercial' ? (
                <Building2 className="w-3 h-3" />
              ) : (
                <Home className="w-3 h-3" />
              )}
              {customer.property_type}
            </Badge>
          </div>

          {/* Contact */}
          <div className="space-y-1">
            <a
              href={`tel:${customer.phone}`}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Phone className="w-3.5 h-3.5 text-brand-green" />
              {customer.phone}
            </a>
            <a
              href={`mailto:${customer.email}`}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Mail className="w-3.5 h-3.5 text-brand-green" />
              <span className="truncate">{customer.email}</span>
            </a>
            <p className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin className="w-3.5 h-3.5" />
              {customer.address}, {customer.city}, {customer.state}
            </p>
          </div>

          {/* Footer */}
          {jobCount !== undefined && (
            <div className="mt-3 pt-3 border-t border-dark-border flex items-center justify-between">
              <span className="text-xs text-gray-500">
                {jobCount} {jobCount === 1 ? 'job' : 'jobs'} total
              </span>
              <span className="text-xs text-gray-600 capitalize">
                {customer.property_size?.replace(/-/g, ' ')}
              </span>
            </div>
          )}
        </div>

        {onClick && <ChevronRight className="w-5 h-5 text-gray-600 flex-shrink-0" />}
      </div>
    </div>
  )
}
