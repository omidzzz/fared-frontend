'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import EditorialCard from '@/components/cards/EditorialCard'

const FEATURED_ARTICLES = [
  {
    id: '1',
    title: 'The Seven Chakras: A Beginner\'s Guide',
    category: 'free-learning' as const,
    author_name: 'Sara Light',
    cover_image: '/images/backgrounds/courses-bg.webp',
    published_at: '2025-05-10',
  },
  {
    id: '2',
    title: 'Meditation Practices for the Crown Chakra',
    category: 'content' as const,
    author_name: 'Amir Noor',
    cover_image: '/images/backgrounds/mentorship-bg.webp',
    published_at: '2025-05-08',
  },
  {
    id: '3',
    title: 'The Poetry of Hafez: Spiritual Insights',
    category: 'poems' as const,
    author_name: 'Layla Fared',
    cover_image: '/images/backgrounds/home-bg.webp',
    published_at: '2025-04-28',
  },
]

export default function FeaturedContent() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-[#FECB7D]/60 mb-3">
            Energy Guide
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-[#F0EBE3]">
            From the Journal
          </h2>
        </motion.div>

        {/* Editorial Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {FEATURED_ARTICLES.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link href={`/editorial/${article.id}`}>
                <EditorialCard
                  title={article.title}
                  category={article.category}
                  author={article.author_name}
                  image={article.cover_image}
                  date={article.published_at}
                />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mentorship CTA */}
        <motion.div
          className="relative rounded-2xl overflow-hidden p-8 sm:p-12 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(155,89,182,0.15) 0%, rgba(142,68,173,0.10) 50%, rgba(10,10,26,0.6) 100%)',
            border: '1px solid rgba(155,89,182,0.25)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(155,89,182,0.2) 0%, transparent 60%)',
            }}
          />
          <div className="relative z-10">
            <p className="text-xs tracking-[0.3em] uppercase text-[#FECB7D]/60 mb-3">
              One-on-One Guidance
            </p>
            <h3 className="font-display text-2xl sm:text-3xl text-[#F0EBE3] mb-4">
              Begin Your Mentorship Journey
            </h3>
            <p className="text-[#B8AEAD] max-w-lg mx-auto mb-6 leading-relaxed">
              Work directly with a spiritual guide to unlock your highest potential through personalized chakra healing, meditation, and energy work.
            </p>
            <Link href="/shop/mentorship">
              <Button variant="gold" size="lg">
                Explore Mentorship
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
