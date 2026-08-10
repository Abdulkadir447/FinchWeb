import { SectionHeader } from '../ui/SectionHeader'
import { Badge } from '../ui/Badge'
import { useReveal } from '../../hooks/useReveal'

const comparisonBars = [{ label: 'Revenue', current: 82, previous: 65 }, { label: 'Orders', current: 68, previous: 74 }, { label: 'New customers', current: 56, previous: 42 }, { label: 'Returning', current: 76, previous: 61 }]

export function AnalysisSection() {
  const visualRef = useReveal<HTMLDivElement>()
  return (
    <section className="section analysis-section" id="analysis">
      <div className="container">
        <div className="split-heading"><SectionHeader eyebrow="Analysis" title="Understand what is actually happening." description="Go beyond the numbers. Finch makes patterns visible, so you can make the next decision with context." /><Badge neutral>Built for the questions behind the numbers</Badge></div>
        <div className="analysis-layout reveal" ref={visualRef}>
          <div className="analysis-main card">
            <div className="analysis-header"><div><span className="kpi-label">Business performance</span><h3>How things are moving</h3></div><div className="analysis-controls"><span className="analysis-control active">30 days</span><span className="analysis-control">90 days</span></div></div>
            <div className="big-chart"><div className="big-chart-y"><span>50k</span><span>40k</span><span>30k</span><span>20k</span><span>10k</span><span>0</span></div><div className="big-chart-body"><div className="grid-lines"><i /><i /><i /><i /><i /><i /></div><svg viewBox="0 0 700 250" preserveAspectRatio="none" aria-label="Illustrative revenue trend line chart"><path d="M0 210 C30 202 55 188 82 194 S130 166 160 175 S210 155 238 164 S280 110 320 128 S360 143 390 105 S438 118 466 88 S520 102 548 70 S610 82 640 48 S680 45 700 30" fill="none" stroke="#863bff" strokeWidth="3" vectorEffect="non-scaling-stroke"/><path d="M0 210 C30 202 55 188 82 194 S130 166 160 175 S210 155 238 164 S280 110 320 128 S360 143 390 105 S438 118 466 88 S520 102 548 70 S610 82 640 48 S680 45 700 30 V250 H0Z" fill="url(#analysisFill)" opacity=".7"/><defs><linearGradient id="analysisFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#863bff" stopOpacity=".18"/><stop offset="1" stopColor="#863bff" stopOpacity="0"/></linearGradient></defs></svg><div className="big-chart-x"><span>Sep 15</span><span>Sep 22</span><span>Sep 29</span><span>Oct 6</span><span>Oct 14</span></div></div></div>
            <div className="chart-callout"><span className="callout-dot" />Revenue is trending up, with the strongest movement in returning customers.</div>
          </div>
          <div className="comparison-card card"><div className="analysis-header"><div><span className="kpi-label">Comparison</span><h3>This month vs. last</h3></div><span className="comparison-period">Oct 2024</span></div><div className="comparison-list">{comparisonBars.map((item) => <div className="comparison-row" key={item.label}><div className="comparison-label"><span>{item.label}</span><strong>{item.current > item.previous ? '+' : ''}{item.current - item.previous}%</strong></div><div className="comparison-track"><i style={{ width: `${item.previous}%` }} /><b style={{ width: `${item.current}%` }} /></div></div>)}</div><div className="comparison-legend"><span><i className="legend-prev" />Last month</span><span><i className="legend-current" />This month</span></div></div>
        </div>
      </div>
    </section>
  )
}
