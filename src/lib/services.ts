// Service catalogue for the marketing site. Slugs match the service enum
// used by the quote form, API, and dashboard — don't rename them.

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
      'Ongoing maintenance plans',
    ],
    metaDescription:
      'Shrub trimming, tree pruning and plant health care from Varsity Outdoor Services.',
  },
  {
    slug: 'snow-removal',
    title: 'Snow Removal',
    short: 'Plowing, salting and ice management.',
    intro:
      'When winter hits, we are ready before the first flake falls. Driveways, walks and lots cleared quickly with plowing, salting and de-icing.',
    image: '/images/photos/snow.jpg',
    includes: [
      'Driveway and lot plowing',
      'Salting and de-icing',
      'Sidewalk and stair clearing',
      'Per-storm or seasonal contracts',
      'Priority service available',
    ],
    metaDescription:
      'Snow plowing, salting and ice management for homes and businesses from Varsity Outdoor Services.',
  },
  {
    slug: 'seasonal-cleanup',
    title: 'Seasonal Clean Ups',
    short: 'Leaf removal, debris clearing and storm recovery.',
    intro:
      'Spring and fall clean ups get your property ready for what comes next. We clear leaves and debris, refresh beds and haul everything away.',
    image: '/images/photos/crew-planting.jpg',
    includes: [
      'Leaf removal from lawn and beds',
      'Debris and storm clean up',
      'Bed edging and refresh',
      'Pruning of winter damage',
      'Haul-away included',
    ],
    metaDescription:
      'Spring and fall clean ups, leaf removal and storm debris clearing from Varsity Outdoor Services.',
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
    slug: 'fertilization',
    title: 'Fertilization',
    short: 'Weed control and seasonal feeding programs.',
    intro:
      'A great lawn starts with great nutrition. Our seasonal program gives your turf exactly what it needs, when it needs it, for thick, green, weed-free grass.',
    image: '/images/photos/lawn-closeup.jpg',
    includes: [
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
]

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug)
}
