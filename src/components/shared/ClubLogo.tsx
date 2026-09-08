import { useState } from 'react'
import officialLogo from '../../assets/ans.png'
type ClubLogoProps = { size?: 'small' | 'medium' | 'large'; className?: string; showName?: boolean }
export function ClubLogo({ size = 'medium', className = '', showName = false }: ClubLogoProps) { const [failed, setFailed] = useState(false); return <span className={`club-logo club-logo-${size} ${className}`.trim()}>{!failed && <img src={officialLogo} alt="Logo officiel ANSTERDAM NIGHT CLUB" onError={() => setFailed(true)} />}{failed && <strong className="club-logo-fallback">ANSTERDAM NIGHT CLUB</strong>}{showName && <span className="club-logo-name"><b>ANSTERDAM NIGHT CLUB</b><small>PLANÈTE</small></span>}</span> }
