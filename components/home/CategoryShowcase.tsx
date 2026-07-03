'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import ChakraIcon from '@/components/ui/ChakraIcon'
import { CATEGORY_CONFIG } from '@/types/category'

const categories = Object.values(CATEGORY_CONFIG)

export default function CategoryShowcase() {
  return (
    <section className="py-20 px-4">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-xs tracking-[0.3em] uppercase text-[#FECB7D]/60 mb-3">
          Explore by Energy
        </p>
        <h2 className="font-display text-3xl sm:text-4xl text-[#F0EBE3]">
          Shop by Chakra
        </h2>
      </motion.div>

      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.handle}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <Link href={`/shop/${cat.handle}`} className="group block">
              <motion.div
                className="flex flex-col items-center gap-3 p-5 rounded-2xl transition-colors duration-200"
                style={{ background: 'rgba(255,255,255,0.02)' }}
                whileHover={{
                  background: 'rgba(255,255,255,0.05)',
                  borderColor: `${cat.color}40`,
                }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `rgba(${cat.colorRgb},0.12)`,
                    boxShadow: `0 0 24px rgba(${cat.colorRgb},0.15)`,
                  }}
                >
                  <div className="transition-transform duration-300 group-hover:scale-110">
                    <ChakraIcon chakra={cat.chakra} size="md" animated />
                  </div>
                </div>
                <div className="text-center">
                  <p className="font-display text-sm text-[#F0EBE3] group-hover:text-[#FECB7D] transition-colors duration-200">
                    {cat.label}
                  </p>
                  <p className="text-[10px] text-[#B8AEAD]" dir="rtl">
                    {cat.labelFa}
                  </p>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
