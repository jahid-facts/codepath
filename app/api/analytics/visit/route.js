import { NextResponse } from 'next/server'
import { recordVisit } from '../../../../lib/analytics'

export const runtime = 'nodejs'

export async function POST(request) {
  try {
    const contentLength = Number(request.headers.get('content-length') || 0)
    if (contentLength > 10_000) return NextResponse.json({ error: 'Payload too large' }, { status: 413 })
    const body = await request.json()
    if (!body?.sessionId || !body?.visitorId) return NextResponse.json({ error: 'Invalid visit' }, { status: 400 })
    const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    const ipAddress = forwarded || request.headers.get('x-real-ip') || 'Unknown'
    const created = recordVisit({ ...body, ipAddress, userAgent: request.headers.get('user-agent') || 'Unknown' })
    return NextResponse.json({ recorded: created }, { headers: { 'Cache-Control': 'no-store' } })
  } catch {
    return NextResponse.json({ error: 'Unable to record visit' }, { status: 500 })
  }
}
