'use client'

import { useState } from 'react'
import { InvoiceCard } from '@/components/dashboard/InvoiceCard'
import { Modal } from '@/components/ui/Modal'
import { InvoiceStatusBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { clsx } from 'clsx'
import { DollarSign, FileText, Plus } from 'lucide-react'
import type { Invoice, InvoiceStatus } from '@/types'

const TODAY = new Date().toISOString().split('T')[0]
const PAST_DUE = new Date(Date.now() - 15 * 86400000).toISOString().split('T')[0]

const SAMPLE_INVOICES: Invoice[] = [
  {
    id: 'inv1', customer_id: 'c1', job_id: 'j1', invoice_number: 'VOM-2024-001', status: 'pending',
    due_date: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0], paid_at: null, subtotal: 65, tax: 0, total: 65, notes: null,
    customer: { id: 'c1', profile_id: null, full_name: 'Sarah Mitchell', email: 'sarah@email.com', phone: '(614) 555-0101', address: '123 Oak St', city: 'Dublin', state: 'OH', zip: '43016', property_size: '1/4-to-1/2-acre', property_type: 'residential', notes: null, created_at: TODAY, updated_at: TODAY },
    created_at: TODAY, updated_at: TODAY,
  },
  {
    id: 'inv2', customer_id: 'c2', job_id: 'j2', invoice_number: 'VOM-2024-002', status: 'overdue',
    due_date: PAST_DUE, paid_at: null, subtotal: 850, tax: 0, total: 850, notes: 'Follow up required',
    customer: { id: 'c2', profile_id: null, full_name: 'James Rodriguez', email: 'james@email.com', phone: '(614) 555-0102', address: '456 Elm Ave', city: 'Westerville', state: 'OH', zip: '43081', property_size: '1/2-to-1-acre', property_type: 'residential', notes: null, created_at: TODAY, updated_at: TODAY },
    created_at: TODAY, updated_at: TODAY,
  },
  {
    id: 'inv3', customer_id: 'c3', job_id: 'j3', invoice_number: 'VOM-2024-003', status: 'paid',
    due_date: new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0], paid_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    subtotal: 55, tax: 0, total: 55, notes: null,
    customer: { id: 'c3', profile_id: null, full_name: 'Tom Kowalski', email: 'tom@email.com', phone: '(614) 555-0103', address: '789 Maple Dr', city: 'Hilliard', state: 'OH', zip: '43026', property_size: 'under-1/4-acre', property_type: 'residential', notes: null, created_at: TODAY, updated_at: TODAY },
    created_at: TODAY, updated_at: TODAY,
  },
  {
    id: 'inv4', customer_id: 'c6', job_id: 'j4', invoice_number: 'VOM-2024-004', status: 'overdue',
    due_date: new Date(Date.now() - 20 * 86400000).toISOString().split('T')[0], paid_at: null, subtotal: 1200, tax: 0, total: 1200, notes: null,
    customer: { id: 'c6', profile_id: null, full_name: 'BizCo Properties', email: 'mgmt@bizco.com', phone: '(614) 555-0200', address: '555 Business Pkwy', city: 'Dublin', state: 'OH', zip: '43016', property_size: '3+-acres', property_type: 'commercial', notes: null, created_at: TODAY, updated_at: TODAY },
    created_at: TODAY, updated_at: TODAY,
  },
]

const STATUS_FILTERS: { value: InvoiceStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'overdue', label: 'Overdue' },
  { value: 'paid', label: 'Paid' },
]

export default function InvoicesPage() {
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | 'all'>('all')
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)

  const filtered = SAMPLE_INVOICES.filter((inv) => statusFilter === 'all' || inv.status === statusFilter)

  const totalPending = SAMPLE_INVOICES.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.total, 0)
  const totalOverdue = SAMPLE_INVOICES.filter(i => i.status === 'overdue').reduce((sum, i) => sum + i.total, 0)
  const totalPaid = SAMPLE_INVOICES.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.total, 0)

  return (
    <div className="p-5 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-condensed text-3xl font-black uppercase text-white">Invoices</h1>
          <p className="text-gray-400 mt-1">{SAMPLE_INVOICES.filter(i => i.status === 'overdue').length} overdue need attention</p>
        </div>
        <Button variant="primary" size="md" className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Invoice
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Pending', amount: totalPending, color: 'text-yellow-400', bg: 'bg-yellow-900/20 border-yellow-800/50' },
          { label: 'Overdue', amount: totalOverdue, color: 'text-red-400', bg: 'bg-red-900/20 border-red-800/50' },
          { label: 'Paid This Month', amount: totalPaid, color: 'text-brand-green', bg: 'bg-green-900/20 border-green-800/50' },
        ].map(({ label, amount, color, bg }) => (
          <div key={label} className={`rounded-xl border p-4 ${bg}`}>
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide">{label}</p>
            <p className={`font-condensed text-2xl font-black mt-1 ${color}`}>${amount.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
        {STATUS_FILTERS.map((f) => (
          <button key={f.value} onClick={() => setStatusFilter(f.value)}
            className={clsx('flex-shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-colors min-h-[44px]',
              statusFilter === f.value ? 'bg-brand-green text-black' : 'bg-dark-card border border-dark-border text-gray-400 hover:text-white')}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((invoice) => (
          <InvoiceCard key={invoice.id} invoice={invoice} onClick={() => setSelectedInvoice(invoice)} />
        ))}
      </div>

      <Modal open={!!selectedInvoice} onClose={() => setSelectedInvoice(null)}
        title={selectedInvoice ? `Invoice ${selectedInvoice.invoice_number}` : ''}>
        {selectedInvoice && (
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <InvoiceStatusBadge status={selectedInvoice.status} />
            </div>
            <div className="space-y-2 text-sm">
              {[
                { label: 'Customer', value: selectedInvoice.customer?.full_name || '' },
                { label: 'Due Date', value: new Date(selectedInvoice.due_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) },
                { label: 'Subtotal', value: `$${selectedInvoice.subtotal.toFixed(2)}` },
                { label: 'Tax', value: `$${selectedInvoice.tax.toFixed(2)}` },
                { label: 'Total', value: `$${selectedInvoice.total.toFixed(2)}` },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between py-2 border-b border-dark-border">
                  <span className="text-gray-400">{label}</span>
                  <span className={clsx('font-semibold', label === 'Total' ? 'text-brand-green font-black text-base' : 'text-white')}>{value}</span>
                </div>
              ))}
            </div>
            {selectedInvoice.notes && (
              <div className="bg-dark-bg border border-dark-border rounded-xl p-4">
                <p className="text-gray-500 text-xs uppercase font-semibold mb-1">Notes</p>
                <p className="text-gray-300 text-sm">{selectedInvoice.notes}</p>
              </div>
            )}
            <div className="flex gap-3 pt-2 border-t border-dark-border">
              {selectedInvoice.status !== 'paid' && (
                <Button variant="primary" size="md" fullWidth>Mark as Paid</Button>
              )}
              <Button variant="secondary" size="md" className="flex items-center gap-2">
                <FileText className="w-4 h-4" /> View PDF
              </Button>
              <Button variant="ghost" size="md" className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" /> Send Reminder
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
