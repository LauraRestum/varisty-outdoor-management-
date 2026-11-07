import { Mail, MessageSquare, Phone } from 'lucide-react'
import { clsx } from 'clsx'
import { SITE, QUOTE_EMAIL_TEMPLATE, mailtoHref, smsHref } from '@/lib/site'

interface QuoteOptionsProps {
  subject?: string
  emailBody?: string
  textBody?: string
  tone?: 'light' | 'dark'
  className?: string
}

// Three ways to request a quote, all going straight to William.
// Email and text open pre-filled so the customer just fills in the blanks.
export function QuoteOptions({
  subject = `Quote request for ${SITE.name}`,
  emailBody = QUOTE_EMAIL_TEMPLATE,
  textBody = `Hi ${SITE.owner}, I'd like a quote. My name is ___ and my address is ___. I'm interested in ___.`,
  tone = 'light',
  className,
}: QuoteOptionsProps) {
  const dark = tone === 'dark'
  const options = [
    {
      icon: Mail,
      label: `Email ${SITE.owner}`,
      sub: SITE.email,
      href: mailtoHref(subject, emailBody),
      primary: true,
    },
    {
      icon: MessageSquare,
      label: `Text ${SITE.owner}`,
      sub: SITE.phone,
      href: smsHref(textBody),
      primary: false,
    },
    {
      icon: Phone,
      label: `Call ${SITE.owner}`,
      sub: SITE.phone,
      href: SITE.phoneHref,
      primary: false,
    },
  ]

  return (
    <ul className={clsx('grid grid-cols-1 gap-3', className)}>
      {options.map(({ icon: Icon, label, sub, href, primary }) => (
        <li key={label}>
          <a
            href={href}
            className={clsx(
              'group flex items-center gap-4 p-4 sm:p-5 border transition-colors min-h-[44px]',
              primary
                ? 'bg-gold border-gold text-forest-dark hover:bg-gold-dark hover:border-gold-dark'
                : dark
                  ? 'border-white/30 text-white hover:bg-white/10'
                  : 'border-forest/30 text-forest hover:bg-forest hover:text-white'
            )}
          >
            <span
              className={clsx(
                'w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0',
                primary ? 'bg-forest-dark text-gold' : dark ? 'bg-white/10 text-gold' : 'bg-forest text-gold'
              )}
            >
              <Icon className="w-5 h-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-bold uppercase tracking-[0.14em]">{label}</span>
              <span className="block text-sm opacity-80 break-all">{sub}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
