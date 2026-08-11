import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Button } from '../ui/Button'
import { SectionHeader } from '../ui/SectionHeader'

type AccessState = 'signed-out' | 'signed-in' | 'pending' | 'approved' | 'rejected'

export function AccessSection() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<'signin' | 'signup'>('signup')
  const [state, setState] = useState<AccessState>('signed-out')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let active = true
    const loadStatus = async (userId: string) => {
      const { data } = await supabase
        .from('whitelist_requests')
        .select('status')
        .eq('user_id', userId)
        .maybeSingle()
      if (!active) return
      if (!data) setState('signed-in')
      else setState(data.status as AccessState)
    }
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) void loadStatus(data.session.user.id)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) void loadStatus(session.user.id)
      else setState('signed-out')
    })
    return () => { active = false; listener.subscription.unsubscribe() }
  }, [])

  const submitAuth = async () => {
    setLoading(true); setMessage('')
    const result = mode === 'signup'
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (result.error) { setMessage(result.error.message); return }
    if (mode === 'signup' && !result.data.session) setMessage('Account created. Sign in to request access.')
    else setMessage('Signed in. Request access below.')
  }

  const requestAccess = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setMessage('Sign in first to request access.'); return }
    setLoading(true); setMessage('')
    const { error } = await supabase
      .from('whitelist_requests')
      .upsert({ user_id: user.id, email: user.email ?? email, status: 'pending' }, { onConflict: 'user_id' })
    setLoading(false)
    if (error) { setMessage('Could not submit your request right now.'); return }
    setState('pending')
    setMessage('Request received. We will update your status here after review.')
  }

  const signOut = async () => { await supabase.auth.signOut(); setMessage(''); setState('signed-out'); setEmail(''); setPassword('') }

  return (
    <section className="section access-section" id="whitelist">
      <div className="container">
        <SectionHeader eyebrow="Private access" title="Request access to Finch." description="Finch is distributed privately while access is being reviewed. Create an account, submit a request, and return here to see when your download is ready." />
        <div className="access-grid">
          <div className="access-info">
            <div className="access-step"><span className="access-step-num">01</span><div><strong>Create an account</strong><p>Set up your FinchWeb account to manage your access request.</p></div></div>
            <div className="access-step"><span className="access-step-num">02</span><div><strong>Request access</strong><p>Submit a whitelist request. We review each one before granting download access.</p></div></div>
            <div className="access-step"><span className="access-step-num">03</span><div><strong>Get approved</strong><p>Once approved, return here to download the Finch desktop application.</p></div></div>
          </div>
          <div className="access-card card">
            {state === 'signed-out' && (
              <>
                <div className="access-card-head"><span className="kpi-label">{mode === 'signup' ? 'Join the whitelist' : 'Check your access'}</span><h3>{mode === 'signup' ? 'Create your account' : 'Sign in'}</h3></div>
                <label className="access-label">Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" /></label>
                <label className="access-label">Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" /></label>
                <Button onClick={() => void submitAuth()} disabled={loading}>{loading ? 'Working…' : mode === 'signup' ? 'Create account' : 'Sign in'}</Button>
                <button className="access-switch" onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}>{mode === 'signup' ? 'Already have an account? Sign in' : 'Need an account? Create one'}</button>
              </>
            )}
            {state === 'signed-in' && (
              <>
                <span className="status-pill">Signed in</span>
                <h3>Request your Finch access</h3>
                <p className="access-copy">Your account is ready. Submit a whitelist request to begin the review process.</p>
                <Button onClick={() => void requestAccess()} disabled={loading}>{loading ? 'Submitting…' : 'Join the whitelist'}</Button>
                <button className="access-switch" onClick={() => void signOut()}>Sign out</button>
              </>
            )}
            {state === 'pending' && (
              <>
                <span className="status-pill pending">Under review</span>
                <h3>Your request is in review.</h3>
                <p className="access-copy">Finch is not available to your account yet. Return here after approval to download the desktop application.</p>
                <button className="access-switch" onClick={() => void signOut()}>Sign out</button>
              </>
            )}
            {state === 'approved' && (
              <>
                <span className="status-pill approved">Approved</span>
                <h3>Your Finch access is ready.</h3>
                <p className="access-copy">Your account has been approved. Head to the download section to get Finch.</p>
                <a className="btn btn-primary" href="#download">View download</a>
                <button className="access-switch" onClick={() => void signOut()}>Sign out</button>
              </>
            )}
            {state === 'rejected' && (
              <>
                <span className="status-pill rejected">Not approved</span>
                <h3>Access was not granted.</h3>
                <p className="access-copy">Your request was not approved at this time. You can submit a new request if your circumstances change.</p>
                <Button onClick={() => void requestAccess()} disabled={loading}>{loading ? 'Submitting…' : 'Request again'}</Button>
                <button className="access-switch" onClick={() => void signOut()}>Sign out</button>
              </>
            )}
            {message && <p className="access-message" role="status">{message}</p>}
          </div>
        </div>
      </div>
    </section>
  )
}
