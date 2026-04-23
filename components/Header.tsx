import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-black/50 bg-black/80 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="transition-opacity hover:opacity-80">
          <Image 
            src="/motin-logo-white.avif" 
            alt="Motin Films Logo" 
            width={120} 
            height={40} 
            priority 
            className="w-auto h-8 md:h-10"
          />
        </Link>

        <nav className="flex items-center gap-6">
          <Link 
            href="/login" 
            className="text-sm font-medium text-gray-400 hover:text-black transition-colors uppercase tracking-widest border border-white/20 px-5 py-2 rounded-full hover:bg-white hover:text-black"
          >
            Acesso Admin
          </Link>
        </nav>
      </div>
    </header>
  )
}