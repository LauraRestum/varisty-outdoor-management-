'use client'

import { useState } from 'react'
import { JobList } from '@/components/dashboard/JobList'
import { JobCard } from '@/components/dashboard/JobCard'
import { Modal } from '@/components/ui/Modal'
import { JobStatusBadge } from '@/components/ui/Badge'
import { MapPin, Clock, Users, DollarSign, FileText, Plus } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { Job } from '@/types'

const TODAY = new Date().toISOString().split('T')[0]

const SAMPLE_JOBS: Job[] = [
  {
    id: '1', customer_id: 'c1',
    customer: { id: 'c1', profile_id: null, full_name: 'Sarah Mitchell', email: 'sarah@email.com', phone: '(614) 555-0101', address: '123 Oak St', city: 'Dublin', state: 'OH', zip: '43016', property_size: '1/4-to-1/2-acre', property_type: 'residential', notes: null, created_at: TODAY, updated_at: TODAY },
    service_type: 'lawn-mowing', status: 'completed', scheduled_date: TODAY, scheduled_time: '8:00 AM', completed_at: TODAY,
    address: '123 Oak St', city: 'Dublin', state: 'OH', zip: '43016', notes: 'Gate code: 1234', internal_notes: null, crew_size: 2, estimated_hours: 1.5, actual_hours: 1.25, price: 65, created_at: TODAY, updated_at: TODAY,
  },
  {
    id: '2', customer_id: 'c2',
    customer: { id: 'c2', profile_id: null, full_name: 'James Rodriguez', email: 'james@email.com', phone: '(614) 555-0102', address: '456 Elm Ave', city: 'Westerville', state: 'OH', zip: '43081', property_size: '1/2-to-1-acre', property_type: 'residential', notes: null, created_at: TODAY, updated_at: TODAY },
    service_type: 'landscaping', status: 'in_progress', scheduled_date: TODAY, scheduled_time: '9:30 AM', completed_at: null,
    address: '456 Elm Ave', city: 'Westerville', state: 'OH', zip: '43081', notes: 'Phase 2 bed installation', internal_notes: 'Material delivery confirmed', crew_size: 3, estimated_hours: 6, actual_hours: null, price: 850, created_at: TODAY, updated_at: TODAY,
  },
  {
    id: '3', customer_id: 'c3',
    customer: { id: 'c3', profile_id: null, full_name: 'Tom Kowalski', email: 'tom@email.com', phone: '(614) 555-0103', address: '789 Maple Dr', city: 'Hilliard', state: 'OH', zip: '43026', property_size: 'under-1/4-acre', property_type: 'residential', notes: null, created_at: TODAY, updated_at: TODAY },
    service_type: 'fertilization', status: 'scheduled', scheduled_date: TODAY, scheduled_time: '1:00 PM', completed_at: null,
    address: '789 Maple Dr', city: 'Hilliard', state: 'OH', zip: '43026', notes: null, internal_notes: null, crew_size: 1, estimated_hours: 0.75, actual_hours: null, price: 55, created_at: TODAY, updated_at: TODAY,
  },
  {
    id: '4', customer_id: 'c4',
    customer: { id: 'c4', profile_id: null, full_name: 'Lisa Chen', email: 'lisa@email.com', phone: '(614) 555-0104', address: '321 Birch Ln', city: 'New Albany', state: 'OH', zip: '43054', property_size: '1-to-3-acres', property_type: 'residential', notes: null, created_at: TODAY, updated_at: TODAY },
    service_type: 'tree-shrub-care', status: 'scheduled', scheduled_date: TODAY, scheduled_time: '3:00 PM', completed_at: null,
    address: '321 Birch Ln', city: 'New Albany', state: 'OH', zip: '43054', notes: 'Prune front arborvitae row', internal_notes: null, crew_size: 2, estimated_hours: 2, actual_hours: null, price: 180, created_at: TODAY, updated_at: TODAY,
  },
  {
    id: '5', customer_id: 'c5',
    customer: { id: 'c5', profile_id: null, full_name: 'Marcus Thompson', email: 'marcus@email.com', phone: '(614) 555-0105', address: '654 Cedar Blvd', city: 'Gahanna', state: 'OH', zip: '43230', property_size: '1/4-to-1/2-acre', property_type: 'residential', notes: null, created_at: TODAY, updated_at: TODAY },
    service_type: 'lawn-mowing', status: 'cancelled', scheduled_date: TODAY, scheduled_time: '10:00 AM', completed_at: null,
    address: '654 Cedar Blvd', city: 'Gahanna', state: 'OH', zip: '43230', notes: null, internal_notes: 'Customer called to reschedule', crew_size: 2, estimated_hours: 1, actual_hours: null, price: 60, created_at: TODAY, updated_at: TODAY,
  },
]

const SERVICE_LABELS: Record<string, string> = {
  'lawn-mowing': 'Lawn Mowing', landscaping: 'Landscaping', 'snow-removal': 'Snow Removal',
  irrigation: 'Irrigation', 'tree-shrub-care': 'Tree & Shrub Care', hardscaping: 'Hardscaping',
  fertilization: 'Fertilization', 'seasonal-cleanup': 'Seasonal Cleanup',
}

export default function JobsPage() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  return (
    <div className="p-5 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-condensed text-3xl font-black uppercase text-white">Job Management</h1>
          <p className="text-gray-400 mt-1">View and manage all scheduled jobs</p>
        </div>
        <Button variant="primary" size="md" className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Job
        </Button>
      </div>

      <JobList
        jobs={SAMPLE_JOBS}
        onJobClick={(job) => setSelectedJob(job)}
      />

      {/* Job Detail Modal */}
      <Modal
        open={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        title={selectedJob ? `${SERVICE_LABELS[selectedJob.service_type]} — ${selectedJob.customer?.full_name}` : ''}
        size="lg"
      >
        {selectedJob && (
          <div className="space-y-5">
            {/* Status */}
            <div className="flex items-center gap-3">
              <JobStatusBadge status={selectedJob.status} />
              <span className="text-gray-400 text-sm">
                Scheduled: {new Date(selectedJob.scheduled_date).toLocaleDateString()} {selectedJob.scheduled_time && `at ${selectedJob.scheduled_time}`}
              </span>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-dark-bg rounded-xl p-4 border border-dark-border">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-brand-green" />
                  <span className="text-xs text-gray-400 uppercase font-semibold">Location</span>
                </div>
                <p className="text-white text-sm">{selectedJob.address}</p>
                <p className="text-gray-400 text-sm">{selectedJob.city}, {selectedJob.state} {selectedJob.zip}</p>
              </div>
              <div className="bg-dark-bg rounded-xl p-4 border border-dark-border">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-brand-green" />
                  <span className="text-xs text-gray-400 uppercase font-semibold">Crew</span>
                </div>
                <p className="text-white text-sm">{selectedJob.crew_size} crew members</p>
                {selectedJob.estimated_hours && (
                  <p className="text-gray-400 text-sm">Est: {selectedJob.estimated_hours}h</p>
                )}
              </div>
              {selectedJob.price && (
                <div className="bg-dark-bg rounded-xl p-4 border border-dark-border">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-brand-green" />
                    <span className="text-xs text-gray-400 uppercase font-semibold">Price</span>
                  </div>
                  <p className="text-brand-green font-bold text-lg">${selectedJob.price}</p>
                </div>
              )}
              {selectedJob.notes && (
                <div className="bg-dark-bg rounded-xl p-4 border border-dark-border">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-brand-green" />
                    <span className="text-xs text-gray-400 uppercase font-semibold">Notes</span>
                  </div>
                  <p className="text-gray-300 text-sm">{selectedJob.notes}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2 border-t border-dark-border">
              <Button variant="primary" size="md" fullWidth>
                Mark Complete
              </Button>
              <Button variant="secondary" size="md">
                Edit Job
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
