import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    if (!body || !body.session || !body.date || !body.time) {
      return NextResponse.json({ error: 'Missing booking data' }, { status: 400 })
    }
    // In production: save to database, send confirmation email, process payment
    return NextResponse.json({ success: true, booking: body })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
