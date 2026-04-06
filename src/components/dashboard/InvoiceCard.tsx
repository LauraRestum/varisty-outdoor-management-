import { clsx } from 'clsx'
import { Calendar, DollarSign, FileText, ChevronRight } from 'lucide-react'
import { InvoiceStatusBadge } from '@/components/ui/Badge'
import type { Invoice } from '@/types'

interface InvoiceCardProps {
  invoice: Invoice
  onClick?: () => void
}

export function InvoiceCard({ invoice, onClick }: InvoiceCardProps) {
  const dueDate = new Date(invoice.due_date)
  const isOverdue = invoice.status === 'overdue' || (invoice.status === 'pending' && dueDate < new Date())

  return (
    <div
      className={clsx(
        'bg-dark-card border rounded-xl p-5 transition-all duration-200',
        isOverdue ? 'border-red-800/50' : 'border-dark-border',
        onClick && 'cursor-pointer hover:border-brand-green/30'
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <InvoiceStatusBadge status={invoice.status} />
            <span className="text-gray-500 text-xs font-mono">{invoice.invoice_number}</span>
          </div>

          {/* Customer */}
          <p className="font-bold text-white text-base">
            {invoice.customer?.full_name || 'Unknown Customer'}
          </p>

          {/* Details */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm">
            <span className="flex items-center gap-1.5 text-gray-400">
              <Calendar className="w-3.5 h-3.5" />
              Due {dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-brand-green" />
              <span className="text-brand-green font-bold">${invoice.total.toFixed(2)}</span>
            </span>
          </div>

          {/* Overdue Warning */}
          {isOverdue && (
            <p className="mt-2 text-xs text-red-400 font-semibold">
              ⚠️ Payment overdue — follow up required
            </p>
          )}
        </div>

        {/* Icon + Arrow */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-dark-muted/50 flex items-center justify-center">
            <FileText className="w-5 h-5 text-gray-400" />
          </div>
          {onClick && <ChevronRight className="w-5 h-5 text-gray-600" />}
        </div>
      </div>
    </div>
  )
}
