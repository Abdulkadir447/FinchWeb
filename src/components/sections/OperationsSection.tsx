import { SectionHeader } from '../ui/SectionHeader'
import { useReveal } from '../../hooks/useReveal'

const systems = [
  { label: 'Orders', detail: 'Every order, in one place', tone: 'purple' },
  { label: 'Products', detail: 'Your catalog, always current', tone: 'blue' },
  { label: 'Inventory', detail: 'Know what is available', tone: 'green' },
  { label: 'Sales', detail: 'See what is moving', tone: 'orange' },
  { label: 'Payments', detail: 'Track every transaction', tone: 'pink' },
  { label: 'Customers', detail: 'Understand who comes back', tone: 'teal' },
]

export function OperationsSection() {
  const ref = useReveal<HTMLDivElement>()
  return (
    <section className="section operations-section" id="features">
      <div className="container">
        <SectionHeader eyebrow="Inside Finch" title="Less switching. More understanding." description="These are features of the Finch desktop application, connected so you can work from one shared picture." />
        <div className="operations-flow reveal" ref={ref}>{systems.map((system, index) => <div className="operation-item" key={system.label}><div className={`operation-icon ${system.tone}`} aria-hidden="true">{['↗', '◇', '▦', '⌁', '$', '◉'][index]}</div><div><strong>{system.label}</strong><span>{system.detail}</span></div>{index < systems.length - 1 && <span className="operation-arrow" aria-hidden="true">→</span>}</div>)}</div>
        <div className="operations-callout"><span className="callout-rule" /><p>When the pieces connect, the questions get simpler.</p></div>
      </div>
    </section>
  )
}
