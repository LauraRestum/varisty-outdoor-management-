// Central business details for the marketing site.
// Update these values in one place and every page picks them up.

export const SITE = {
  name: 'Varsity Outdoor Services',
  shortName: 'Varsity',
  tagline: 'Professional outdoor services for a higher standard.',
  slogan: 'Go with the winning team.',
  city: 'Wichita, KS',
  // William's cell. Calls AND texts go here. TODO: replace the placeholder
  // number below with William's real cell before launch.
  owner: 'William',
  phone: '316.555.0123',
  phoneHref: 'tel:+13165550123',
  smsHref: 'sms:+13165550123',
  email: 'bergkampw@gmail.com',
  hours: 'Mon–Sat: 7am–6pm',
  // Leave a link empty ('') to hide that icon
  social: {
    facebook: '',
    instagram: '',
    linkedin: 'https://www.linkedin.com/company/varsity-outdoor-services/',
  },
} as const

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/spring-refresh', label: 'Spring Refresh' },
  { href: '/about', label: 'About' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
] as const

// ---------------------------------------------------------------------------
// Quote requests go straight to William by email, call or text (no form
// backend needed). These helpers build pre-filled links.
// ---------------------------------------------------------------------------

export function mailtoHref(subject: string, body = '') {
  const params = new URLSearchParams({ subject, body })
  // URLSearchParams encodes spaces as "+", which most mail apps show literally
  return `mailto:${SITE.email}?${params.toString().replace(/\+/g, '%20')}`
}

export function smsHref(body: string) {
  // "?&body=" works on both iOS and Android
  return `${SITE.smsHref}?&body=${encodeURIComponent(body)}`
}

export const QUOTE_EMAIL_TEMPLATE = `Hi ${SITE.owner},

I'd like a quote.

Name:
Address:
Phone:
Service(s) I'm interested in:
Anything else you should know:

Thanks!`
