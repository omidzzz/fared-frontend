'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import type { Stone } from '@/lib/mock-data'

interface CrystalCardV2Props {
  stone: Stone
}

export default function CrystalCardV2({ stone }: CrystalCardV2Props) {
  const { addItem } = useCart()

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      productId: stone.id,
      productType: 'stone',
      name: stone.name,
      nameFA: stone.nameFA,
      price: stone.price,
      currency: 'USD' as const,
      quantity: 1,
      image: stone.image,
    })
  }

  return (
    <Link href={`/shop/stones/${stone.id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div
        style={{
          position: 'relative',
          borderRadius: '16px',
          border: '1px solid rgba(212, 175, 100, 0.45)',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          background: '#1a0a3d',
          aspectRatio: '3/4',
          display: 'flex',
          flexDirection: 'column',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(212,175,100,0.25)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        {/* Image */}
        <div style={{ position: 'relative', flex: '1 1 60%', overflow: 'hidden' }}>
          <Image
            src={stone.image}
            alt={stone.name}
            fill
            sizes="(min-width: 1024px) 20vw, 50vw"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
            background: 'linear-gradient(to top, #1a0a3d 0%, transparent 100%)',
          }} />
        </div>

        {/* Info */}
        <div style={{
          padding: '4px 16px 0',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: '4px', background: '#1a0a3d', textAlign: 'center',
        }}>
          <h3 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: '0.9rem', fontWeight: 600, color: '#ffffff',
            letterSpacing: '0.05em', textTransform: 'uppercase', margin: 0,
          }}>
            {stone.name}
          </h3>
          <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)', margin: 0 }}>
            · {stone.properties?.join(' · ')} ·
          </p>
          <p style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: '1rem', fontWeight: 600, color: '#d4af64',
            margin: '4px 0 0',
          }}>
            ${stone.price.toFixed(2)}
          </p>
          <div style={{ width: 'calc(100% - 32px)', margin: '8px 0 0', borderTop: '1px solid rgba(212,175,100,0.25)' }} />
        </div>

        {/* [+] button */}
        <div style={{ position: 'relative', height: 0 }}>
          <button
            onClick={handleAdd}
            style={{
              position: 'absolute', bottom: '-16px', left: '50%', transform: 'translateX(-50%)',
              width: '32px', height: '32px', borderRadius: '50%',
              border: '1px solid rgba(212, 175, 100, 0.6)',
              background: 'rgba(10, 5, 30, 0.8)',
              backdropFilter: 'blur(4px)',
              color: 'rgba(212, 175, 100, 0.9)',
              fontSize: '18px', lineHeight: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', zIndex: 10,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(212,175,100,0.2)'
              e.currentTarget.style.borderColor = 'rgba(212,175,100,1)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(10,5,30,0.8)'
              e.currentTarget.style.borderColor = 'rgba(212,175,100,0.6)'
            }}
            aria-label={`Add ${stone.name} to cart`}
          >
            +
          </button>
        </div>

        {/* SVG frame overlay — gold outline */}
        <img
          src="/images/ui/stones-card-v2.svg"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'fill',
            pointerEvents: 'none', zIndex: 5,
            opacity: 0.8,
          }}
        />
      </div>
    </Link>
  )
}
