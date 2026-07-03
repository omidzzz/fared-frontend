'use client'

import { useState } from 'react'
import CTAButton from '@/components/ui/CTAButton'

export default function QuoteOfTheDay() {
  const [flipped, setFlipped] = useState(false)

  return (
    <div style={{ padding: '40px 0 20px' }}>
      <div
        onClick={() => setFlipped(f => !f)}
        style={{ perspective: 1000, cursor: 'pointer', maxWidth: 700, width: '100%', margin: '0 auto', minHeight: 260 }}
        className="px-4 sm:px-8 lg:px-10"
      >
        <div style={{
          position: 'relative', width: '100%', minHeight: 260,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}>
          {/* FRONT */}
          <div style={{
            position: 'absolute', inset: 0, minHeight: 260, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
            background: 'rgba(15,8,40,0.7)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(212,175,100,0.25)', borderRadius: 20,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '28px 20px sm:32px',
          }}>
            <span className="text-2xl lg:text-[2rem]">✦</span>
            <p style={{ fontFamily: "'Vazirmatn','Playfair Display',serif", fontSize: 'clamp(1.05rem, 3vw, 1.3rem)', color: '#fff', textAlign: 'center', direction: 'rtl' }}>پیام امروزت رو کشف کن</p>
            <p style={{ fontSize: 'clamp(0.6rem, 1.5vw, 0.72rem)', color: 'rgba(212,175,100,0.6)', letterSpacing: '0.15em' }}>TAP TO REVEAL ✦</p>
            {['top:16px;left:20px','top:16px;right:20px','bottom:16px;left:20px','bottom:16px;right:20px'].map(pos => (
              <span key={pos} style={{ position: 'absolute', color: 'rgba(212,175,100,0.3)', fontSize: '0.7rem', ...Object.fromEntries(pos.split(';').map(s => s.split(':'))) }}/>))}
          </div>

          {/* BACK */}
          <div style={{
            position: 'absolute', inset: 0, minHeight: 260, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'rgba(15,8,40,0.7)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(212,175,100,0.25)', borderRadius: 20,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '20px 16px sm:24px 36px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(212,175,100,0.7)', fontSize: '0.68rem', letterSpacing: '0.25em' }}>
              <span>✦</span><span>نقل قول روز</span><span>✦</span>
            </div>
            <span style={{ fontSize: '1.8rem', color: 'rgba(212,175,100,0.4)', lineHeight: 1 }}>"</span>
            <p style={{ fontFamily: "'Vazirmatn','Playfair Display',serif", fontSize: 'clamp(0.8rem, 2.5vw, 0.92rem)', color: 'rgba(255,255,255,0.9)', textAlign: 'center', lineHeight: 1.7, direction: 'rtl' }}>
              بیا که قصر امل سخت سست بنیاد است<br/>بیار باده که بنیاد عمر بر باد است
            </p>
            <p style={{ fontSize: '0.72rem', color: 'rgba(212,175,100,0.65)', fontStyle: 'italic' }}>— حافظ</p>
            <span style={{ color: 'rgba(212,175,100,0.4)', fontSize: '0.7rem' }}>◆</span>
            <p style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', marginTop: 4 }}>TAP TO CLOSE</p>
          </div>
        </div>
      </div>

      {flipped && (
        <div style={{ textAlign: 'center', marginTop: 20, animation: 'fadeIn 0.5s ease' }}>
          <CTAButton href="/quotes" size="small">✦ مشاهده نقل قول‌ها</CTAButton>
        </div>
      )}
    </div>
  )
}