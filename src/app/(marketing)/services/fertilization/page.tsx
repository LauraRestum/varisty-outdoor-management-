import Link from 'next/link'
import { ArrowRight, Check, Leaf } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lawn Fertilization Programs | Weed Control | Varsity Outdoor',
  description: 'Custom lawn fertilization programs with weed control. Thick, green, weed-free turf all season. Organic options available. Central Ohio lawn care.',
}

const FEATURES = [
  'Soil testing for custom nutrient planning',
  '6-step annual fertilization program',
  'Pre-emergent and post-emergent weed control',
  'Grub control and pest treatments',
  'Core aeration for improved absorption',
  'Overseeding for thin or bare areas',
  'Organic and eco-friendly options',
]

const STEPS = [
  { step: 'Step 1', timing: 'Early Spring', action: 'Pre-emergent weed control + slow-release fertilizer' },
  { step: 'Step 2', timing: 'Late Spring', action: 'Post-emergent broadleaf weed control + fertilizer' },
  { step: 'Step 3', timing: 'Early Summer', action: 'Grub preventative + balanced fertilizer' },
  { step: 'Step 4', timing: 'Mid Summer', action: 'Spot weed treatment + heat-tolerant fertilizer' },
  { step: 'Step 5', timing: 'Early Fall', action: 'Overseeding prep + high-nitrogen fertilizer' },
  { step: 'Step 6', timing: 'Late Fall', action: 'Winterizer fertilizer for deep root strength' },
]

export default function FertilizationPage() {
  return (
    <div className="bg-dark-bg min-h-screen">
      <section className="py-20 md:py-28 bg-dark-card border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Link href="/services" className="text-gray-500 hover:text-white text-sm transition-colors">Services</Link>
            <span className="text-gray-600">/</span>
            <span className="text-brand-green text-sm font-semibold">Fertilization</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-brand-green/20 border border-brand-green/30 flex items-center justify-center mb-6">
                <Leaf className="w-8 h-8 text-brand-green" />
              </div>
              <h1 className="font-condensed text-5xl md:text-6xl font-black uppercase text-white mb-4">
                THE GREENEST LAWN <span className="text-brand-green">ON THE BLOCK</span>
              </h1>
              <p className="text-gray-400 text-xl leading-relaxed mb-8">
                A championship lawn starts with championship nutrition. Our 6-step annual program gives your turf exactly what it needs, when it needs it.
              </p>
              <Link href="/quote" className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-black font-black px-8 py-4 rounded-xl transition-colors text-lg uppercase">
                Get Your Free Quote <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="bg-dark-bg rounded-2xl border border-dark-border p-6">
              <h3 className="font-condensed text-lg font-bold uppercase text-brand-green mb-4">Program Includes</h3>
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

      {/* 6 Step Program */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-condensed text-4xl font-black uppercase text-white">
              Our <span className="text-brand-green">6-Step</span> Annual Program
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {STEPS.map((s, i) => (
              <div key={s.step} className="bg-dark-card border border-dark-border rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-brand-green text-black font-black text-sm flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-white font-bold text-sm">{s.step}</p>
                    <p className="text-brand-green text-xs font-semibold">{s.timing}</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{s.action}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-dark-card border-t border-dark-border">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-condensed text-4xl font-black uppercase text-white mb-4">
            Start Your <span className="text-brand-green">Fertilization Program</span>
          </h2>
          <p className="text-gray-400 mb-8">Get a custom quote based on your lawn size and goals.</p>
          <Link href="/quote" className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-black font-black px-10 py-5 rounded-xl transition-colors text-xl uppercase">
            Get My Lawn Quote <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  )
}
