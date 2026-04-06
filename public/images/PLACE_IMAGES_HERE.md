# Brand Photography — Drop Files Here

Place the following image files directly in this `public/images/` folder.

| Filename | Description | Used In |
|---|---|---|
| `hero-truck-action.jpg` | Black branded Ford F-150 + equipment trailer + operator on riding mower, premium suburban home, aerial-ish shot | Hero Section (Slide 1), Quote CTA Section background |
| `hero-shirt-house.jpg` | Man in Varsity branded shirt, back to camera, standing in front of a well-landscaped home | Hero Section (Slide 2), About page hero background |
| `brand-sign-lawn.jpg` | White Varsity yard sign planted in perfectly mowing-striped lawn, no tagline version | Why Varsity Section — right-column image panel |
| `brand-sign-tagline.jpg` | Same yard sign with "Elevate Your Lawn, Simplify Your Life." tagline on it, striped lawn backdrop | Testimonials Section — header backdrop |
| `logo-white.png` | Clean Varsity Outdoor Management logo on white background | Navbar logo, og:image metadata |

## Notes

- All images are served via Next.js `<Image>` component (never raw `<img>` tags)
- Hero images use `priority` for fastest loading
- Background-style images use `fill` with a `relative` parent container
- Do not rename the files — the exact filenames above are already wired into the code
