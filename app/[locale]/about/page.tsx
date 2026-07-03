'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import CTAButton from '@/components/ui/CTAButton'

const values = [
  { icon: 'crystal', name: 'Authenticity', description: 'We source mindfully and honor nature in every step.' },
  { icon: 'heart', name: 'Inner Growth', description: 'We support your journey to healing, awakening and self-discovery.' },
  { icon: 'hands', name: 'Energy & Intention', description: 'Every crystal is cleansed, charged and blessed with positive intention.' },
  { icon: 'lotus', name: 'Connection', description: 'We build a conscious community of like-minded souls.' },
]

const ValueIcon = ({ type }: { type: string }) => {
  const c = 'rgba(212,175,100,0.85)'
  const s: Record<string, React.ReactNode> = {
    crystal: <svg viewBox="0 0 28 28" fill="none" stroke={c} strokeWidth="1.2" width={28} height={28}><polygon points="14,3 20,12 14,25 8,12"/><path d="M8 12h12" opacity="0.5"/><path d="M14 3v9" opacity="0.5"/></svg>,
    heart: <svg viewBox="0 0 28 28" fill="none" stroke={c} strokeWidth="1.2" width={28} height={28}><path d="M14 24s-8-5-10-11c-1.5-4.5 1-7.5 4.5-7.5 2 0 3.5 1.5 5.5 3.5 2-2 3.5-3.5 5.5-3.5 3.5 0 6 3 4.5 7.5-2 6-10 11-10 11z"/></svg>,
    hands: <svg viewBox="0 0 28 28" fill="none" stroke={c} strokeWidth="1.2" width={28} height={28}><path d="M14 20L9 14V8l5-4 5 4v6z"/><path d="M9 14l-5 5v2l5 3 5-3v-7" opacity="0.6"/><path d="M19 14l5 5v2l-5 3-5-3v-7" opacity="0.6"/></svg>,
    lotus: <svg viewBox="0 0 28 28" fill="none" stroke={c} strokeWidth="1.2" width={28} height={28}><path d="M14 4c-3 4.5-3 10 0 14 3-4 3-9.5 0-14z"/><path d="M14 18c-4.5-2.5-9-2-13 1 4.5 2.5 9 2 13-1zM14 18c4.5-2.5 9-2 13 1-4.5 2.5-9 2-13-1z"/></svg>,
  }
  return <>{s[type]}</>
}

export default function AboutPage() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setLoaded(true) }, [])

  const fadeIn = (delay: number) => loaded ? { animation: `fadeSlideUp 0.6s ease forwards`, animationDelay: `${delay}ms`, opacity: 0 } : { opacity: 0 }

  return (
    <main style={{ minHeight: '100vh', fontFamily: "'Inter', sans-serif", color: '#fff' }}>
      <div className="hidden lg:block" style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <Image src="/images/hero-backgrounds/about-us-bg.webp" alt="" fill sizes="100vw" unoptimized priority
               className="object-cover object-center"
               onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 55% 45%, rgba(120,60,200,0.12) 0%, transparent 60%)', pointerEvents: 'none' }}/>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── HERO ROW: text left + quote right ── */}
        <div style={{
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          padding: '120px 10% 40px', maxWidth: 1400, margin: '0 auto',
        }}>
          {/* Hero text */}
          <div style={{ textAlign: 'left', flex: '0 0 50%' }}>
            <p style={{ ...fadeIn(0), fontSize: '0.72rem', letterSpacing: '0.3em', color: '#d4af64', textTransform: 'uppercase', marginBottom: 12 }}>
              DISCOVER OUR ESSENCE
            </p>
            <h1 style={{ ...fadeIn(100), fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(3rem, 5vw, 5rem)', fontWeight: 400, color: '#fff', margin: 0 }}>
              About Us <span style={{ color: '#d4af64', fontSize: '0.5em', verticalAlign: 'super' }}>✦</span>
            </h1>
            <div style={{ ...fadeIn(200), position: 'relative', width: 160, margin: '20px 0' }}>
              <div style={{ borderTop: '1px solid rgba(212,175,100,0.5)', width: '100%' }}/>
              <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: '#d4af64', fontSize: 10, lineHeight: 0 }}>✦</span>
            </div>
            <p style={{ ...fadeIn(300), fontFamily: 'Georgia, serif', fontSize: '1rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, maxWidth: 380 }}>
              We are a spiritual guide for seekers of light, creators of sacred tools, and believers in the infinite power within.
            </p>
          </div>

          {/* Quote card */}
          <div style={{ ...fadeIn(400), flex: '0 0 auto',
            background: 'rgba(15,8,40,0.65)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(212,175,100,0.25)', borderRadius: 20,
            padding: '28px 32px', maxWidth: 280, alignSelf: 'flex-start',
          }}>
            <div style={{ fontSize: '2rem', color: 'rgba(212,175,100,0.8)', lineHeight: 1, marginBottom: 12 }}>❝</div>
            <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'normal', fontSize: '1rem', color: 'rgba(255,255,255,0.88)', lineHeight: 1.75 }}>
              Crystals are not just stones. They are ancient whispers of the Earth, reminding us who we are.
            </p>
            <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic', fontSize: '0.82rem', color: 'rgba(212,175,100,0.7)', marginTop: 16 }}>— Founder</p>
            <svg viewBox="0 0 28 28" fill="none" stroke="rgba(212,175,100,0.6)" strokeWidth="1.2" width={28} height={28} style={{ margin: '16px auto 0', display: 'block' }}>
              <path d="M14 4c-3 4.5-3 10 0 14 3-4 3-9.5 0-14z"/>
              <path d="M14 18c-4.5-2.5-9-2-13 1 4.5 2.5 9 2 13-1zM14 18c4.5-2.5 9-2 13 1-4.5 2.5-9 2-13-1z"/>
            </svg>
          </div>
        </div>

        {/* ── BOTTOM ROW: Core Values (40%) | We Believe (20%) | Our Story (20%) ── */}
        <div style={{
          ...fadeIn(500),
          display: 'grid', gridTemplateColumns: '45% 25% 25%', gap: 24,
          padding: '0 10% 80px', alignItems: 'start', width: '100%', maxWidth: 1400, margin: '0 auto',
        }}>
          {/* Core Values — 40% */}
          <div style={{
            background: 'rgba(10,5,30,0.72)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(212,175,100,0.15)', borderRadius: '24px 80px 80px 24px',
            padding: '40px 48px', textAlign: 'left',
          }}>
            <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: '1.4rem', margin: 0 }}>
              Our Core <span style={{ fontStyle: 'italic', color: '#d4af64' }}>Values</span>
            </h3>
            <div style={{ display: 'flex', gap: 24, marginTop: 28 }}>
              {values.map(v => (
                <div key={v.name} style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', border: '1px solid rgba(212,175,100,0.4)', background: 'rgba(212,175,100,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <ValueIcon type={v.icon}/>
                  </div>
                  <h4 style={{ fontSize: '0.88rem', fontWeight: 600, letterSpacing: '0.05em', marginBottom: 8 }}>{v.name}</h4>
                  <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, maxWidth: 120, margin: '0 auto' }}>{v.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* We Believe — 20% */}
          <div dir="ltr" style={{
            background: 'rgba(20,8,50,0.7)', backdropFilter: 'blur(14px)',
            border: '1px solid rgba(212,175,100,0.2)', borderRadius: 60,
            padding: '48px 32px', textAlign: 'center',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16,
          }}>
            <svg viewBox="0 0 48 48" fill="none" stroke="rgba(212,175,100,0.7)" strokeWidth="1" width={48} height={48}>
              <circle cx="24" cy="24" r="20"/><circle cx="24" cy="24" r="10"/>
              <path d="M24 4v40M4 24h40M10 10l28 28M38 10L10 38" opacity="0.3"/>
              <circle cx="24" cy="24" r="3" fill="rgba(212,175,100,0.6)"/>
            </svg>
            <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic', fontSize: '1.2rem', margin: 0 }}>We Believe</p>
            <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic', fontSize: '0.95rem', color: 'rgba(255,255,255,0.85)', lineHeight: 2.2 }}>
              <div>You are energy.</div><div>You are magic.</div><div>You are becoming.</div>
            </div>
          </div>

          {/* Our Story — 20% */}
          <div style={{
            background: 'rgba(8,4,20,0.8)', border: '1px solid rgba(212,175,100,0.2)',
            borderRadius: 24, padding: 32, position: 'relative', textAlign: 'left',
          }}>
            <div style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[0,1,2].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: i === 0 ? '#d4af64' : 'rgba(255,255,255,0.25)' }}/>)}
            </div>
            <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: '1.4rem', margin: 0 }}>
              Our <span style={{ fontStyle: 'italic', color: '#d4af64' }}>Story</span>
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, margin: '16px 0 24px' }}>
              Auravista was born from a deep love for crystals and a calling to help others remember their inner light. What began as a personal healing journey has blossomed into a brand devoted to conscious living, spiritual tools and beautiful energy.
            </p>
            <CTAButton href="/about/story" size="small">Read Our Full Journey →</CTAButton>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="hidden lg:flex" style={{ ...fadeIn(700),
          position: 'relative', zIndex: 1,
          borderTop: '1px solid rgba(212,175,100,0.15)', padding: '20px 48px',
          alignItems: 'center', justifyContent: 'space-between',
          background: 'rgba(8,4,20,0.6)', backdropFilter: 'blur(8px)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <svg viewBox="0 0 32 32" fill="none" stroke="#d4af64" strokeWidth="1.2" width={32} height={32}>
              <path d="M16 6c-3 4-3 9 0 13 3-4 3-9 0-13z"/><path d="M16 19c-5-2.5-10-1.5-14 1 5 2.5 10 1.5 14-1zM16 19c5-2.5 10-1.5 14 1-5 2.5-10 1.5-14-1z"/>
            </svg>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)', maxWidth: 400 }}>
              We are here to walk beside you on your path to clarity, balance and spiritual empowerment.
            </p>
          </div>
          <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic', fontSize: '1.3rem', color: '#d4af64', opacity: 0.85, whiteSpace: 'nowrap' }}>
            You are not alone ♡
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
    </main>
  )
}
