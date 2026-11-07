// Service catalogue for the marketing site. Slugs match the service enum
// used by the quote form, API, and dashboard — don't rename them.
// Snow removal is no longer offered: its slug stays in the type so old
// records still load, but it is not in the public catalogue.

export type ServiceSlug =
  | 'lawn-mowing'
  | 'landscaping'
  | 'snow-removal'
  | 'irrigation'
  | 'tree-shrub-care'
  | 'hardscaping'
  | 'fertilization'
  | 'seasonal-cleanup'

export interface Service {
  slug: ServiceSlug
  title: string
  short: string
  intro: string
  image: string
  includes: string[]
  metaDescription: string
}

export const SERVICES: Service[] = [
  {
    slug: 'seasonal-cleanup',
    title: 'Fall & Spring Clean Ups',
    short: 'Leaf removal, bed clean outs and haul away.',
    intro:
      'Fall clean ups get your property buttoned up before winter, and spring clean ups get it ready for the growing season. We clear leaves and debris, cut back beds and haul everything away.',
    image: '/images/photos/crew-planting.jpg',
    includes: [
      'Leaf removal from lawn, beds and fence lines',
      'Perennial and ornamental grass cut back',
      'Gutter and window well clean out',
      'Storm and debris clean up',
      'Haul away included',
    ],
    metaDescription:
      'Fall leaf clean ups, spring clean ups and debris removal from Varsity Outdoor Services.',
  },
  {
    slug: 'tree-shrub-care',
    title: 'Tree & Shrub Care',
    short: 'Pruning, shaping and plant health care.',
    intro:
      'Your trees, shrubs and beds are living investments. Regular care keeps them healthy, shaped and looking sharp so your whole property stays on point.',
    image: '/images/photos/crew-trimming.jpg',
    includes: [
      'Shrub trimming and shaping',
      'Structural tree pruning',
      'Weed control in beds',
      'Deadwood and hazard removal',
      'Dormant-season pruning in late fall and winter',
    ],
    metaDescription:
      'Shrub trimming, tree pruning and plant health care from Varsity Outdoor Services.',
  },
  {
    slug: 'irrigation',
    title: 'Irrigation',
    short: 'Startups, winterization and repairs.',
    intro:
      'A properly running irrigation system saves water and keeps your lawn consistently green without the hassle of watering by hand.',
    image: '/images/photos/lush-garden.jpg',
    includes: [
      'Spring startup and inspection',
      'Fall blowout and winterization',
      'Head and leak repair',
      'Smart controller upgrades',
      'Zone optimization',
    ],
    metaDescription:
      'Sprinkler startup, winterization and repair from Varsity Outdoor Services.',
  },
  {
    slug: 'fertilization',
    title: 'Fertilization',
    short: 'Weed control and seasonal feeding programs.',
    intro:
      'A great lawn starts with great nutrition. Our seasonal program gives your turf exactly what it needs, when it needs it, for thick, green, weed-free grass.',
    image: '/images/photos/lawn-closeup.jpg',
    includes: [
      'Fall winterizer feeding',
      'Seasonal fertilization program',
      'Pre- and post-emergent weed control',
      'Grub control',
      'Core aeration',
      'Overseeding thin areas',
    ],
    metaDescription:
      'Lawn fertilization, weed control, aeration and overseeding from Varsity Outdoor Services.',
  },
  {
    slug: 'landscaping',
    title: 'Landscaping',
    short: 'Design, installation and enhancements.',
    intro:
      'From a simple bed refresh to a complete property transformation, our team brings your vision to life with quality plants, expert installation and lasting results.',
    image: '/images/photos/flower-bed.jpg',
    includes: [
      'Landscape design consultation',
      'Plant selection and installation',
      'Bed installation, mulch and edging',
      'Planting and bed care',
      'Seasonal color rotation',
    ],
    metaDescription:
      'Landscape design, planting, bed installation and mulching from Varsity Outdoor Services.',
  },
  {
    slug: 'hardscaping',
    title: 'Hardscaping',
    short: 'Patios, walkways, borders and walls.',
    intro:
      'From a simple walkway to a complete patio with borders and retaining walls, we build hardscape features that add lasting value to your home.',
    image: '/images/photos/garden-path.jpg',
    includes: [
      'Paver and natural stone patios',
      'Walkways and stepping paths',
      'Retaining walls',
      'Edging, gravel and borders',
      'Fire pit surrounds',
    ],
    metaDescription:
      'Paver patios, walkways, borders and retaining walls from Varsity Outdoor Services.',
  },
  {
    slug: 'lawn-mowing',
    title: 'Lawn Care',
    short: 'Mowing, edging, trimming and more.',
    intro:
      'A healthy, well maintained lawn makes a lasting impression. Our professional lawn care services keep your property looking clean, green and its best all season long.',
    image: '/images/photos/striped-lawn.jpg',
    includes: [
      'Routine mowing with sharp blades',
      'Edging and trimming',
      'Clipping clean up and blow-off',
      'Weekly or bi-weekly scheduling',
      'Consistent crew on your property',
    ],
    metaDescription:
      'Routine mowing, edging, trimming and clean up. Weekly and bi-weekly lawn care plans from Varsity Outdoor Services.',
  },
]

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug)
}
