"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabaseClient"
import LeadsChart from "@/components/LeadsChart"
import Image from "next/image"
import Link from "next/link"
import { toggleContactStatus } from "./actions"

export default function AdminPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [leads, setLeads] = useState<any[]>([])

  useEffect(() => {
    const supabase = createClient()

    const load = async () => {
      const { data: userData } = await supabase.auth.getUser()

      if (!userData.user) {
        router.push("/login")
        return
      }

      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false })

      if (!error && data) {
        setLeads(data)
      }

      setLoading(false)
    }

    load()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    )
  }

  const totalLeads = leads.length
  const contactedLeads = leads.filter(l => l.status === "contacted").length
  const pendingLeads = totalLeads - contactedLeads

  const leadsPerDay = Object.values(
    leads.reduce((acc: any, lead) => {
      const date = new Date(lead.created_at).toLocaleDateString("pt-BR")

      if (!acc[date]) {
        acc[date] = { date, total: 0 }
      }

      acc[date].total += 1

      return acc
    }, {})
  )

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200">

      <nav className="border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          <div className="flex items-center gap-4">
            <Image
              src="/motin-logo-white.avif"
              alt="Motin Films Admin"
              width={100}
              height={32}
              className="w-auto h-7 md:h-8"
              priority
            />
            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 hidden sm:inline border-l border-white/20 pl-3 ml-3">
              Admin Panel
            </span>
          </div>

          <Link
            href="/"
            className="text-gray-500 hover:text-white transition-colors flex items-center gap-2 text-xs uppercase tracking-tighter"
          >
            Sair
          </Link>

        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6 md:p-10">

        <header className="mb-10">
          <h2 className="text-3xl font-bold text-white">Dashboard</h2>
          <p className="text-gray-500">
            Gerencie suas oportunidades de negócio em tempo real.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

          <StatCard title="Total de Leads" value={totalLeads} />
          <StatCard title="Pendentes" value={pendingLeads} />
          <StatCard title="Contatados" value={contactedLeads} />

        </div>

        <div className="mb-12">
          <h3 className="text-lg font-semibold text-white mb-4">
            Leads por dia
          </h3>

          <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6">
            <LeadsChart data={leadsPerDay} />
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden">

          <div className="px-6 py-4 border-b border-white/5">
            <h3 className="text-white font-semibold text-sm">
              Leads Recentes
            </h3>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <tbody className="divide-y divide-white/5">

                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/5">

                    <td className="p-4 text-white">{lead.name}</td>
                    <td className="p-4 text-gray-400">{lead.email}</td>

                    <td className="p-4">
                      <span className="text-xs text-gray-400">
                        {lead.status}
                      </span>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

      </main>
    </div>
  )
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl">
      <p className="text-gray-500 text-xs uppercase mb-2">{title}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  )
}