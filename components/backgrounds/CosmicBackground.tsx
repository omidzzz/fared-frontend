'use client'

import { motion } from 'framer-motion'
import CategoryBackground from './CategoryBackground'

const CHAKRA_COLORS_GLOW = [
  'rgba(192,57,43,0.25)',
  'rgba(230,126,34,0.25)',
  'rgba(241,196,15,0.25)',
  'rgba(39,174,96,0.25)',
  'rgba(41,128,185,0.25)',
  'rgba(142,68,173,0.25)',
  'rgba(155,89,182,0.25)',
  'rgba(192,57,43,0.25)',
]

function MandalaSVG() {
  const R = 80
  const r = R / 2

  const hexPoints = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i
    return { x: Math.cos(angle) * r, y: Math.sin(angle) * r }
  })

  const up = `M 0 -${R * 0.55} L ${R * 0.48} ${R * 0.27} L -${R * 0.48} ${R * 0.27} Z`
  const down = `M 0 ${R * 0.55} L ${R * 0.48} -${R * 0.27} L -${R * 0.48} -${R * 0.27} Z`

  return (
    <svg
      viewBox={`${-R - 10} ${-R - 10} ${(R + 10) * 2} ${(R + 10) * 2}`}
      width={600}
      height={600}
      fill="none"
      stroke="white"
      strokeWidth="0.6"
    >
      {/* Outer ring */}
      <circle cx={0} cy={0} r={R} />
      {/* Six petals — Flower of Life */}
      {hexPoints.map((pt, i) => (
        <circle key={i} cx={pt.x} cy={pt.y} r={r} />
      ))}
      {/* Center circle */}
      <circle cx={0} cy={0} r={r} />
      {/* Star of David triangles */}
      <path d={up} />
      <path d={down} />
      {/* Inner hexagon ring */}
      <circle cx={0} cy={0} r={R * 0.3} />
      <circle cx={0} cy={0} r={R * 0.12} />
    </svg>
  )
}

interface CosmicBackgroundProps {
  children: React.ReactNode
  className?: string
}

export default function CosmicBackground({ children, className }: CosmicBackgroundProps) {
  return (
    <CategoryBackground category="home" className={className}>
      {/* Color-cycling radial glow — center of hero */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-[6] flex items-center justify-center"
        aria-hidden="true"
      >
        <motion.div
          className="w-[700px] h-[700px] rounded-full"
          animate={{
            boxShadow: CHAKRA_COLORS_GLOW.map(
              (c) => `0 0 220px 110px ${c}`,
            ),
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      {/* Mandala SVG — slowly spinning, very low opacity */}
      <div
        className="fixed inset-0 pointer-events-none z-[7] flex items-center justify-center"
        aria-hidden="true"
      >
        <motion.div
          style={{ opacity: 0.08 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        >
          <MandalaSVG />
        </motion.div>
      </div>

      {/* Page content sits above all overlays via CategoryBackground's z-10 wrapper */}
      {children}
    </CategoryBackground>
  )
}
