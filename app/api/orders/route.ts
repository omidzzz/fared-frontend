import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    if (!body || !body.items || body.total == null) {
      return NextResponse.json({ error: 'Missing order data' }, { status: 400 })
    }
    // In production: save order to database, send confirmation email, process payment
    return NextResponse.json({ success: true, order: body })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
