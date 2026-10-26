export const GALLERY_FILTERS = ['All', 'Lawn Care', 'Landscaping', 'Property Maintenance', 'Seasonal'] as const
export type GalleryFilter = (typeof GALLERY_FILTERS)[number]

export const GALLERY: { src: string; alt: string; category: Exclude<GalleryFilter, 'All'> }[] = [
  { src: '/images/photos/striped-lawn.jpg', alt: 'Freshly striped front lawn with mower', category: 'Lawn Care' },
  { src: '/images/photos/garden-path.jpg', alt: 'Garden walkway lined with roses and hedges', category: 'Landscaping' },
  { src: '/images/photos/home-lawn.jpg', alt: 'Modern home with a manicured lawn', category: 'Property Maintenance' },
  { src: '/images/photos/flower-bed.jpg', alt: 'Colorful flower bed planting', category: 'Landscaping' },
  { src: '/images/photos/snow.jpg', alt: 'Snow-covered walkway in winter', category: 'Seasonal' },
  { src: '/images/photos/crew-trimming.jpg', alt: 'Crew member trimming a front lawn', category: 'Property Maintenance' },
  { src: '/images/photos/hero-mower.jpg', alt: 'Lawn mower on a freshly cut lawn', category: 'Lawn Care' },
  { src: '/images/photos/cottage-garden.jpg', alt: 'Cottage garden in full bloom', category: 'Landscaping' },
  { src: '/images/photos/brick-home.jpg', alt: 'Brick home with tidy lawn and shrubs', category: 'Property Maintenance' },
  { src: '/images/photos/lawn-closeup.jpg', alt: 'Thick, healthy turf', category: 'Lawn Care' },
  { src: '/images/photos/crew-planting.jpg', alt: 'Spring bed preparation and planting', category: 'Seasonal' },
  { src: '/images/photos/striped-lawn-2.jpg', alt: 'Striped lawn in front of a brick home', category: 'Lawn Care' },
]
