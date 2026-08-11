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
          <Badge dot>Private desktop application</Badge>
          <h1>Meet Finch.<br /><span className="text-gradient">See your business clearly.</span></h1>
          <p>A smarter way to understand, manage, and grow your business — available exclusively through Finch.</p>
          <div className="hero-actions">
            <LinkButton href="#whitelist" size="lg" arrow>Join the whitelist</LinkButton>
            <LinkButton href="#what-is-finch" variant="secondary" size="lg">Explore Finch</LinkButton>
          </div>
          <span className="hero-note">Access is reviewed before download. Sign in to check your status.</span>
        </div>
        <div className="hero-preview reveal" ref={previewRef}>
          <ProductPreview />
        </div>
      </div>
    </section>
  )
}
