'use client'

import Link from 'next/link'

export default function CreatePostCTA() {
  return (
    <section
      style={{
        textAlign: 'center',
        padding: '48px 24px 56px',
        background: 'radial-gradient(ellipse at center, rgba(254,203,125,0.06) 0%, transparent 60%)',
        borderTop: '1px solid rgba(254,203,125,0.08)',
        borderBottom: '1px solid rgba(254,203,125,0.08)',
      }}
    >
      {/* Decorative glyph */}
      <div style={{ color: 'var(--gold-accent)', fontSize: '1.2rem', marginBottom: '20px', opacity: 0.7 }}>
        ✦
      </div>

      <h2
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
          fontWeight: 600,
          color: 'var(--text-primary)',
          margin: '0 0 12px',
          letterSpacing: '0.02em',
        }}
      >
        Share Your Wisdom
      </h2>

      <p
        style={{
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
          maxWidth: '420px',
          margin: '0 auto 28px',
        }}
      >
        Your story may be the guidance someone else needs today.
      </p>

      <Link href="/forum/new" style={{ textDecoration: 'none' }}>
        <button
          style={{
            background: 'var(--gold-accent)',
            color: 'var(--cosmic-dark)',
            borderRadius: '14px',
            padding: '14px 36px',
            fontWeight: 600,
            fontSize: '0.95rem',
            fontFamily: "'Inter', sans-serif",
            letterSpacing: '0.04em',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 0 30px rgba(254,203,125,0.30), 0 4px 20px rgba(254,203,125,0.15)',
            transition: 'all 0.3s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 0 40px rgba(254,203,125,0.45), 0 6px 28px rgba(254,203,125,0.25)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 0 30px rgba(254,203,125,0.30), 0 4px 20px rgba(254,203,125,0.15)'
          }}
        >
          <span style={{ fontSize: '1.1rem' }}>✨</span>
          Create New Post
        </button>
      </Link>
    </section>
  )
}
