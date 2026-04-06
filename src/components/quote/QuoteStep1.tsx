'use client'

import { useFormContext } from 'react-hook-form'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { ArrowRight, User, Mail, Phone, MapPin } from 'lucide-react'
import type { QuoteFormData } from '@/lib/validations'

interface QuoteStep1Props {
  onNext: () => void
}

export function QuoteStep1({ onNext }: QuoteStep1Props) {
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext<QuoteFormData>()

  async function handleNext() {
    const valid = await trigger([
      'firstName',
      'lastName',
      'email',
      'phone',
      'address',
      'city',
      'state',
      'zip',
    ])
    if (valid) onNext()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-condensed text-3xl font-black uppercase text-white mb-1">
          Your Contact Info
        </h2>
        <p className="text-gray-400">
          How should we reach you about your quote?
        </p>
      </div>

      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="First Name"
          placeholder="John"
          leftIcon={<User className="w-4 h-4" />}
          error={errors.firstName?.message}
          required
          {...register('firstName')}
        />
        <Input
          label="Last Name"
          placeholder="Smith"
          error={errors.lastName?.message}
          required
          {...register('lastName')}
        />
      </div>

      {/* Contact row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          leftIcon={<Mail className="w-4 h-4" />}
          error={errors.email?.message}
          required
          {...register('email')}
        />
        <Input
          label="Phone Number"
          type="tel"
          placeholder="(614) 555-0100"
          leftIcon={<Phone className="w-4 h-4" />}
          error={errors.phone?.message}
          required
          {...register('phone')}
        />
      </div>

      {/* Address */}
      <Input
        label="Street Address"
        placeholder="123 Main Street"
        leftIcon={<MapPin className="w-4 h-4" />}
        error={errors.address?.message}
        required
        {...register('address')}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="col-span-2 sm:col-span-1">
          <Input
            label="City"
            placeholder="Columbus"
            error={errors.city?.message}
            required
            {...register('city')}
          />
        </div>
        <Input
          label="State"
          placeholder="OH"
          error={errors.state?.message}
          required
          {...register('state')}
        />
        <Input
          label="ZIP Code"
          placeholder="43215"
          error={errors.zip?.message}
          required
          {...register('zip')}
        />
      </div>

      <div className="pt-2">
        <Button variant="primary" size="lg" onClick={handleNext} fullWidth>
          Continue to Services
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
