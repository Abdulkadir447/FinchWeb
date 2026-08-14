import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'

export function Navbar() {
  const [open, setOpen] = useState(false)
  return <header className="sticky top-0 z-50 border-b border-ink-200/70 bg-[var(--bg)]/90 backdrop-blur-md">
    <Container className="flex h-[72px] items-center justify-between">
      <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight"><span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-sm font-bold text-white">F</span><span>Finch<span className="text-brand-600">.</span></span></a>
      <nav className="hidden items-center gap-8 text-sm text-ink-600 md:flex"><a href="#product" className="transition-colors hover:text-ink-950">Product</a><a href="#workflow" className="transition-colors hover:text-ink-950">Workflow</a><a href="#access" className="transition-colors hover:text-ink-950">Access</a></nav>
      <div className="hidden items-center gap-3 md:flex"><Button variant="ghost" className="px-4 py-2.5" onClick={() => alert('Sign-in access will be available soon.')}>Sign in</Button><Button className="px-4 py-2.5" onClick={() => document.querySelector('#access')?.scrollIntoView({ behavior: 'smooth' })}>Request access <ArrowUpRight size={15} /></Button></div>
      <button aria-label="Toggle menu" className="rounded-lg p-2 text-ink-700 md:hidden" onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
    </Container>
    {open && <div className="border-t border-ink-200 bg-[var(--bg)] px-4 py-5 md:hidden"><nav className="container flex flex-col gap-4 text-sm"><a href="#product" onClick={() => setOpen(false)}>Product</a><a href="#workflow" onClick={() => setOpen(false)}>Workflow</a><a href="#access" onClick={() => setOpen(false)}>Access</a><Button onClick={() => document.querySelector('#access')?.scrollIntoView({ behavior: 'smooth' })}>Request access <ArrowUpRight size={15} /></Button></nav></div>}
  </header>
}
