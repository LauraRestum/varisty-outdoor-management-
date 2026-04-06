'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { clsx } from 'clsx'
import { ArrowRight, ChevronDown, Star, Shield, Clock } from 'lucide-react'

const HEADLINES = [
  { line1: 'CHAMPIONSHIP', line2: 'LAWN CARE' },
  { line1: 'PRECISION', line2: 'LANDSCAPING' },
  { line1: 'YEAR-ROUND', line2: 'OUTDOOR PROS' },
]

const HERO_SLIDES = [
  { src: '/images/hero-truck-action.jpg', alt: 'Varsity branded truck and operator on riding mower at premium suburban home' },
  { src: '/images/hero-shirt-house.jpg', alt: 'Varsity team member in branded shirt standing in front of a well-landscaped home' },
]

const TRUST_BADGES = [
  { icon: Star, label: '5-Star Rated', sub: '120+ Reviews' },
  { icon: Shield, label: 'Fully Insured', sub: 'Licensed & Bonded' },
  { icon: Clock, label: 'Fast Response', sub: '24hr Quotes' },
]

export function HeroSection() {
  const [activeHeadline, setActiveHeadline] = useState(0)
  const [activeSlide, setActiveSlide] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setActiveHeadline((prev) => (prev + 1) % HEADLINES.length)
        setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length)
        setFading(false)
      }, 300)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const { line1, line2 } = HEADLINES[activeHeadline]

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-dark-bg">
      {/* Background photo slides */}
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className={clsx(
            'absolute inset-0 transition-opacity duration-1000',
            i === activeSlide ? 'opacity-100' : 'opacity-0'
          )}
          aria-hidden="true"
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}

      {/* Dark overlay so white text pops */}
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

      {/* Diagonal green accent stripe */}
      <div className="hero-stripe" aria-hidden="true" />

      {/* Green glow orb */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #22c55e, transparent)' }}
        aria-hidden="true"
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/30 text-brand-green text-sm font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-wide">
              <span className="w-2 h-2 bg-brand-green rounded-full animate-pulse" />
              Now Accepting New Clients
            </div>

            {/* Headline */}
            <div className="mb-6">
              <h1
                className={clsx(
                  'font-condensed font-black uppercase leading-none',
                  'text-5xl md:text-7xl lg:text-8xl',
                  'transition-opacity duration-300',
                  fading ? 'opacity-0' : 'opacity-100'
                )}
              >
                <span className="text-white block">{line1}</span>
                <span className="text-brand-green block">{line2}</span>
              </h1>
              <h2 className="font-condensed font-bold text-2xl md:text-3xl text-gray-400 uppercase mt-2">
                That Wins Every Season
              </h2>
            </div>

            <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
              Professional lawn care, landscaping, and outdoor management services delivered with championship-level precision. We don&apos;t cut corners — we cut grass.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                href="/quote"
                className={clsx(
                  'inline-flex items-center justify-center gap-2',
                  'bg-brand-green hover:bg-brand-green-dark text-black font-black',
                  'px-8 py-4 rounded-xl text-lg uppercase tracking-wide',
                  'transition-all duration-200 shadow-lg shadow-brand-green/30',
                  'min-h-[60px] w-full sm:w-auto',
                  'group'
                )}
              >
                Get a Free Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services"
                className={clsx(
                  'inline-flex items-center justify-center gap-2',
                  'border-2 border-dark-border hover:border-brand-green/50 text-white',
                  'px-8 py-4 rounded-xl text-lg font-bold uppercase tracking-wide',
                  'transition-all duration-200 hover:bg-dark-card',
                  'min-h-[60px] w-full sm:w-auto'
                )}
              >
                Our Services
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6">
              {TRUST_BADGES.map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-green/10 border border-brand-green/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-brand-green" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm leading-tight">{label}</p>
                    <p className="text-gray-500 text-xs">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Stats Panel */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: '500+', label: 'Properties Served', color: 'text-brand-green' },
                { number: '8+', label: 'Years Experience', color: 'text-brand-green' },
                { number: '100%', label: 'Satisfaction Rate', color: 'text-brand-green' },
                { number: '12mo', label: 'Full Service Year', color: 'text-brand-green' },
              ].map(({ number, label, color }) => (
                <div
                  key={label}
                  className="bg-dark-card border border-dark-border rounded-2xl p-6 text-center hover:border-brand-green/30 transition-colors"
                >
                  <div className={clsx('font-condensed font-black text-5xl mb-1', color)}>
                    {number}
                  </div>
                  <div className="text-gray-400 text-sm font-medium">{label}</div>
                </div>
              ))}
            </div>

            {/* Recent activity card */}
            <div className="mt-4 bg-dark-card border border-dark-border rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 bg-brand-green rounded-full animate-pulse" />
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wide">
                  Recent Activity
                </span>
              </div>
              <div className="space-y-3">
                {[
                  { action: 'Job Completed', name: 'Sarah M. — Lawn Mowing', time: '2h ago' },
                  { action: 'Quote Sent', name: 'James R. — Landscaping', time: '4h ago' },
                  { action: 'New Booking', name: 'Tom K. — Snow Removal', time: '6h ago' },
                ].map(({ action, name, time }) => (
                  <div key={name} className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-brand-green uppercase">{action}</p>
                      <p className="text-sm text-white">{name}</p>
                    </div>
                    <span className="text-xs text-gray-500">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce text-gray-500 z-10">
        <span className="text-xs uppercase tracking-widest font-semibold">Scroll</span>
        <ChevronDown className="w-5 h-5" />
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-bg to-transparent pointer-events-none" />
    </section>
  )
}
