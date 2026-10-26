'use client'

import { useState } from 'react'
import Image from 'next/image'
import { clsx } from 'clsx'
import { GALLERY, GALLERY_FILTERS, type GalleryFilter } from '@/lib/gallery'

export function GalleryGrid() {
  const [filter, setFilter] = useState<GalleryFilter>('All')
  const items = filter === 'All' ? GALLERY : GALLERY.filter((g) => g.category === filter)

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter gallery">
        {GALLERY_FILTERS.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={clsx(
              'px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.16em] border transition-colors min-h-0',
              filter === f
                ? 'bg-gold border-gold text-forest-dark'
                : 'bg-white border-sand text-charcoal/75 hover:border-forest hover:text-forest'
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
        {items.map((g) => (
          <figure key={g.src} className="relative aspect-[4/3] overflow-hidden group">
            <Image
              src={g.src}
              alt={g.alt}
              fill
              sizes="(min-width: 768px) 33vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-dark/85 to-transparent p-3 pt-8 text-[10px] font-bold uppercase tracking-[0.16em] text-white opacity-0 group-hover:opacity-100 transition-opacity">
              {g.category}
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  )
}
