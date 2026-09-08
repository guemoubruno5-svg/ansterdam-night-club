import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
export function NotFoundPage() { useDocumentTitle('404'); return <main className="not-found"><span>404</span><h1>CETTE NUIT N’EXISTE PAS.</h1><Link className="btn btn-primary" to="/">RETOUR À L’ACCUEIL</Link></main> }
