import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }
    // In production: send to Mailchimp/ConvertKit/etc
    // For now: accept and return success
    return NextResponse.json({ success: true, email })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
