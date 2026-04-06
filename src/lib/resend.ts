import { Resend } from 'resend'

export const OWNER_EMAIL = process.env.OWNER_EMAIL || 'bergkampw@gmail.com'
export const FROM_EMAIL = 'Varsity Outdoor Management <noreply@varsityoutdoor.com>'

// Lazy — only instantiated when first used at runtime
let _resend: Resend | null = null
export function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY || 'placeholder')
  }
  return _resend
}

// Proxy for backward compat with `resend.emails.send()`
export const resend = new Proxy({} as Resend, {
  get(_target, prop) {
    return (getResend() as any)[prop]
  },
})
