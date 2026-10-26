import type { Metadata } from 'next'
import { Montserrat, Saira_Condensed } from 'next/font/google'
import { SITE } from '@/lib/site'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const saira = Saira_Condensed({
  subsets: ['latin'],
  variable: '--font-saira',
  weight: ['500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_APP_URL ? new URL(process.env.NEXT_PUBLIC_APP_URL) : undefined,
  title: {
    default: `${SITE.name} | Professional Outdoor Services in ${SITE.city}`,
    template: `%s | ${SITE.name}`,
  },
  description: `Lawn care, landscaping, property maintenance, seasonal services and clean ups in ${SITE.city}. ${SITE.tagline} Get a free quote today.`,
  keywords: [
    'lawn care',
    'landscaping',
    'property maintenance',
    'snow removal',
    'seasonal clean up',
    'mowing',
    `lawn care ${SITE.city}`,
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: SITE.name,
    title: `${SITE.name} | Professional Outdoor Services`,
    description: `Professional outdoor services for a higher standard. ${SITE.slogan}`,
    images: [{ url: '/brand/og-image.jpg', width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.name,
    description: 'Professional outdoor services for a higher standard.',
    images: ['/brand/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${saira.variable}`}>
      <body className="bg-cream text-charcoal antialiased">
        {children}
      </body>
    </html>
  )
}
