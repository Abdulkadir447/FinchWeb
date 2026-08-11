import { Logo } from '../ui/Logo'

export function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <a href="#top" aria-label="Finch home"><Logo /></a>
            <p className="footer-description">The official gateway to Finch, a private desktop application for understanding and managing your business.</p>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><a href="#what-is-finch">What is Finch?</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#ai">Finch AI</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Access</h4>
            <ul>
              <li><a href="#whitelist">Join whitelist</a></li>
              <li><a href="#download">Download</a></li>
              <li><a href="#help">Help</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Account</h4>
            <ul>
              <li><a href="#whitelist">Sign in</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Finch</span>
          <span>Access is currently private.</span>
        </div>
      </div>
    </footer>
  )
}
