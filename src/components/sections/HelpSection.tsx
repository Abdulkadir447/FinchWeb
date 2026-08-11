import { SectionHeader } from '../ui/SectionHeader'

export function HelpSection() {
  return (
    <section className="section help-section" id="help">
      <div className="container">
        <SectionHeader eyebrow="Help" title="Documentation and support." description="Resources for using Finch and managing your access." align="center" />
        <div className="help-grid">
          <a className="help-card card card-hover" href="#help">
            <span className="help-icon" aria-hidden="true">📖</span>
            <h3>Documentation</h3>
            <p>Guides and references for getting the most out of Finch.</p>
            <span className="help-link">Coming soon →</span>
          </a>
          <a className="help-card card card-hover" href="#whitelist">
            <span className="help-icon" aria-hidden="true">✦</span>
            <h3>Access support</h3>
            <p>Questions about your whitelist status or download access.</p>
            <span className="help-link">Go to whitelist →</span>
          </a>
        </div>
      </div>
    </section>
  )
}
