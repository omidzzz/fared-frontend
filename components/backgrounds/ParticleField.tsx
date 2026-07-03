'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface ParticleData {
  id: number
  x: number
  size: number
  duration: number
  delay: number
  opacity: number
  isDiamond: boolean
  startY: number
}

interface ParticleFieldProps {
  color: string
  count?: number
  className?: string
}

export default function ParticleField({ color, count = 40, className }: ParticleFieldProps) {
  const [particles, setParticles] = useState<ParticleData[]>([])

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 9 + 6,
        delay: Math.random() * 8,
        opacity: Math.random() * 0.5 + 0.2,
        isDiamond: Math.random() > 0.7,
        startY: Math.random() * 100,
      })),
    )
  }, [count])

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[5] overflow-hidden ${className ?? ''}`}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            bottom: `-${p.size}px`,
            width: p.size,
            height: p.size,
            backgroundColor: color,
            borderRadius: p.isDiamond ? '0' : '50%',
            rotate: p.isDiamond ? 45 : 0,
          }}
          initial={{ y: `${p.startY}vh`, opacity: 0 }}
          animate={{
            y: '-110vh',
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
            opacity: {
              times: [0, 0.1, 0.9, 1],
              duration: p.duration,
              repeat: Infinity,
            },
          }}
        />
      ))}
    </div>
  )
}
