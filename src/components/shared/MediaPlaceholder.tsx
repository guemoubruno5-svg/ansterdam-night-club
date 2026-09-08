import { Image as ImageIcon } from 'lucide-react'
export function MediaPlaceholder({ label, src, className = '' }: { label: string; src?: string; className?: string }) {
  return src ? <img className={className} src={src} alt={label} loading="lazy" /> : <div className={`media-placeholder ${className}`} role="img" aria-label={`${label} — image à ajouter`}><ImageIcon aria-hidden="true" /><span>{label}</span><small>IMAGE À AJOUTER</small></div>
}
