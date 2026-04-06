'use client'

import { useState } from 'react'
import { CalendarView } from '@/components/dashboard/CalendarView'
import { Modal } from '@/components/ui/Modal'
import { JobStatusBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { Job } from '@/types'

const TODAY = new Date().toISOString().split('T')[0]
const TOMORROW = new Date(Date.now() + 86400000).toISOString().split('T')[0]
const DAY_AFTER = new Date(Date.now() + 172800000).toISOString().split('T')[0]

const SAMPLE_JOBS: Job[] = [
  {
    id: '1', customer_id: 'c1',
    customer: { id: 'c1', profile_id: null, full_name: 'Sarah Mitchell', email: 's@e.com', phone: '', address: '123 Oak St', city: 'Dublin', state: 'OH', zip: '43016', property_size: '1/4-to-1/2-acre', property_type: 'residential', notes: null, created_at: TODAY, updated_at: TODAY },
    service_type: 'lawn-mowing', status: 'completed', scheduled_date: TODAY, scheduled_time: '8:00 AM', completed_at: TODAY,
    address: '123 Oak St', city: 'Dublin', state: 'OH', zip: '43016', notes: null, internal_notes: null, crew_size: 2, estimated_hours: 1.5, actual_hours: 1.25, price: 65, created_at: TODAY, updated_at: TODAY,
  },
  {
    id: '2', customer_id: 'c2',
    customer: { id: 'c2', profile_id: null, full_name: 'James Rodriguez', email: 'j@e.com', phone: '', address: '456 Elm Ave', city: 'Westerville', state: 'OH', zip: '43081', property_size: '1/2-to-1-acre', property_type: 'residential', notes: null, created_at: TODAY, updated_at: TODAY },
    service_type: 'landscaping', status: 'in_progress', scheduled_date: TODAY, scheduled_time: '9:30 AM', completed_at: null,
    address: '456 Elm Ave', city: 'Westerville', state: 'OH', zip: '43081', notes: null, internal_notes: null, crew_size: 3, estimated_hours: 6, actual_hours: null, price: 850, created_at: TODAY, updated_at: TODAY,
  },
  {
    id: '3', customer_id: 'c3',
    customer: { id: 'c3', profile_id: null, full_name: 'Tom Kowalski', email: 't@e.com', phone: '', address: '789 Maple Dr', city: 'Hilliard', state: 'OH', zip: '43026', property_size: 'under-1/4-acre', property_type: 'residential', notes: null, created_at: TODAY, updated_at: TODAY },
    service_type: 'fertilization', status: 'scheduled', scheduled_date: TOMORROW, scheduled_time: '9:00 AM', completed_at: null,
    address: '789 Maple Dr', city: 'Hilliard', state: 'OH', zip: '43026', notes: null, internal_notes: null, crew_size: 1, estimated_hours: 0.75, actual_hours: null, price: 55, created_at: TODAY, updated_at: TODAY,
  },
  {
    id: '4', customer_id: 'c4',
    customer: { id: 'c4', profile_id: null, full_name: 'Lisa Chen', email: 'l@e.com', phone: '', address: '321 Birch Ln', city: 'New Albany', state: 'OH', zip: '43054', property_size: '1-to-3-acres', property_type: 'residential', notes: null, created_at: TODAY, updated_at: TODAY },
    service_type: 'lawn-mowing', status: 'scheduled', scheduled_date: TOMORROW, scheduled_time: '11:00 AM', completed_at: null,
    address: '321 Birch Ln', city: 'New Albany', state: 'OH', zip: '43054', notes: null, internal_notes: null, crew_size: 2, estimated_hours: 2, actual_hours: null, price: 95, created_at: TODAY, updated_at: TODAY,
  },
  {
    id: '5', customer_id: 'c5',
    customer: { id: 'c5', profile_id: null, full_name: 'Marcus Thompson', email: 'm@e.com', phone: '', address: '654 Cedar Blvd', city: 'Gahanna', state: 'OH', zip: '43230', property_size: '1/4-to-1/2-acre', property_type: 'residential', notes: null, created_at: TODAY, updated_at: TODAY },
    service_type: 'tree-shrub-care', status: 'scheduled', scheduled_date: DAY_AFTER, scheduled_time: '10:00 AM', completed_at: null,
    address: '654 Cedar Blvd', city: 'Gahanna', state: 'OH', zip: '43230', notes: null, internal_notes: null, crew_size: 2, estimated_hours: 2.5, actual_hours: null, price: 180, created_at: TODAY, updated_at: TODAY,
  },
]

const SERVICE_LABELS: Record<string, string> = {
  'lawn-mowing': 'Lawn Mowing', landscaping: 'Landscaping', 'snow-removal': 'Snow Removal',
  irrigation: 'Irrigation', 'tree-shrub-care': 'Tree & Shrub Care', hardscaping: 'Hardscaping',
  fertilization: 'Fertilization', 'seasonal-cleanup': 'Seasonal Cleanup',
}

export default function SchedulePage() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  return (
    <div className="p-5 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-condensed text-3xl font-black uppercase text-white">Schedule</h1>
          <p className="text-gray-400 mt-1">View and manage your job calendar</p>
        </div>
        <Button variant="primary" size="md">+ Schedule Job</Button>
      </div>

      <CalendarView jobs={SAMPLE_JOBS} onJobClick={setSelectedJob} />

      <Modal
        open={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        title={selectedJob ? `${SERVICE_LABELS[selectedJob.service_type]} — ${selectedJob.customer?.full_name}` : ''}
      >
        {selectedJob && (
          <div className="space-y-4">
            <JobStatusBadge status={selectedJob.status} />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-dark-border">
                <span className="text-gray-400">Date</span>
                <span className="text-white font-semibold">
                  {new Date(selectedJob.scheduled_date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </span>
              </div>
              {selectedJob.scheduled_time && (
                <div className="flex justify-between py-2 border-b border-dark-border">
                  <span className="text-gray-400">Time</span>
                  <span className="text-white font-semibold">{selectedJob.scheduled_time}</span>
                </div>
              )}
              <div className="flex justify-between py-2 border-b border-dark-border">
                <span className="text-gray-400">Location</span>
                <span className="text-white font-semibold">{selectedJob.city}, {selectedJob.state}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-dark-border">
                <span className="text-gray-400">Crew Size</span>
                <span className="text-white font-semibold">{selectedJob.crew_size}</span>
              </div>
              {selectedJob.price && (
                <div className="flex justify-between py-2">
                  <span className="text-gray-400">Price</span>
                  <span className="text-brand-green font-bold">${selectedJob.price}</span>
                </div>
              )}
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="primary" size="md" fullWidth>Mark Complete</Button>
              <Button variant="secondary" size="md">Reschedule</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
