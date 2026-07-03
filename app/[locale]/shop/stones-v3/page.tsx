'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import MobileCategoryCard from '@/components/ui/MobileCategoryCard'
import CTAButton from '@/components/ui/CTAButton'
import CrystalCardV2 from '@/components/cards/CrystalCardV2'
import { MOCK_STONES } from '@/lib/mock-data'

const GOLD = '#f5d87a'
const CREAM = '#ffffff'
const TEXT_DIM = 'rgba(255,255,255,0.75)'
const fadeSlideUp: React.CSSProperties = { animation: 'fadeSlideUp 0.5s ease backwards' }

export default function StonesV3Page() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setLoaded(true) }, [])

  return (
    <main className="min-h-screen">
      {/* ── DESKTOP ── */}
      <div className="hidden lg:block" style={{ position:'relative', minHeight:'100vh', background:'#1a0d3d' }}>
        <div style={{ position:'fixed', inset:0, zIndex:0 }}>
          <Image src="/images/hero-backgrounds/stones-hero.webp" alt="" fill sizes="100vw" unoptimized priority
                 className="object-cover object-center" style={{ filter: 'blur(3px)' }}
                 onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 40%, rgba(10,5,30,0.15) 0%, transparent 55%), linear-gradient(180deg, rgba(26,13,61,0.35) 0%, transparent 30%, transparent 65%, rgba(26,13,61,0.8) 100%)' }} />
        </div>

        <div style={{ position:'relative', zIndex:1 }}>
          <section style={{ minHeight:'55vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'100px 40px 60px', position:'relative' }}>
            <h1 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:'clamp(3rem, 7vw, 6rem)', fontWeight:400, color:CREAM, letterSpacing:'0.08em', marginTop:4, marginBottom:0 }}>ENERGY CRYSTALS</h1>
            <p style={{ fontSize:'1rem', color:TEXT_DIM, maxWidth:560, textAlign:'center', lineHeight:1.7, marginTop:12 }}>
              V3 — Testing CrystalCardV2 with new SVG hexagonal frame
            </p>
            <div style={{ marginTop:28 }}>
              <CTAButton size="large">EXPLORE COLLECTION ✦</CTAButton>
            </div>
          </section>

          <div style={{ display:'flex', gap:18, justifyContent:'center', padding:'0 40px 84px', maxWidth:1360, margin:'0 auto', flexWrap:'nowrap', overflowX:'auto' }}>
            {MOCK_STONES.slice(0, 5).map((stone, i) => (
              <div key={stone.id} style={{ ...fadeSlideUp, animationDelay:`${i*80}ms`, width:260, flexShrink:0 }}>
                <CrystalCardV2 stone={stone} />
              </div>
            ))}
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'48px 24px', maxWidth:1360, margin:'32px auto 40px', padding:'0 40px 24px' }}>
            {MOCK_STONES.map((stone, i) => (
              <div key={stone.id + '-full'} style={{ ...fadeSlideUp, animationDelay:`${i*80}ms` }}>
                <div style={{ minHeight:380 }}>
                  <CrystalCardV2 stone={stone} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ display:'flex', justifyContent:'center', paddingBottom:80 }}>
            <CTAButton size="large">EXPLORE MORE CRYSTALS</CTAButton>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes fadeSlideUp { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:none } }
      `}</style>
    </main>
  )
}
