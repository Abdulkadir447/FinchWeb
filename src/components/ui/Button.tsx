import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
}

export function Button({ children, variant = 'primary', className = '', ...props }: ButtonProps) {
  const styles = {
    primary: 'bg-brand-600 text-white hover:bg-brand-700 shadow-sm',
    secondary: 'border border-ink-200 bg-white text-ink-800 hover:border-brand-400 hover:text-brand-700',
    ghost: 'text-ink-600 hover:bg-ink-100 hover:text-ink-900',
  }
  return <button className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 ${styles[variant]} ${className}`} {...props}>{children}</button>
}
