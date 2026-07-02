import { NextResponse } from 'next/server'
import { deleteVisitorAnalytics } from '../../../../lib/analytics'

export const runtime = 'nodejs'

export async function POST(request) {
  try {
    const body = await request.json()
    if (typeof body?.visitorId !== 'string' || body.visitorId.length < 8 || body.visitorId.length > 100) {
      return NextResponse.json({ error: 'Invalid visitor identifier' }, { status: 400 })
    }
    const deleted = deleteVisitorAnalytics(body.visitorId)
    return NextResponse.json({ deleted }, { headers: { 'Cache-Control': 'no-store' } })
  } catch {
    return NextResponse.json({ error: 'Unable to delete analytics' }, { status: 500 })
  }
}
