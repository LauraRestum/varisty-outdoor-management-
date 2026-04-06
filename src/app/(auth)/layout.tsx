import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      {/* Simple header */}
      <header className="border-b border-dark-border px-6 py-4">
        <Link href="/" className="font-condensed text-xl font-black uppercase">
          <span className="text-brand-green">VARSITY</span>{' '}
          <span className="text-white">OUTDOOR</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        {children}
      </main>

      <footer className="border-t border-dark-border px-6 py-4 text-center">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Varsity Outdoor Management
        </p>
      </footer>
    </div>
  )
}
