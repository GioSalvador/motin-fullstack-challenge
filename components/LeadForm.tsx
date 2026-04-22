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
      console.error(error)
      setError(true)
    } else {
      console.log('GTM Event: Lead Generated')
      setSuccess(true)

      setForm({
        name: '',
        email: '',
        phone: '',
        necessity: ''
      })
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <input
        name="name"
        placeholder="Nome"
        value={form.name}
        onChange={handleChange}
        required
        className="border p-2"
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="border p-2"
      />

      <input
        name="phone"
        placeholder="Telefone"
        value={form.phone}
        onChange={handleChange}
        className="border p-2"
      />

      <select
        name="necessity"
        value={form.necessity}
        onChange={handleChange}
        required
        className="border p-2"
      >
        <option value="">Selecione sua necessidade</option>
        <option value="institutional">Vídeo institucional</option>
        <option value="ads">Anúncios</option>
        <option value="social">Redes sociais</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white p-2 disabled:opacity-50"
      >
        {loading ? 'Enviando...' : 'Enviar'}
      </button>

      {success && (
        <p className="text-green-500">
          Lead enviado com sucesso!
        </p>
      )}

      {error && (
        <p className="text-red-500">
          Erro ao enviar. Tente novamente.
        </p>
      )}
    </form>
  )
}