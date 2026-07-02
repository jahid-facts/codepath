import { NextResponse } from 'next/server'
import { ADMIN_COOKIE, adminIsConfigured, createAdminSession, verifyAdminPassword } from '../../../../lib/admin-auth'

const failures = new Map()
const WINDOW_MS = 15 * 60 * 1000
const MAX_FAILURES = 5

export async function POST(request) {
  if (!adminIsConfigured()) return NextResponse.json({ error: 'Admin access is not configured on the server.' }, { status: 503 })
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'
  const recent = (failures.get(ip) || []).filter((time) => Date.now() - time < WINDOW_MS)
  if (recent.length >= MAX_FAILURES) return NextResponse.json({ error: 'Too many attempts. Try again in 15 minutes.' }, { status: 429, headers: { 'Retry-After': '900' } })
  try {
    const { password } = await request.json()
    if (!verifyAdminPassword(password || '')) {
      failures.set(ip, [...recent, Date.now()])
      return NextResponse.json({ error: 'Incorrect admin password.' }, { status: 401 })
    }
    failures.delete(ip)
    const response = NextResponse.json({ authenticated: true })
    response.cookies.set(ADMIN_COOKIE, createAdminSession(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 12,
    })
    return response
  } catch {
    return NextResponse.json({ error: 'Invalid login request.' }, { status: 400 })
  }
}
