'use client'

import DynamicHeaderV2 from '@/components/layout/DynamicHeaderV2'

export default function TestHeaderV2Page() {
  return (
    <main style={{ minHeight: '100vh', background: '#0a0514', color: '#fff', fontFamily: "'Inter', sans-serif" }}>
      <DynamicHeaderV2 />
      <div style={{ padding: '120px 40px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', marginBottom: '16px' }}>
          Header V2 Test
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '480px', margin: '0 auto' }}>
          This page uses DynamicHeaderV2 with the new SVG header shape from header-shape-v2.svg.
          Compare with the main site to evaluate the solid filled wave vs frosted glass + gold line.
        </p>
      </div>
    </main>
  )
}
