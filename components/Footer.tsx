export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-500 py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="text-sm font-medium tracking-wide">
          © {currentYear} <span className="text-white">Giovani Salvador</span>  - Full Stack Developer
        </div>

        <div className="flex items-center gap-8">
          <a 
            href="https://github.com/GioSalvador/motin-fullstack-challenge" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors text-sm uppercase tracking-widest"
          >
            <span>GitHub</span>
          </a>
          
          <a 
            href="https://www.linkedin.com/in/giovani-salvador/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors text-sm uppercase tracking-widest border-l border-white/10 pl-8"
          >
            <span>LinkedIn</span>
          </a>
        </div>

      </div>
      
      {/* Detalhe técnico sutil */}
      <div className="mt-8 text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] opacity-70">
          Built with Next.js & Supabase
        </p>
      </div>
    </footer>
  )
}