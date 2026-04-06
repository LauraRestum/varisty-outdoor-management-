'use client'

import { useState } from 'react'
import { BeforeAfterSlider } from '@/components/ui/BeforeAfterSlider'

const PROJECTS = [
  {
    id: 1,
    title: 'Overgrown to Immaculate',
    service: 'Lawn Mowing + Cleanup',
    before: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1558618047-b08ef15f9b08?w=800&q=80',
    description: 'Complete lawn restoration — from jungle to showroom.',
  },
  {
    id: 2,
    title: 'Barren to Beautiful',
    service: 'Full Landscaping',
    before: 'https://images.unsplash.com/photo-1564182842519-8a3b2af3e228?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=800&q=80',
    description: 'Landscape design and full installation from bare dirt.',
  },
  {
    id: 3,
    title: 'Concrete to Curb Appeal',
    service: 'Hardscaping + Planting',
    before: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
    description: 'New patio, garden beds, and planted borders.',
  },
]

export function BeforeAfterSection() {
  const [activeProject, setActiveProject] = useState(0)
  const project = PROJECTS[activeProject]

  return (
    <section className="py-20 md:py-28 bg-dark-bg" id="results">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-brand-green text-sm font-bold uppercase tracking-widest mb-3">
            Real Results
          </span>
          <h2 className="font-condensed text-4xl md:text-6xl font-black uppercase text-white mb-4">
            BEFORE & <span className="text-brand-green">AFTER</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Drag the slider to see the transformation. Every project tells a story.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Project Selector */}
          <div className="space-y-3">
            {PROJECTS.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActiveProject(i)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  i === activeProject
                    ? 'border-brand-green bg-brand-green/10'
                    : 'border-dark-border bg-dark-card hover:border-gray-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0 ${
                      i === activeProject
                        ? 'bg-brand-green text-black'
                        : 'bg-dark-muted text-gray-400'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p
                      className={`font-bold text-sm ${
                        i === activeProject ? 'text-white' : 'text-gray-300'
                      }`}
                    >
                      {p.title}
                    </p>
                    <p className="text-xs text-gray-500">{p.service}</p>
                  </div>
                </div>
              </button>
            ))}

            {/* Stats */}
            <div className="bg-dark-card border border-dark-border rounded-xl p-5 mt-6">
              <h4 className="font-condensed text-sm font-bold uppercase text-brand-green mb-3 tracking-wide">
                Project Stats
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Service</span>
                  <span className="text-white font-semibold">{project.service}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Completed</span>
                  <span className="text-white font-semibold">1 Day</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Satisfaction</span>
                  <span className="text-brand-green font-bold">★★★★★</span>
                </div>
              </div>
            </div>
          </div>

          {/* Slider */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl overflow-hidden border border-dark-border shadow-2xl">
              <BeforeAfterSlider
                beforeSrc={project.before}
                afterSrc={project.after}
                beforeAlt="Before Varsity Outdoor"
                afterAlt="After Varsity Outdoor"
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="font-condensed text-2xl font-bold uppercase text-white">
                {project.title}
              </h3>
              <p className="text-gray-400 mt-1">{project.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
