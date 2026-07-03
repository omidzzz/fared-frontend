'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import CTAButton from '@/components/ui/CTAButton'

const TIME_SLOTS = ['10:00', '11:00', '13:00', '14:00', '15:00', '17:00']

export default function SelectTimePage() {
  const router = useRouter()
  const [session, setSession] = useState<{ id: string; name: string; price: string; duration: string } | null>(null)
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const saved = sessionStorage.getItem('lumina-selected-session')
    if (!saved) { router.push('/shop/mentorship'); return }
    try { setSession(JSON.parse(saved)) } catch { router.push('/shop/mentorship') }
  }, [router])

  const days: { label: string; date: string }[] = []
  for (let i = 0; i < 7; i++) {
    const d = new Date()
    d.setDate(d.getDate() + i)
    days.push({
      label: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      date: d.toISOString().split('T')[0],
    })
  }

  const handleContinue = () => {
    if (!selectedDay || !selectedTime || !session) return
    sessionStorage.setItem('lumina-booking', JSON.stringify({ session: session.name, price: session.price, date: selectedDay, time: selectedTime }))
    router.push('/shop/mentorship/payment')
  }

  if (!session) return null

  return (
    <main style={{ minHeight: '100vh', background: '#0a0514', color: '#fff', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <Image src="/images/hero-backgrounds/mentorship-bg.webp" alt="" fill sizes="100vw" unoptimized priority
               className="object-cover object-center" style={{ opacity: 0.7 }}
               onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,5,20,0.55)' }}/>
      </div>

      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 40px' }}>
        <div style={{ maxWidth: 600, width: '100%', background: 'rgba(10,5,30,0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(212,175,100,0.2)', borderRadius: 24, padding: '40px 36px' }}>
          {/* Session summary */}
          <div style={{ marginBottom: 28, padding: '16px 20px', background: 'rgba(212,175,100,0.08)', borderRadius: 12, border: '1px solid rgba(212,175,100,0.2)' }}>
            <div style={{ fontWeight: 600, fontSize: '0.88rem', letterSpacing: '0.08em' }}>{session.name}</div>
            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>{session.duration} — {session.price}</div>
          </div>

          {/* Date picker */}
          <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: '1.2rem', marginBottom: 16 }}>Select Date</h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
            {days.map(d => (
              <button key={d.date} onClick={() => setSelectedDay(d.date)} style={{
                padding: '10px 14px', borderRadius: 12, border: selectedDay === d.date ? '2px solid #d4af64' : '1px solid rgba(255,255,255,0.15)',
                background: selectedDay === d.date ? 'rgba(212,175,100,0.12)' : 'transparent',
                color: selectedDay === d.date ? '#d4af64' : 'rgba(255,255,255,0.8)',
                cursor: 'pointer', fontSize: '0.78rem', transition: 'all 0.2s ease',
              }}>{d.label}</button>
            ))}
          </div>

          {/* Time slots */}
          {selectedDay && (
            <>
              <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: '1.2rem', marginBottom: 16 }}>Select Time</h3>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
                {TIME_SLOTS.map(t => (
                  <button key={t} onClick={() => setSelectedTime(t)} style={{
                    padding: '10px 20px', borderRadius: 12, border: selectedTime === t ? '2px solid #d4af64' : '1px solid rgba(255,255,255,0.15)',
                    background: selectedTime === t ? 'rgba(212,175,100,0.12)' : 'transparent',
                    color: selectedTime === t ? '#d4af64' : 'rgba(255,255,255,0.8)',
                    cursor: 'pointer', fontSize: '0.85rem', transition: 'all 0.2s ease',
                  }}>{t}</button>
                ))}
              </div>
            </>
          )}

          {/* CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <CTAButton onClick={handleContinue} disabled={!selectedDay || !selectedTime} size="fullWidth">
              CONTINUE TO PAYMENT →
            </CTAButton>
            <Link href="/shop/mentorship" style={{ textAlign: 'center', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>← Back</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
