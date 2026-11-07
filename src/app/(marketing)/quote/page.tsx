import { redirect } from 'next/navigation'

// The detailed multi-step quote form is retired for now; quotes come in by
// call, text, or email from the contact page.
export default function QuotePage() {
  redirect('/contact')
}
