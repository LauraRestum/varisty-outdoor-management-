import Link from 'next/link'
import { Logo } from '@/components/site/Logo'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-dark-bg text-white flex flex-col">
      {/* Simple header */}
      <header className="border-b border-dark-border px-6 py-4">
        <Link href="/" aria-label="Home" className="inline-block">
          <Logo variant="light" className="h-12" />
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        {children}
      </main>

      <footer className="border-t border-dark-border px-6 py-4 text-center">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Varsity Outdoor Services
        </p>
      </footer>
    </div>
  )
}
