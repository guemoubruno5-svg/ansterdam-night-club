import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { LoaderCircle } from 'lucide-react'
type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'danger'; loading?: boolean; children: ReactNode }
export function Button({ variant = 'primary', loading, children, className = '', disabled, ...props }: Props) {
  return <button className={`btn btn-${variant} ${className}`} disabled={disabled || loading} {...props}>{loading && <LoaderCircle className="spin" size={18} />}{children}</button>
}
