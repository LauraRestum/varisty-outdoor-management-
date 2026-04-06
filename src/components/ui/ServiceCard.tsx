import Link from 'next/link'
import { clsx } from 'clsx'
import { ArrowRight } from 'lucide-react'

interface ServiceCardProps {
  title: string
  description: string
  href: string
  icon: React.ReactNode
  featured?: boolean
  className?: string
}

export function ServiceCard({
  title,
  description,
  href,
  icon,
  featured,
  className,
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className={clsx(
        'group block p-6 rounded-xl border-2 transition-all duration-300',
        'bg-dark-card hover:bg-dark-muted/30',
        featured
          ? 'border-brand-green/50 hover:border-brand-green shadow-lg shadow-brand-green/10'
          : 'border-dark-border hover:border-brand-green/50',
        className
      )}
    >
      <div
        className={clsx(
          'w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors',
          featured
            ? 'bg-brand-green/20 text-brand-green'
            : 'bg-dark-muted/50 text-gray-400 group-hover:bg-brand-green/20 group-hover:text-brand-green'
        )}
      >
        {icon}
      </div>
      <h3 className="font-condensed text-xl font-bold uppercase text-white mb-2 group-hover:text-brand-green transition-colors">
        {title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-4">{description}</p>
      <span className="inline-flex items-center gap-1 text-brand-green text-sm font-semibold group-hover:gap-2 transition-all">
        Learn More <ArrowRight className="w-4 h-4" />
      </span>
    </Link>
  )
}
