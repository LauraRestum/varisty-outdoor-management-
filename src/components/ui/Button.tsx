'use client'

import { forwardRef } from 'react'
import { clsx } from 'clsx'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  fullWidth?: boolean
  as?: 'button' | 'a'
  href?: string
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-green hover:bg-brand-green-dark text-black font-bold transition-colors duration-200 animate-pulse-green hover:animate-none',
  secondary:
    'bg-dark-card hover:bg-dark-muted text-white font-semibold border border-dark-border hover:border-gray-500 transition-colors duration-200',
  ghost:
    'bg-transparent hover:bg-dark-card text-white font-semibold transition-colors duration-200',
  danger:
    'bg-red-600 hover:bg-red-700 text-white font-bold transition-colors duration-200',
  outline:
    'bg-transparent border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-black font-bold transition-colors duration-200',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm min-h-[36px] rounded-lg',
  md: 'px-5 py-2.5 text-base min-h-[44px] rounded-xl',
  lg: 'px-6 py-3 text-lg min-h-[52px] rounded-xl',
  xl: 'px-8 py-4 text-xl min-h-[60px] rounded-2xl',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(
          'inline-flex items-center justify-center gap-2 font-sans tracking-wide',
          'focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 focus:ring-offset-dark-bg',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
export type { ButtonProps, ButtonVariant, ButtonSize }
