import { SectionHeader } from '../ui/SectionHeader'
import { useReveal } from '../../hooks/useReveal'

export function WhatIsFinchSection() {
  const ref = useReveal<HTMLDivElement>()
  return (
    <section className="section intro-section" id="what-is-finch">
      <div className="container">
        <SectionHeader eyebrow="What is Finch?" title="A desktop application for seeing your business clearly." description="Finch brings the information behind your business into one thoughtful workspace. It is designed for people who want more understanding, less operational noise, and a clearer next move." />
        <div className="intro-grid reveal" ref={ref}>
          <div className="intro-card card">
            <span className="intro-icon" aria-hidden="true">◉</span>
            <h3>One workspace</h3>
            <p>Dashboard, analysis, orders, products, inventory, sales, payments, and customers — connected, not scattered.</p>
          </div>
          <div className="intro-card card">
            <span className="intro-icon" aria-hidden="true">↗</span>
            <h3>Understanding first</h3>
            <p>Finch surfaces patterns and context, so decisions come from clarity rather than guesswork.</p>
          </div>
          <div className="intro-card card">
            <span className="intro-icon" aria-hidden="true">✦</span>
            <h3>Finch AI built in</h3>
            <p>An assistant that lives inside the application, ready wherever you need a question answered.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
