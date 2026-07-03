'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import CTAButton from '@/components/ui/CTAButton'

const PRODUCTS = [
  {
    id: 'amethyst',
    name: 'Amethyst',
    price: '$48.00',
    qualities: ['Calm', 'Intuition', 'Protection'],
    auraColor: 'rgba(168,110,224,0.55)',
    crystal: (
      <svg viewBox="0 0 200 220" fill="none" width="100%" height="100%">
        <path d="M100 10l20 40H80z" fill="#5B2D8A"/>
        <path d="M100 10l-40 90 40 80 40-80z" fill="#9B5FD0" opacity="0.9"/>
        <path d="M100 10l40 90h-80z" fill="#D4A8FF" opacity="0.5"/>
        <path d="M60 100l-20 80 60 20z" fill="#5B2D8A" opacity="0.8"/>
        <path d="M140 100l20 80-60 20z" fill="#7B40B0" opacity="0.7"/>
        <path d="M100 100l-40 80h80z" fill="#9B5FD0" opacity="0.6"/>
        <path d="M100 10l-20 40h40z" fill="#D4A8FF" opacity="0.3"/>
        <line x1="100" y1="10" x2="60" y2="100" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8"/>
        <line x1="100" y1="10" x2="140" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8"/>
        <path d="M40 180l60 30 60-30z" fill="#2D1045" opacity="0.6"/>
      </svg>
    ),
    badge: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" width={20} height={20}><path d="M12 4 21 20H3L12 4Z"/><path d="M6.5 14h11" opacity=".8"/></svg>,
  },
  {
    id: 'rose-quartz',
    name: 'Rose Quartz',
    price: '$42.00',
    qualities: ['Love', 'Compassion', 'Healing'],
    auraColor: 'rgba(244,170,200,0.5)',
    crystal: (
      <svg viewBox="0 0 200 220" fill="none" width="100%" height="100%">
        <path d="M100 10l-25 110h50z" fill="#D4789A"/>
        <path d="M100 10l25 110h-50z" fill="#F4AAC8" opacity="0.9"/>
        <path d="M75 120l-15 60h35z" fill="#D4789A" opacity="0.7"/>
        <path d="M125 120l15 60h-35z" fill="#F4AAC8" opacity="0.6"/>
        <path d="M60 180l40 30 40-30z" fill="#C06880" opacity="0.5"/>
        <line x1="100" y1="10" x2="75" y2="120" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8"/>
        <line x1="100" y1="10" x2="125" y2="120" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8"/>
        <circle cx="60" cy="180" r="4" fill="#FAD8EC" opacity="0.6"/><circle cx="60" cy="180" r="1.5" fill="#F4AAC8"/>
        <circle cx="50" cy="190" r="3.5" fill="#FAD8EC" opacity="0.6"/><circle cx="50" cy="190" r="1.2" fill="#F4AAC8"/>
        <circle cx="150" cy="185" r="4" fill="#FAD8EC" opacity="0.6"/><circle cx="150" cy="185" r="1.5" fill="#F4AAC8"/>
      </svg>
    ),
    badge: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" width={20} height={20}><path d="M12 20s-7-4.4-7-9.2A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7 2.8C19 15.6 12 20 12 20Z"/></svg>,
  },
  {
    id: 'citrine',
    name: 'Citrine',
    price: '$44.00',
    qualities: ['Abundance', 'Joy', 'Manifestation'],
    auraColor: 'rgba(243,196,110,0.55)',
    crystal: (
      <svg viewBox="0 0 200 220" fill="none" width="100%" height="100%">
        <path d="M100 10l-35 90h70z" fill="#8B5200"/>
        <path d="M100 10l-50 90 50 70 50-70z" fill="#D4820A" opacity="0.85"/>
        <path d="M50 100l-20 60 70 40 20-60z" fill="#8B5200" opacity="0.7"/>
        <path d="M150 100l20 60-70 40-20-60z" fill="#F5C842" opacity="0.5"/>
        <path d="M100 100l-30 60h60z" fill="#D4820A" opacity="0.6"/>
        <line x1="100" y1="10" x2="65" y2="100" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8"/>
        <line x1="100" y1="10" x2="135" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8"/>
        <circle cx="85" cy="20" r="1.5" fill="#F5C842" opacity="0.9"/>
        <circle cx="120" cy="35" r="1" fill="#F5C842" opacity="0.7"/>
        <circle cx="55" cy="30" r="1.2" fill="#F5C842" opacity="0.8"/>
        <path d="M30 160l70 50 70-50z" fill="#5B3000" opacity="0.5"/>
      </svg>
    ),
    badge: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" width={20} height={20}><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/></svg>,
  },
  {
    id: 'clear-quartz',
    name: 'Clear Quartz',
    price: '$40.00',
    qualities: ['Clarity', 'Amplify', 'Balance'],
    auraColor: 'rgba(196,210,240,0.5)',
    crystal: (
      <svg viewBox="0 0 200 220" fill="none" width="100%" height="100%">
        <path d="M100 10l-15 50h30z" fill="rgba(255,255,255,0.2)"/>
        <path d="M100 10l-30 70 30 80 30-80z" fill="rgba(220,235,255,0.4)" opacity="0.9"/>
        <path d="M100 10l30 70h-60z" fill="rgba(255,255,255,0.35)" opacity="0.7"/>
        <path d="M70 80l-25 70 55 30z" fill="rgba(200,220,240,0.3)" opacity="0.8"/>
        <path d="M130 80l25 70-55 30z" fill="rgba(220,240,255,0.4)" opacity="0.6"/>
        <path d="M100 80l-30 70h60z" fill="rgba(255,255,255,0.25)" opacity="0.5"/>
        <line x1="100" y1="10" x2="70" y2="80" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
        <line x1="100" y1="10" x2="130" y2="80" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
        <line x1="85" y1="30" x2="80" y2="80" stroke="rgba(184,212,240,0.6)" strokeWidth="0.8"/>
        <line x1="115" y1="30" x2="120" y2="80" stroke="rgba(200,225,250,0.5)" strokeWidth="0.8"/>
        <path d="M45 150l55 40 55-40z" fill="rgba(180,200,220,0.25)" opacity="0.5"/>
      </svg>
    ),
    badge: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" width={20} height={20}><path d="M6 4h12l4 5-10 11L2 9l4-5Z"/><path d="M2 9h20M9 4 6 9l6 11M15 4l3 5-6 11" opacity=".7"/></svg>,
  },
  {
    id: 'labradorite',
    name: 'Labradorite',
    price: '$52.00',
    qualities: ['Transformation', 'Protection', 'Magic'],
    auraColor: 'rgba(96,180,224,0.5)',
    crystal: (
      <svg viewBox="0 0 200 220" fill="none" width="100%" height="100%">
        <ellipse cx="100" cy="110" rx="55" ry="75" fill="#3A4258"/>
        <ellipse cx="100" cy="110" rx="55" ry="75" fill="url(#lab-grad)" opacity="0.6"/>
        <defs>
          <radialGradient id="lab-grad" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0.8"/>
            <stop offset="30%" stopColor="#4A90D9" stopOpacity="0.5"/>
            <stop offset="60%" stopColor="#9B6BBF" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#3A4258" stopOpacity="0.4"/>
          </radialGradient>
        </defs>
        <ellipse cx="85" cy="80" rx="20" ry="30" fill="#4ECDC4" opacity="0.3" style={{filter:'blur(8px)'}}/>
        <ellipse cx="115" cy="120" rx="18" ry="25" fill="#4A90D9" opacity="0.3" style={{filter:'blur(8px)'}}/>
        <ellipse cx="95" cy="140" rx="15" ry="20" fill="#9B6BBF" opacity="0.25" style={{filter:'blur(8px)'}}/>
        <ellipse cx="100" cy="110" rx="55" ry="75" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
        <path d="M60 60q20-20 40 0" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none"/>
      </svg>
    ),
    badge: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" width={20} height={20}><path d="M3 9c2-2 4-2 6 0s4 2 6 0 4-2 6 0M3 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/></svg>,
  },
]

export default function StonesV2Page() {
  useEffect(() => {
    const fit = () => {
      const s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080)
      const el = document.getElementById('stage')
      if (el) el.style.transform = `scale(${s})`
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  return (
    <div id="viewport" className="hidden lg:flex" style={{
      position: 'fixed', inset: 0, alignItems: 'center', justifyContent: 'center',
      background: '#1a0e36',
    }}>
      <div id="stage" style={{
        position: 'relative', width: 1920, height: 1080,
        transformOrigin: 'center center', overflow: 'hidden',
        background: '#2a1656', color: 'var(--ivory, #F8F4EA)',
        fontFamily: 'var(--avad-sans, "Jost", sans-serif)',
      }}>
        {/* ── BACKGROUND ── */}
        <div id="bg" style={{ position: 'absolute', inset: 0, zIndex: 0, background: `
          radial-gradient(ellipse 900px 400px at 50% 30%, rgba(180,80,255,0.15) 0%, transparent 70%),
          radial-gradient(ellipse 600px 300px at 20% 50%, rgba(100,50,200,0.2) 0%, transparent 60%),
          radial-gradient(ellipse 600px 300px at 80% 50%, rgba(80,160,255,0.15) 0%, transparent 60%),
          linear-gradient(180deg, #1a0832 0%, #2a1656 35%, #3B1C6E 65%, #2a1656 100%)
        `}}>
          {/* Aurora arc */}
          <svg style={{ position: 'absolute', left: 0, top: '25%', width: '100%', height: '40%', opacity: 0.35 }} viewBox="0 0 1920 400" preserveAspectRatio="none">
            <defs>
              <linearGradient id="aurora" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#9B6BBF" stopOpacity="0.8"/>
                <stop offset="25%" stopColor="#4A90D9" stopOpacity="0.7"/>
                <stop offset="50%" stopColor="#4ECDC4" stopOpacity="0.6"/>
                <stop offset="75%" stopColor="#B8D4F0" stopOpacity="0.5"/>
                <stop offset="100%" stopColor="#F5C842" stopOpacity="0.4"/>
              </linearGradient>
            </defs>
            <path d="M0 300 Q480 50 960 150 Q1440 250 1920 80 L1920 400 L0 400 Z" fill="url(#aurora)"/>
          </svg>
          {/* Sparkle dots */}
          {[[200,150],[450,80],[780,200],[1200,90],[1550,160],[320,300],[680,340],[1100,260],[1400,310],[1700,200]].map(([x,y],i) => (
            <div key={i} style={{
              position: 'absolute', left: x, top: y, width: 4, height: 4,
              borderRadius: '50%', background: '#F8F4EA',
              boxShadow: '0 0 6px rgba(248,244,234,0.6), 0 0 12px rgba(180,80,255,0.3)',
              opacity: 0.5 + (i % 3) * 0.15,
            }}/>
          ))}
          {/* Gradient overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(40,20,80,0.55) 0%, rgba(40,20,80,0) 14%, rgba(40,20,80,0) 60%, rgba(34,16,66,0.30) 100%)' }}/>
        </div>

        {/* ── HERO ── */}
        <div id="hero" style={{ position: 'absolute', zIndex: 10, left: '50%', top: 140, transform: 'translateX(-50%)', width: 1500, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Top ornament */}
          <svg viewBox="0 0 80 54" fill="none" width={74} height={50} style={{ color: 'var(--ivory, #F8F4EA)', opacity: 0.9, filter: 'drop-shadow(0 0 10px rgba(213,166,255,0.6))', marginBottom: 4 }}>
            <path d="M40 8c-1.6 0-3 7-3 13 0-6-7-9-12-9 5 0 12-3 12-9 0 6 1.4 13 3 13s3-7 3-13c0 6 7 9 12 9-5 0-12 3-12 9 0-6-1.4-13-3-13Z" fill="currentColor" fillOpacity=".25"/>
            <path d="M22 40a18 18 0 0 0 36 0" opacity=".55"/>
            <circle cx="40" cy="22" r="2" fill="currentColor" stroke="none"/>
          </svg>

          {/* Eyebrow */}
          <div style={{ fontFamily: 'var(--serif, "Cormorant Garamond"), serif', fontWeight: 500, fontSize: 32, letterSpacing: '.14em', textTransform: 'uppercase', color: '#F8F4EA', opacity: 0.94, textShadow: '0 2px 18px rgba(0,0,0,.4)' }}>
            Discover the Magic of
          </div>

          {/* H1 */}
          <h1 style={{ fontFamily: 'var(--serif, "Cormorant Garamond"), serif', fontWeight: 600, fontSize: 96, lineHeight: 0.92, letterSpacing: '.03em', textTransform: 'uppercase', color: '#F8F4EA', margin: '10px 0 0', textShadow: '0 6px 50px rgba(0,0,0,.4), 0 0 70px rgba(213,166,255,0.35)' }}>
            Energy Crystals
          </h1>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '14px 0', color: '#E6C27A', opacity: 0.85 }}>
            <span style={{ width: 130, height: 1, background: 'linear-gradient(90deg, transparent, #E6C27A)' }}/>
            <svg viewBox="0 0 20 26" fill="none" stroke="currentColor" strokeWidth="1.2" width={20} height={26}>
              <path d="M10 2 16 11l-6 13-6-13 6-9Z"/><path d="M4 11h12" opacity=".7"/>
            </svg>
            <span style={{ width: 130, height: 1, background: 'linear-gradient(270deg, transparent, #E6C27A)' }}/>
          </div>

          {/* Subtitle */}
          <p style={{ fontFamily: 'var(--sans, "Jost"), sans-serif', fontWeight: 300, fontSize: 24, lineHeight: 1.6, color: '#F8F4EA', opacity: 0.92, maxWidth: 620, letterSpacing: '.02em', textShadow: '0 2px 16px rgba(0,0,0,.5)', margin: 0 }}>
            Awaken your spirit. Elevate your energy. Align with the natural vibrations of the Earth&apos;s most powerful crystals.
          </p>

          {/* CTA */}
          <div style={{ marginTop: 26 }}>
            <CTAButton href="/shop/stones" size="large">EXPLORE COLLECTION</CTAButton>
          </div>
        </div>

        {/* Side ornaments */}
        <div style={{ position: 'absolute', zIndex: 10, left: 60, top: 330, width: 100, height: 100, border: '1px solid rgba(248,244,234,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.6 }}>
          <svg viewBox="0 0 50 50" fill="none" stroke="#F8F4EA" strokeWidth="0.8" width={40} height={40}>
            <path d="M25 5C15 20 15 30 25 45C35 30 35 20 25 5Z" opacity="0.3"/><circle cx="25" cy="22" r="8"/>
          </svg>
        </div>
        <div style={{ position: 'absolute', zIndex: 10, right: 60, top: 330, width: 100, height: 100, border: '1px solid rgba(248,244,234,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.6 }}>
          <svg viewBox="0 0 50 50" fill="none" stroke="#F8F4EA" strokeWidth="0.8" width={40} height={40}>
            <path d="M25 5L35 20L25 45L15 20Z"/><path d="M15 20h20" opacity="0.5"/><path d="M25 5v15" opacity="0.5"/><path d="M20 28L25 20L30 28" opacity="0.4"/>
          </svg>
        </div>

        {/* ── PRODUCT CARDS ── */}
        <div id="cards" style={{ position: 'absolute', zIndex: 12, left: '50%', bottom: 28, transform: 'translateX(-50%)', display: 'flex', gap: 26 }}>
          {PRODUCTS.map((p) => (
            <Link key={p.id} href={`/shop/stones/${p.id}`} style={{ textDecoration: 'none' }}>
            <div className="card" style={{
              position: 'relative', borderRadius: 22, width: 292, height: 418,
              background: 'linear-gradient(180deg, rgba(132,98,190,0.40) 0%, rgba(82,50,138,0.36) 45%, rgba(54,28,102,0.50) 100%)',
              border: '1px solid rgba(230,194,122,0.6)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,.14), 0 18px 50px rgba(16,6,38,0.5), 0 0 30px rgba(168,120,224,0.25)',
              backdropFilter: 'blur(8px)', display: 'flex', flexDirection: 'column', alignItems: 'center',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease', cursor: 'default',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-8px)'; (e.currentTarget as HTMLElement).style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,.14), 0 22px 60px rgba(16,6,38,0.6), 0 0 44px rgba(213,166,255,0.4)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,.14), 0 18px 50px rgba(16,6,38,0.5), 0 0 30px rgba(168,120,224,0.25)' }}>
              {/* Badge */}
              <div style={{ position: 'absolute', top: 18, right: 18, width: 38, height: 38, borderRadius: '50%', border: '1px solid rgba(248,244,234,0.5)', background: 'rgba(40,20,76,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F8F4EA', opacity: 0.92 }}>
                {p.badge}
              </div>
              {/* Crystal image */}
              <div style={{ width: '100%', height: 198, marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '50%', bottom: 22, transform: 'translateX(-50%)', width: 180, height: 74, borderRadius: '50%', background: `radial-gradient(50% 50% at 50% 50%, ${p.auraColor}, transparent 70%)`, filter: 'blur(8px)', zIndex: 0 }}/>
                <div style={{ maxWidth: '92%', maxHeight: 208, filter: 'drop-shadow(0 12px 20px rgba(10,4,30,0.55))', position: 'relative', zIndex: 1 }}>
                  {p.crystal}
                </div>
              </div>
              {/* Name */}
              <h3 style={{ fontFamily: 'var(--serif, "Cormorant Garamond"), serif', fontWeight: 600, fontSize: 25, letterSpacing: '.03em', textTransform: 'uppercase', color: '#F8F4EA', margin: '4px 0 0', textShadow: '0 2px 14px rgba(0,0,0,.4)' }}>{p.name}</h3>
              {/* Qualities */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 9, fontFamily: 'var(--sans, "Jost"), sans-serif', fontWeight: 300, fontSize: 13, color: '#D5A6FF' }}>
                {p.qualities.map((q, i) => (
                  <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {q}{i < p.qualities.length - 1 && <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#E6C27A', display: 'inline-block' }}/>}
                  </span>
                ))}
              </div>
              {/* Price */}
              <div style={{ fontFamily: 'var(--serif, "Cormorant Garamond"), serif', fontWeight: 600, fontSize: 30, color: '#F8F4EA', marginTop: 13, textShadow: '0 2px 14px rgba(0,0,0,.4)' }}>{p.price}</div>
              {/* Add button */}
              <div style={{
                width: 52, height: 52, borderRadius: '50%', marginTop: 14,
                background: 'rgba(60,32,116,0.35)', border: '1px solid rgba(230,194,122,0.8)',
                boxShadow: '0 4px 16px rgba(16,6,38,0.4), 0 0 18px rgba(230,194,122,0.3)',
                color: '#f4dca6', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.08)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(16,6,38,0.5), 0 0 28px rgba(230,194,122,0.5)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(16,6,38,0.4), 0 0 18px rgba(230,194,122,0.3)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width={24} height={24}><path d="M12 5v14M5 12h14"/></svg>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
