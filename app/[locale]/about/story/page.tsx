'use client'

import Image from 'next/image'
import CTAButton from '@/components/ui/CTAButton'

export default function AboutStoryPage() {
  return (
    <main style={{ minHeight: '100vh', fontFamily: "'Inter', sans-serif", color: '#fff' }}>
      {/* Fixed background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <Image src="/images/hero-backgrounds/about-us-bg.webp" alt="" fill sizes="100vw" unoptimized priority
               className="object-cover object-center"
               onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
      </div>

      {/* Scrollable content */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '80px 40px' }}>
        <div style={{
          maxWidth: 700, textAlign: 'center',
          background: 'rgba(10,5,30,0.75)', backdropFilter: 'blur(16px)',
          border: '1px solid rgba(212,175,100,0.2)', borderRadius: 24,
          padding: '56px 48px',
        }}>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 400, color: '#fff', marginBottom: 24,
          }}>
            مسیر ما
          </h1>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: '1rem',
            color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, marginBottom: 32,
            maxWidth: 560, margin: '0 auto 32px',
          }}>
            Auravista was born from a deep love for crystals and a calling to help others remember their inner light. What began as a personal healing journey has blossomed into a brand devoted to conscious living, spiritual tools and beautiful energy.
          </p>
          <CTAButton href="/about">← بازگشت</CTAButton>
        </div>
      </div>
    </main>
  )
}
