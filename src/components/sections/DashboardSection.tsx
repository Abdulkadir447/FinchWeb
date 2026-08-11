import { ProductPreview } from '../product/ProductPreview'
import { SectionHeader } from '../ui/SectionHeader'
import { useReveal } from '../../hooks/useReveal'

export function DashboardSection() {
  const visualRef = useReveal<HTMLDivElement>()
  return (
    <section className="section dashboard-section" id="inside-finch">
      <div className="container">
        <SectionHeader eyebrow="Inside Finch" title="Everything important, at a glance." description="A living view of your business, designed to keep the right information close and the noise out of the way. This is a preview of the Finch desktop application." />
        <div className="dashboard-showcase reveal" ref={visualRef}><ProductPreview /></div>
        <div className="dashboard-footnote"><span className="footnote-line" /><span>One clear view, from first order to final payment.</span></div>
      </div>
    </section>
  )
}
