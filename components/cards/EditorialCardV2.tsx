'use client'

import Image from 'next/image'
import Link from 'next/link'

interface EditorialCardV2Props {
  href: string
  image: string
  title: string
  description: string
  ctaLabel: string
}

export default function EditorialCardV2({ href, image, title, description, ctaLabel }: EditorialCardV2Props) {
  return (
    <Link href={href} style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{ position: 'relative', width: '100%' }}>
        {/* Card content */}
        <div style={{
          position: 'relative',
          borderRadius: '24px',
          overflow: 'hidden',
          background: 'rgba(20,10,50,0.5)',
          backdropFilter: 'blur(12px)',
        }}>
          <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
            <Image src={image} alt={title} fill style={{ objectFit: 'cover' }} unoptimized />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(10,5,30,0.8) 0%, transparent 40%)',
            }} />
          </div>
          <div style={{ padding: '20px 24px 24px' }}>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.1rem', fontWeight: 600, color: '#fff', marginBottom: '8px' }}>
              {title}
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: '16px' }}>
              {description}
            </p>
            <span style={{ fontSize: '0.78rem', color: '#d4af64', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              {ctaLabel} →
            </span>
          </div>
        </div>
        {/* SVG frame overlay */}
        <img
          src="/images/ui/tahrirye-card-v2.svg"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            pointerEvents: 'none', zIndex: 2,
          }}
        />
      </div>
    </Link>
  )
}
