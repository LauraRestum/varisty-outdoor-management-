'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/lib/validations'
import type { LoginData } from '@/lib/validations'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Mail, Lock } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(data: LoginData) {
    setLoading(true)
    setError(null)
    try {
      // Supabase auth integration would go here
      // const { error } = await supabase.auth.signInWithPassword({ email: data.email, password: data.password })
      // For now, simulate:
      await new Promise((r) => setTimeout(r, 1000))
      // Redirect based on role — owner goes to /dashboard, customer to /portal
      window.location.href = '/dashboard'
    } catch {
      setError('Invalid email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      {/* Card */}
      <div className="bg-dark-card border border-dark-border rounded-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="font-condensed text-3xl font-black uppercase text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-400 text-sm">
            Sign in to your Varsity Outdoor account
          </p>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-800 rounded-xl p-3 mb-5 text-red-300 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Email Address"
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
            placeholder="Enter your password"
            leftIcon={<Lock className="w-4 h-4" />}
            error={errors.password?.message}
            required
            {...register('password')}
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
              <input type="checkbox" className="rounded" />
              Remember me
            </label>
            <Link href="#" className="text-sm text-brand-green hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
            Sign In
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-dark-border text-center">
          <p className="text-gray-400 text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-brand-green hover:underline font-semibold">
              Create account
            </Link>
          </p>
        </div>
      </div>

      {/* Quick access */}
      <div className="mt-4 flex gap-3">
        <Link
          href="/dashboard"
          className="flex-1 text-center text-sm text-gray-500 hover:text-gray-300 bg-dark-card border border-dark-border hover:border-gray-600 rounded-xl py-3 transition-colors"
        >
          Owner Dashboard →
        </Link>
        <Link
          href="/portal"
          className="flex-1 text-center text-sm text-gray-500 hover:text-gray-300 bg-dark-card border border-dark-border hover:border-gray-600 rounded-xl py-3 transition-colors"
        >
          Customer Portal →
        </Link>
      </div>
    </div>
  )
}
