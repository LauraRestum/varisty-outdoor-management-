import { InvoiceStatusBadge } from '@/components/ui/Badge'
import { FileText, DollarSign, Calendar, Check } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Invoices | Varsity Outdoor Portal',
}

const INVOICES = [
  { id: 'inv1', number: 'VOM-2024-008', service: 'Lawn Mowing', date: 'March 24, 2026', due: 'April 7, 2026', amount: 65, status: 'pending' as const },
  { id: 'inv2', number: 'VOM-2024-007', service: 'Lawn Mowing', date: 'March 10, 2026', due: 'March 24, 2026', amount: 65, status: 'paid' as const },
  { id: 'inv3', number: 'VOM-2024-006', service: 'Fertilization', date: 'February 28, 2026', due: 'March 14, 2026', amount: 55, status: 'paid' as const },
  { id: 'inv4', number: 'VOM-2024-005', service: 'Lawn Mowing', date: 'February 24, 2026', due: 'March 10, 2026', amount: 65, status: 'paid' as const },
  { id: 'inv5', number: 'VOM-2024-004', service: 'Seasonal Cleanup', date: 'February 1, 2026', due: 'February 15, 2026', amount: 280, status: 'paid' as const },
]

const totalPending = INVOICES.filter(i => i.status === 'pending').reduce((s, i) => s + i.amount, 0)
const totalPaid = INVOICES.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0)

export default function PortalInvoicesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-condensed text-3xl font-black uppercase text-white">My Invoices</h1>
        <p className="text-gray-400 mt-1">View and pay your outstanding invoices</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-yellow-900/20 border border-yellow-800/50 rounded-xl p-5 text-center">
          <DollarSign className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
          <div className="font-condensed text-3xl font-black text-yellow-400">${totalPending}</div>
          <div className="text-gray-400 text-sm mt-1">Outstanding</div>
        </div>
        <div className="bg-green-900/20 border border-green-800/50 rounded-xl p-5 text-center">
          <Check className="w-6 h-6 text-brand-green mx-auto mb-2" />
          <div className="font-condensed text-3xl font-black text-brand-green">${totalPaid}</div>
          <div className="text-gray-400 text-sm mt-1">Paid Total</div>
        </div>
      </div>

      {/* Invoices List */}
      <div className="space-y-3">
        {INVOICES.map((invoice) => (
          <div key={invoice.id} className={`bg-dark-card border rounded-xl p-5 ${invoice.status === 'pending' ? 'border-yellow-800/40' : 'border-dark-border'}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-dark-muted/50 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-bold text-white">{invoice.service}</p>
                    <InvoiceStatusBadge status={invoice.status} />
                  </div>
                  <p className="text-gray-500 text-xs font-mono">{invoice.number}</p>
                  <div className="flex gap-4 mt-2 text-sm">
                    <span className="flex items-center gap-1.5 text-gray-400">
                      <Calendar className="w-3.5 h-3.5" /> {invoice.date}
                    </span>
                    <span className="text-gray-500">Due: {invoice.due}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-condensed text-2xl font-black text-brand-green">${invoice.amount}</p>
                {invoice.status === 'pending' && (
                  <button className="mt-2 text-xs bg-brand-green text-black font-bold px-3 py-1.5 rounded-lg hover:bg-brand-green-dark transition-colors">
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
