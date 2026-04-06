'use client'

import { useState } from 'react'
import { clsx } from 'clsx'
import { Search, SlidersHorizontal } from 'lucide-react'
import { JobCard } from './JobCard'
import type { Job, JobStatus } from '@/types'

const STATUS_FILTERS: { value: JobStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All Jobs' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'invoiced', label: 'Invoiced' },
  { value: 'cancelled', label: 'Cancelled' },
]

interface JobListProps {
  jobs: Job[]
  title?: string
  onJobClick?: (job: Job) => void
}

export function JobList({ jobs, title = 'Jobs', onJobClick }: JobListProps) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<JobStatus | 'all'>('all')

  const filtered = jobs.filter((job) => {
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter
    const searchLower = search.toLowerCase()
    const matchesSearch =
      !search ||
      job.customer?.full_name?.toLowerCase().includes(searchLower) ||
      job.city.toLowerCase().includes(searchLower) ||
      job.service_type.toLowerCase().includes(searchLower)
    return matchesStatus && matchesSearch
  })

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-condensed text-2xl font-bold uppercase text-white">{title}</h2>
        <span className="text-gray-400 text-sm">{filtered.length} jobs</span>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by customer, city, or service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full min-h-[44px] bg-dark-card border border-dark-border rounded-xl text-white text-sm pl-9 pr-4 py-2.5 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green transition-colors"
          />
        </div>

        {/* Status Filter */}
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1 sm:pb-0">
          {STATUS_FILTERS.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setStatusFilter(filter.value)}
              className={clsx(
                'flex-shrink-0 px-3 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap min-h-[44px]',
                statusFilter === filter.value
                  ? 'bg-brand-green text-black'
                  : 'bg-dark-card border border-dark-border text-gray-400 hover:text-white hover:border-gray-500'
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <SlidersHorizontal className="w-10 h-10 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400 font-semibold">No jobs found</p>
          <p className="text-gray-500 text-sm mt-1">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onClick={onJobClick ? () => onJobClick(job) : undefined}
            />
          ))}
        </div>
      )}
    </div>
  )
}
