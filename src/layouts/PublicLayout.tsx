import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from '../components/public/Footer'
import { Header } from '../components/public/Header'
import { settings as fallback } from '../data/defaults'
import { getSettings } from '../services/content'
export function PublicLayout() { const [settings, setSettings] = useState(fallback); const location = useLocation(); useEffect(() => { let active = true; getSettings().then(data => { if (active) setSettings(data) }).catch(error => console.warn('Paramètres locaux conservés.', error)); return () => { active = false } }, []); useEffect(() => { scrollTo({ top: 0 }) }, [location.pathname]); return <><Header /><main><Outlet context={settings} /></main><Footer settings={settings} /></> }
