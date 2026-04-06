'use client'

import { clsx } from 'clsx'

interface ToggleCardProps {
  label: string
  description?: string
  value: string
  selected: boolean
  onSelect: (value: string) => void
  icon?: React.ReactNode
  badge?: string
}

export function ToggleCard({
  label,
  description,
  value,
  selected,
  onSelect,
  icon,
  badge,
}: ToggleCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={clsx(
        'w-full text-left p-4 rounded-xl border-2 transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-brand-green/50',
        'min-h-[64px] flex items-center gap-4',
        selected
          ? 'bg-brand-green/10 border-brand-green text-white shadow-lg shadow-brand-green/20'
          : 'bg-dark-card border-dark-border text-gray-300 hover:border-gray-600 hover:bg-dark-muted/30'
      )}
    >
      {icon && (
        <span
          className={clsx(
            'flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-lg',
            selected ? 'bg-brand-green/20 text-brand-green' : 'bg-dark-muted/50 text-gray-400'
          )}
        >
          {icon}
        </span>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={clsx('font-semibold text-base', selected ? 'text-white' : 'text-gray-200')}>
            {label}
          </span>
          {badge && (
            <span className="text-xs bg-brand-green/20 text-brand-green px-2 py-0.5 rounded-full font-semibold">
              {badge}
            </span>
          )}
        </div>
        {description && (
          <p className={clsx('text-sm mt-0.5', selected ? 'text-gray-300' : 'text-gray-500')}>
            {description}
          </p>
        )}
      </div>
      <div
        className={clsx(
          'flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all',
          selected ? 'border-brand-green bg-brand-green' : 'border-gray-600 bg-transparent'
        )}
      >
        {selected && (
          <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 12 12">
            <path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
    </button>
  )
}

interface ToggleCardGroupProps {
  options: Omit<ToggleCardProps, 'selected' | 'onSelect'>[]
  value: string
  onChange: (value: string) => void
  columns?: 1 | 2
}

export function ToggleCardGroup({ options, value, onChange, columns = 1 }: ToggleCardGroupProps) {
  return (
    <div
      className={clsx(
        'grid gap-3',
        columns === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'
      )}
    >
      {options.map((option) => (
        <ToggleCard
          key={option.value}
          {...option}
          selected={value === option.value}
          onSelect={onChange}
        />
      ))}
    </div>
  )
}
