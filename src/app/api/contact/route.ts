export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validations'
import { resend, OWNER_EMAIL, FROM_EMAIL } from '@/lib/resend'
import { sendLeadToSheet } from '@/lib/google-sheet'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = contactFormSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const { name, email, phone, subject, message } = result.data

    // Primary path: Google Sheet logs the lead and sends the emails
    const savedToSheet = await sendLeadToSheet({
      name,
      email,
      phone,
      service: subject,
      details: message,
      source: 'Website – Get a Quote',
      notify: true,
    })
    if (savedToSheet) return NextResponse.json({ success: true })

    // Fallback so a lead is never lost if the sheet is unavailable
    const { error: emailError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: OWNER_EMAIL,
      reply_to: email,
      subject: `New Quote Inquiry — ${name} — ${subject}`,
      html: `
        <h2>New quote inquiry from the website</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || 'Not provided')}</p>
        <p><strong>Service interest:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Project details:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
      `,
    })
    if (emailError) throw new Error(`Resend: ${emailError.message}`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'We could not send your message. Please call or email us directly.' },
      { status: 500 }
    )
  }
}
