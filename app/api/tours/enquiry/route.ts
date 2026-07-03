import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { name, email, retreat, date } = await request.json()
    if (!name || !email || !retreat) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 })
    }
    return NextResponse.json({ success: true, message: 'Enquiry received!' })
  } catch {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
