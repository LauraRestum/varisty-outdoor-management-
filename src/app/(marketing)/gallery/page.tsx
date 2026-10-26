import type { Metadata } from 'next'
import { QuoteCta } from '@/components/site/Blocks'
import { GalleryGrid } from '@/components/site/GalleryGrid'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Recent lawn care, landscaping and property maintenance work from Varsity Outdoor Services.',
}

export default function GalleryPage() {
  return (
    <>
      <section className="bg-white">
        <div className="container-site py-16 md:py-20">
          <p className="eyebrow text-olive mb-3">Our Work</p>
          <h1 className="heading-xl text-forest">Real results.</h1>
          <p className="mt-4 max-w-xl text-charcoal/75 leading-relaxed">
            Take a look at some of our recent projects and see the difference professional outdoor services can make.
          </p>
          <GalleryGrid />
        </div>
      </section>
      <QuoteCta />
    </>
  )
}
