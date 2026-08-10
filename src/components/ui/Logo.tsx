interface LogoProps {
  showName?: boolean
  className?: string
}

export function Logo({ showName = true, className = '' }: LogoProps) {
  return (
    <span className={`nav-brand ${className}`.trim()}>
      <img className="logo-mark" src="/favicon.svg" alt="" aria-hidden="true" />
      {showName && <span>finch</span>}
    </span>
  )
}
