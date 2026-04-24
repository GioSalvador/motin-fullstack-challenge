import { redirect } from 'next/navigation'
import { createSupabaseServer } from '@/lib/supabaseServer'
import { toggleContactStatus } from './actions'
import LeadsChart from '@/components/LeadsChart'
import Image from 'next/image'
import Link from 'next/link'

export default async function AdminPage() {
  const supabase = await createSupabaseServer()

  const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      redirect('/login')
    }
  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return <div className="p-8 text-red-500">Erro ao carregar leads.</div>

  const totalLeads = leads?.length || 0
  const contactedLeads = leads?.filter(l => l.status === 'contacted').length || 0
  const pendingLeads = totalLeads - contactedLeads

  const leadsPerDay = Object.values(
  leads.reduce((acc, lead) => {
    const date = new Date(lead.created_at).toLocaleDateString('pt-BR')

    if (!acc[date]) {
      acc[date] = { date, total: 0 }
    }

    acc[date].total += 1

    return acc
  }, {} as Record<string, { date: string; total: number }>)
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
            <span className="ml-3 pl-3 border-l border-white/20 text-[10px] uppercase tracking-[0.2em] text-gray-500 hidden sm:inline">
              Admin Panel
            </span>
          </div>
            <Link href="/" className="text-gray-500 hover:text-white transition-colors flex items-center gap-2 text-xs uppercase tracking-tighter cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
              Sair
            </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6 md:p-10">
        <header className="mb-10">
          <h2 className="text-3xl font-bold text-white tracking-tight text-balance">Dashboard</h2>
          <p className="text-gray-500">Gerencie suas oportunidades de negócio em tempo real.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard 
            title="Total de Leads" 
            value={totalLeads} 
            icon={<svg className="text-blue-500" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>} 
          />
          <StatCard 
            title="Pendentes" 
            value={pendingLeads} 
            icon={<svg className="text-orange-500" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>} 
          />
          <StatCard 
            title="Contatados" 
            value={contactedLeads} 
            icon={<svg className="text-green-500" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>} 
          />
        </div>

        <div className="mb-12">
  <h3 className="text-lg font-semibold text-white mb-4">
    Leads por dia
  </h3>

  <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6">
    <LeadsChart data={leadsPerDay} />
  </div>
</div>

        <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
          <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
            <h3 className="font-semibold text-white text-sm">Leads Recentes</h3>
            <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-gray-400 uppercase tracking-widest">Live Feed</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs uppercase tracking-widest text-gray-500 bg-white/[0.01]">
                  <th className="px-6 py-4 font-medium">Informações Básicas</th>
                  <th className="px-6 py-4 font-medium">Necessidade</th>
                  <th className="px-6 py-4 font-medium text-center">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {leads?.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-white font-medium">{lead.name}</span>
                        <div className="flex flex-col gap-1 mt-1 text-[11px] text-gray-500">
                          <span className="flex items-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                            {lead.email}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                            {lead.phone}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter bg-orange-500/10 text-orange-500 border border-orange-500/20">
                        {lead.necessity}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium ${
                        lead.status === 'contacted' ? 'text-green-500' : 'text-orange-500'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                          lead.status === 'contacted' ? 'bg-green-500' : 'bg-orange-500'
                        }`} />
                        {lead.status === 'contacted' ? 'Finalizado' : 'Aguardando'}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <form action={toggleContactStatus}>
                        <input type="hidden" name="id" value={lead.id} />
                        <input type="hidden" name="status" value={lead.status} />
                        <button className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-lg transition-all cursor-pointer ${
                          lead.status === 'contacted'
                            ? 'bg-white/5 text-gray-400 hover:bg-white/10'
                            : 'bg-white text-black hover:bg-orange-500 hover:text-white'
                        }`}>
                          {lead.status === 'contacted' ? 'Reabrir' : 'Contatar'}
                        </button>
                      </form>
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

function StatCard({ title, value, icon }: { title: string, value: number, icon: React.ReactNode }) {
  return (
    <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-white/5 rounded-lg">{icon}</div>
        <svg className="text-gray-700" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>
      </div>
      <p className="text-gray-500 text-[10px] uppercase tracking-widest font-medium mb-1">{title}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  )
}