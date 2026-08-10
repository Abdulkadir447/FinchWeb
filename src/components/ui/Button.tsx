import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
  arrow?: boolean
}

export function Button({ variant = 'primary', size = 'md', children, arrow = false, className = '', ...props }: ButtonProps) {
  return (
    <button className={`btn btn-${variant} ${size !== 'md' ? `btn-${size}` : ''} ${className}`.trim()} {...props}>
      {children}
      {arrow && <span className="btn-arrow" aria-hidden="true">→</span>}
    </button>
  )
}

interface LinkButtonProps {
  href: string
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
  arrow?: boolean
  className?: string
}

export function LinkButton({ href, variant = 'primary', size = 'md', children, arrow = false, className = '' }: LinkButtonProps) {
  return (
    <a className={`btn btn-${variant} ${size !== 'md' ? `btn-${size}` : ''} ${className}`.trim()} href={href}>
      {children}
      {arrow && <span className="btn-arrow" aria-hidden="true">→</span>}
    </a>
  )
}
