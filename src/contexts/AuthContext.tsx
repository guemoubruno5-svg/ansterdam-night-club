/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { User } from '@supabase/supabase-js'
import { isSupabaseConfigured, supabase } from '../lib/supabase'
type Auth = { user: User | null; loading: boolean; demo: boolean; signIn: (email: string, password: string) => Promise<void>; signOut: () => Promise<void> }
const Context = createContext<Auth | null>(null)
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(isSupabaseConfigured)
  const [demo, setDemo] = useState(() => sessionStorage.getItem('ansterdam:demo-admin') === 'true')
  useEffect(() => {
    if (!supabase) return
    let active = true
    const timeout = window.setTimeout(() => { if (active) setLoading(false) }, 6000)
    void supabase.auth.getUser().then(({ data }) => { if (active) setUser(data.user) }).catch(error => console.warn('Authentification Supabase indisponible.', error)).finally(() => { if (active) setLoading(false) })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => { if (active) { setUser(session?.user ?? null); setLoading(false) } })
    return () => { active = false; window.clearTimeout(timeout); listener.subscription.unsubscribe() }
  }, [])
  async function signIn(email: string, password: string) { if (!supabase) { if (!email || !password) throw new Error('Saisissez un email et un mot de passe pour ouvrir la démonstration.'); sessionStorage.setItem('ansterdam:demo-admin', 'true'); setDemo(true); return } const { error } = await supabase.auth.signInWithPassword({ email, password }); if (error) throw error }
  async function signOut() { if (supabase) await supabase.auth.signOut(); sessionStorage.removeItem('ansterdam:demo-admin'); setDemo(false) }
  return <Context.Provider value={{ user, loading, demo, signIn, signOut }}>{children}</Context.Provider>
}
export const useAuth = () => { const value = useContext(Context); if (!value) throw new Error('AuthProvider manquant'); return value }
