'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)
    setMessage('')

    const { error } = await supabase.auth.signInWithOtp({
      email
    })

    if (error) {
      setMessage('Erro ao enviar email')
    } else {
      setMessage('Verifique seu email para acessar!')
    }

    setLoading(false)
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-80">
        <h1 className="text-xl font-bold">Login</h1>

        <input
          type="email"
          placeholder="Seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white p-2 disabled:opacity-50"
        >
          {loading ? 'Enviando...' : 'Entrar'}
        </button>

        {message && <p>{message}</p>}
      </form>
    </main>
  )
}