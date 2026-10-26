// Sends website leads to the Google Sheet web app (scripts/google-forms/quote-form.gs).
// The script appends a row to the same tab as Google Form responses and,
// when `notify` is true, sends the owner alert + customer confirmation.

export interface SheetLead {
  name: string
  email: string
  phone?: string
  address?: string
  service: string
  details?: string
  source: string
  notify: boolean
}

export function isSheetConfigured() {
  return Boolean(process.env.GOOGLE_SHEET_WEBHOOK_URL && process.env.GOOGLE_SHEET_WEBHOOK_SECRET)
}

/** Returns true when the sheet accepted the lead. Never throws. */
export async function sendLeadToSheet(lead: SheetLead): Promise<boolean> {
  if (!isSheetConfigured()) return false

  try {
    // Apps Script answers POSTs with a redirect to the result; fetch follows it
    const res = await fetch(process.env.GOOGLE_SHEET_WEBHOOK_URL as string, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ ...lead, secret: process.env.GOOGLE_SHEET_WEBHOOK_SECRET }),
      cache: 'no-store',
      signal: AbortSignal.timeout(15000),
    })
    const json = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null
    if (!json?.ok) {
      console.error('Google Sheet rejected lead:', json?.error ?? res.status)
      return false
    }
    return true
  } catch (error) {
    console.error('Google Sheet request failed:', error)
    return false
  }
}
