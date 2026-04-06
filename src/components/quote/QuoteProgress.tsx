import { clsx } from 'clsx'
import { Check } from 'lucide-react'

const STEPS = [
  { number: 1, label: 'Contact Info' },
  { number: 2, label: 'Property & Services' },
  { number: 3, label: 'Details' },
  { number: 4, label: 'Review' },
]

interface QuoteProgressProps {
  currentStep: number
}

export function QuoteProgress({ currentStep }: QuoteProgressProps) {
  return (
    <div className="w-full">
      {/* Step indicator */}
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-5 left-5 right-5 h-0.5 bg-dark-border z-0" />
        <div
          className="absolute top-5 left-5 h-0.5 bg-brand-green z-0 transition-all duration-500"
          style={{ width: `calc(${((currentStep - 1) / (STEPS.length - 1)) * 100}% - 20px)` }}
        />

        {STEPS.map((step) => {
          const isDone = step.number < currentStep
          const isActive = step.number === currentStep

          return (
            <div key={step.number} className="flex flex-col items-center relative z-10">
              <div
                className={clsx(
                  'w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300',
                  isDone
                    ? 'bg-brand-green border-brand-green text-black'
                    : isActive
                    ? 'bg-dark-bg border-brand-green text-brand-green shadow-lg shadow-brand-green/30'
                    : 'bg-dark-bg border-dark-border text-gray-500'
                )}
              >
                {isDone ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-bold">{step.number}</span>
                )}
              </div>
              <span
                className={clsx(
                  'mt-2 text-xs font-semibold uppercase tracking-wide hidden sm:block',
                  isActive ? 'text-white' : isDone ? 'text-brand-green' : 'text-gray-500'
                )}
              >
                {step.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* Mobile step text */}
      <div className="mt-4 text-center sm:hidden">
        <p className="text-sm font-semibold text-white">
          Step {currentStep} of {STEPS.length}:{' '}
          <span className="text-brand-green">{STEPS[currentStep - 1]?.label}</span>
        </p>
      </div>
    </div>
  )
}
