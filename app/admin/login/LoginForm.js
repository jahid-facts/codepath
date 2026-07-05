'use client'

import { useState } from 'react'
import styles from '../admin.module.css'

export default function LoginForm() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const submit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Unable to sign in.')
      window.location.replace('/admin')
    } catch (reason) {
      setError(reason.message)
      setLoading(false)
    }
  }
  return <main className={styles.loginPage}><section className={styles.loginCard}><a className={styles.loginBrand} href="/"><span>C</span><strong>CodePath</strong></a><div className={styles.lockIcon}>⌾</div><p className={styles.kicker}>Private analytics</p><h1>Admin access</h1><p>Enter the server-configured password to view visitor and device analytics.</p><form onSubmit={submit}><label htmlFor="admin-password">Admin password</label><input id="admin-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" autoFocus required placeholder="••••••••••••" />{error && <div className={styles.loginError} role="alert">{error}</div>}<button disabled={loading}>{loading ? 'Checking…' : 'Open analytics'} <span>→</span></button></form><small>Protected by a signed, HTTP-only 12-hour session.</small></section></main>
}
