'use client'

import { useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Input'
import { CheckboxCardGroup } from '@/components/ui/CheckboxCard'
import { ToggleCardGroup } from '@/components/ui/ToggleCard'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import type { QuoteFormData } from '@/lib/validations'

interface QuoteStep3Props {
  onNext: () => void
  onBack: () => void
}

const OBSTACLE_OPTIONS = [
  { value: 'trees', label: 'Trees & Roots', description: 'Mature trees or exposed root systems' },
  { value: 'garden-beds', label: 'Garden Beds', description: 'Flower or plant beds to work around' },
  { value: 'slopes', label: 'Hills & Slopes', description: 'Significant grade changes' },
  { value: 'pets', label: 'Pets', description: 'Dogs or other animals on property' },
  { value: 'water-features', label: 'Water Features', description: 'Ponds, fountains, or streams' },
  { value: 'play-equipment', label: 'Play Equipment', description: 'Swings, trampolines, etc.' },
]

const SNOW_PRIORITY_OPTIONS = [
  { value: 'standard', label: 'Standard', description: 'Cleared within 12 hours of storm end' },
  { value: 'priority', label: 'Priority (Recommended)', description: 'Cleared within 4 hours of storm end — 24/7 service' },
]

export function QuoteStep3({ onNext, onBack }: QuoteStep3Props) {
  const { watch, setValue, register, formState: { errors }, trigger } = useFormContext<QuoteFormData>()

  const hasFence = watch('hasFence')
  const hasGate = watch('hasGate')
  const services = watch('services') || []
  const snowRemovalPriority = watch('snowRemovalPriority')
  const obstacles = watch('obstacles') || []

  const hasSnowRemoval = services.includes('snow-removal')

  async function handleNext() {
    const valid = await trigger(['hasFence', 'hasGate', 'gateCode', 'hasIrrigation'])
    if (valid) onNext()
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-condensed text-3xl font-black uppercase text-white mb-1">
          Property Details
        </h2>
        <p className="text-gray-400">
          Help us understand your property so we can give you an accurate quote.
        </p>
      </div>

      {/* Fence */}
      <div>
        <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wide mb-3">
          Does your property have a fence?
        </h3>
        <ToggleCardGroup
          options={[
            { value: 'true', label: 'Yes, I have a fence' },
            { value: 'false', label: 'No fence' },
          ]}
          value={hasFence === true ? 'true' : hasFence === false ? 'false' : ''}
          onChange={(v) => setValue('hasFence', v === 'true', { shouldValidate: true })}
          columns={2}
        />
      </div>

      {/* Gate (conditional) */}
      {hasFence && (
        <div>
          <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wide mb-3">
            Does the fence have a gate?
          </h3>
          <ToggleCardGroup
            options={[
              { value: 'true', label: 'Yes, there is a gate' },
              { value: 'false', label: 'No gate needed' },
            ]}
            value={hasGate === true ? 'true' : hasGate === false ? 'false' : ''}
            onChange={(v) => setValue('hasGate', v === 'true', { shouldValidate: true })}
            columns={2}
          />
        </div>
      )}

      {/* Gate Code (conditional) */}
      {hasFence && hasGate && (
        <div>
          <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wide mb-3">
            Gate Code (Optional)
          </h3>
          <p className="text-sm text-gray-500 mb-3">
            If your gate has a code, please share it here. This is stored securely and only visible to your crew.
          </p>
          <input
            type="text"
            placeholder="Enter gate code (optional)"
            className="w-full min-h-[52px] bg-dark-card border border-dark-border rounded-xl text-white text-base px-4 py-3 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green transition-colors"
            {...register('gateCode')}
          />
        </div>
      )}

      {/* Irrigation */}
      <div>
        <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wide mb-3">
          Do you have an irrigation or sprinkler system?
        </h3>
        <ToggleCardGroup
          options={[
            { value: 'true', label: 'Yes, I have irrigation', description: 'Sprinklers or drip system' },
            { value: 'false', label: 'No irrigation system' },
          ]}
          value={watch('hasIrrigation') === true ? 'true' : watch('hasIrrigation') === false ? 'false' : ''}
          onChange={(v) => setValue('hasIrrigation', v === 'true', { shouldValidate: true })}
          columns={2}
        />
      </div>

      {/* Snow Removal Priority (conditional) */}
      {hasSnowRemoval && (
        <div>
          <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wide mb-3">
            Snow Removal Priority <span className="text-brand-green">*</span>
          </h3>
          <ToggleCardGroup
            options={SNOW_PRIORITY_OPTIONS}
            value={snowRemovalPriority || ''}
            onChange={(v) =>
              setValue('snowRemovalPriority', v as 'standard' | 'priority', { shouldValidate: true })
            }
          />
        </div>
      )}

      {/* Obstacles */}
      <div>
        <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wide mb-3">
          Any obstacles we should know about?
          <span className="ml-2 text-gray-500 normal-case font-normal">(select all that apply)</span>
        </h3>
        <CheckboxCardGroup
          options={OBSTACLE_OPTIONS}
          values={obstacles}
          onChange={(v) => setValue('obstacles', v, { shouldValidate: true })}
          columns={2}
        />
      </div>

      {/* Additional Details */}
      <div>
        <Textarea
          label="Anything Else? (Optional)"
          placeholder="Tell us anything specific about your property, concerns, or special requests..."
          hint="Up to 1000 characters"
          {...register('details')}
          error={errors.details?.message}
        />
      </div>

      {/* Navigation */}
      <div className="flex gap-4 pt-2">
        <Button variant="secondary" size="lg" onClick={onBack} className="min-w-[120px]">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <Button variant="primary" size="lg" onClick={handleNext} fullWidth>
          Review My Quote
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
