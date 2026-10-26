'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Check, ChevronDown, Loader2 } from 'lucide-react'
import { contactFormSchema, type ContactFormData } from '@/lib/validations'
import { SERVICES } from '@/lib/services'
import { SITE } from '@/lib/site'

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1 text-xs text-red-700">{message}</p>
}

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactFormSchema) })

  async function onSubmit(data: ContactFormData) {
    setStatus('sending')
    setError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Something went wrong.')
      setStatus('sent')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setStatus('idle')
    }
  }

  if (status === 'sent') {
    return (
      <div className="border border-sand bg-cream p-10 text-center">
        <div className="w-14 h-14 rounded-full bg-forest text-white flex items-center justify-center mx-auto">
          <Check className="w-7 h-7" />
        </div>
        <h2 className="mt-5 font-display text-3xl font-bold uppercase tracking-[0.06em] text-forest">Request received</h2>
        <p className="mt-2 text-charcoal/75">Thanks for reaching out. Our team will get back to you shortly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <label htmlFor="name" className="sr-only">Full Name</label>
        <input id="name" placeholder="Full Name" autoComplete="name" className="field" {...register('name')} />
        <FieldError message={errors.name?.message} />
      </div>
      <div>
        <label htmlFor="email" className="sr-only">Email</label>
        <input id="email" type="email" placeholder="Email" autoComplete="email" className="field" {...register('email')} />
        <FieldError message={errors.email?.message} />
      </div>
      <div>
        <label htmlFor="phone" className="sr-only">Phone</label>
        <input id="phone" type="tel" placeholder="Phone" autoComplete="tel" className="field" {...register('phone')} />
      </div>
      <div>
        <label htmlFor="subject" className="sr-only">Service Interest</label>
        <div className="relative">
          <select id="subject" defaultValue="" className="field appearance-none pr-10" {...register('subject')}>
            <option value="" disabled>Service Interest</option>
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.title}>{s.title}</option>
            ))}
            <option value="Other">Other / Not sure</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-forest" />
        </div>
        <FieldError message={errors.subject?.message} />
      </div>
      <div>
        <label htmlFor="message" className="sr-only">Tell us about your project</label>
        <textarea id="message" rows={6} placeholder="Tell us about your project" className="field resize-y" {...register('message')} />
        <FieldError message={errors.message?.message} />
      </div>

      {error && (
        <p className="text-sm text-red-700">
          {error} You can also call us at <a href={SITE.phoneHref} className="underline">{SITE.phone}</a>.
        </p>
      )}

      <button type="submit" disabled={status === 'sending'} className="btn-gold w-full disabled:opacity-70">
        {status === 'sending' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Sending
          </>
        ) : (
          <>
            Request a Quote <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  )
}
