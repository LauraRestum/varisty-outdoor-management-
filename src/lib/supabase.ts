import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

// Lazy singleton — only initialized when first called at runtime, never at build time
let _supabase: SupabaseClient<Database> | null = null
let _serverClient: SupabaseClient<Database> | null = null

export function getSupabaseClient(): SupabaseClient<Database> {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) throw new Error('Supabase env vars not configured')
    _supabase = createClient<Database>(url, key)
  }
  return _supabase
}

export function createServerClient(): SupabaseClient<Database> {
  if (!_serverClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) throw new Error('Supabase server env vars not configured')
    _serverClient = createClient<Database>(url, key, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
  }
  return _serverClient
}

// Keep backward compat export as a getter proxy
export const supabase = new Proxy({} as SupabaseClient<Database>, {
  get(_target, prop) {
    return (getSupabaseClient() as any)[prop]
  },
})
