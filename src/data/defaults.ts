import type { ContentItem, SiteSettings } from '../types'

export const settings: SiteSettings = {
  club_name: 'ANSTERDAM NIGHT CLUB', location_name: 'PLANÈTE', address: 'Dubréka, T10 Rond-point Planète',
  phone: '', whatsapp: '', email: '', instagram: '', facebook: '', tiktok: '', youtube: '', logo_url: '', favicon_url: '',
  hero_image: '', hero_title: 'ANSTERDAM', hero_subtitle: 'NIGHT CLUB · PLANÈTE', hero_slogan: 'Plus qu’une soirée, une expérience.',
  hero_description: 'Découvrez un univers où musique, lumière, ambiance et bonne compagnie se rencontrent pour créer des moments inoubliables à Planète.',
  google_maps_url: '', latitude: '', longitude: '',
}

const item = (id: string, name: string, description: string, extra: Record<string, unknown> = {}): ContentItem => ({ id, name, title: name, description, published: true, visible: true, display_order: Number(id.replace(/\D/g, '')) || 0, ...extra })
export const seed = {
  events: ['AFRO NIGHT', 'URBAN VIBES', 'SATURDAY EXPERIENCE', 'NEON NIGHT'].map((x, i) => item(`event-${i + 1}`, x, 'Une expérience musicale à découvrir prochainement.', { event_date: '', start_time: '', end_time: '', music_style: 'Style à venir', featured: i < 3, slug: x.toLowerCase().replaceAll(' ', '-') })),
  gallery_images: Array.from({ length: 6 }, (_, i) => item(`gallery-${i + 1}`, `Ambiance ${i + 1}`, 'Photo du club à ajouter', { category: 'Club' })),
  club_spaces: [item('space-1', 'Espace Lounge & VIP', 'Un espace confortable pensé pour vos soirées.'), item('space-2', 'Piste / espace principal', 'Le cœur vibrant de l’expérience ANSTERDAM.'), item('space-3', 'Design & éclairage', 'Une atmosphère sculptée par la lumière.'), item('space-4', 'Espace détente', 'Une parenthèse calme au cœur de la nuit.')],
  service_rooms: [item('room-1', 'Chambre de service 1', 'Confort et tranquillité sur place.', { availability: 'À confirmer', price: '', features: 'Informations à venir' }), item('room-2', 'Chambre de service 2', 'Un espace de repos à découvrir.', { availability: 'À confirmer', price: '', features: 'Informations à venir' })],
  managers: Array.from({ length: 4 }, (_, i) => item(`manager-${i + 1}`, `Gérante ${i + 1}`, 'Nom à ajouter', { role: 'Gérante', phone: '', instagram: '' })),
  djs: Array.from({ length: 3 }, (_, i) => item(`dj-${i + 1}`, `DJ ${i + 1}`, 'Nom / spécialité à ajouter', { stage_name: '', specialty: '', instagram: '', facebook: '' })),
  opening_hours: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map((day, i) => item(`hour-${i + 1}`, day, 'Horaires à confirmer', { day, is_open: false, open_time: '', close_time: '' })),
  homepage_sections: ['hero', 'values', 'about', 'spaces', 'rooms', 'events', 'gallery', 'managers', 'djs', 'reservation', 'contact', 'location', 'hours'].map((name, i) => item(`section-${i + 1}`, name, '', { section_key: name, visible: true })),
}

export const values = [
  ['Music2', 'MUSIQUE', 'Des sélections qui font vibrer la nuit.'], ['Sparkles', 'AMBIANCE', 'Une atmosphère immersive et élégante.'],
  ['Users', 'BONNE COMPAGNIE', 'Des instants à partager ensemble.'], ['Heart', 'SOUVENIRS INOUBLIABLES', 'Des nuits qui restent en mémoire.'],
]
