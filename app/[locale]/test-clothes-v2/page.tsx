'use client'

import ClothesCardV2 from '@/components/cards/ClothesCardV2'
import { MOCK_CLOTHES } from '@/lib/mock-data'

export default function TestClothesV2Page() {
  return (
    <main style={{ minHeight: '100vh', background: '#140926', color: '#fff', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 40px 80px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '2rem', marginBottom: '8px' }}>
          Clothes Card V2 Test
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '40px' }}>
          Testing new clothes-card-v2.svg frame overlay with solid-filled arch/shield shape
        </p>

        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {MOCK_CLOTHES.slice(0, 3).map((cloth: any) => (
            <ClothesCardV2
              key={cloth.id}
              id={cloth.id}
              name={cloth.name}
              price={cloth.price}
              image={cloth.image}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
