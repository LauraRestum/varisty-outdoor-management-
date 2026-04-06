'use client'

import { useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Send, User, Home, Wrench, Info, Check } from 'lucide-react'
import type { QuoteFormData } from '@/lib/validations'

interface QuoteReviewProps {
  onBack: () => void
  onSubmit: () => void
  isSubmitting: boolean
}

const SERVICE_LABELS: Record<string, string> = {
  'lawn-mowing': 'Lawn Mowing',
  landscaping: 'Landscaping',
  'snow-removal': 'Snow Removal',
  irrigation: 'Irrigation',
  'tree-shrub-care': 'Tree & Shrub Care',
  hardscaping: 'Hardscaping',
  fertilization: 'Fertilization',
  'seasonal-cleanup': 'Seasonal Cleanup',
}

const PROPERTY_SIZE_LABELS: Record<string, string> = {
  'under-1/4-acre': 'Under 1/4 acre',
  '1/4-to-1/2-acre': '1/4 to 1/2 acre',
  '1/2-to-1-acre': '1/2 to 1 acre',
  '1-to-3-acres': '1 to 3 acres',
  '3+-acres': '3+ acres',
}

const FREQUENCY_LABELS: Record<string, string> = {
  'one-time': 'One-Time',
  weekly: 'Weekly',
  'bi-weekly': 'Bi-Weekly',
  monthly: 'Monthly',
  seasonal: 'Seasonal',
}

function ReviewRow({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null
  return (
    <div className="flex justify-between py-2.5 border-b border-dark-border/50 last:border-0">
      <span className="text-gray-400 text-sm">{label}</span>
      <span className="text-white font-semibold text-sm text-right max-w-[60%]">{value}</span>
    </div>
  )
}

export function QuoteReview({ onBack, onSubmit, isSubmitting }: QuoteReviewProps) {
  const { watch } = useFormContext<QuoteFormData>()
  const data = watch()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-condensed text-3xl font-black uppercase text-white mb-1">
          Review Your Request
        </h2>
        <p className="text-gray-400">
          Double-check everything before submitting. We&apos;ll follow up within 24 hours.
        </p>
      </div>

      {/* Contact Section */}
      <div className="bg-dark-bg rounded-xl border border-dark-border p-5">
        <div className="flex items-center gap-2 mb-4">
          <User className="w-4 h-4 text-brand-green" />
          <h3 className="font-condensed text-sm font-bold uppercase tracking-wide text-brand-green">
            Contact Information
          </h3>
        </div>
        <ReviewRow label="Name" value={`${data.firstName} ${data.lastName}`} />
        <ReviewRow label="Email" value={data.email} />
        <ReviewRow label="Phone" value={data.phone} />
        <ReviewRow
          label="Address"
          value={`${data.address}, ${data.city}, ${data.state} ${data.zip}`}
        />
      </div>

      {/* Property Section */}
      <div className="bg-dark-bg rounded-xl border border-dark-border p-5">
        <div className="flex items-center gap-2 mb-4">
          <Home className="w-4 h-4 text-brand-green" />
          <h3 className="font-condensed text-sm font-bold uppercase tracking-wide text-brand-green">
            Property Details
          </h3>
        </div>
        <ReviewRow label="Type" value={data.propertyType} />
        <ReviewRow
          label="Size"
          value={PROPERTY_SIZE_LABELS[data.propertySize] || data.propertySize}
        />
        <ReviewRow label="Has Fence" value={data.hasFence ? 'Yes' : 'No'} />
        {data.hasFence && (
          <ReviewRow label="Has Gate" value={data.hasGate ? 'Yes' : 'No'} />
        )}
        {data.hasFence && data.hasGate && data.gateCode && (
          <ReviewRow label="Gate Code" value={data.gateCode} />
        )}
        <ReviewRow
          label="Irrigation System"
          value={data.hasIrrigation ? 'Yes' : 'No'}
        />
        {data.obstacles && data.obstacles.length > 0 && (
          <ReviewRow label="Obstacles" value={data.obstacles.join(', ')} />
        )}
      </div>

      {/* Services Section */}
      <div className="bg-dark-bg rounded-xl border border-dark-border p-5">
        <div className="flex items-center gap-2 mb-4">
          <Wrench className="w-4 h-4 text-brand-green" />
          <h3 className="font-condensed text-sm font-bold uppercase tracking-wide text-brand-green">
            Services & Frequency
          </h3>
        </div>
        {data.services && data.services.length > 0 && (
          <div className="py-2.5 border-b border-dark-border/50">
            <p className="text-gray-400 text-sm mb-2">Services Requested</p>
            <div className="flex flex-wrap gap-2">
              {data.services.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1 bg-brand-green/10 border border-brand-green/30 text-brand-green text-xs font-semibold px-2.5 py-1 rounded-full"
                >
                  <Check className="w-3 h-3" />
                  {SERVICE_LABELS[s] || s}
                </span>
              ))}
            </div>
          </div>
        )}
        <ReviewRow
          label="Frequency"
          value={FREQUENCY_LABELS[data.frequency] || data.frequency}
        />
        {data.services?.includes('snow-removal') && data.snowRemovalPriority && (
          <ReviewRow
            label="Snow Priority"
            value={
              data.snowRemovalPriority === 'priority'
                ? 'Priority (4-hour SLA)'
                : 'Standard (12-hour)'
            }
          />
        )}
      </div>

      {/* Additional Details */}
      {data.details && (
        <div className="bg-dark-bg rounded-xl border border-dark-border p-5">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-brand-green" />
            <h3 className="font-condensed text-sm font-bold uppercase tracking-wide text-brand-green">
              Additional Notes
            </h3>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">{data.details}</p>
        </div>
      )}

      {/* Privacy note */}
      <p className="text-gray-500 text-xs text-center leading-relaxed">
        By submitting this form, you agree to be contacted by Varsity Outdoor Management about your quote.
        We never share your information with third parties.
      </p>

      {/* Navigation */}
      <div className="flex gap-4 pt-2">
        <Button variant="secondary" size="lg" onClick={onBack} className="min-w-[120px]" disabled={isSubmitting}>
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={onSubmit}
          loading={isSubmitting}
          fullWidth
        >
          Submit Quote Request
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
