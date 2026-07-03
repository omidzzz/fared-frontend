'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import SoulCard from '@/components/cards/SoulCard'
import CrystalCard from '@/components/cards/CrystalCard'
import Button from '@/components/ui/Button'


const FEATURED_CLOTHES = [
  {
    id: 'luna-meditation-robe',
    name: 'Luna Meditation Robe',
    price: 88.0,
    image: 'luna-meditation-robe.webp',
    colors: ['#9B59B6', '#2980B9', '#95A5A6', '#E91E8C'],
  },
  {
    id: 'sol-yoga-top',
    name: 'Sol Yoga Top',
    price: 64.0,
    image: 'sol-yoga-top.webp',
    colors: ['#F5F0E8', '#27AE60', '#95A5A6'],
  },
]

const FEATURED_CRYSTALS = [
  {
    id: 'amethyst-cluster',
    name: 'Amethyst Cluster',
    price: 48.0,
    image: '/images/backgrounds/stones-bg.webp',
    category: 'stones' as const,
  },
  {
    id: 'rose-quartz-palm',
    name: 'Rose Quartz Palm Stone',
    price: 32.0,
    image: '/images/backgrounds/stones-bg.webp',
    category: 'stones' as const,
  },
  {
    id: 'sacred-cedar-candle',
    name: 'Sacred Cedar Candle',
    price: 42.0,
    image: '/images/backgrounds/candles-bg.webp',
    category: 'candles' as const,
  },
  {
    id: 'chakra-bracelet',
    name: 'Seven Chakra Bracelet',
    price: 56.0,
    image: '/images/backgrounds/accessories-bg.webp',
    category: 'accessories' as const,
  },
]

export default function FeaturedProducts() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-20 px-4">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Soul Collection */}
        <div>
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-[#FECB7D]/60 mb-2">
              Wear the Energy
            </p>
            <h2 className="font-display text-3xl sm:text-4xl text-[#F0EBE3]">
              Soul Collection
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {FEATURED_CLOTHES.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <Link href={`/product/${item.id}`}>
                  <SoulCard
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                    colors={item.colors}
                    onAddToCart={() => {}}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Crystal Collection */}
        <div>
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-[#FECB7D]/60 mb-2">
              Sacred Tools
            </p>
            <h2 className="font-display text-3xl sm:text-4xl text-[#F0EBE3]">
              Crystal Collection
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {FEATURED_CRYSTALS.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link href={`/product/${item.id}`}>
                  <CrystalCard
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                    category={item.category}
                    onAddToCart={() => {}}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link href="/shop">
            <Button variant="gold" size="lg">
              View All Products
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
