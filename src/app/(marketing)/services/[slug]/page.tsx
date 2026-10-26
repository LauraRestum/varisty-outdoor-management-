import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowRight, Check, Leaf, Star, Home } from 'lucide-react'
import { QuoteCta } from '@/components/site/Blocks'
import { ServiceCard } from '@/components/site/ServiceCard'
import { SERVICES, getService } from '@/lib/services'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const service = getService(params.slug)
  if (!service) return {}
  return { title: service.title, description: service.metaDescription }
}

const PROMISES = [
  { label: 'Professional Equipment', icon: Leaf },
  { label: 'Reliable Scheduling', icon: Star },
  { label: 'Consistent, Quality Results', icon: Home },
]

export default function ServiceDetailPage({ params }: Props) {
  const service = getService(params.slug)
  if (!service) notFound()

  const others = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3)

  return (
    <>
      <section className="bg-white">
        <div className="container-site py-12 md:py-16">
          <nav aria-label="Breadcrumb" className="text-xs text-charcoal/60 mb-6">
            <Link href="/" className="hover:text-forest">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-forest">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-forest font-semibold">{service.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            <div className="lg:col-span-8">
              <h1 className="heading-xl text-forest">{service.title}</h1>
              <p className="mt-5 text-charcoal/75 leading-relaxed max-w-2xl">{service.intro}</p>
              <div className="relative mt-8 aspect-[16/10] overflow-hidden shadow-lg">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-32 border border-sand bg-cream p-7">
                <h2 className="eyebrow text-forest">Services Include</h2>
                <ul className="mt-5 space-y-4">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-charcoal/85">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-forest text-white flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="btn-gold w-full mt-8">
                  Get a Quote <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-sand-light border-y border-sand/60">
        <div className="container-site py-12">
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {PROMISES.map(({ label, icon: Icon }) => (
              <li key={label} className="flex flex-col items-center gap-3 text-center">
                <Icon strokeWidth={1.25} className="w-9 h-9 text-forest" />
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-forest">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-cream">
        <div className="container-site py-16 md:py-20">
          <p className="eyebrow text-olive mb-3">More Services</p>
          <h2 className="heading-lg text-forest mb-10">You may also need</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {others.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      <QuoteCta />
    </>
  )
}
