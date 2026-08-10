import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [isLight, setIsLight] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('finch-theme')
    const light = stored === 'light'
    setIsLight(light)
    document.documentElement.dataset.theme = light ? 'light' : 'dark'
  }, [])

  const toggle = () => {
    const nextIsLight = !isLight
    setIsLight(nextIsLight)
    document.documentElement.dataset.theme = nextIsLight ? 'light' : 'dark'
    localStorage.setItem('finch-theme', nextIsLight ? 'light' : 'dark')
  }

  return (
    <button className="theme-toggle" onClick={toggle} aria-label={`Switch to ${isLight ? 'dark' : 'light'} theme`}>
      {isLight ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"/></svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M20.5 14.3A8.5 8.5 0 0 1 9.7 3.5 8.5 8.5 0 1 0 20.5 14.3Z"/></svg>
      )}
    </button>
  )
}
