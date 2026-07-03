'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/lib/cart-context'

const ARCH_PATH =
  'M273.785 67.2924V65.7286C273.785 50.6882 256.492 38.4976 235.156 38.4976H234.443V33.3594C234.443 4.64918 194.969 28.6377 173.452 18.6269C161.023 12.8426 152.497 0 152.497 0C152.497 0 143.977 12.8426 131.542 18.6269C110.025 28.6377 70.5566 4.64314 70.5566 33.3594V38.4976H69.8436C48.508 38.4976 31.2148 50.6882 31.2148 65.7286V67.2924C13.6436 69.2426 0 83.486 0 100.779V475.221C0 492.514 13.6436 506.757 31.2148 508.708V510.271C31.2148 525.312 48.508 537.502 69.8436 537.502H70.5566V542.641C70.5566 571.351 110.031 547.356 131.542 557.373C143.971 563.157 152.497 576 152.497 576C152.497 576 161.017 563.157 173.452 557.373C194.969 547.362 234.443 571.357 234.443 542.641V537.502H235.156C256.492 537.502 273.785 525.312 273.785 510.271V508.708C291.356 506.757 305 492.514 305 475.221V100.779C305 83.486 291.356 69.2426 273.785 67.2924Z'

interface SoulCardProps {
  id: string
  name: string
  price: number
  image: string
  colors: string[]
  images?: string[]
  onAddToCart?: () => void
}

export default function SoulCard({
  id,
  name,
  price,
  image,
  colors,
  images,
  onAddToCart,
}: SoulCardProps) {
  const { addItem } = useCart()
  const [selectedColor, setSelectedColor] = useState(0)
  const [added, setAdded] = useState(false)

  const clipId = `soul-clip-${id}`

  const imageSrc =
    images && images.length > 0 && images[0]
      ? images[0]
      : image
        ? `/images/products/clothes/${image}`
        : null

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      productId: id,
      productType: 'clothes',
      name,
      nameFA: name,
      price,
      currency: 'USD',
      quantity: 1,
      image: imageSrc ?? '',
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
    onAddToCart?.()
  }

  return (
    <Link href={`/product/${id}`} className="block select-none">
      <div
        className="relative w-full group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
        style={{
          aspectRatio: '305 / 576',
          width: '100%',
          isolation: 'isolate',
          WebkitTransform: 'translateZ(0)',
          transform: 'translateZ(0)',
        }}
      >
        {/* Hidden SVG: defines the clipPath for this card */}
        <svg
          width="0"
          height="0"
          style={{
            position: 'absolute',
            width: 0,
            height: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        >
          <defs>
            <clipPath id={clipId} clipPathUnits="objectBoundingBox">
              <path
                transform="scale(0.0032787, 0.0017361)"
                d={ARCH_PATH}
              />
            </clipPath>
          </defs>
        </svg>

        {/*
          CLIPPED CONTENT — everything inside is masked
          to the exact arch shape.
        */}
        <div
          className="absolute inset-0 z-10"
          style={{
            clipPath: `url(#${clipId})`,
            WebkitClipPath: `url(#${clipId})`,
            transform: 'translateZ(0)',
            WebkitTransform: 'translateZ(0)',
          }}
        >
          {/* Card background */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(55,18,80,0.92) 0%, rgba(20,10,50,0.98) 55%, rgba(13,8,35,1) 100%)',
            }}
          />

          {/* Top 50%: product image */}
          <div className="absolute top-0 left-0 right-0" style={{ height: '50%', overflow: 'hidden' }}>
            {/* Placeholder gradient shown when no image or on error */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background:
                  'linear-gradient(180deg, rgba(192,57,43,0.18) 0%, rgba(88,42,107,0.12) 100%)',
              }}
            >
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" opacity="0.20">
                <circle cx="24" cy="18" r="8" stroke="#FECB7D" strokeWidth="1.5" />
                <path d="M8 42 C8 32 40 32 40 42" stroke="#FECB7D" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>

            {imageSrc && (
              <Image
                src={imageSrc}
                alt={name}
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 640px) 50vw, 25vw"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.opacity = '0'
                }}
              />
            )}

            {/* Bottom fade on image */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to bottom, transparent 40%, rgba(13,8,35,0.75) 100%)',
              }}
            />

          </div>

          {/* Divider — Vector-1, stroke only, transparent fill */}
          <div
            className="absolute left-0 right-0 pointer-events-none z-10"
            style={{ top: '44%', height: '14%' }}
          >
            <svg
              viewBox="0 0 306 102"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
              style={{ display: 'block', width: '100%', height: '100%' }}
            >
              <defs>
                <linearGradient id={`vdiv-${id}`} x1="0" y1="0" x2="306" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"   stopColor="#FECB7D" stopOpacity="0" />
                  <stop offset="20%"  stopColor="#FECB7D" stopOpacity="0.85" />
                  <stop offset="50%"  stopColor="#FECB7D" stopOpacity="1" />
                  <stop offset="80%"  stopColor="#FECB7D" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#FECB7D" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M305.5 0.00025177C305.5 17.2928 291.856 31.5362 274.285 33.4864L274.285 35.0502C274.285 50.0906 256.992 62.2812 235.656 62.2812L234.943 62.2812L234.943 67.4194C234.943 96.1357 195.475 72.141 173.958 82.1519C161.523 87.9362 153.003 100.779 153.003 100.779C153.003 100.779 144.477 87.9362 132.048 82.1519C110.531 72.141 71.0566 96.1296 71.0566 67.4194L71.0566 62.2811L70.3436 62.2811C49.008 62.2811 31.7148 50.0906 31.7148 35.0502L31.7148 33.4864C14.1436 31.5362 0.500007 17.2928 0.500009 0.000225106"
                fill="none"
                stroke={`url(#vdiv-${id})`}
                strokeWidth="1.2"
              />
            </svg>
          </div>

          {/* Bottom details zone — starts after divider */}
          <div
            className="absolute left-0 right-0 bottom-0 flex flex-col items-center justify-end px-2 pb-3 gap-1.5 z-20"
            style={{ top: '58%' }}
          >
            {/* Gold diamond ornament */}
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="mb-0.5">
              <path d="M4 0L8 4L4 8L0 4Z" fill="#FECB7D" opacity="0.75"/>
            </svg>

            {/* Product name — bigger */}
            <h3
              className="font-display text-center text-[--text-primary] uppercase tracking-wider leading-tight"
              style={{ fontSize: '0.72rem' }}
            >
              {name}
            </h3>

            {/* Price — bigger */}
            <p
              className="font-display"
              style={{
                color: 'var(--gold-accent)',
                fontSize: '0.88rem',
              }}
            >
              ${price.toFixed(2)}
            </p>

            {/* Color swatches */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {colors.map((color, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setSelectedColor(i)
                  }}
                  aria-label={`Color ${i + 1}`}
                  style={{
                    width: selectedColor === i ? 14 : 11,
                    height: selectedColor === i ? 14 : 11,
                    borderRadius: '50%',
                    background: color,
                    border:
                      selectedColor === i
                        ? '2px solid #FECB7D'
                        : '1.5px solid rgba(255,255,255,0.25)',
                    transition: 'all 0.2s ease',
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>

            {/* Add to cart button */}
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-1.5 font-body uppercase tracking-widest transition-all duration-300 active:scale-95 flex-shrink-0"
              style={{
                padding: '8px 12px',
                borderRadius: 10,
                background: added
                  ? 'rgba(39,174,96,0.20)'
                  : 'rgba(192,57,43,0.18)',
                border: `1px solid rgba(254,203,125,${added ? '0.65' : '0.38'})`,
                color: 'var(--text-primary)',
                fontSize: '0.60rem',
                letterSpacing: '0.12em',
              }}
            >
              {added ? (
                <span style={{ color: '#4ade80' }}>✦ Added</span>
              ) : (
                <>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                       stroke="#FECB7D" strokeWidth="2" strokeLinecap="round">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                  ADD TO CART
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                       stroke="#FECB7D" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>

        {/*
          SVG BORDER OVERLAY — drawn ABOVE the clipped content.
          fill="none" so only the gold stroke shows. Sits outside
          the clipPath so the stroke is fully visible at all edges.
        */}
        <svg
          viewBox="0 0 305 576"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full pointer-events-none z-30"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id={`stroke-grad-${id}`}
              x1="0" y1="0" x2="0" y2="576"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#FECB7D" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#FECB7D" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#FECB7D" stopOpacity="0.95" />
            </linearGradient>
          </defs>
          <path
            d={ARCH_PATH}
            fill="none"
            stroke={`url(#stroke-grad-${id})`}
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </Link>
  )
}
