'use client'

import { useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/Button'
import { ToggleCardGroup } from '@/components/ui/ToggleCard'
import { CheckboxCardGroup } from '@/components/ui/CheckboxCard'
import { ArrowRight, ArrowLeft, Scissors, Trees, Snowflake, Droplets, TreePine, Building2, Leaf, Sparkles, AlertTriangle } from 'lucide-react'
import type { QuoteFormData } from '@/lib/validations'
import type { PropertySize, ServiceType, ServiceFrequency } from '@/types'

interface QuoteStep2Props {
  onNext: () => void
  onBack: () => void
}

const PROPERTY_SIZES = [
  { value: 'under-1/4-acre', label: 'Under 1/4 Acre', description: 'Small yard, typical city lot' },
  { value: '1/4-to-1/2-acre', label: '1/4 to 1/2 Acre', description: 'Average suburban lot' },
  { value: '1/2-to-1-acre', label: '1/2 to 1 Acre', description: 'Larger suburban property' },
  { value: '1-to-3-acres', label: '1 to 3 Acres', description: 'Large residential or small estate' },
  { value: '3+-acres', label: '3+ Acres', description: 'Large estate or commercial' },
]

const PROPERTY_TYPES = [
  { value: 'residential', label: 'Residential', description: 'Home, townhouse, condo' },
  { value: 'commercial', label: 'Commercial', description: 'Business, HOA, multi-family' },
]

const SERVICES: { value: ServiceType; label: string; description: string; icon: React.ReactNode; featured?: boolean }[] = [
  { value: 'lawn-mowing', label: 'Lawn Mowing', description: 'Regular mowing service', icon: <Scissors className="w-5 h-5" />, featured: true },
  { value: 'landscaping', label: 'Landscaping', description: 'Design & installation', icon: <Trees className="w-5 h-5" /> },
  { value: 'snow-removal', label: 'Snow Removal', description: 'Plowing, salting & ice management', icon: <Snowflake className="w-5 h-5" /> },
  { value: 'irrigation', label: 'Irrigation', description: 'System install or repair', icon: <Droplets className="w-5 h-5" /> },
  { value: 'tree-shrub-care', label: 'Tree & Shrub Care', description: 'Pruning & treatments', icon: <TreePine className="w-5 h-5" /> },
  { value: 'hardscaping', label: 'Hardscaping', description: 'Patios, walkways, walls', icon: <Building2 className="w-5 h-5" /> },
  { value: 'fertilization', label: 'Fertilization', description: 'Custom nutrient programs', icon: <Leaf className="w-5 h-5" /> },
  { value: 'seasonal-cleanup', label: 'Seasonal Cleanup', description: 'Spring & fall cleanups', icon: <Sparkles className="w-5 h-5" /> },
]

const FREQUENCIES = [
  { value: 'weekly', label: 'Weekly', description: 'Every week — best results' },
  { value: 'bi-weekly', label: 'Bi-Weekly', description: 'Every 2 weeks — most popular' },
  { value: 'monthly', label: 'Monthly', description: 'Once per month' },
  { value: 'seasonal', label: 'Seasonal', description: 'Start/end of season only' },
  { value: 'one-time', label: 'One-Time', description: 'Single visit' },
]

export function QuoteStep2({ onNext, onBack }: QuoteStep2Props) {
  const {
    watch,
    setValue,
    formState: { errors },
    trigger,
  } = useFormContext<QuoteFormData>()

  const propertySize = watch('propertySize')
  const propertyType = watch('propertyType')
  const services = watch('services') || []
  const frequency = watch('frequency')

  const isCommercial = propertySize === '3+-acres' || propertyType === 'commercial'

  async function handleNext() {
    const valid = await trigger(['propertySize', 'propertyType', 'services', 'frequency'])
    if (valid) onNext()
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-condensed text-3xl font-black uppercase text-white mb-1">
          Property & Services
        </h2>
        <p className="text-gray-400">Tell us about your property and what you need.</p>
      </div>

      {/* Property Type */}
      <div>
        <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wide mb-3">
          Property Type <span className="text-brand-green">*</span>
        </h3>
        <ToggleCardGroup
          options={PROPERTY_TYPES}
          value={propertyType}
          onChange={(v) => setValue('propertyType', v as 'residential' | 'commercial', { shouldValidate: true })}
          columns={2}
        />
        {errors.propertyType && (
          <p className="mt-1.5 text-sm text-red-400">{errors.propertyType.message}</p>
        )}
      </div>

      {/* Property Size */}
      <div>
        <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wide mb-3">
          Property Size <span className="text-brand-green">*</span>
        </h3>
        <ToggleCardGroup
          options={PROPERTY_SIZES}
          value={propertySize}
          onChange={(v) => setValue('propertySize', v as PropertySize, { shouldValidate: true })}
        />
        {errors.propertySize && (
          <p className="mt-1.5 text-sm text-red-400">{errors.propertySize.message}</p>
        )}
      </div>

      {/* Commercial Warning */}
      {isCommercial && (
        <div className="flex items-start gap-3 bg-amber-900/30 border border-amber-800 rounded-xl p-4">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-300 font-bold text-sm">Commercial Property Detected</p>
            <p className="text-amber-400/80 text-sm mt-1">
              Commercial properties require custom pricing. Our team will reach out to schedule a site visit before providing your quote.
            </p>
          </div>
        </div>
      )}

      {/* Services */}
      <div>
        <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wide mb-3">
          Services Needed <span className="text-brand-green">*</span>
          <span className="ml-2 text-gray-500 normal-case font-normal">(select all that apply)</span>
        </h3>
        <CheckboxCardGroup
          options={SERVICES}
          values={services}
          onChange={(v) => setValue('services', v as ServiceType[], { shouldValidate: true })}
          columns={2}
        />
        {errors.services && (
          <p className="mt-1.5 text-sm text-red-400">{errors.services.message}</p>
        )}
      </div>

      {/* Frequency */}
      <div>
        <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wide mb-3">
          Service Frequency <span className="text-brand-green">*</span>
        </h3>
        <ToggleCardGroup
          options={FREQUENCIES}
          value={frequency}
          onChange={(v) => setValue('frequency', v as ServiceFrequency, { shouldValidate: true })}
          columns={2}
        />
        {errors.frequency && (
          <p className="mt-1.5 text-sm text-red-400">{errors.frequency.message}</p>
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-4 pt-2">
        <Button variant="secondary" size="lg" onClick={onBack} className="min-w-[120px]">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <Button variant="primary" size="lg" onClick={handleNext} fullWidth>
          Continue to Details
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
