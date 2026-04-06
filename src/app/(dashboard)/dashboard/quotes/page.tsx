'use client'

import { useState } from 'react'
import { QuoteRequestCard } from '@/components/dashboard/QuoteRequestCard'
import { Modal } from '@/components/ui/Modal'
import { QuoteStatusBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { clsx } from 'clsx'
import { Search, AlertTriangle, Mail, Phone, MapPin } from 'lucide-react'
import type { Quote, QuoteStatus } from '@/types'

const NOW = new Date().toISOString()
const SAMPLE_QUOTES: Quote[] = [
  {
    id: 'q1', customer_id: null, first_name: 'Linda', last_name: 'Park', email: 'linda@email.com', phone: '(614) 555-0201',
    address: '321 Pine St', city: 'Columbus', state: 'OH', zip: '43215', property_size: '1/4-to-1/2-acre', property_type: 'residential',
    services: ['lawn-mowing', 'fertilization'], frequency: 'bi-weekly', details: 'Looking for consistent service all season', has_fence: true, has_gate: false, gate_code: null, has_irrigation: false, snow_removal_priority: null, is_commercial: false, status: 'pending', estimated_price_low: null, estimated_price_high: null, notes: null, created_at: new Date(Date.now() - 3600000).toISOString(), updated_at: NOW,
  },
  {
    id: 'q2', customer_id: null, first_name: 'Marcus', last_name: 'Williams', email: 'marcus@bizco.com', phone: '(614) 555-0202',
    address: '555 Business Pkwy', city: 'Dublin', state: 'OH', zip: '43016', property_size: '3+-acres', property_type: 'commercial',
    services: ['lawn-mowing', 'snow-removal', 'landscaping'], frequency: 'weekly', details: 'Large office complex', has_fence: false, has_gate: false, gate_code: null, has_irrigation: true, snow_removal_priority: 'priority', is_commercial: true, status: 'pending', estimated_price_low: null, estimated_price_high: null, notes: null, created_at: new Date(Date.now() - 7200000).toISOString(), updated_at: NOW,
  },
  {
    id: 'q3', customer_id: null, first_name: 'Amy', last_name: 'Johnson', email: 'amy@email.com', phone: '(614) 555-0203',
    address: '888 Willow Way', city: 'Hilliard', state: 'OH', zip: '43026', property_size: '1/2-to-1-acre', property_type: 'residential',
    services: ['seasonal-cleanup', 'landscaping'], frequency: 'one-time', details: null, has_fence: false, has_gate: false, gate_code: null, has_irrigation: false, snow_removal_priority: null, is_commercial: false, status: 'sent', estimated_price_low: 450, estimated_price_high: 650, notes: null, created_at: new Date(Date.now() - 86400000).toISOString(), updated_at: NOW,
  },
  {
    id: 'q4', customer_id: null, first_name: 'David', last_name: 'Kim', email: 'david@email.com', phone: '(614) 555-0204',
    address: '222 Oak Lane', city: 'Westerville', state: 'OH', zip: '43081', property_size: '1/4-to-1/2-acre', property_type: 'residential',
    services: ['lawn-mowing'], frequency: 'weekly', details: null, has_fence: true, has_gate: true, gate_code: '5678', has_irrigation: false, snow_removal_priority: null, is_commercial: false, status: 'accepted', estimated_price_low: 55, estimated_price_high: 65, notes: null, created_at: new Date(Date.now() - 172800000).toISOString(), updated_at: NOW,
  },
]

const STATUS_FILTERS: { value: QuoteStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'sent', label: 'Sent' },
  { value: 'viewed', label: 'Viewed' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'declined', label: 'Declined' },
]

const SERVICE_LABELS: Record<string, string> = {
  'lawn-mowing': 'Lawn Mowing', landscaping: 'Landscaping', 'snow-removal': 'Snow Removal',
  irrigation: 'Irrigation', 'tree-shrub-care': 'Tree & Shrub Care', hardscaping: 'Hardscaping',
  fertilization: 'Fertilization', 'seasonal-cleanup': 'Seasonal Cleanup',
}

export default function QuotesPage() {
  const [statusFilter, setStatusFilter] = useState<QuoteStatus | 'all'>('all')
  const [search, setSearch] = useState('')
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)

  const filtered = SAMPLE_QUOTES.filter((q) => {
    const matchesStatus = statusFilter === 'all' || q.status === statusFilter
    const s = search.toLowerCase()
    const matchesSearch = !search || `${q.first_name} ${q.last_name}`.toLowerCase().includes(s) || q.email.toLowerCase().includes(s) || q.city.toLowerCase().includes(s)
    return matchesStatus && matchesSearch
  })

  return (
    <div className="p-5 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-condensed text-3xl font-black uppercase text-white">Quote Requests</h1>
          <p className="text-gray-400 mt-1">{SAMPLE_QUOTES.filter(q => q.status === 'pending').length} pending review</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search by name or city..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full min-h-[44px] bg-dark-card border border-dark-border rounded-xl text-white text-sm pl-9 pr-4 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green transition-colors" />
        </div>
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
          {STATUS_FILTERS.map((f) => (
            <button key={f.value} onClick={() => setStatusFilter(f.value)}
              className={clsx('flex-shrink-0 px-3 py-2 rounded-lg text-sm font-semibold transition-colors min-h-[44px]',
                statusFilter === f.value ? 'bg-brand-green text-black' : 'bg-dark-card border border-dark-border text-gray-400 hover:text-white')}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((quote) => (
          <QuoteRequestCard key={quote.id} quote={quote} onClick={() => setSelectedQuote(quote)} />
        ))}
      </div>

      <Modal open={!!selectedQuote} onClose={() => setSelectedQuote(null)}
        title={selectedQuote ? `${selectedQuote.first_name} ${selectedQuote.last_name} — Quote Request` : ''} size="lg">
        {selectedQuote && (
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <QuoteStatusBadge status={selectedQuote.status} />
              {selectedQuote.is_commercial && (
                <span className="inline-flex items-center gap-1 text-xs bg-red-900/40 border border-red-800 text-red-400 px-2 py-0.5 rounded-full font-semibold">
                  <AlertTriangle className="w-3 h-3" /> Commercial — Custom Pricing
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="col-span-2 bg-dark-bg border border-dark-border rounded-xl p-4">
                <p className="text-gray-500 text-xs uppercase font-semibold mb-2">Contact</p>
                <div className="space-y-1">
                  <p className="flex items-center gap-2 text-white"><Mail className="w-4 h-4 text-brand-green" />{selectedQuote.email}</p>
                  <p className="flex items-center gap-2 text-white"><Phone className="w-4 h-4 text-brand-green" />{selectedQuote.phone}</p>
                  <p className="flex items-center gap-2 text-gray-300"><MapPin className="w-4 h-4 text-brand-green" />{selectedQuote.address}, {selectedQuote.city}, {selectedQuote.state}</p>
                </div>
              </div>
              <div className="bg-dark-bg border border-dark-border rounded-xl p-4">
                <p className="text-gray-500 text-xs uppercase font-semibold mb-2">Services</p>
                <p className="text-white text-sm">{selectedQuote.services.map(s => SERVICE_LABELS[s] || s).join(', ')}</p>
                <p className="text-gray-400 text-xs mt-1 capitalize">Freq: {selectedQuote.frequency}</p>
              </div>
              <div className="bg-dark-bg border border-dark-border rounded-xl p-4">
                <p className="text-gray-500 text-xs uppercase font-semibold mb-2">Property</p>
                <p className="text-white text-sm capitalize">{selectedQuote.property_type}</p>
                <p className="text-gray-400 text-xs mt-1">{selectedQuote.property_size}</p>
              </div>
            </div>

            {selectedQuote.details && (
              <div className="bg-dark-bg border border-dark-border rounded-xl p-4">
                <p className="text-gray-500 text-xs uppercase font-semibold mb-2">Notes from Customer</p>
                <p className="text-gray-300 text-sm">{selectedQuote.details}</p>
              </div>
            )}

            <div className="flex gap-3 pt-2 border-t border-dark-border">
              <Button variant="primary" size="md" fullWidth>Send Quote</Button>
              <Button variant="secondary" size="md">Schedule Visit</Button>
              <Button variant="ghost" size="md">Decline</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
