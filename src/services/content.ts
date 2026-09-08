import { seed, settings as defaultSettings } from '../data/defaults'
import { isSupabaseConfigured, supabase } from '../lib/supabase'
import type { ContactMessage, ContentItem, Reservation, SiteSettings } from '../types'

type Table = keyof typeof seed
const key = (table: string) => `ansterdam:${table}`
const readLocal = <T,>(table: string, fallback: T): T => { try { return JSON.parse(localStorage.getItem(key(table)) || '') as T } catch { return fallback } }
const writeLocal = <T,>(table: string, value: T) => localStorage.setItem(key(table), JSON.stringify(value))

export async function getSettings(): Promise<SiteSettings> {
  if (supabase) {
    try { const { data, error } = await supabase.from('site_settings').select('*').limit(1).maybeSingle(); if (!error && data) return { ...defaultSettings, ...data } }
    catch (error) { console.warn('Supabase indisponible, paramètres locaux utilisés.', error) }
  }
  return readLocal('settings', defaultSettings)
}
export async function saveSettings(value: SiteSettings) {
  if (supabase) { const { error } = await supabase.from('site_settings').upsert({ id: 1, ...value }); if (error) throw error }
  writeLocal('settings', value)
}
export async function listContent(table: Table, admin = false): Promise<ContentItem[]> {
  if (supabase) {
    try { let q = supabase.from(table).select('*').order('display_order'); if (!admin) q = q.eq(table === 'homepage_sections' ? 'visible' : 'published', true); const { data, error } = await q; if (!error && data) return data }
    catch (error) { console.warn(`Supabase indisponible pour ${table}, données locales utilisées.`, error) }
  }
  const rows = readLocal<ContentItem[]>(table, seed[table]); return admin ? rows : rows.filter(x => x.published !== false && x.visible !== false)
}
export async function saveContent(table: Table, row: ContentItem) {
  if (supabase) { const { error } = await supabase.from(table).upsert(row); if (error) throw error }
  const rows = readLocal<ContentItem[]>(table, seed[table]); const exists = rows.some(x => x.id === row.id); writeLocal(table, exists ? rows.map(x => x.id === row.id ? row : x) : [...rows, row])
}
export async function deleteContent(table: Table, id: string) {
  if (supabase) { const { error } = await supabase.from(table).delete().eq('id', id); if (error) throw error }
  writeLocal(table, readLocal<ContentItem[]>(table, seed[table]).filter(x => x.id !== id))
}
export async function addReservation(value: Omit<Reservation, 'id' | 'created_at' | 'status'>) {
  const row = { ...value, id: crypto.randomUUID(), status: 'nouvelle', created_at: new Date().toISOString() }
  if (supabase) { const { error } = await supabase.from('reservations').insert(row); if (error) throw error } else { const rows = readLocal<Reservation[]>('reservations', []); writeLocal('reservations', [row, ...rows]) }
}
export async function addMessage(value: Omit<ContactMessage, 'id' | 'created_at' | 'read'>) {
  const row = { ...value, id: crypto.randomUUID(), read: false, created_at: new Date().toISOString() }
  if (supabase) { const { error } = await supabase.from('contact_messages').insert(row); if (error) throw error } else { const rows = readLocal<ContactMessage[]>('contact_messages', []); writeLocal('contact_messages', [row, ...rows]) }
}
export function localPrivate<T>(table: string): T[] { return readLocal<T[]>(table, []) }
export function saveLocalPrivate<T>(table: string, rows: T[]) { writeLocal(table, rows) }
export { isSupabaseConfigured }
