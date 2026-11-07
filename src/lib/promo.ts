// 2027 season pre-book offer. Change the deadline, discount, or add-on
// lists here and every page that mentions the offer updates with it.

export const PROMO = {
  season: 2027,
  deadline: 'December 6th',
  discount: '15%',
  freeAddOnCount: 2,
  // Rough window the Spring Refresh visits happen; weather decides the exact day.
  window: 'mid-March to April',
}

// What every Spring Refresh includes.
export const SPRING_REFRESH_INCLUDES = [
  'Dead limbs and branches cut out (anything reachable from the ground)',
  'Dead leaves and winter debris cleared from the lawn, beds, and fence lines',
  'Dead perennials and ornamental grasses cut back',
  'Bushes and shrubs trimmed and shaped',
  'Bed lines re-edged for a crisp border',
  'Existing mulch fluffed and refreshed',
  'Slow-release plant food for existing shrubs and beds',
  'First mow, edge, and blow of the season',
  'Everything hauled away',
  'A yard walk-through: we flag anything that needs attention and line up a trusted pro if it is outside what we do',
]

// Pick-two freebies. Each one is low cost to us and high value to the homeowner.
export const FREE_ADD_ONS = [
  { name: 'Curb address repaint', detail: 'Fresh house numbers painted on your curb so guests and deliveries find you.' },
  { name: 'Outdoor bulb swap', detail: 'Up to 6 porch, garage, and landscape bulbs swapped for new LEDs.' },
  { name: '5 extra bags of mulch', detail: 'More fresh mulch, spread where your beds need it most.' },
  { name: 'Porch and front walk power wash', detail: 'Wash away winter salt and grime from your entry.' },
  { name: 'Crack weed pull', detail: 'Weeds pulled by hand from driveway and sidewalk cracks.' },
  { name: 'Patio setup', detail: 'Patio furniture pulled out, wiped down, and the patio blown clean.' },
  { name: 'Rock bed refresh', detail: 'Existing rock beds raked, weeded, and blown out.' },
  { name: 'Window well cleanout', detail: 'Leaves and debris cleared out of window wells.' },
]

// Paid extras customers can add while they book.
export const PAID_ADD_ONS = [
  'Additional mulch, by the bag or by the yard',
  'New river rock or decorative rock',
  'Full driveway and patio power wash',
  'Extra outdoor bulb swaps',
  'Guest Ready detail visit before a spring event',
]
