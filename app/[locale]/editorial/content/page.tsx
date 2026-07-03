'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import CategoryBackground from '@/components/backgrounds/CategoryBackground'
import EditorialCard from '@/components/cards/EditorialCard'

const ARTICLES = [
  { id: '2', title: 'Meditation Practices for the Crown', category: 'content' as const, author_name: 'Amir Noor', cover_image: '/images/backgrounds/mentorship-bg.webp', published_at: '2025-05-08' },
]

export default function ContentPage() {
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
            <h1 className="font-display text-4xl text-[#F0EBE3] mb-3">Content</h1>
            <p className="text-[#B8AEAD] max-w-lg mx-auto">
              Teachings, guides, and wisdom for your practice.
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
