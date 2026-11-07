import { redirect } from 'next/navigation'

// Quote requests now go straight to William by email, call or text from the
// contact page. The old multi-step form is kept in components/quote in case
// a form backend is set up later.
export default function QuotePage() {
  redirect('/contact')
}
