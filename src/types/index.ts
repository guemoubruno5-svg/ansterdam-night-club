export type ContentItem = {
  id: string; title?: string; name?: string; description?: string; image_url?: string;
  photo_url?: string; published?: boolean; visible?: boolean; display_order?: number;
  [key: string]: unknown;
}

export type SiteSettings = {
  club_name: string; location_name: string; address: string; phone: string; whatsapp: string;
  email: string; instagram: string; facebook: string; tiktok: string; youtube: string;
  logo_url: string; favicon_url: string; hero_image: string; hero_title: string;
  hero_subtitle: string; hero_slogan: string; hero_description: string; google_maps_url: string;
  latitude: string; longitude: string;
}

export type Reservation = ContentItem & { full_name: string; phone: string; email?: string; reservation_date: string; number_of_people: number; reservation_type: string; message?: string; status: string; admin_note?: string; created_at: string }
export type ContactMessage = ContentItem & { name: string; phone: string; email: string; subject: string; message: string; read: boolean; created_at: string }
