import Link from 'next/link'
import { ArrowRight, Check, TreePine } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tree & Shrub Care Services | Varsity Outdoor Management',
  description: 'Professional tree pruning, shrub trimming, and plant health treatments. Keep your trees and shrubs looking great and living longer.',
}

const FEATURES = [
  'Structural pruning for safety and shape',
  'Ornamental shrub trimming & shaping',
  'Disease diagnosis and treatment',
  'Pest management programs',
  'Deep root fertilization',
  'Deadwood and hazard removal',
  'Young tree training and support',
]

export default function TreeShrubCarePage() {
  return (
    <div className="bg-dark-bg min-h-screen">
      <section className="py-20 md:py-28 bg-dark-card border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Link href="/services" className="text-gray-500 hover:text-white text-sm transition-colors">Services</Link>
            <span className="text-gray-600">/</span>
            <span className="text-brand-green text-sm font-semibold">Tree & Shrub Care</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-brand-green/20 border border-brand-green/30 flex items-center justify-center mb-6">
                <TreePine className="w-8 h-8 text-brand-green" />
              </div>
              <h1 className="font-condensed text-5xl md:text-6xl font-black uppercase text-white mb-4">
                HEALTHY TREES, <span className="text-brand-green">BEAUTIFUL PROPERTY</span>
              </h1>
              <p className="text-gray-400 text-xl leading-relaxed mb-8">
                Your trees and shrubs are living investments. Expert care keeps them healthy, beautiful, and safe for decades to come.
              </p>
              <Link href="/quote" className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-black font-black px-8 py-4 rounded-xl transition-colors text-lg uppercase">
                Get Your Free Quote <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="bg-dark-bg rounded-2xl border border-dark-border p-6">
              <h3 className="font-condensed text-lg font-bold uppercase text-brand-green mb-4">What&apos;s Included</h3>
              <ul className="space-y-3">
                {FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-green/20 border border-brand-green/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-brand-green" />
                    </div>
                    <span className="text-gray-300 text-sm">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-dark-card border-t border-dark-border">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-condensed text-4xl font-black uppercase text-white mb-4">
            Give Your Trees the <span className="text-brand-green">Care They Deserve</span>
          </h2>
          <p className="text-gray-400 mb-8">Schedule an assessment and get a custom care plan for your property.</p>
          <Link href="/quote" className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-black font-black px-10 py-5 rounded-xl transition-colors text-xl uppercase">
            Get My Free Quote <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  )
}
