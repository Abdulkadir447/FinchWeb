import { LinkButton } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { ProductPreview } from '../product/ProductPreview'
import { useReveal } from '../../hooks/useReveal'

export function Hero() {
  const copyRef = useReveal<HTMLDivElement>()
  const previewRef = useReveal<HTMLDivElement>()

  return (
    <section className="hero section" id="top">
      <div className="hero-mesh" aria-hidden="true" />
      <div className="container">
        <div className="hero-copy reveal" ref={copyRef}>
          <Badge dot>Business, with clarity</Badge>
          <h1>Run your business<br /><span className="text-gradient">with clarity.</span></h1>
          <p>Finch brings your operations, data, and decisions together in one calm, intelligent workspace.</p>
          <div className="hero-actions"><LinkButton href="#pricing" size="lg" arrow>Get started</LinkButton><LinkButton href="#product" variant="secondary" size="lg">Explore Finch</LinkButton></div>
          <span className="hero-note">A better way to see what is happening in your business.</span>
        </div>
        <div className="hero-preview reveal" ref={previewRef}><ProductPreview /></div>
      </div>
    </section>
  )
}
