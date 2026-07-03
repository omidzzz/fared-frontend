'use client'

import { CATEGORY_CONFIG, HOME_CONFIG } from '@/types/category'
import ParticleField from './ParticleField'

type CategoryType =
  | 'home'
  | 'clothes'
  | 'stones'
  | 'tours'
  | 'candles'
  | 'courses'
  | 'mentorship'
  | 'accessories'

interface CategoryBackgroundProps {
  category: CategoryType
  children: React.ReactNode
  className?: string
}

export default function CategoryBackground({
  category,
  children,
  className,
}: CategoryBackgroundProps) {
  const isHome = category === 'home'
  const config = isHome ? null : CATEGORY_CONFIG[category]
  const bgImage = isHome ? HOME_CONFIG.bgImage : config!.bgImage
  const gradient = isHome ? HOME_CONFIG.gradient : config!.gradient
  const particleColor = isHome ? HOME_CONFIG.color : config!.color

  return (
    <div className={`relative min-h-screen ${className ?? ''}`}>
      {/* Layer 1: Background image — fixed, behind everything */}
      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-30"
        aria-hidden="true"
      />

      {/* Layer 2: Chakra color gradient overlay — fixed */}
      <div
        style={{ background: gradient }}
        className="fixed inset-0 -z-20"
        aria-hidden="true"
      />

      {/* Layer 3: Dark vignette top→transparent→bottom — fixed */}
      <div
        className="fixed inset-0 -z-10 bg-gradient-to-b from-black/40 via-transparent to-black/80"
        aria-hidden="true"
      />

      {/* Layer 4: Animated particle field */}
      <ParticleField color={particleColor} />

      {/* Layer 5: Page content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
