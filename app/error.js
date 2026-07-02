'use client'

export default function ErrorPage({ reset }) {
  return <main className="system-state"><span className="brand-mark">S</span><p className="eyebrow">Something took a wrong turn</p><h1>The learning path is temporarily unavailable.</h1><p>Your locally saved progress is safe. Try rendering this screen again.</p><button className="primary-button" onClick={reset}>Try again →</button></main>
}
