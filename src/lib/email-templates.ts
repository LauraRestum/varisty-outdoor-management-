import type { QuoteFormData } from './validations'

const SERVICE_LABELS: Record<string, string> = {
  'lawn-mowing': 'Lawn Mowing',
  landscaping: 'Landscaping',
  'snow-removal': 'Snow Removal',
  irrigation: 'Irrigation',
  'tree-shrub-care': 'Tree & Shrub Care',
  hardscaping: 'Hardscaping',
  fertilization: 'Fertilization',
  'seasonal-cleanup': 'Seasonal Cleanup',
}

const PROPERTY_SIZE_LABELS: Record<string, string> = {
  'under-1/4-acre': 'Under 1/4 acre',
  '1/4-to-1/2-acre': '1/4 to 1/2 acre',
  '1/2-to-1-acre': '1/2 to 1 acre',
  '1-to-3-acres': '1 to 3 acres',
  '3+-acres': '3+ acres (Commercial)',
}

const FREQUENCY_LABELS: Record<string, string> = {
  'one-time': 'One-Time',
  weekly: 'Weekly',
  'bi-weekly': 'Bi-Weekly',
  monthly: 'Monthly',
  seasonal: 'Seasonal',
}

function formatServices(services: string[]): string {
  return services.map((s) => SERVICE_LABELS[s] || s).join(', ')
}

function flagBadges(data: QuoteFormData): string {
  const flags = []
  if (data.propertySize === '3+-acres' || data.propertyType === 'commercial') {
    flags.push(
      `<span style="background:#dc2626;color:white;padding:2px 8px;border-radius:4px;font-size:12px;font-weight:bold;">COMMERCIAL</span>`
    )
  }
  if (data.services.includes('snow-removal')) {
    flags.push(
      `<span style="background:#2563eb;color:white;padding:2px 8px;border-radius:4px;font-size:12px;font-weight:bold;">SNOW REMOVAL</span>`
    )
  }
  return flags.length > 0 ? `<p style="margin:8px 0;">${flags.join(' ')}</p>` : ''
}

export function ownerNotificationEmail(data: QuoteFormData, quoteId: string): string {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const primaryService = SERVICE_LABELS[data.services[0]] || data.services[0]
  const isCommercial = data.propertySize === '3+-acres' || data.propertyType === 'commercial'

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>New Quote Request</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:system-ui,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#16a34a,#22c55e);padding:24px;border-radius:12px 12px 0 0;text-align:center;">
      <h1 style="margin:0;color:white;font-size:24px;font-weight:900;letter-spacing:-0.5px;text-transform:uppercase;">
        NEW QUOTE REQUEST
      </h1>
      <p style="margin:8px 0 0;color:rgba(255,255,255,0.9);font-size:14px;">
        ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
    </div>

    <!-- Body -->
    <div style="background:#111827;padding:24px;border-radius:0 0 12px 12px;border:1px solid #1f2937;border-top:none;">

      ${flagBadges(data)}

      ${isCommercial ? `
      <div style="background:#7f1d1d;border:1px solid #dc2626;border-radius:8px;padding:12px;margin-bottom:16px;">
        <p style="margin:0;color:#fca5a5;font-weight:bold;">⚠️ COMMERCIAL PROPERTY — Requires custom pricing. Do not use standard rates.</p>
      </div>
      ` : ''}

      <!-- Customer Info -->
      <div style="background:#1f2937;border-radius:8px;padding:16px;margin-bottom:16px;">
        <h2 style="margin:0 0 12px;color:#22c55e;font-size:14px;text-transform:uppercase;letter-spacing:1px;font-weight:700;">Customer Information</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="color:#9ca3af;padding:4px 0;width:120px;">Name</td><td style="color:white;font-weight:600;">${data.firstName} ${data.lastName}</td></tr>
          <tr><td style="color:#9ca3af;padding:4px 0;">Email</td><td style="color:white;"><a href="mailto:${data.email}" style="color:#22c55e;">${data.email}</a></td></tr>
          <tr><td style="color:#9ca3af;padding:4px 0;">Phone</td><td style="color:white;"><a href="tel:${data.phone}" style="color:#22c55e;">${data.phone}</a></td></tr>
          <tr><td style="color:#9ca3af;padding:4px 0;">Address</td><td style="color:white;">${data.address}, ${data.city}, ${data.state} ${data.zip}</td></tr>
        </table>
      </div>

      <!-- Property Info -->
      <div style="background:#1f2937;border-radius:8px;padding:16px;margin-bottom:16px;">
        <h2 style="margin:0 0 12px;color:#22c55e;font-size:14px;text-transform:uppercase;letter-spacing:1px;font-weight:700;">Property Details</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="color:#9ca3af;padding:4px 0;width:160px;">Property Type</td><td style="color:white;font-weight:600;text-transform:capitalize;">${data.propertyType}</td></tr>
          <tr><td style="color:#9ca3af;padding:4px 0;">Property Size</td><td style="color:white;">${PROPERTY_SIZE_LABELS[data.propertySize] || data.propertySize}</td></tr>
          <tr><td style="color:#9ca3af;padding:4px 0;">Has Fence</td><td style="color:white;">${data.hasFence ? 'Yes' : 'No'}</td></tr>
          ${data.hasFence ? `<tr><td style="color:#9ca3af;padding:4px 0;">Has Gate</td><td style="color:white;">${data.hasGate ? 'Yes' : 'No'}</td></tr>` : ''}
          ${data.hasGate && data.gateCode ? `<tr><td style="color:#9ca3af;padding:4px 0;">Gate Code</td><td style="color:white;font-weight:bold;">${data.gateCode}</td></tr>` : ''}
          <tr><td style="color:#9ca3af;padding:4px 0;">Has Irrigation</td><td style="color:white;">${data.hasIrrigation ? 'Yes' : 'No'}</td></tr>
          ${data.obstacles && data.obstacles.length > 0 ? `<tr><td style="color:#9ca3af;padding:4px 0;">Obstacles</td><td style="color:white;">${data.obstacles.join(', ')}</td></tr>` : ''}
        </table>
      </div>

      <!-- Services Requested -->
      <div style="background:#1f2937;border-radius:8px;padding:16px;margin-bottom:16px;">
        <h2 style="margin:0 0 12px;color:#22c55e;font-size:14px;text-transform:uppercase;letter-spacing:1px;font-weight:700;">Services Requested</h2>
        <p style="margin:0 0 8px;color:white;font-weight:600;">${formatServices(data.services)}</p>
        <p style="margin:0;color:#9ca3af;">Frequency: ${FREQUENCY_LABELS[data.frequency] || data.frequency}</p>
        ${data.services.includes('snow-removal') && data.snowRemovalPriority ? `
        <p style="margin:8px 0 0;color:#93c5fd;">Snow Removal Priority: <strong>${data.snowRemovalPriority === 'priority' ? 'Priority (4-hour SLA)' : 'Standard'}</strong></p>
        ` : ''}
      </div>

      ${data.details ? `
      <!-- Additional Details -->
      <div style="background:#1f2937;border-radius:8px;padding:16px;margin-bottom:16px;">
        <h2 style="margin:0 0 12px;color:#22c55e;font-size:14px;text-transform:uppercase;letter-spacing:1px;font-weight:700;">Additional Details</h2>
        <p style="margin:0;color:#d1d5db;line-height:1.6;">${data.details}</p>
      </div>
      ` : ''}

      <!-- CTA -->
      <div style="text-align:center;margin-top:24px;">
        <a href="${appUrl}/dashboard/quotes" style="display:inline-block;background:#22c55e;color:black;font-weight:900;padding:14px 32px;border-radius:8px;text-decoration:none;font-size:16px;text-transform:uppercase;letter-spacing:0.5px;">
          View in Dashboard →
        </a>
        <p style="margin:12px 0 0;color:#6b7280;font-size:12px;">Quote ID: ${quoteId}</p>
      </div>
    </div>

    <!-- Footer -->
    <p style="text-align:center;color:#4b5563;font-size:12px;margin-top:16px;">
      Varsity Outdoor Management — Owner Notification System
    </p>
  </div>
</body>
</html>
  `.trim()
}

export function customerConfirmationEmail(data: QuoteFormData, quoteId: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Quote Request Received</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:system-ui,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#16a34a,#22c55e);padding:32px 24px;border-radius:12px 12px 0 0;text-align:center;">
      <h1 style="margin:0 0 8px;color:white;font-size:28px;font-weight:900;letter-spacing:-0.5px;text-transform:uppercase;">
        VARSITY OUTDOOR
      </h1>
      <h2 style="margin:0;color:rgba(255,255,255,0.9);font-size:16px;font-weight:400;">
        Quote Request Received
      </h2>
    </div>

    <!-- Body -->
    <div style="background:#111827;padding:32px 24px;border-radius:0 0 12px 12px;border:1px solid #1f2937;border-top:none;">

      <p style="color:#d1d5db;font-size:18px;margin:0 0 24px;line-height:1.6;">
        Hi <strong style="color:white;">${data.firstName}</strong>,
      </p>

      <p style="color:#d1d5db;font-size:16px;margin:0 0 16px;line-height:1.6;">
        Thanks for reaching out! We've received your quote request and our team will review it shortly. You can expect to hear from us within <strong style="color:#22c55e;">1-2 business days</strong>.
      </p>

      <!-- Summary Box -->
      <div style="background:#1f2937;border-radius:8px;padding:20px;margin:24px 0;border-left:4px solid #22c55e;">
        <h3 style="margin:0 0 16px;color:#22c55e;font-size:14px;text-transform:uppercase;letter-spacing:1px;font-weight:700;">Your Request Summary</h3>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="color:#9ca3af;padding:6px 0;width:140px;">Services</td><td style="color:white;font-weight:600;">${formatServices(data.services)}</td></tr>
          <tr><td style="color:#9ca3af;padding:6px 0;">Property Size</td><td style="color:white;">${PROPERTY_SIZE_LABELS[data.propertySize] || data.propertySize}</td></tr>
          <tr><td style="color:#9ca3af;padding:6px 0;">Frequency</td><td style="color:white;">${FREQUENCY_LABELS[data.frequency] || data.frequency}</td></tr>
          <tr><td style="color:#9ca3af;padding:6px 0;">Address</td><td style="color:white;">${data.address}, ${data.city}, ${data.state}</td></tr>
        </table>
      </div>

      <p style="color:#d1d5db;font-size:16px;margin:0 0 16px;line-height:1.6;">
        While you wait, feel free to explore our full range of services or check out our before & after gallery on our website.
      </p>

      <p style="color:#9ca3af;font-size:14px;margin:0 0 8px;">
        Have questions? Give us a call or reply to this email.
      </p>

      <p style="margin:0 0 24px;">
        <strong style="color:white;">Varsity Outdoor Management</strong><br>
        <a href="mailto:bergkampw@gmail.com" style="color:#22c55e;text-decoration:none;">bergkampw@gmail.com</a>
      </p>

      <p style="color:#6b7280;font-size:13px;margin:0;border-top:1px solid #1f2937;padding-top:16px;">
        Quote reference: ${quoteId}
      </p>
    </div>

    <p style="text-align:center;color:#4b5563;font-size:12px;margin-top:16px;">
      © ${new Date().getFullYear()} Varsity Outdoor Management. All rights reserved.
    </p>
  </div>
</body>
</html>
  `.trim()
}
