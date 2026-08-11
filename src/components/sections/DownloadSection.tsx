import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { SectionHeader } from '../ui/SectionHeader'

type DownloadStatus = 'unknown' | 'signed-out' | 'pending' | 'approved' | 'rejected'

interface Platform {
  name: string
  label: string
  available: boolean
}

const platforms: Platform[] = [
  { name: 'windows', label: 'Windows', available: false },
  // Future platforms can be added here without redesigning the page:
  // { name: 'macos', label: 'macOS', available: false },
  // { name: 'linux', label: 'Linux', available: false },
]

export function DownloadSection() {
  const [status, setStatus] = useState<DownloadStatus>('unknown')

  useEffect(() => {
    let active = true
    const load = async (userId: string) => {
      const { data } = await supabase
        .from('whitelist_requests')
        .select('status')
        .eq('user_id', userId)
        .maybeSingle()
      if (!active) return
      setStatus((data?.status as DownloadStatus) ?? 'signed-out')
    }
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) void load(data.session.user.id)
      else setStatus('signed-out')
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) void load(session.user.id)
      else setStatus('signed-out')
    })
    return () => { active = false; listener.subscription.unsubscribe() }
  }, [])

  return (
    <section className="section download-section" id="download">
      <div className="container">
        <SectionHeader eyebrow="Desktop application" title="Download Finch." description="FinchWeb is the gateway to the Finch desktop application. Download availability is tied to your account approval." align="center" />
        <div className="download-card card">
          {status === 'signed-out' && (
            <>
              <span className="status-pill">Sign in required</span>
              <h3>Sign in to check your download status.</h3>
              <p>Access to the Finch download is tied to your whitelist approval. Create an account or sign in above to see your status.</p>
              <a className="btn btn-secondary" href="#whitelist">Go to whitelist</a>
            </>
          )}
          {status === 'pending' && (
            <>
              <span className="status-pill pending">Approval required</span>
              <h3>Finch is not available to your account yet.</h3>
              <p>Your whitelist request is under review. Download links will appear here once you are approved.</p>
            </>
          )}
          {status === 'rejected' && (
            <>
              <span className="status-pill rejected">Not approved</span>
              <h3>Access was not granted.</h3>
              <p>Your request was not approved at this time. You can submit a new request from the whitelist section.</p>
              <a className="btn btn-secondary" href="#whitelist">Go to whitelist</a>
            </>
          )}
          {status === 'approved' && (
            <>
              <span className="status-pill approved">Approved</span>
              <h3>Your Finch access is ready.</h3>
              <p>Download Finch for your platform below. The desktop application will connect to your account on first launch.</p>
              <div className="download-platforms">
                {platforms.map((p) => (
                  <div key={p.name} className="download-platform">
                    <div><strong>{p.label}</strong><span>{p.available ? 'Ready to download' : 'Coming soon'}</span></div>
                    <button className="btn btn-primary" disabled={!p.available}>Download Finch for {p.label}</button>
                  </div>
                ))}
              </div>
            </>
          )}
          {status === 'unknown' && <div className="download-loading">Checking your status…</div>}
        </div>
      </div>
    </section>
  )
}
