'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import toast from 'react-hot-toast'
import CTAButton from '@/components/ui/CTAButton'

export default function PaymentPage() {
  const router = useRouter()
  const [booking, setBooking] = useState<{ session: string; price: string; date: string; time: string } | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const saved = sessionStorage.getItem('lumina-booking')
    if (!saved) { router.push('/shop/mentorship'); return }
    try { setBooking(JSON.parse(saved)) } catch { router.push('/shop/mentorship') }
  }, [router])

  const handleConfirm = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/mentorship/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
      })
      if (res.ok) {
        sessionStorage.removeItem('lumina-booking')
        sessionStorage.removeItem('lumina-selected-session')
        toast.success('Booking confirmed! ✦')
        router.push('/profile')
      } else {
        toast.error('Booking failed. Please try again.')
        setLoading(false)
      }
    } catch {
      toast.error('Booking failed. Please try again.')
      setLoading(false)
    }
  }

  if (!booking) return null

  return (
    <main style={{ minHeight: '100vh', background: '#0a0514', color: '#fff', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <Image src="/images/hero-backgrounds/mentorship-bg.webp" alt="" fill sizes="100vw" unoptimized priority
               className="object-cover object-center" style={{ opacity: 0.7 }}
               onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,5,20,0.55)' }}/>
      </div>

      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 40px' }}>
        <div style={{ maxWidth: 520, width: '100%', background: 'rgba(10,5,30,0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(212,175,100,0.2)', borderRadius: 24, padding: '40px 36px' }}>
          {/* Order summary */}
          <div style={{ marginBottom: 28, padding: '20px', background: 'rgba(212,175,100,0.08)', borderRadius: 12, border: '1px solid rgba(212,175,100,0.2)' }}>
            <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: '1.3rem', marginBottom: 16 }}>Order Summary</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>
              <span>{booking.session}</span><span>{booking.price}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>
              <span>Date</span><span>{booking.date}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
              <span>Time</span><span>{booking.time}</span>
            </div>
          </div>

          {/* Payment form */}
          <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: '1.2rem', marginBottom: 16 }}>Payment Details</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
            <input placeholder="Card Number •••• •••• •••• ••••" style={{
              padding: '12px 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '0.9rem', outline: 'none',
            }}/>
            <div style={{ display: 'flex', gap: 14 }}>
              <input placeholder="MM/YY" style={{
                padding: '12px 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '0.9rem', outline: 'none', flex: 1,
              }}/>
              <input placeholder="CVV •••" style={{
                padding: '12px 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '0.9rem', outline: 'none', flex: 1,
              }}/>
            </div>
            <input placeholder="Cardholder Name" style={{
              padding: '12px 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '0.9rem', outline: 'none',
            }}/>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <CTAButton onClick={handleConfirm} disabled={loading} size="fullWidth">
              {loading ? 'PROCESSING...' : 'CONFIRM BOOKING ✦'}
            </CTAButton>
            <Link href="/shop/mentorship/select-time" style={{ textAlign: 'center', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>← Back</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
