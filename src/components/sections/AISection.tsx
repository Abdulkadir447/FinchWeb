import { SectionHeader } from '../ui/SectionHeader'
import { useReveal } from '../../hooks/useReveal'

export function AISection() {
  const ref = useReveal<HTMLDivElement>()
  return (
    <section className="section ai-section" id="ai">
      <div className="container">
        <SectionHeader eyebrow="Finch AI" title="The right question, closer to the answer." description="Finch AI is part of the desktop application. Ask questions across your business and get useful context without leaving your workspace." />
        <div className="ai-demo card reveal" ref={ref}>
          <div className="chat-meta">Finch AI · inside the application</div>
          <div className="chat-bubble user">What changed in sales this week?</div>
          <div className="chat-bubble finch">Sales are moving up in returning customers. Two products are also nearing their reorder thresholds, so Finch has surfaced them for review.</div>
          <div className="ai-input">Ask Finch about your business <span>↗</span></div>
        </div>
      </div>
    </section>
  )
}
