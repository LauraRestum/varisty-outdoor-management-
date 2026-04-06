'use client'

import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { quoteFormSchema } from '@/lib/validations'
import type { QuoteFormData } from '@/lib/validations'
import { QuoteProgress } from './QuoteProgress'
import { QuoteStep1 } from './QuoteStep1'
import { QuoteStep2 } from './QuoteStep2'
import { QuoteStep3 } from './QuoteStep3'
import { QuoteReview } from './QuoteReview'
import { Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function QuoteForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const methods = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      propertyType: 'residential',
      services: [],
      obstacles: [],
      hasFence: false,
      hasGate: false,
      gateCode: '',
      hasIrrigation: false,
      details: '',
    },
  })

  async function handleSubmit() {
    setIsSubmitting(true)
    setError(null)

    try {
      const data = methods.getValues()

      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong. Please try again.')
      }

      setIsSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Success State
  if (isSubmitted) {
    const data = methods.getValues()
    return (
      <div className="text-center py-12 px-4">
        <div className="w-20 h-20 rounded-full bg-brand-green/20 border-2 border-brand-green flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-green/20">
          <Check className="w-10 h-10 text-brand-green" />
        </div>
        <h2 className="font-condensed text-4xl font-black uppercase text-white mb-3">
          Quote Request Sent!
        </h2>
        <p className="text-gray-400 text-lg mb-2">
          Thanks, <span className="text-white font-semibold">{data.firstName}</span>! We&apos;ve received your request.
        </p>
        <p className="text-gray-500 mb-8">
          Check your email at <span className="text-brand-green">{data.email}</span> for a confirmation.
          We&apos;ll follow up within 24 hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-dark text-black font-black px-6 py-3 rounded-xl transition-colors"
          >
            Back to Home <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 border border-dark-border text-white hover:bg-dark-card px-6 py-3 rounded-xl transition-colors font-semibold"
          >
            Explore Our Services
          </Link>
        </div>
      </div>
    )
  }

  return (
    <FormProvider {...methods}>
      <div className="space-y-8">
        {/* Progress Tracker */}
        <QuoteProgress currentStep={currentStep} />

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/30 border border-red-800 rounded-xl p-4 text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Step Content */}
        <div className="min-h-[400px]">
          {currentStep === 1 && <QuoteStep1 onNext={() => setCurrentStep(2)} />}
          {currentStep === 2 && (
            <QuoteStep2
              onNext={() => setCurrentStep(3)}
              onBack={() => setCurrentStep(1)}
            />
          )}
          {currentStep === 3 && (
            <QuoteStep3
              onNext={() => setCurrentStep(4)}
              onBack={() => setCurrentStep(2)}
            />
          )}
          {currentStep === 4 && (
            <QuoteReview
              onBack={() => setCurrentStep(3)}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </div>
    </FormProvider>
  )
}
