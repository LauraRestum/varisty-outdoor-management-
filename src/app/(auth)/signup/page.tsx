'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signupSchema } from '@/lib/validations'
import type { SignupData } from '@/lib/validations'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Mail, Lock, User } from 'lucide-react'
import Link from 'next/link'

export default function SignupPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  })

  async function onSubmit(data: SignupData) {
    setLoading(true)
    setError(null)
    try {
      // Supabase auth integration would go here
      // const { error } = await supabase.auth.signUp({ email: data.email, password: data.password, options: { data: { first_name: data.firstName, last_name: data.lastName } } })
      await new Promise((r) => setTimeout(r, 1200))
      setSuccess(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="w-full max-w-md text-center">
        <div className="bg-dark-card border border-dark-border rounded-2xl p-8">
          <div className="w-16 h-16 rounded-full bg-brand-green/20 border-2 border-brand-green flex items-center justify-center mx-auto mb-4">
            <span className="text-brand-green text-2xl">✓</span>
          </div>
          <h2 className="font-condensed text-2xl font-black uppercase text-white mb-2">Account Created!</h2>
          <p className="text-gray-400 mb-6">Check your email to verify your account, then sign in.</p>
          <Link href="/login" className="block bg-brand-green hover:bg-brand-green-dark text-black font-black py-3 px-6 rounded-xl transition-colors uppercase">
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-dark-card border border-dark-border rounded-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="font-condensed text-3xl font-black uppercase text-white mb-2">
            Create Account
          </h1>
          <p className="text-gray-400 text-sm">
            Access your service history, invoices, and more
          </p>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-800 rounded-xl p-3 mb-5 text-red-300 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
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
          <Input
            label="Email"
            type="email"
            placeholder="your@email.com"
            leftIcon={<Mail className="w-4 h-4" />}
            error={errors.email?.message}
            required
            {...register('email')}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Min 8 chars, one uppercase, one number"
            leftIcon={<Lock className="w-4 h-4" />}
            error={errors.password?.message}
            required
            {...register('password')}
          />
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Repeat your password"
            leftIcon={<Lock className="w-4 h-4" />}
            error={errors.confirmPassword?.message}
            required
            {...register('confirmPassword')}
          />

          <p className="text-gray-500 text-xs leading-relaxed">
            By creating an account you agree to our{' '}
            <Link href="/terms" className="text-brand-green hover:underline">Terms of Service</Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-brand-green hover:underline">Privacy Policy</Link>.
          </p>

          <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
            Create My Account
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-dark-border text-center">
          <p className="text-gray-400 text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-brand-green hover:underline font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
