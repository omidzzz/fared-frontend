'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import DynamicHeader from '@/components/layout/DynamicHeader'
import ProductDetailView from '@/components/ui/ProductDetailView'
import { MOCK_STONES } from '@/lib/mock-data'
import type { Stone } from '@/lib/mock-data'

export default function StoneDetailPage() {
  const { id } = useParams<{ id: string }>()
  const stone = MOCK_STONES.find((s: Stone) => s.slug === id || s.id === id)

  if (!stone) {
    return (
      <main style={{ minHeight: '100vh', background: '#0a0514', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", color: '#fff', marginBottom: '16px' }}>Stone Not Found</h1>
          <Link href="/shop/stones" style={{ color: '#d4af64' }}>← Back to Stones</Link>
        </div>
      </main>
    )
  }

  const productData = {
    id: stone.id,
    name: stone.name,
    category: 'Crystals',
    categoryHref: '/shop/stones',
    description: `Natural ${stone.name} from ${stone.origin}. ${stone.properties?.join(', ')}. Associated with the ${stone.chakra} chakra.`,
    price: stone.price,
    originalPrice: Math.round(stone.price * 1.2),
    discountPercent: 17,
    inStock: true,
    images: [stone.image],
    sizes: [
      { label: 'Small (6cm)', value: 'small' },
      { label: 'Medium (8cm)', value: 'medium' },
      { label: 'Large (10cm)', value: 'large' },
    ],
    specs: [
      { icon: '💎', label: 'Material', value: 'Natural Crystal' },
      { icon: '📍', label: 'Origin', value: stone.origin },
      { icon: '💠', label: 'Hardness', value: stone.hardness },
      { icon: '🌀', label: 'Chakra', value: stone.chakra },
      { icon: '✨', label: 'Properties', value: stone.properties?.join(', ') || '—' },
      { icon: '⭐', label: 'Quality', value: 'AAA Grade' },
    ],
    overview: `A powerful ${stone.name} crystal sourced from ${stone.origin}. This natural stone has been carefully selected for its clarity and energetic properties.`,
    benefits: stone.healingBenefitsFA || stone.properties || [],
    usage: stone.howToCleanseFA || 'Place near your bed, desk, or meditation space. Cleanse regularly under moonlight.',
    reviews: [
      {
        id: 'r1',
        author: 'Sarah M.',
        role: 'USER' as const,
        rating: 5,
        date: 'May 12, 2025',
        text: 'Absolutely beautiful crystal. The energy is palpable and the quality exceeded my expectations.',
        adminReply: {
          author: 'Lumina Team',
          role: 'ADMIN' as const,
          date: 'May 13, 2025',
          text: 'Thank you Sarah! We hand-select each crystal for maximum clarity and energy.',
        },
      },
      {
        id: 'r2',
        author: 'James K.',
        role: 'USER' as const,
        rating: 4,
        date: 'Apr 28, 2025',
        text: 'Great quality stone. The color is slightly lighter than the photo but still beautiful.',
      },
    ],
    relatedProducts: MOCK_STONES.filter(s => s.id !== stone.id).slice(0, 4).map(s => ({
      id: s.id,
      name: s.name,
      price: s.price,
      image: s.image,
    })),
  }

  return (
    <main style={{ minHeight: '100vh' }}>
      <DynamicHeader />
      <ProductDetailView product={productData} />
    </main>
  )
}
