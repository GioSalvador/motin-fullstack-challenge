import { redirect } from 'next/navigation'
import { createSupabaseServer } from '@/lib/supabaseServer'
import { toggleContactStatus } from './actions'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Users, 
  Clock, 
  CheckCircle2, 
  BarChart3, 
  LogOut,
  Mail,
  Phone
} from 'lucide-react'

export default async function AdminPage() {
  const supabase = await createSupabaseServer()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return <div className="p-8 text-red-500">Erro ao carregar leads.</div>

  const totalLeads = leads?.length || 0
  const contactedLeads = leads?.filter(l => l.status === 'contacted').length || 0
  const pendingLeads = totalLeads - contactedLeads

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200">
      <nav className="border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
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
          </div>
          <form action="/auth/signout" method="post">
            <button className="text-gray-500 hover:text-white transition-colors flex items-center gap-2 text-xs uppercase tracking-tighter">
              <Link href="/" className="transition-opacity hover:opacity-80 flex items-center">
                <LogOut size={14} /> Sair
              </Link>
            </button>
          </form>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6 md:p-10">
        {/* Header Section */}
        <header className="mb-10">
          <h2 className="text-3xl font-bold text-white tracking-tight">Dashboard</h2>
          <p className="text-gray-500">Gerencie suas oportunidades de negócio em tempo real.</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard title="Total de Leads" value={totalLeads} icon={<Users className="text-blue-500" />} />
          <StatCard title="Pendentes" value={pendingLeads} icon={<Clock className="text-orange-500" />} />
          <StatCard title="Contatados" value={contactedLeads} icon={<CheckCircle2 className="text-green-500" />} />
        </div>

        {/* Leads Table */}
        <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
          <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
            <h3 className="font-semibold text-white">Leads Recentes</h3>
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
                        <div className="flex flex-col gap-1 mt-1 text-xs text-gray-500">
                          <span className="flex items-center gap-1"><Mail size={12}/> {lead.email}</span>
                          <span className="flex items-center gap-1"><Phone size={12}/> {lead.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter bg-orange-500/10 text-orange-500 border border-orange-500/20">
                        {lead.necessity}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${
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
                        <button className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-lg transition-all hover:cursor-pointer ${
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
        <BarChart3 size={16} className="text-gray-700" />
      </div>
      <p className="text-gray-500 text-xs uppercase tracking-widest font-medium mb-1">{title}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  )
}