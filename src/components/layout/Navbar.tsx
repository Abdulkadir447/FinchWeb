import { useEffect, useState } from 'react'
import { Logo } from '../ui/Logo'
import { LinkButton } from '../ui/Button'
import { ThemeToggle } from '../ui/ThemeToggle'

const links = [
  { label: 'Product', href: '#what-is-finch' },
  { label: 'Features', href: '#features' },
  { label: 'Finch AI', href: '#ai' },
  { label: 'Download', href: '#download' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <>
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#top" aria-label="Finch home"><Logo /></a>
          <nav aria-label="Main navigation">
            <ul className="nav-links">
              {links.map((link) => (
                <li key={link.label}><a className="nav-link" href={link.href}>{link.label}</a></li>
              ))}
            </ul>
          </nav>
          <div className="nav-actions">
            <ThemeToggle />
            <a className="btn btn-ghost sign-in-link" href="#whitelist">Sign in</a>
            <LinkButton href="#whitelist" size="sm">Join whitelist</LinkButton>
            <button className="nav-toggle" onClick={() => setMenuOpen(true)} aria-label="Open navigation menu">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
            </button>
          </div>
        </div>
      </header>
      <div className={`drawer-backdrop ${menuOpen ? 'open' : ''}`} onClick={close} aria-hidden="true" />
      <aside className={`drawer ${menuOpen ? 'open' : ''}`} aria-label="Mobile navigation">
        <button className="drawer-close" onClick={close} aria-label="Close navigation menu">×</button>
        {links.map((link) => (
          <a key={link.label} className="drawer-link" href={link.href} onClick={close}>{link.label}</a>
        ))}
        <div className="drawer-actions">
          <a className="btn btn-secondary" href="#whitelist" onClick={close}>Sign in</a>
          <LinkButton href="#whitelist" size="lg" className="drawer-cta">Join whitelist</LinkButton>
        </div>
      </aside>
    </>
  )
}
