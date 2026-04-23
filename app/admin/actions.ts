'use server'

import { createSupabaseServer } from '@/lib/supabaseServer'
import { revalidatePath } from 'next/cache'

export async function toggleContactStatus(formData: FormData) {
  const id = formData.get('id') as string
  const currentStatus = formData.get('status') as string

  const supabase = await createSupabaseServer()

  const newStatus = currentStatus === 'contacted' ? 'new' : 'contacted'

  const { error } = await supabase
    .from('leads')
    .update({ status: newStatus })
    .eq('id', id)

  if (error) {
    console.error('UPDATE ERROR:', error)
  }

  revalidatePath('/admin')
}