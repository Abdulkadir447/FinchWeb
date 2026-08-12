const bars = [42, 58, 48, 72, 63, 82, 76, 94, 70, 88, 78, 100]

function StatusDot({ color = 'success' }: { color?: 'success' | 'warning' | 'error' }) {
  return <span className={`status-dot ${color}`} aria-hidden="true" />
}

export function ProductPreview() {
  return (
    <div className="product-frame dashboard-preview" aria-label="Finch dashboard product preview">
      <div className="product-bar">
        <div className="product-dots" aria-hidden="true"><span /><span /><span /></div>
        <span className="product-url">app.finch.business / dashboard</span>
        <span className="preview-avatar">JD</span>
      </div>
      <div className="app-layout">
        <aside className="app-sidebar">
          <div className="app-sidebar-brand"><img src="/favicon.svg" alt="" aria-hidden="true" /></div>
          <nav aria-label="Product preview navigation">
            <span className="app-nav-item active"><span className="nav-glyph">⌂</span>Overview</span>
            <span className="app-nav-item"><span className="nav-glyph">⌁</span>Analysis</span>
            <span className="app-nav-item"><span className="nav-glyph">□</span>Orders</span>
            <span className="app-nav-item"><span className="nav-glyph">◇</span>Products</span>
            <span className="app-nav-item"><span className="nav-glyph">▱</span>Customers</span>
          </nav>
          <div className="app-sidebar-bottom"><span className="app-nav-item"><span className="nav-glyph">⚙</span>Settings</span></div>
        </aside>
        <div className="app-main">
          <div className="app-main-head">
            <div><span className="app-greeting">Monday, October 14, 2024</span><h3>Good morning, James</h3></div>
            <button className="preview-action">Last 30 days <span>⌄</span></button>
          </div>
          <div className="kpi-grid">
            <div className="kpi"><span className="kpi-label">Revenue</span><strong className="kpi-value">$48,290</strong><span className="kpi-delta up">↗ 12.8% <em>vs. last month</em></span></div>
            <div className="kpi"><span className="kpi-label">Orders</span><strong className="kpi-value">1,284</strong><span className="kpi-delta up">↗ 8.4% <em>vs. last month</em></span></div>
            <div className="kpi"><span className="kpi-label">Customers</span><strong className="kpi-value">8,492</strong><span className="kpi-delta up">↗ 4.2% <em>vs. last month</em></span></div>
          </div>
          <div className="preview-grid">
            <div className="preview-chart-card">
              <div className="preview-card-head"><div><span className="kpi-label">Revenue overview</span><strong>$48,290</strong></div><span className="chart-legend"><i /> Revenue</span></div>
              <div className="chart-area"><div className="chart-y"><span>$50k</span><span>$25k</span><span>$0</span></div><div className="chart-content"><svg viewBox="0 0 600 180" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#863bff" stopOpacity=".24"/><stop offset="1" stopColor="#863bff" stopOpacity="0"/></linearGradient></defs><path d="M0 150 C40 136 50 120 90 128 S140 111 180 116 S220 92 260 105 S300 78 340 84 S385 66 420 76 S465 58 500 65 S550 42 600 48 V180 H0Z" fill="url(#chartFill)"/><path d="M0 150 C40 136 50 120 90 128 S140 111 180 116 S220 92 260 105 S300 78 340 84 S385 66 420 76 S465 58 500 65 S550 42 600 48" fill="none" stroke="#9a52ff" strokeWidth="3" vectorEffect="non-scaling-stroke"/></svg><div className="chart-x"><span>Sep 15</span><span>Sep 22</span><span>Sep 29</span><span>Oct 6</span><span>Oct 14</span></div></div></div>
            </div>
            <div className="preview-activity"><div className="preview-card-head"><span className="kpi-label">Recent activity</span><a href="#operations">View all</a></div><div className="activity-list"><div><StatusDot /><p><strong>Order #10482</strong><span>New order from Maya Chen</span></p><time>2m</time></div><div><StatusDot color="warning" /><p><strong>Stock running low</strong><span>Canvas Tote · 12 remaining</span></p><time>18m</time></div><div><StatusDot /><p><strong>Payment received</strong><span>Order #10479 completed</span></p><time>42m</time></div><div><StatusDot color="error" /><p><strong>Payment failed</strong><span>Order #10471 needs review</span></p><time>1h</time></div></div></div>
          </div>
        </div>
      </div>
    </div>
  )
}
