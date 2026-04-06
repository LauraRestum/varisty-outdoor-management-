'use client'

import { clsx } from 'clsx'

interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  showValue?: boolean
  variant?: 'green' | 'blue' | 'yellow' | 'red'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const variantClasses = {
  green: 'bg-brand-green',
  blue: 'bg-blue-500',
  yellow: 'bg-yellow-500',
  red: 'bg-red-500',
}

const sizeClasses = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = false,
  variant = 'green',
  size = 'md',
  className,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div className={clsx('w-full', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && <span className="text-sm text-gray-400">{label}</span>}
          {showValue && (
            <span className="text-sm font-semibold text-white">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      <div className={clsx('w-full bg-dark-muted rounded-full overflow-hidden', sizeClasses[size])}>
        <div
          className={clsx(
            'h-full rounded-full transition-all duration-500 ease-out',
            variantClasses[variant]
          )}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  )
}
