'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import type { Lead } from '@/types/lead'

export default function LeadForm() {
  const [form, setForm] = useState<Lead>({
    name: '',
    email: '',
    phone: '',
    necessity: ''
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    setSuccess(false)

    const { error } = await supabase.from('leads').insert([form])

    if (error) {
      setError(true)
    } else {
      console.log('GTM Event: Lead Generated')
      setSuccess(true)
      setForm({ name: '', email: '', phone: '', necessity: '' })
    }
    setLoading(false)
  }

  const inputStyle = "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"

  return (
    <section id="form" className="py-24 bg-black px-6">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 uppercase">Vamos tirar seu projeto do papel?</h2>
          <p className="text-gray-400">Preencha os dados abaixo e nossa equipe entrará em contato em breve.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 bg-[#0a0a0a] p-8 rounded-2xl border border-white/5 shadow-2xl">
          <div className="space-y-1">
            <label htmlFor="name" className="text-xs uppercase tracking-widest text-gray-400 ml-1">Nome Completo</label>
            <input
              id="name"
              name="name"
              placeholder="Ex: João Silva"
              value={form.name}
              onChange={handleChange}
              required
              className={inputStyle}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label htmlFor="email" className="text-xs uppercase tracking-widest text-gray-400 ml-1">E-mail</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="email@exemplo.com"
                value={form.email}
                onChange={handleChange}
                required
                className={inputStyle}
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="phone" className="text-xs uppercase tracking-widest text-gray-400 ml-1">Telefone / WhatsApp</label>
              <input
                id="phone"
                name="phone"
                placeholder="(00) 00000-0000"
                value={form.phone}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="necessity" className="text-xs uppercase tracking-widest text-gray-400 ml-1">Sua Necessidade</label>
            <select
              id="necessity"
              name="necessity"
              value={form.necessity}
              onChange={handleChange}
              required
              className={`${inputStyle} appearance-none cursor-pointer`}
            >
              <option value="" disabled className="bg-black">Selecione uma opção</option>
              <option value="institutional" className="bg-black text-white">Vídeo Institucional</option>
              <option value="ads" className="bg-black text-white">Anúncios (Performance)</option>
              <option value="social" className="bg-black text-white">Redes Sociais</option>
              <option value="others" className="bg-black text-white">Outros</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-white text-black font-bold py-4 rounded-lg uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 hover:cursor-pointer"
          >
            {loading ? 'Processando...' : 'Enviar Solicitação'}
          </button>

          {success && (
            <div className="bg-green-500/10 border border-green-500/50 p-4 rounded-lg text-center">
              <p className="text-green-500 font-medium text-sm">
                🎉 Recebemos seu contato! Responderemos o mais rápido possível.
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-lg text-center">
              <p className="text-red-500 font-medium text-sm">
                Ocorreu um erro ao enviar. Por favor, tente novamente.
              </p>
            </div>
          )}
        </form>
      </div>
    </section>
  )
}