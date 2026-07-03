'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function SpiritualQuote() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            stroke="#FECB7D"
            strokeWidth="0.8"
            opacity="0.5"
          >
            <circle cx="24" cy="24" r="22" />
            <circle cx="24" cy="24" r="12" />
            <circle cx="24" cy="24" r="4" fill="#FECB7D" opacity="0.3" />
          </svg>
        </motion.div>

        <motion.blockquote
          className="font-display text-2xl sm:text-3xl md:text-4xl text-[#F0EBE3] leading-relaxed mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          "The universe is not outside of you.
          <br />
          Look inside yourself; everything that you want,
          <br />
          <span className="text-[#FECB7D]">you already are.</span>"
        </motion.blockquote>

        <motion.p
          className="text-sm tracking-[0.2em] uppercase text-[#B8AEAD]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          — Rumi
        </motion.p>
      </div>

      {/* Decorative glow behind quote */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(142,68,173,0.12) 0%, transparent 60%)',
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </section>
  )
}
