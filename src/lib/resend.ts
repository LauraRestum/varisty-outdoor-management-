import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export const OWNER_EMAIL = process.env.OWNER_EMAIL || 'bergkampw@gmail.com'
export const FROM_EMAIL = 'Varsity Outdoor Management <noreply@varsityoutdoor.com>'
