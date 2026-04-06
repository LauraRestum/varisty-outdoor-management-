'use client'

import { useState } from 'react'
import { clsx } from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { JobStatusBadge } from '@/components/ui/Badge'
import type { Job } from '@/types'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

interface CalendarViewProps {
  jobs: Job[]
  onJobClick?: (job: Job) => void
}

export function CalendarView({ jobs, onJobClick }: CalendarViewProps) {
  const today = new Date()
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [selectedDate, setSelectedDate] = useState<Date | null>(today)

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  // Build calendar grid
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: (Date | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  function jobsForDate(date: Date) {
    const dateStr = date.toISOString().split('T')[0]
    return jobs.filter((job) => job.scheduled_date === dateStr)
  }

  function selectedJobs() {
    if (!selectedDate) return []
    return jobsForDate(selectedDate)
  }

  function prevMonth() {
    setViewDate(new Date(year, month - 1, 1))
  }

  function nextMonth() {
    setViewDate(new Date(year, month + 1, 1))
  }

  function isToday(date: Date) {
    return date.toDateString() === today.toDateString()
  }

  function isSelected(date: Date) {
    return selectedDate?.toDateString() === date.toDateString()
  }

  const SERVICE_SHORT: Record<string, string> = {
    'lawn-mowing': 'Mow',
    landscaping: 'Land',
    'snow-removal': 'Snow',
    irrigation: 'Irrig',
    'tree-shrub-care': 'Tree',
    hardscaping: 'Hard',
    fertilization: 'Fert',
    'seasonal-cleanup': 'Clean',
  }

  return (
    <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
      {/* Calendar Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-dark-border">
        <h2 className="font-condensed text-xl font-bold uppercase text-white">
          {MONTHS[month]} {year}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={prevMonth}
            className="w-9 h-9 rounded-lg border border-dark-border text-gray-400 hover:text-white hover:border-gray-500 flex items-center justify-center transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setViewDate(new Date(today.getFullYear(), today.getMonth(), 1))
              setSelectedDate(today)
            }}
            className="px-3 h-9 rounded-lg border border-dark-border text-xs text-gray-400 hover:text-white hover:border-gray-500 transition-colors font-semibold"
          >
            Today
          </button>
          <button
            onClick={nextMonth}
            className="w-9 h-9 rounded-lg border border-dark-border text-gray-400 hover:text-white hover:border-gray-500 flex items-center justify-center transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 border-b border-dark-border">
        {DAYS.map((day) => (
          <div key={day} className="text-center text-xs font-bold text-gray-500 uppercase py-2.5 tracking-wide">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7">
        {cells.map((date, i) => {
          if (!date) {
            return (
              <div key={`empty-${i}`} className="min-h-[80px] border-b border-r border-dark-border/50 bg-dark-bg/30" />
            )
          }

          const dateJobs = jobsForDate(date)
          const today_ = isToday(date)
          const selected = isSelected(date)

          return (
            <div
              key={date.toISOString()}
              onClick={() => setSelectedDate(date)}
              className={clsx(
                'min-h-[80px] border-b border-r border-dark-border/50 p-1.5 cursor-pointer transition-colors',
                selected
                  ? 'bg-brand-green/10'
                  : 'hover:bg-dark-muted/30'
              )}
            >
              {/* Date number */}
              <div
                className={clsx(
                  'w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold mb-1',
                  today_
                    ? 'bg-brand-green text-black'
                    : selected
                    ? 'bg-brand-green/20 text-brand-green'
                    : 'text-gray-400 hover:text-white'
                )}
              >
                {date.getDate()}
              </div>

              {/* Job dots */}
              <div className="space-y-0.5">
                {dateJobs.slice(0, 2).map((job) => (
                  <div
                    key={job.id}
                    className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-brand-green/20 text-brand-green truncate"
                  >
                    {SERVICE_SHORT[job.service_type] || 'Job'}
                  </div>
                ))}
                {dateJobs.length > 2 && (
                  <div className="text-[10px] text-gray-500 font-semibold px-1">
                    +{dateJobs.length - 2} more
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Selected Day Jobs */}
      {selectedDate && (
        <div className="border-t border-dark-border p-4">
          <h3 className="font-condensed text-sm font-bold uppercase text-brand-green mb-3 tracking-wide">
            {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            {' — '}
            {selectedJobs().length} {selectedJobs().length === 1 ? 'job' : 'jobs'}
          </h3>
          {selectedJobs().length === 0 ? (
            <p className="text-gray-500 text-sm">No jobs scheduled for this day.</p>
          ) : (
            <div className="space-y-2">
              {selectedJobs().map((job) => (
                <div
                  key={job.id}
                  className="flex items-center gap-3 p-3 bg-dark-bg rounded-lg border border-dark-border hover:border-brand-green/30 cursor-pointer transition-colors"
                  onClick={() => onJobClick?.(job)}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm">{job.customer?.full_name}</p>
                    <p className="text-gray-400 text-xs">{job.city}, {job.state}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {job.scheduled_time && (
                      <span className="text-xs text-gray-500">{job.scheduled_time}</span>
                    )}
                    <JobStatusBadge status={job.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
