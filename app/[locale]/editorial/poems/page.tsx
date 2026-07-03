'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import CategoryBackground from '@/components/backgrounds/CategoryBackground'
import EditorialCard from '@/components/cards/EditorialCard'

const ARTICLES = [
  { id: '3', title: 'The Poetry of Hafez: Spiritual Insights', category: 'poems' as const, author_name: 'Layla Fared', cover_image: '/images/backgrounds/home-bg.webp', published_at: '2025-04-28' },
  { id: '6', title: 'Rumi: The Path of Love', category: 'poems' as const, author_name: 'Layla Fared', cover_image: '/images/backgrounds/accessories-bg.webp', published_at: '2025-04-10' },
]

export default function PoemsPage() {
  return (
    <CategoryBackground category="courses">
      <div className="min-h-screen pt-28 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl text-[#F0EBE3] mb-3">Poems</h1>
            <p className="text-[#B8AEAD] max-w-lg mx-auto">
              Sacred poetry from the mystics that illuminates the soul.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {ARTICLES.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Link href={`/editorial/${article.id}`}>
                  <EditorialCard {...article} title={article.title} category={article.category} author={article.author_name} image={article.cover_image} date={article.published_at} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </CategoryBackground>
  )
}
