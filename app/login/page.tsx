'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Mail, Loader2 } from 'lucide-react' // Opcional: lucide-react

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/admin`,
      }
    })

    if (error) {
      setMessage({ type: 'error', text: 'Erro ao enviar o link de acesso.' })
    } else {
      setMessage({ type: 'success', text: 'Link enviado! Verifique sua caixa de entrada.' })
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorativo */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600/10 rounded-full blur-[120px]" />
      
      <div className="w-full max-w-md z-10">
        {/* Voltar para Home */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8 text-sm uppercase tracking-widest"
        >
          <ArrowLeft size={16} />
          Voltar para o site
        </Link>

        <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 md:p-10 shadow-2xl">
          <div className="text-center mb-10">
            <Image 
              src="/motin-logo-white.avif" 
              alt="Motin Films" 
              width={140} 
              height={40} 
              className="mx-auto mb-6"
            />
            <h1 className="text-2xl font-bold text-white uppercase tracking-tight">Área do Administrador</h1>
            <p className="text-gray-500 text-sm mt-2">Acesse o dashboard via Magic Link</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-[10px] uppercase tracking-[0.2em] text-gray-400 ml-1">
                E-mail Profissional
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  <Mail size={18} />
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="nome@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all placeholder:text-gray-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-bold py-4 rounded-xl uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 hover:cursor-pointer"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                'Enviar Link de Acesso'
              )}
            </button>
          </form>

          {message.text && (
            <div className={`mt-6 p-4 rounded-lg text-center text-sm font-medium animate-in fade-in slide-in-from-top-2 ${
              message.type === 'success' 
                ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                : 'bg-red-500/10 text-red-500 border border-red-500/20'
            }`}>
              {message.text}
            </div>
          )}
        </div>

        <p className="text-center mt-8 text-gray-600 text-xs uppercase tracking-widest">
          Acesso restrito a colaboradores autorizados
        </p>
      </div>
    </main>
  )
}