import { clsx } from 'clsx'
import { forwardRef } from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated' | 'green'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const variantClasses = {
  default: 'bg-dark-card border border-dark-border',
  bordered: 'bg-dark-card border-2 border-dark-border hover:border-brand-green transition-colors duration-200',
  elevated: 'bg-dark-card border border-dark-border shadow-xl shadow-black/50',
  green: 'bg-dark-card border border-brand-green/30 shadow-lg shadow-brand-green/10',
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', padding = 'md', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'rounded-xl',
          variantClasses[variant],
          paddingClasses[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div className={clsx('mb-4', className)} {...props}>
      {children}
    </div>
  )
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

function CardTitle({ className, children, ...props }: CardTitleProps) {
  return (
    <h3
      className={clsx(
        'font-condensed text-xl font-bold uppercase tracking-wide text-white',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
}

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

function CardBody({ className, children, ...props }: CardBodyProps) {
  return (
    <div className={clsx('text-gray-300', className)} {...props}>
      {children}
    </div>
  )
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

function CardFooter({ className, children, ...props }: CardFooterProps) {
  return (
    <div
      className={clsx('mt-4 pt-4 border-t border-dark-border', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export { Card, CardHeader, CardTitle, CardBody, CardFooter }
