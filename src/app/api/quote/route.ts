export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { quoteFormSchema } from '@/lib/validations'
import { createServerClient } from '@/lib/supabase'
import { resend, OWNER_EMAIL, FROM_EMAIL } from '@/lib/resend'
import { ownerNotificationEmail, customerConfirmationEmail } from '@/lib/email-templates'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate
    const result = quoteFormSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const data = result.data

    // Save to Supabase
    const supabase = createServerClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: quote, error: dbError } = await (supabase as any)
      .from('quotes')
      .insert({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        state: data.state,
        zip: data.zip,
        property_size: data.propertySize,
        property_type: data.propertyType,
        services: data.services,
        frequency: data.frequency,
        details: data.details || null,
        has_fence: data.hasFence,
        has_gate: data.hasGate,
        gate_code: data.gateCode || null,
        has_irrigation: data.hasIrrigation,
        snow_removal_priority: data.snowRemovalPriority || null,
        is_commercial: data.propertySize === '3+-acres' || data.propertyType === 'commercial',
        status: 'pending',
      })
      .select()
      .single()

    if (dbError) {
      console.error('Supabase error:', dbError)
      // Continue with emails even if DB fails in dev
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const quoteId = (quote as any)?.id || `temp-${Date.now()}`
    const primaryService = data.services[0]

    // Send owner notification
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: OWNER_EMAIL,
        subject: `New Quote Request — ${data.firstName} ${data.lastName} — ${primaryService}`,
        html: ownerNotificationEmail(data, quoteId),
      })
    } catch (emailError) {
      console.error('Owner email failed:', emailError)
    }

    // Send customer confirmation
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: data.email,
        subject: 'We received your quote request — Varsity Outdoor Management',
        html: customerConfirmationEmail(data, quoteId),
      })
    } catch (emailError) {
      console.error('Customer email failed:', emailError)
    }

    return NextResponse.json({ success: true, quoteId }, { status: 201 })
  } catch (error) {
    console.error('Quote submission error:', error)
    return NextResponse.json(
      { error: 'Failed to process quote request. Please try again.' },
      { status: 500 }
    )
  }
}
