import type { Metadata } from 'next'
import { Inter, Barlow_Condensed } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  variable: '--font-barlow-condensed',
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Varsity Outdoor Management | Professional Lawn & Landscape Services',
    template: '%s | Varsity Outdoor Management',
  },
  description:
    'Professional lawn care, landscaping, snow removal, and outdoor management services. Serving the greater area with reliable, top-quality work. Get a free quote today.',
  keywords: [
    'lawn care',
    'landscaping',
    'snow removal',
    'irrigation',
    'fertilization',
    'hardscaping',
    'tree care',
    'seasonal cleanup',
    'outdoor management',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'Varsity Outdoor Management',
    title: 'Varsity Outdoor Management | Professional Lawn & Landscape Services',
    description:
      'Professional lawn care, landscaping, snow removal, and outdoor management services. Get a free quote today.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Varsity Outdoor Management',
    description: 'Professional lawn care & outdoor management services.',
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
    <html lang="en" className={`${inter.variable} ${barlowCondensed.variable}`}>
      <body className="bg-dark-bg text-white antialiased">
        {children}
      </body>
    </html>
  )
}
