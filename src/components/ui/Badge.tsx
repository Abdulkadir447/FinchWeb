import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  neutral?: boolean
  dot?: boolean
}

export function Badge({ children, neutral = false, dot = false }: BadgeProps) {
  return (
    <span className={`badge ${neutral ? 'badge-neutral' : ''}`}>
      {dot && <span className="badge-dot" aria-hidden="true" />}
      {children}
    </span>
  )
}
