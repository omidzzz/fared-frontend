'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import DynamicHeader from '@/components/layout/DynamicHeader'
import ProductDetailView from '@/components/ui/ProductDetailView'
import { useProduct } from '@/hooks/useProducts'

export default function ClothesDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: product, isLoading, error } = useProduct(id)

  if (isLoading) {
    return (
      <main style={{ minHeight: '100vh', background: '#0a0514', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#fff' }}>Loading...</div>
      </main>
    )
  }

  if (error || !product) {
    return (
      <main style={{ minHeight: '100vh', background: '#0a0514', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", color: '#fff', marginBottom: '16px' }}>Product Not Found</h1>
          <Link href="/shop/clothes" style={{ color: '#d4af64' }}>← Back to Clothes</Link>
        </div>
      </main>
    )
  }

  const productData = {
    id: product.id,
    name: product.name,
    category: 'Clothing',
    categoryHref: '/shop/clothes',
    description: product.description || `${product.name} — crafted with care for your spiritual journey.`,
    price: product.price,
    originalPrice: Math.round(product.price * 1.3),
    discountPercent: 23,
    inStock: true,
    images: [product.image],
    sizes: [
      { label: 'S', value: 's' },
      { label: 'M', value: 'm' },
      { label: 'L', value: 'l' },
    ],
    specs: [
      { icon: '👗', label: 'Type', value: 'Clothing' },
      { icon: '✨', label: 'Collection', value: 'Spiritual' },
      { icon: '⭐', label: 'Quality', value: 'Premium' },
    ],
    overview: `${product.name}. Designed for comfort and spiritual alignment. ${product.descriptionFA || product.description || 'Each piece is crafted with intention for your sacred journey.'}`,
    benefits: ['Comfortable fit', 'Spiritual design', 'Premium materials', 'Versatile styling'],
    usage: 'Perfect for meditation, yoga, spiritual ceremonies, or everyday wear.',
    reviews: [],
    relatedProducts: [],
  }

  return (
    <main style={{ minHeight: '100vh' }}>
      <DynamicHeader />
      <ProductDetailView product={productData} />
    </main>
  )
}