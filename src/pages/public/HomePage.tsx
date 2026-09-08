import { ArrowDown, Gem, Heart, Music2, Sparkles, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { ContactForm, ReservationForm } from '../../components/public/Forms'
import { MediaPlaceholder } from '../../components/shared/MediaPlaceholder'
import { SectionTitle } from '../../components/shared/SectionTitle'
import { values } from '../../data/defaults'
import { listContent } from '../../services/content'
import type { ContentItem, SiteSettings } from '../../types'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { ItemGrid, Reveal } from './shared'
const icons = { Music2, Sparkles, Users, Heart }
type Collections = Record<'events' | 'gallery_images' | 'club_spaces' | 'service_rooms' | 'managers' | 'djs' | 'opening_hours', ContentItem[]>
const empty: Collections = { events: [], gallery_images: [], club_spaces: [], service_rooms: [], managers: [], djs: [], opening_hours: [] }
export function HomePage() { useDocumentTitle('Planète – Dubréka'); const settings = useOutletContext<SiteSettings>(); const [data, setData] = useState(empty); useEffect(() => { Promise.all((Object.keys(empty) as (keyof Collections)[]).map(async k => [k, await listContent(k)] as const)).then(entries => setData(Object.fromEntries(entries) as Collections)) }, [])
  return <>
    <section className="hero-section" style={settings.hero_image ? { backgroundImage: `linear-gradient(90deg,rgba(4,2,9,.9),rgba(4,2,9,.25)),url(${settings.hero_image})` } : undefined}><div className="hero-glow" /><div className="hero-content"><span className="overline">DUBRÉKA · T10 ROND-POINT PLANÈTE</span><h1>{settings.hero_title}<small>{settings.hero_subtitle}</small></h1><h2>{settings.hero_slogan}</h2><p>{settings.hero_description}</p><div className="hero-actions"><Link className="btn btn-primary" to="/events">VOIR LES ÉVÉNEMENTS</Link><Link className="btn btn-outline" to="/reservation">RÉSERVER UNE TABLE</Link></div></div><a className="discover" href="#values">Découvrir <ArrowDown /></a></section>
    <section id="values" className="values-strip">{values.map(([icon, title, desc]) => { const Icon = icons[icon as keyof typeof icons]; return <Reveal key={title} className="value"><Icon /><div><b>{title}</b><p>{desc}</p></div></Reveal> })}</section>
    <section className="section about"><Reveal><span className="overline">UN LIEU UNIQUE À PLANÈTE</span><h2>ANSTERDAM NIGHT CLUB</h2><p>ANSTERDAM NIGHT CLUB vous accueille dans un cadre moderne et élégant, conçu pour offrir une expérience nocturne unique.</p><p>Musique, ambiance, confort et bonne compagnie se rencontrent dans un même espace pour créer des moments mémorables.</p><div className="address"><Gem /> <span><small>NOTRE ADRESSE</small>{settings.address}</span></div><Link className="text-link" to="/club">DÉCOUVRIR NOTRE CLUB →</Link></Reveal><MediaPlaceholder label="Photo intérieure du club" /></section>
    <section className="section"><SectionTitle eyebrow="DÉCOUVREZ LE CLUB" title="NOS ESPACES" text="Des atmosphères pensées pour chaque moment de votre nuit." /><ItemGrid items={data.club_spaces} /></section>
    <section className="section alt"><SectionTitle eyebrow="CONFORT SUR PLACE" title="CHAMBRES DE SERVICE" text="Confort et tranquillité sur place." /><ItemGrid items={data.service_rooms.slice(0, 3)} kind="rooms" /><Link className="center-link" to="/rooms">VOIR TOUTES LES CHAMBRES</Link></section>
    <section className="section"><SectionTitle eyebrow="À L’AGENDA" title="NOS PROCHAINS ÉVÉNEMENTS" /><ItemGrid items={data.events.filter(x => x.featured).slice(0, 4)} kind="events" /><Link className="center-link" to="/events">TOUS LES ÉVÉNEMENTS</Link></section>
    <section className="section alt"><SectionTitle eyebrow="EN IMAGES" title="VIVEZ L’AMBIANCE" /><ItemGrid items={data.gallery_images.slice(0, 6)} kind="gallery" /><Link className="center-link" to="/gallery">OUVRIR LA GALERIE</Link></section>
    <section className="section"><SectionTitle eyebrow="L’ÉQUIPE" title="NOS GÉRANTES" /><ItemGrid items={data.managers} kind="profiles" /></section>
    <section className="section alt"><SectionTitle eyebrow="AUX PLATINES" title="NOS DJ" /><ItemGrid items={data.djs} kind="profiles" /></section>
    <section className="section form-section"><div><SectionTitle eyebrow="VOTRE PROCHAINE NUIT" title="RÉSERVEZ VOTRE EXPÉRIENCE" text="Envoyez votre demande. Une réservation n’est confirmée qu’après notre retour." /></div><ReservationForm /></section>
    <section className="section alt form-section"><div><SectionTitle eyebrow="RESTONS EN CONTACT" title="CONTACT" text="Une question, une demande particulière ? Écrivez-nous." /></div><ContactForm /></section>
    <section className="section location"><div><SectionTitle eyebrow="NOUS TROUVER" title="ANSTERDAM NIGHT CLUB" /><h3>Dubréka</h3><p>T10 Rond-point Planète</p>{settings.google_maps_url ? <a className="btn btn-outline" href={settings.google_maps_url}>OUVRIR LA CARTE</a> : <span className="tag">Carte à venir</span>}</div><div className="map-placeholder">PLANÈTE<span>Coordonnées à venir</span></div></section>
    <section className="section alt"><SectionTitle eyebrow="PLANIFIEZ VOTRE VISITE" title="HORAIRES" /><div className="hours">{data.opening_hours.map(x => <div key={x.id}><b>{x.day as string}</b><span>{x.open_time ? `${x.open_time} – ${x.close_time}` : 'Horaires à confirmer'}</span></div>)}</div></section>
  </> }
