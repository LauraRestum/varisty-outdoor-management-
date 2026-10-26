// Central business details for the marketing site.
// Update these values in one place and every page picks them up.

export const SITE = {
  name: 'Varsity Outdoor Services',
  shortName: 'Varsity',
  tagline: 'Professional outdoor services for a higher standard.',
  slogan: 'Go with the winning team.',
  city: 'Wichita, KS',
  phone: '316.555.0123',
  phoneHref: 'tel:+13165550123',
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
  { href: '/about', label: 'About' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
] as const
