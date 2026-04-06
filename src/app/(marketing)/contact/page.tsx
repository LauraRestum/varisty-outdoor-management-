'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema } from '@/lib/validations'
import type { ContactFormData } from '@/lib/validations'
import { Input, Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Phone, Mail, MapPin, Clock, Check } from 'lucide-react'
import Link from 'next/link'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  async function onSubmit(data: ContactFormData) {
    setLoading(true)
    // Simulate form submission — in production, use Resend or a form service
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div className="bg-dark-bg min-h-screen">
      {/* Hero */}
      <section className="py-16 md:py-20 bg-dark-card border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <span className="inline-block text-brand-green text-sm font-bold uppercase tracking-widest mb-3">
            Get in Touch
          </span>
          <h1 className="font-condensed text-5xl md:text-6xl font-black uppercase text-white mb-4">
            WE&apos;D LOVE TO <span className="text-brand-green">HEAR FROM YOU</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Questions about services, pricing, or scheduling? Reach out and we&apos;ll get back to you fast.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-condensed text-3xl font-bold uppercase text-white mb-6">
                  Contact Information
                </h2>
                <div className="space-y-5">
                  {[
                    { icon: Phone, label: 'Phone', value: '(123) 456-7890', href: 'tel:+1234567890' },
                    { icon: Mail, label: 'Email', value: 'bergkampw@gmail.com', href: 'mailto:bergkampw@gmail.com' },
                    { icon: MapPin, label: 'Service Area', value: 'Columbus, OH & Surrounding Areas', href: null },
                    { icon: Clock, label: 'Hours', value: 'Mon–Sat: 7am–6pm | Emergency snow 24/7', href: null },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-brand-green" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide">{label}</p>
                        {href ? (
                          <a href={href} className="text-white font-semibold hover:text-brand-green transition-colors">
                            {value}
                          </a>
                        ) : (
                          <p className="text-white font-semibold">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Quote CTA */}
              <div className="bg-dark-card border border-brand-green/30 rounded-2xl p-6">
                <h3 className="font-condensed text-xl font-bold uppercase text-white mb-2">
                  Need a Price? Get a Quote
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  The fastest way to get pricing is our online quote form. Takes under 3 minutes.
                </p>
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-black font-black px-6 py-3 rounded-xl transition-colors text-sm uppercase"
                >
                  Get a Free Quote
                </Link>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-dark-card border border-dark-border rounded-2xl p-7">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-brand-green/20 border-2 border-brand-green flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-brand-green" />
                  </div>
                  <h3 className="font-condensed text-2xl font-bold uppercase text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-400">We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <h2 className="font-condensed text-2xl font-bold uppercase text-white">Send a Message</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Name"
                      placeholder="Your name"
                      error={errors.name?.message}
                      required
                      {...register('name')}
                    />
                    <Input
                      label="Phone (Optional)"
                      type="tel"
                      placeholder="(614) 555-0100"
                      {...register('phone')}
                    />
                  </div>

                  <Input
                    label="Email"
                    type="email"
                    placeholder="your@email.com"
                    error={errors.email?.message}
                    required
                    {...register('email')}
                  />

                  <Input
                    label="Subject"
                    placeholder="What can we help with?"
                    error={errors.subject?.message}
                    required
                    {...register('subject')}
                  />

                  <Textarea
                    label="Message"
                    placeholder="Tell us more..."
                    error={errors.message?.message}
                    required
                    {...register('message')}
                  />

                  <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
