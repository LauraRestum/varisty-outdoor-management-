# Site Imagery

## Brand artwork — `public/brand/`
Official Varsity Outdoor Services brand kit (SVG). Used by `src/components/site/Logo.tsx`.

| File | Used for |
|---|---|
| `logo-primary.svg` | Header logo (light backgrounds) |
| `logo-primary-reversed.svg` | Footer, mobile menu, auth pages, photo overlays |
| `badge.svg` / `badge-reversed.svg` | About page |
| `icon-reversed.svg` | "Lawn Care" icon in the home service strip |
| `og-image.jpg` | Social share preview |

Favicon / Apple icon: `src/app/icon.png`, `src/app/apple-icon.png` (V monogram).

## Photography — `public/images/photos/`
Stock photography (Unsplash license) plus two crops of our own lawn photos
(`striped-lawn.jpg`, `striped-lawn-2.jpg`). To swap in your own job photos,
replace a file with one of the same name, or update paths in:

- `src/lib/services.ts` — the photo for each service card and detail page
- `src/lib/gallery.ts` — gallery images and their filter categories
- `src/app/page.tsx`, `src/app/(marketing)/*/page.tsx` — hero and section photos

Business details (phone, email, city, social links) live in `src/lib/site.ts`.
