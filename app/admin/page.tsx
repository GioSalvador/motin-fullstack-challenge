import { redirect } from 'next/navigation'
import { createSupabaseServer } from '@/lib/supabaseServer'
import { toggleContactStatus } from './actions'

export default async function AdminPage() {
  const supabase = await createSupabaseServer()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return <p>Erro ao carregar leads</p>
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        Dashboard
      </h1>

      <table className="w-full border">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Nome</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Telefone</th>
            <th className="p-2 text-left">Necessidade</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Ação</th>
          </tr>
        </thead>

        <tbody>
          {leads?.map((lead) => (
            <tr key={lead.id} className="border-b">
              <td className="p-2">{lead.name}</td>
              <td className="p-2">{lead.email}</td>
              <td className="p-2">{lead.phone}</td>
              <td className="p-2">{lead.necessity}</td>
              <td className="p-2">{lead.status}</td>
              <td className="p-2">
                <form action={toggleContactStatus}>
                  <input type="hidden" name="id" value={lead.id} />
                  <input type="hidden" name="status" value={lead.status} />

                  <button
                    className={`px-3 py-1 rounded text-white text-sm transition hover:cursor-pointer ${
                      lead.status === 'contacted'
                        ? 'bg-gray-500 hover:bg-gray-600'
                        : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                  >
                    {lead.status === 'contacted'
                      ? 'Marcar como não contatado'
                      : 'Marcar como contatado'}
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}