'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import ChakraIcon from '@/components/ui/ChakraIcon'
import Button from '@/components/ui/Button'

const chakraKeys = ['root', 'sacral', 'solar', 'heart', 'throat', 'third', 'crown'] as const

function ChakraOrbit() {
  return (
    <div className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] flex items-center justify-center">
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        {chakraKeys.map((chakra, i) => {
          const angle = (i / chakraKeys.length) * 360 - 90
          const rad = (angle * Math.PI) / 180
          const r = 150
          const x = Math.cos(rad) * r
          const y = Math.sin(rad) * r
          return (
            <div
              key={chakra}
              className="absolute"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <ChakraIcon chakra={chakra} size="sm" animated />
              </motion.div>
            </div>
          )
        })}
      </motion.div>

      <motion.div
        className="w-28 h-28 sm:w-36 sm:h-36 rounded-full flex items-center justify-center"
        style={{
          background: 'radial-gradient(circle, rgba(254,203,125,0.25) 0%, rgba(201,168,76,0.10) 50%, transparent 70%)',
          boxShadow: '0 0 80px rgba(254,203,125,0.2)',
        }}
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(254,203,125,0.6) 0%, rgba(201,168,76,0.3) 40%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </div>
  )
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-12 px-4">
      <motion.div
        className="z-10 text-center max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.p
          className="text-xs sm:text-sm tracking-[0.35em] uppercase text-[#FECB7D]/70 mb-6 font-body"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Fared — Spiritual Commerce
        </motion.p>

        <motion.h1
          className="font-display text-4xl sm:text-5xl md:text-7xl leading-tight text-[#F0EBE3] mb-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          Awaken Your Energy.
          <br />
          <span className="text-[#FECB7D]">Elevate Your Soul.</span>
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg text-[#B8AEAD] max-w-xl mx-auto leading-relaxed mb-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          Sacred tools, transformative courses, and soulful experiences for those walking the spiritual path.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <Link href="/shop">
            <Button variant="gold" size="lg">
              Explore the Shop
            </Button>
          </Link>
          <Link href="/editorial">
            <Button variant="secondary" size="lg">
              Read the Journal
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-12 sm:mt-16"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <ChakraOrbit />
      </motion.div>

      <motion.div
        className="absolute bottom-8"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FECB7D"
          strokeWidth="1.5"
          opacity="0.5"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </motion.div>
    </section>
  )
}
