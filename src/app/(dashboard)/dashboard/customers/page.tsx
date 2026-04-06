'use client'

import { useState } from 'react'
import { CustomerCard } from '@/components/dashboard/CustomerCard'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Search, Plus, Users } from 'lucide-react'
import { clsx } from 'clsx'
import type { Customer } from '@/types'

const TODAY = new Date().toISOString().split('T')[0]

const SAMPLE_CUSTOMERS: (Customer & { jobCount: number })[] = [
  { id: 'c1', profile_id: null, full_name: 'Sarah Mitchell', email: 'sarah@email.com', phone: '(614) 555-0101', address: '123 Oak St', city: 'Dublin', state: 'OH', zip: '43016', property_size: '1/4-to-1/2-acre', property_type: 'residential', notes: 'Prefers morning visits', created_at: TODAY, updated_at: TODAY, jobCount: 24 },
  { id: 'c2', profile_id: null, full_name: 'James Rodriguez', email: 'james@email.com', phone: '(614) 555-0102', address: '456 Elm Ave', city: 'Westerville', state: 'OH', zip: '43081', property_size: '1/2-to-1-acre', property_type: 'residential', notes: null, created_at: TODAY, updated_at: TODAY, jobCount: 18 },
  { id: 'c3', profile_id: null, full_name: 'Tom Kowalski', email: 'tom@email.com', phone: '(614) 555-0103', address: '789 Maple Dr', city: 'Hilliard', state: 'OH', zip: '43026', property_size: 'under-1/4-acre', property_type: 'residential', notes: null, created_at: TODAY, updated_at: TODAY, jobCount: 12 },
  { id: 'c4', profile_id: null, full_name: 'Lisa Chen', email: 'lisa@email.com', phone: '(614) 555-0104', address: '321 Birch Ln', city: 'New Albany', state: 'OH', zip: '43054', property_size: '1-to-3-acres', property_type: 'residential', notes: 'Has 2 dogs — call before arriving', created_at: TODAY, updated_at: TODAY, jobCount: 8 },
  { id: 'c5', profile_id: null, full_name: 'Marcus Thompson', email: 'marcus@email.com', phone: '(614) 555-0105', address: '654 Cedar Blvd', city: 'Gahanna', state: 'OH', zip: '43230', property_size: '1/4-to-1/2-acre', property_type: 'residential', notes: null, created_at: TODAY, updated_at: TODAY, jobCount: 16 },
  { id: 'c6', profile_id: null, full_name: 'BizCo Properties', email: 'mgmt@bizco.com', phone: '(614) 555-0200', address: '555 Business Pkwy', city: 'Dublin', state: 'OH', zip: '43016', property_size: '3+-acres', property_type: 'commercial', notes: 'Priority snow removal client', created_at: TODAY, updated_at: TODAY, jobCount: 45 },
]

export default function CustomersPage() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<'all' | 'residential' | 'commercial'>('all')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  const filtered = SAMPLE_CUSTOMERS.filter((c) => {
    const matchesType = typeFilter === 'all' || c.property_type === typeFilter
    const s = search.toLowerCase()
    const matchesSearch = !search || c.full_name.toLowerCase().includes(s) || c.email.toLowerCase().includes(s) || c.city.toLowerCase().includes(s)
    return matchesType && matchesSearch
  })

  return (
    <div className="p-5 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-condensed text-3xl font-black uppercase text-white">Customers</h1>
          <p className="text-gray-400 mt-1">{SAMPLE_CUSTOMERS.length} active clients</p>
        </div>
        <Button variant="primary" size="md" className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Customer
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full min-h-[44px] bg-dark-card border border-dark-border rounded-xl text-white text-sm pl-9 pr-4 py-2.5 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'residential', 'commercial'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={clsx(
                'px-4 py-2 rounded-lg text-sm font-semibold transition-colors min-h-[44px] capitalize',
                typeFilter === t
                  ? 'bg-brand-green text-black'
                  : 'bg-dark-card border border-dark-border text-gray-400 hover:text-white'
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <Users className="w-10 h-10 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No customers found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((customer) => (
            <CustomerCard
              key={customer.id}
              customer={customer}
              jobCount={customer.jobCount}
              onClick={() => setSelectedCustomer(customer)}
            />
          ))}
        </div>
      )}

      {/* Customer Detail Modal */}
      <Modal
        open={!!selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
        title={selectedCustomer?.full_name}
        size="md"
      >
        {selectedCustomer && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                { label: 'Email', value: selectedCustomer.email },
                { label: 'Phone', value: selectedCustomer.phone },
                { label: 'Address', value: `${selectedCustomer.address}, ${selectedCustomer.city}, ${selectedCustomer.state}` },
                { label: 'Property Type', value: selectedCustomer.property_type },
                { label: 'Property Size', value: selectedCustomer.property_size },
              ].map(({ label, value }) => (
                <div key={label} className="bg-dark-bg rounded-lg p-3 border border-dark-border">
                  <p className="text-gray-500 text-xs uppercase font-semibold mb-1">{label}</p>
                  <p className="text-white font-medium capitalize">{value}</p>
                </div>
              ))}
            </div>
            {selectedCustomer.notes && (
              <div className="bg-yellow-900/20 border border-yellow-800 rounded-xl p-4">
                <p className="text-yellow-300 text-xs font-bold uppercase mb-1">Notes</p>
                <p className="text-yellow-200 text-sm">{selectedCustomer.notes}</p>
              </div>
            )}
            <div className="flex gap-3 pt-2 border-t border-dark-border">
              <Button variant="primary" size="md" fullWidth>Schedule Job</Button>
              <Button variant="secondary" size="md">Edit</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
