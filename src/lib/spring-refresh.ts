// 2027 Spring Refresh pre-book promotion. Every number, date and list on the
// Spring Refresh page and home page banner comes from here — change it once.

import { SITE } from './site'

export const SPRING_REFRESH = {
  season: '2027',
  // Last day to prepay and lock in the early-bird offer
  bookBy: 'December 5, 2026',
  // When the work actually happens (weather dependent)
  serviceWindow: 'mid-March through April 2027',
  discount: '15%',
  freeAddOns: 2,
} as const

// What every Spring Refresh includes
export const SPRING_REFRESH_INCLUDES: { title: string; detail: string }[] = [
  {
    title: 'Dead limb & winter damage pruning',
    detail: 'Cut out dead, broken and storm-damaged branches on shrubs and small trees.',
  },
  {
    title: 'Leaf & debris clean out',
    detail: 'Clear everything that died off or blew in over the winter from beds, lawn edges, fence lines and corners.',
  },
  {
    title: 'Cut back perennials & ornamental grasses',
    detail: 'Last year’s dead growth cut down so new growth comes in clean.',
  },
  {
    title: 'Shrub trimming & shaping',
    detail: 'Bushes trimmed back into shape before they leaf out.',
  },
  {
    title: 'Fresh bed edges',
    detail: 'Crisp, re-cut edges between your beds and lawn.',
  },
  {
    title: 'Bed weeding',
    detail: 'Early weeds pulled before they take over.',
  },
  {
    title: 'Fertilize existing landscaping',
    detail: 'A spring feeding for your shrubs and plantings to kick off the growing season.',
  },
  {
    title: 'Mulch fluff & top off',
    detail: 'Existing mulch turned and refreshed, plus a top off where it has thinned out.',
  },
  {
    title: 'Haul away included',
    detail: 'Every bag, branch and pile leaves with us.',
  },
]

// Customers pick SPRING_REFRESH.freeAddOns of these when they prepay.
// Keep this list to quick, low-material-cost jobs.
export const FREE_ADD_ONS: { title: string; detail: string }[] = [
  {
    title: 'Curb address painting',
    detail: 'Fresh, easy-to-read house numbers painted on your curb.',
  },
  {
    title: 'Exterior light bulb swap',
    detail: 'New LED bulbs in up to 8 outdoor fixtures: porch, garage and coach lights.',
  },
  {
    title: 'Extra mulch',
    detail: 'Up to 5 extra bags of mulch for thin spots or a fuller look.',
  },
  {
    title: 'Front steps & porch power wash',
    detail: 'Wash away the winter grime and salt build-up from your entry.',
  },
  {
    title: 'Porch planter refresh',
    detail: 'Two front porch pots cleaned out and planted with fresh spring color.',
  },
  {
    title: 'Gutter clear out',
    detail: 'Leaves and debris cleared from gutters and downspouts (single-story homes).',
  },
  {
    title: 'Window well clean out',
    detail: 'Leaves, trash and debris cleared from all window wells.',
  },
  {
    title: 'Patio set up',
    detail: 'Patio furniture brought out, wiped down and set up for the season.',
  },
]

// Bigger upgrades, quoted separately
export const PAID_UPGRADES: string[] = [
  'Full driveway & sidewalk power washing',
  'Additional mulch or new mulch beds',
  'River rock or decorative stone beds',
  'Irrigation spring start-up',
  'Seasonal lawn fertilization program',
  'New plantings & seasonal color',
]

export const SPRING_REFRESH_EMAIL = `Hi ${SITE.owner},

I'd like to pre-book the ${SPRING_REFRESH.season} Spring Refresh.

Name:
Address:
Phone:
My ${SPRING_REFRESH.freeAddOns} free add-ons:
  1.
  2.
Any upgrades I'm interested in:

Thanks!`
