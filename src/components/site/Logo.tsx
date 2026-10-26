import Image from 'next/image'
import { clsx } from 'clsx'
import { SITE } from '@/lib/site'

// Official brand kit artwork lives in /public/brand (SVG)
const LOGOS = {
  forest: { src: '/brand/logo-primary.svg', width: 1696, height: 779 },
  light: { src: '/brand/logo-primary-reversed.svg', width: 1696, height: 779 },
} as const

interface LogoProps {
  variant?: keyof typeof LOGOS
  className?: string
  priority?: boolean
}

export function Logo({ variant = 'forest', className, priority }: LogoProps) {
  const logo = LOGOS[variant]
  return (
    <Image
      src={logo.src}
      alt={SITE.name}
      width={logo.width}
      height={logo.height}
      priority={priority}
      unoptimized
      className={clsx('w-auto', className)}
    />
  )
}

// Grass tuft brand icon (white + olive, for dark backgrounds)
export function GrassIcon({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/icon-reversed.svg"
      alt=""
      width={114}
      height={114}
      unoptimized
      className={className}
    />
  )
}

// Circular badge
export function Badge({ variant = 'forest', className }: { variant?: 'forest' | 'light'; className?: string }) {
  return (
    <Image
      src={variant === 'light' ? '/brand/badge-reversed.svg' : '/brand/badge.svg'}
      alt={`${SITE.name} badge`}
      width={1000}
      height={1000}
      unoptimized
      className={className}
    />
  )
}
