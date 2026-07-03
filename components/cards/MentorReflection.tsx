'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function MentorReflection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div
        style={{
          padding: '28px 24px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(254,203,125,0.07) 0%, rgba(254,203,125,0.015) 100%)',
          border: '1px solid rgba(254,203,125,0.16)',
          textAlign: 'center',
        }}
      >
        {/* Avatar circle */}
        <div
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'rgba(254,203,125,0.10)',
            border: '2px solid var(--gold-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 14px',
            fontSize: '1.4rem',
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 600,
            color: 'var(--gold-accent)',
          }}
        >
          F
        </div>

        {/* Labels */}
        <div
          style={{
            fontSize: '0.68rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--gold-accent)',
            marginBottom: '4px',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          From Fard
        </div>
        <div
          style={{
            fontSize: '0.65rem',
            color: 'var(--text-muted)',
            marginBottom: '18px',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Founder & Mentor
        </div>

        {/* Ornamental divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '18px',
          }}
        >
          <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to right, transparent, rgba(254,203,125,0.4))' }} />
          <span style={{ color: 'var(--gold-accent)', fontSize: '0.5rem' }}>✦</span>
          <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to left, transparent, rgba(254,203,125,0.4))' }} />
        </div>

        {/* Quote */}
        <blockquote
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: 'italic',
            fontSize: '1.05rem',
            lineHeight: 1.7,
            color: '#D4AF37',
            maxWidth: '380px',
            margin: '0 auto 20px',
            padding: 0,
            border: 'none',
          }}
        >
          &ldquo;Your crystals do not change your life. They help you remember your own light.&rdquo;
        </blockquote>

        {/* CTA */}
        <Link href="/shop/mentorship" style={{ textDecoration: 'none' }}>
          <span
            style={{
              fontSize: '0.78rem',
              color: 'var(--gold-accent)',
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '0.06em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'opacity 0.2s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.7' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
          >
            Read Reflection
            <span style={{ fontSize: '0.9rem' }}>→</span>
          </span>
        </Link>
      </div>
    </motion.div>
  )
}
