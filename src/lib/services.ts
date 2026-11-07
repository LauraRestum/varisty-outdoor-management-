// Service catalogue for the marketing site. Older slugs match the service enum
// used by the dashboard, so don't rename them. Snow removal, irrigation,
// hardscaping, and fertilization are no longer offered and are not listed.

export type ServiceSlug =
  | 'lawn-mowing'
  | 'landscaping'
  | 'snow-removal'
  | 'irrigation'
  | 'tree-shrub-care'
  | 'hardscaping'
  | 'fertilization'
  | 'seasonal-cleanup'
  | 'spring-refresh'
  | 'storm-cleanup'
  | 'event-ready'

export interface Service {
  slug: ServiceSlug
  title: string
  short: string
  intro: string
  image: string
  includes: string[]
  metaDescription: string
  // Optional custom page; otherwise /services/[slug]
  href?: string
}

export const SERVICES: Service[] = [
  {
    slug: 'seasonal-cleanup',
    title: 'Fall Cleanup',
    short: 'Leaves, beds, and light limbs cleared so your yard is ready for winter.',
    intro:
      'Leaves left sitting all winter smother your grass and invite mold. We clear the lawn and beds, cut back what is done for the year, and haul it all away so your yard comes back strong in spring.',
    image: '/images/photos/brick-home.jpg',
    includes: [
      'Leaf removal from the lawn and beds',
      'Dead plants cut back',
      'Light limb removal and haul-away',
      'Final cut of the season, a little shorter to prevent matting and mold',
      'Everything hauled away',
    ],
    metaDescription:
      'Fall leaf removal, bed cleanup, and final mow of the season in Wichita from Varsity Outdoor Services.',
  },
  {
    slug: 'spring-refresh',
    title: 'Spring Refresh',
    href: '/spring-refresh',
    short: 'Everything winter left behind, cleaned up before your first mow.',
    intro:
      'One visit that takes your yard from winter-worn to spring-ready. Book now for the 2027 season to save and pick two free add-ons.',
    image: '/images/photos/crew-planting.jpg',
    includes: [
      'Dead limbs, leaves, and winter debris cleared',
      'Dead perennials and ornamental grasses cut back',
      'Bushes and shrubs trimmed and shaped',
      'Beds re-edged and mulch refreshed',
      'First mow of the season',
    ],
    metaDescription:
      'Pre-book a 2027 Spring Refresh in Wichita: winter debris cleanup, shrub trimming, bed edging, and mulch refresh from Varsity Outdoor Services.',
  },
  {
    slug: 'lawn-mowing',
    title: 'Lawn Care',
    short: 'Mow, weed eat, edge, and blow, every visit.',
    intro:
      'A sharp-looking lawn makes a lasting impression. Every visit is full service, and we schedule around how your lawn is actually growing, so it stays sharp from the curb to the back fence.',
    image: '/images/photos/striped-lawn.jpg',
    includes: [
      'Mowing',
      'Weed eating and trimming',
      'Edging along walks and drives',
      'Blow-off of clippings and debris',
      'Scheduled around weather and growth',
    ],
    metaDescription:
      'Full-service mowing, trimming, edging, and blow-off in Wichita from Varsity Outdoor Services. Booking 2027 mowing spots now.',
  },
  {
    slug: 'tree-shrub-care',
    title: 'Shrub & Bush Trimming',
    short: 'Clean, shaped shrubs and light limb removal.',
    intro:
      'Overgrown shrubs make a whole property look tired. We shape and tidy them, take down light limbs, and clean up every clipping.',
    image: '/images/photos/crew-trimming.jpg',
    includes: [
      'Shrub and bush shaping',
      'Light limb removal',
      'Cleanup of all clippings',
      'Seasonal touch-ups',
    ],
    metaDescription:
      'Shrub and bush trimming and light limb removal in Wichita from Varsity Outdoor Services.',
  },
  {
    slug: 'landscaping',
    title: 'Mulching & Bed Care',
    short: 'Fresh mulch and clean bed edges.',
    intro:
      'Fresh mulch gives beds a clean, finished look and helps them hold moisture through Kansas summers.',
    image: '/images/photos/flower-bed.jpg',
    includes: [
      'Bed refresh with new mulch',
      'Crisp, re-cut bed edges',
      'Hand weeding in beds',
      'Recurring touch-ups',
    ],
    metaDescription:
      'Mulching, bed edging, and bed care in Wichita from Varsity Outdoor Services.',
  },
  {
    slug: 'storm-cleanup',
    title: 'Storm Cleanup',
    short: 'Branches and debris cleared after Kansas weather rolls through.',
    intro:
      'When wind or ice brings branches down across your yard, we clear it out and get things back to normal fast.',
    image: '/images/photos/lush-garden.jpg',
    includes: [
      'Downed branch and debris removal',
      'Light limb removal',
      'Haul-away',
    ],
    metaDescription:
      'Storm debris and downed branch cleanup in Wichita from Varsity Outdoor Services.',
  },
  {
    slug: 'event-ready',
    title: 'Guest Ready',
    short: 'Hosting the holidays or a party? We will get your yard guest-ready.',
    intro:
      'Holiday visitors, a graduation, or a backyard party: we give your yard an extended, detailed visit so it looks its best when guests arrive.',
    image: '/images/photos/garden-path.jpg',
    includes: [
      'Detailed mow and edge',
      'Shrub trimming',
      'Dead flowers picked',
      'Patio power washing',
      'Please book 8 to 10 days ahead',
    ],
    metaDescription:
      'Detailed guest-ready yard visits before holidays and events in Wichita from Varsity Outdoor Services.',
  },
]

export function serviceHref(s: Service) {
  return s.href ?? `/services/${s.slug}`
}

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug)
}
