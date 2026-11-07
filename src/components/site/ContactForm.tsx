'use client'

// Quote request without a backend: the form builds a message and hands it
// off to the visitor's own texting or email app, addressed to Varsity.

import { useEffect, useState } from 'react'
import { ArrowRight, Check, ChevronDown, Copy, Mail, MessageSquare, Phone, Pencil } from 'lucide-react'
import { SERVICES } from '@/lib/services'
import { FREE_ADD_ONS, PROMO } from '@/lib/promo'
import { SITE, mailLink, smsLink } from '@/lib/site'

const EXTRA_OPTIONS = [
  { value: 'mowing-2027', label: `Lock in a ${PROMO.season} weekly mowing spot` },
  { value: 'other', label: 'Something else / not sure' },
]

const OPTIONS = [
  ...SERVICES.map((s) => ({
    value: s.slug,
    label: s.slug === 'spring-refresh' ? `${PROMO.season} Spring Refresh (pre-book and save ${PROMO.discount})` : s.title,
  })),
  ...EXTRA_OPTIONS,
]

export function ContactForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [service, setService] = useState('')
  const [addOns, setAddOns] = useState<string[]>([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)
  const [summary, setSummary] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  // Preselect a service from ?service=slug
  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get('service')
    if (s && OPTIONS.some((o) => o.value === s)) setService(s)
  }, [])

  const isRefresh = service === 'spring-refresh'

  function toggleAddOn(n: string) {
    setAddOns((cur) =>
      cur.includes(n) ? cur.filter((x) => x !== n) : cur.length >= PROMO.freeAddOnCount ? cur : [...cur, n]
    )
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !address.trim()) {
      setError(true)
      return
    }
    setError(false)
    const label = OPTIONS.find((o) => o.value === service)?.label ?? 'Not sure yet'
    const lines = [
      `Hi Varsity, I'd like a quote.`,
      `Name: ${name.trim()}`,
      phone.trim() && `Phone: ${phone.trim()}`,
      `Address: ${address.trim()}`,
      `Service: ${label}`,
      isRefresh && addOns.length > 0 && `Free add-ons: ${addOns.join(', ')}`,
      message.trim() && `Details: ${message.trim()}`,
    ].filter(Boolean)
    setSummary(lines.join('\n'))
    setCopied(false)
  }

  async function copy() {
    if (!summary) return
    try {
      await navigator.clipboard.writeText(summary)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  if (summary) {
    return (
      <div className="bg-forest text-white p-7 md:p-9">
        <div className="w-12 h-12 rounded-full bg-gold text-forest-dark flex items-center justify-center">
          <Check className="w-6 h-6" />
        </div>
        <h2 className="mt-5 font-display text-3xl font-bold uppercase tracking-[0.06em]">Almost done</h2>
        <p className="mt-2 text-white/85">
          Send this to us by text or email. It opens your own messages or mail app with everything filled in.
        </p>
        <pre className="mt-5 whitespace-pre-wrap bg-forest-dark text-sand p-4 text-sm leading-relaxed font-sans">
          {summary}
        </pre>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a href={smsLink(summary)} className="btn-gold">
            <MessageSquare className="w-4 h-4" /> Text it to us
          </a>
          <a href={mailLink('Quote request', summary)} className="btn-outline-light">
            <Mail className="w-4 h-4" /> Email it to us
          </a>
          <button type="button" onClick={copy} className="btn-outline-light">
            <Copy className="w-4 h-4" /> {copied ? 'Copied' : 'Copy message'}
          </button>
          <button type="button" onClick={() => setSummary(null)} className="btn-outline-light">
            <Pencil className="w-4 h-4" /> Edit
          </button>
        </div>
        <p className="mt-5 text-sm text-white/80">
          Or call us at{' '}
          <a href={SITE.phoneHref} className="underline underline-offset-4 decoration-gold">
            {SITE.phone}
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="name" className="sr-only">Full name</label>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" autoComplete="name" className="field" />
      </div>
      <div>
        <label htmlFor="phone" className="sr-only">Phone</label>
        <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone (optional)" autoComplete="tel" className="field" />
      </div>
      <div>
        <label htmlFor="address" className="sr-only">Property address</label>
        <input id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Property address" autoComplete="street-address" className="field" />
      </div>
      <div>
        <label htmlFor="service" className="sr-only">What do you need?</label>
        <div className="relative">
          <select id="service" value={service} onChange={(e) => setService(e.target.value)} className="field appearance-none pr-10">
            <option value="">What do you need?</option>
            {OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-forest" />
        </div>
      </div>

      {isRefresh && (
        <fieldset className="border border-sand bg-cream p-5">
          <legend className="px-1 text-sm font-bold text-forest">
            Pick your {PROMO.freeAddOnCount} free add-ons ({addOns.length} of {PROMO.freeAddOnCount})
          </legend>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {FREE_ADD_ONS.map((a) => {
              const on = addOns.includes(a.name)
              const full = !on && addOns.length >= PROMO.freeAddOnCount
              return (
                <label
                  key={a.name}
                  className={`flex items-center gap-3 border px-3 py-3 text-sm cursor-pointer ${
                    on ? 'border-forest bg-white font-semibold text-forest' : 'border-sand bg-white text-charcoal'
                  } ${full ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={on}
                    disabled={full}
                    onChange={() => toggleAddOn(a.name)}
                    className="w-5 h-5 accent-forest"
                    style={{ minHeight: 0 }}
                  />
                  {a.name}
                </label>
              )
            })}
          </div>
        </fieldset>
      )}

      <div>
        <label htmlFor="message" className="sr-only">Anything else we should know?</label>
        <textarea id="message" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Anything else we should know? (gate code, dogs, problem spots)" className="field resize-y" />
      </div>

      {error && <p className="text-sm font-semibold text-red-700">Please add your name and the property address.</p>}

      <button type="submit" className="btn-gold w-full">
        Request a Quote <ArrowRight className="w-4 h-4" />
      </button>
      <p className="text-xs text-charcoal/70 text-center">
        Prefer to skip the form?{' '}
        <a href={SITE.phoneHref} className="font-semibold text-forest underline underline-offset-4 decoration-gold">
          <Phone className="inline w-3 h-3" /> Call
        </a>{' '}
        or{' '}
        <a href={SITE.smsHref} className="font-semibold text-forest underline underline-offset-4 decoration-gold">
          text {SITE.phone}
        </a>
        .
      </p>
    </form>
  )
}
