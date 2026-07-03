'use client'

import { motion } from 'framer-motion'
import ChakraIcon from '@/components/ui/ChakraIcon'
import type { ChakraKey } from '@/types/product'

interface CategoryHeroProps {
  title: string
  titleFa?: string
  description: string
  chakra: ChakraKey
  color: string
  colorRgb: string
}

export default function CategoryHero({
  title,
  titleFa,
  description,
  chakra,
  color,
  colorRgb,
}: CategoryHeroProps) {
  return (
    <section className="relative pt-28 pb-12 px-4 flex flex-col items-center text-center">
      {/* Hero glow */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 30%, rgba(${colorRgb},0.3) 0%, transparent 70%)`,
        }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full"
          style={{
            background: `rgba(${colorRgb},0.15)`,
            boxShadow: `0 0 40px rgba(${colorRgb},0.25)`,
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChakraIcon chakra={chakra} size="lg" animated />
        </motion.div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#F0EBE3] mb-3">
          {title}
        </h1>
        {titleFa && (
          <p className="font-display text-xl text-[#FECB7D]/60 mb-4" dir="rtl">
            {titleFa}
          </p>
        )}
        <p className="text-[#B8AEAD] max-w-lg mx-auto leading-relaxed">
          {description}
        </p>
      </motion.div>
    </section>
  )
}
