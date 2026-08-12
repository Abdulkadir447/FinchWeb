import { useEffect, useState } from 'react'
import { Logo } from '../ui/Logo'
import { LinkButton } from '../ui/Button'
import { ThemeToggle } from '../ui/ThemeToggle'

const links = [
  { label: 'Product', href: '#product' },
  { label: 'Solutions', href: '#operations' },
  { label: 'Resources', href: '#analysis' },
  { label: 'Pricing', href: '#pricing' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#top" aria-label="Finch home"><Logo /></a>
          <nav aria-label="Main navigation">
            <ul className="nav-links">
              {links.map((link) => <li key={link.label}><a className="nav-link" href={link.href}>{link.label}</a></li>)}
            </ul>
          </nav>
          <div className="nav-actions">
            <ThemeToggle />
            <a className="btn btn-ghost" href="#footer">Sign in</a>
            <LinkButton href="#pricing" size="sm">Get started</LinkButton>
            <button className="nav-toggle" onClick={() => setMenuOpen(true)} aria-label="Open navigation menu" aria-expanded={menuOpen}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
            </button>
          </div>
        </div>
      </header>
      <div className={`drawer-backdrop ${menuOpen ? 'open' : ''}`} onClick={closeMenu} aria-hidden="true" />
      <aside className={`drawer ${menuOpen ? 'open' : ''}`} aria-label="Mobile navigation" aria-hidden={!menuOpen}>
        <button className="drawer-close" onClick={closeMenu} aria-label="Close navigation menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>
        </button>
        {links.map((link) => <a key={link.label} className="drawer-link" href={link.href} onClick={closeMenu}>{link.label}</a>)}
        <div className="drawer-actions">
          <a className="btn btn-secondary" href="#footer" onClick={closeMenu}>Sign in</a>
          <LinkButton href="#pricing" size="lg" className="drawer-cta">Get started</LinkButton>
        </div>
      </aside>
    </>
  )
}
