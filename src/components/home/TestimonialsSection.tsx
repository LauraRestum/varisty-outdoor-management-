'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    location: 'Dublin, OH',
    service: 'Weekly Lawn Care',
    rating: 5,
    text: "Varsity has been taking care of our lawn for two seasons now and I couldn't be happier. They show up exactly when they say they will, the quality is consistent, and the guys are always professional. Our yard has never looked better.",
    initials: 'SM',
  },
  {
    id: 2,
    name: 'James Rodriguez',
    location: 'Westerville, OH',
    service: 'Full Landscaping',
    rating: 5,
    text: "We hired Varsity for a complete backyard overhaul — new beds, patio, plants, the works. The design was spot-on, the work was done in 3 days, and the final result was way beyond what we expected. Highly recommend.",
    initials: 'JR',
  },
  {
    id: 3,
    name: 'Tom Kowalski',
    location: 'Hilliard, OH',
    service: 'Snow Removal',
    rating: 5,
    text: "Last winter was brutal and Varsity had my driveway cleared every single time before I needed to leave for work. The priority service is absolutely worth it. Never had to worry about being late once.",
    initials: 'TK',
  },
  {
    id: 4,
    name: 'Lisa Chen',
    location: 'New Albany, OH',
    service: 'Fertilization Program',
    rating: 5,
    text: "My lawn was patchy and struggling. After one season on their fertilization program it looks completely transformed — thick, green, and weed-free. The crew explained everything and set realistic expectations. So refreshing.",
    initials: 'LC',
  },
  {
    id: 5,
    name: 'Marcus Thompson',
    location: 'Gahanna, OH',
    service: 'Irrigation Install',
    rating: 5,
    text: "Had Varsity install a full irrigation system. They were organized, cleaned up perfectly, and walked me through the whole system. The smart controller they installed saves me money every month. Fantastic work.",
    initials: 'MT',
  },
]

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [startX, setStartX] = useState<number | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  function goTo(index: number) {
    setActiveIndex(Math.max(0, Math.min(index, TESTIMONIALS.length - 1)))
  }

  function handleTouchStart(e: React.TouchEvent) {
    setStartX(e.touches[0].clientX)
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (startX === null) return
    const diff = startX - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0) goTo(activeIndex + 1)
      else goTo(activeIndex - 1)
    }
    setStartX(null)
  }

  return (
    <section className="py-20 md:py-28 bg-dark-card border-y border-dark-border" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header with brand-sign-tagline backdrop */}
        <div className="relative rounded-2xl overflow-hidden mb-12">
          {/* Background photo */}
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src="/images/brand-sign-tagline.jpg"
              alt="Varsity Outdoor Management yard sign with tagline on striped lawn"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>

          {/* Header content */}
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between p-8 md:p-12 gap-6">
            <div>
              <span className="inline-block text-brand-green text-sm font-bold uppercase tracking-widest mb-3">
                Customer Reviews
              </span>
              <h2 className="font-condensed text-4xl md:text-6xl font-black uppercase text-white">
                WHAT OUR <span className="text-brand-green">CLIENTS</span> SAY
              </h2>
            </div>

            {/* Rating Summary */}
            <div className="bg-dark-bg/80 backdrop-blur-sm border border-dark-border rounded-2xl px-6 py-4 text-center flex-shrink-0">
              <div className="font-condensed text-5xl font-black text-brand-green">5.0</div>
              <div className="flex justify-center text-brand-green my-1">
                {'★★★★★'.split('').map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
              <div className="text-gray-400 text-sm">120+ Google Reviews</div>
            </div>
          </div>
        </div>

        {/* Testimonial Cards */}
        <div
          ref={trackRef}
          className="overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`bg-dark-bg rounded-2xl p-6 border-2 transition-all duration-300 ${
                  index === activeIndex
                    ? 'border-brand-green shadow-lg shadow-brand-green/10'
                    : 'border-dark-border'
                }`}
                onClick={() => setActiveIndex(index)}
              >
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-brand-green/30 mb-4" />

                {/* Stars */}
                <div className="flex text-brand-green mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-300 text-base leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Footer */}
                <div className="flex items-center gap-3 pt-4 border-t border-dark-border">
                  <div className="w-10 h-10 rounded-full bg-brand-green/20 border border-brand-green/30 flex items-center justify-center text-brand-green font-black text-sm flex-shrink-0">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{testimonial.name}</p>
                    <p className="text-gray-500 text-xs">{testimonial.location}</p>
                  </div>
                  <span className="ml-auto text-xs bg-dark-card border border-dark-border text-gray-400 px-2 py-1 rounded-full">
                    {testimonial.service}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => goTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="w-10 h-10 rounded-full border border-dark-border text-gray-400 hover:text-white hover:border-gray-500 flex items-center justify-center transition-colors disabled:opacity-30"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`transition-all duration-200 rounded-full ${
                  i === activeIndex
                    ? 'w-6 h-2.5 bg-brand-green'
                    : 'w-2.5 h-2.5 bg-dark-muted hover:bg-gray-500'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => goTo(activeIndex + 1)}
            disabled={activeIndex === TESTIMONIALS.length - 1}
            className="w-10 h-10 rounded-full border border-dark-border text-gray-400 hover:text-white hover:border-gray-500 flex items-center justify-center transition-colors disabled:opacity-30"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
