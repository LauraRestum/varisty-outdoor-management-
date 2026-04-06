'use client'

import { clsx } from 'clsx'

interface CheckboxCardProps {
  label: string
  description?: string
  value: string
  checked: boolean
  onChange: (value: string, checked: boolean) => void
  icon?: React.ReactNode
  featured?: boolean
}

export function CheckboxCard({
  label,
  description,
  value,
  checked,
  onChange,
  icon,
  featured,
}: CheckboxCardProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(value, !checked)}
      className={clsx(
        'w-full text-left p-4 rounded-xl border-2 transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-brand-green/50',
        'min-h-[64px] flex items-center gap-4',
        checked
          ? 'bg-brand-green/10 border-brand-green text-white shadow-lg shadow-brand-green/20'
          : 'bg-dark-card border-dark-border text-gray-300 hover:border-gray-600 hover:bg-dark-muted/30'
      )}
    >
      {icon && (
        <span
          className={clsx(
            'flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-lg',
            checked ? 'bg-brand-green/20 text-brand-green' : 'bg-dark-muted/50 text-gray-400'
          )}
        >
          {icon}
        </span>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={clsx('font-semibold text-base', checked ? 'text-white' : 'text-gray-200')}>
            {label}
          </span>
          {featured && (
            <span className="text-xs bg-brand-green text-black px-2 py-0.5 rounded-full font-bold">
              Popular
            </span>
          )}
        </div>
        {description && (
          <p className={clsx('text-sm mt-0.5', checked ? 'text-gray-300' : 'text-gray-500')}>
            {description}
          </p>
        )}
      </div>
      <div
        className={clsx(
          'flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all',
          checked ? 'border-brand-green bg-brand-green' : 'border-gray-600 bg-transparent'
        )}
      >
        {checked && (
          <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 12 12">
            <path
              d="M2 6l3 3 5-5"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </button>
  )
}

interface CheckboxCardGroupProps {
  options: Omit<CheckboxCardProps, 'checked' | 'onChange'>[]
  values: string[]
  onChange: (values: string[]) => void
  columns?: 1 | 2
}

export function CheckboxCardGroup({
  options,
  values,
  onChange,
  columns = 1,
}: CheckboxCardGroupProps) {
  function handleChange(value: string, checked: boolean) {
    if (checked) {
      onChange([...values, value])
    } else {
      onChange(values.filter((v) => v !== value))
    }
  }

  return (
    <div
      className={clsx(
        'grid gap-3',
        columns === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'
      )}
    >
      {options.map((option) => (
        <CheckboxCard
          key={option.value}
          {...option}
          checked={values.includes(option.value)}
          onChange={handleChange}
        />
      ))}
    </div>
  )
}
