export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { quoteFormSchema } from '@/lib/validations'
import { createServerClient } from '@/lib/supabase'
import { resend, OWNER_EMAIL, FROM_EMAIL } from '@/lib/resend'
import { ownerNotificationEmail, customerConfirmationEmail } from '@/lib/email-templates'
import { sendLeadToSheet } from '@/lib/google-sheet'
import { getService } from '@/lib/services'
import { SITE } from '@/lib/site'

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

    // Save to Supabase (optional — the request still goes to the sheet/email without it)
    let quote: { id?: string } | null = null
    try {
      const supabase = createServerClient()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: inserted, error: dbError } = await (supabase as any)
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

      if (dbError) console.error('Supabase error:', dbError)
      else quote = inserted
    } catch (dbSetupError) {
      console.error('Supabase unavailable:', dbSetupError)
    }

    const quoteId = quote?.id || `temp-${Date.now()}`
    const primaryService = data.services[0]

    // Log the request in the Google Sheet alongside Google Form responses.
    // This route sends its own emails through Resend, so the sheet only
    // emails when Resend isn't configured.
    const savedToSheet = await sendLeadToSheet({
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      address: `${data.address}, ${data.city}, ${data.state} ${data.zip}`,
      service: data.services.map((s) => getService(s)?.title ?? s).join(', '),
      details: [
        `Property: ${data.propertyType}, ${data.propertySize}`,
        `Frequency: ${data.frequency}`,
        data.details ? `Notes: ${data.details}` : '',
      ]
        .filter(Boolean)
        .join('\n'),
      source: 'Website – Detailed Quote',
      notify: !process.env.RESEND_API_KEY,
    })

    // Send owner notification
    let ownerNotified = false
    try {
      const { error: ownerEmailError } = await resend.emails.send({
        from: FROM_EMAIL,
        to: OWNER_EMAIL,
        subject: `New Quote Request — ${data.firstName} ${data.lastName} — ${primaryService}`,
        html: ownerNotificationEmail(data, quoteId),
      })
      if (ownerEmailError) console.error('Owner email failed:', ownerEmailError)
      else ownerNotified = true
    } catch (emailError) {
      console.error('Owner email failed:', emailError)
    }

    // Only report success if the request landed somewhere the owner will see it
    if (!quote && !savedToSheet && !ownerNotified) {
      return NextResponse.json(
        { error: `We couldn't send your request. Please call us at ${SITE.phone}.` },
        { status: 502 }
      )
    }

    // Send customer confirmation
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: data.email,
        subject: 'We received your quote request — Varsity Outdoor Services',
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
