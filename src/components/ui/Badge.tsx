import { clsx } from 'clsx'
import type { JobStatus, QuoteStatus, InvoiceStatus } from '@/types'

type BadgeVariant =
  | 'default'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'red'
  | 'gray'
  | 'purple'
  | 'orange'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: 'sm' | 'md'
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-gray-700 text-gray-200',
  green: 'bg-green-900/50 text-green-400 border border-green-800',
  yellow: 'bg-yellow-900/50 text-yellow-400 border border-yellow-800',
  blue: 'bg-blue-900/50 text-blue-400 border border-blue-800',
  red: 'bg-red-900/50 text-red-400 border border-red-800',
  gray: 'bg-gray-800 text-gray-400 border border-gray-700',
  purple: 'bg-purple-900/50 text-purple-400 border border-purple-800',
  orange: 'bg-orange-900/50 text-orange-400 border border-orange-800',
}

const sizeClasses = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
}

export function Badge({ variant = 'default', size = 'sm', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 font-semibold rounded-full',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

// Job status badge
export function JobStatusBadge({ status }: { status: JobStatus }) {
  const config: Record<JobStatus, { variant: BadgeVariant; label: string; dot: string }> = {
    scheduled: { variant: 'blue', label: 'Scheduled', dot: 'bg-blue-400' },
    in_progress: { variant: 'yellow', label: 'In Progress', dot: 'bg-yellow-400' },
    completed: { variant: 'green', label: 'Completed', dot: 'bg-green-400' },
    invoiced: { variant: 'purple', label: 'Invoiced', dot: 'bg-purple-400' },
    cancelled: { variant: 'red', label: 'Cancelled', dot: 'bg-red-400' },
  }

  const { variant, label, dot } = config[status]

  return (
    <Badge variant={variant}>
      <span className={clsx('w-1.5 h-1.5 rounded-full', dot)} />
      {label}
    </Badge>
  )
}

// Quote status badge
export function QuoteStatusBadge({ status }: { status: QuoteStatus }) {
  const config: Record<QuoteStatus, { variant: BadgeVariant; label: string }> = {
    pending: { variant: 'yellow', label: 'Pending' },
    sent: { variant: 'blue', label: 'Sent' },
    viewed: { variant: 'purple', label: 'Viewed' },
    accepted: { variant: 'green', label: 'Accepted' },
    declined: { variant: 'red', label: 'Declined' },
  }

  const { variant, label } = config[status]
  return <Badge variant={variant}>{label}</Badge>
}

// Invoice status badge
export function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
  const config: Record<InvoiceStatus, { variant: BadgeVariant; label: string }> = {
    pending: { variant: 'yellow', label: 'Pending' },
    paid: { variant: 'green', label: 'Paid' },
    overdue: { variant: 'red', label: 'Overdue' },
  }

  const { variant, label } = config[status]
  return <Badge variant={variant}>{label}</Badge>
}
