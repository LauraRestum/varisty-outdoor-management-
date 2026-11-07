// Central business details for the marketing site.
// Update these values in one place and every page picks them up.

export const SITE = {
  name: 'Varsity Outdoor Services',
  shortName: 'Varsity',
  tagline: 'Professional outdoor services for a higher standard.',
  slogan: 'Go with the winning team.',
  city: 'Wichita, KS',
  phone: '316.259.5763',
  phoneHref: 'tel:+13162595763',
  smsHref: 'sms:+13162595763',
  email: 'varsityoutdoorservices@gmail.com',
  hours: 'Call or text anytime',
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
  { href: '/spring-refresh', label: '2027 Pre-Book' },
  { href: '/about', label: 'About' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
] as const

// Builds a text-message link with a prefilled body. iOS and Android both
// accept the "?&body=" form.
export function smsLink(body: string) {
  return `${SITE.smsHref}?&body=${encodeURIComponent(body)}`
}

export function mailLink(subject: string, body: string) {
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
