'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import CategoryBackground from '@/components/backgrounds/CategoryBackground'
import EditorialCard from '@/components/cards/EditorialCard'
import Button from '@/components/ui/Button'

const TABS = [
  { key: 'all', label: 'All', labelFa: 'همه' },
  { key: 'free-learning', label: 'Free Learning', labelFa: 'آموزش رایگان' },
  { key: 'books', label: 'Books', labelFa: 'کتاب‌ها' },
  { key: 'poems', label: 'Poems', labelFa: 'اشعار' },
  { key: 'content', label: 'Content', labelFa: 'محتوا' },
]

const ARTICLES = [
  { id: '1', title: 'The Seven Chakras: A Beginner\'s Guide', category: 'free-learning' as const, author_name: 'Sara Light', cover_image: '/images/backgrounds/courses-bg.webp', published_at: '2025-05-10' },
  { id: '2', title: 'Meditation Practices for the Crown', category: 'content' as const, author_name: 'Amir Noor', cover_image: '/images/backgrounds/mentorship-bg.webp', published_at: '2025-05-08' },
  { id: '3', title: 'The Poetry of Hafez: Spiritual Insights', category: 'poems' as const, author_name: 'Layla Fared', cover_image: '/images/backgrounds/home-bg.webp', published_at: '2025-04-28' },
  { id: '4', title: 'Essential Reads for the Spiritual Path', category: 'books' as const, author_name: 'Darius Ray', cover_image: '/images/backgrounds/courses-bg.webp', published_at: '2025-04-20' },
  { id: '5', title: 'Energy Healing Fundamentals', category: 'free-learning' as const, author_name: 'Nia Sol', cover_image: '/images/backgrounds/candles-bg.webp', published_at: '2025-04-15' },
  { id: '6', title: 'Rumi: The Path of Love', category: 'poems' as const, author_name: 'Layla Fared', cover_image: '/images/backgrounds/accessories-bg.webp', published_at: '2025-04-10' },
]

export default function EditorialPage() {
  const [activeTab, setActiveTab] = useState('all')
  const filtered = activeTab === 'all' ? ARTICLES : ARTICLES.filter((a) => a.category === activeTab)

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
            <h1 className="font-display text-4xl sm:text-5xl text-[#F0EBE3] mb-3">
              Energy Guide <span className="font-farsi text-2xl text-[#FECB7D]/60">تحریریه</span>
            </h1>
            <p className="text-[#B8AEAD] max-w-lg mx-auto">
              Articles, poetry, teachings, and wisdom for your spiritual journey.
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide mb-10 justify-center">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.key
                    ? 'bg-[#FECB7D] text-[#0A0A1A] font-medium'
                    : 'glass-light border-white/10 text-[#B8AEAD] hover:text-[#F0EBE3]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Featured Hero */}
          <motion.div
            className="relative rounded-2xl overflow-hidden mb-12"
            style={{ minHeight: '360px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(/images/backgrounds/courses-bg.webp)' }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(100deg, rgba(10,10,26,0.9) 0%, rgba(10,10,26,0.5) 60%, transparent 100%)',
              }}
            />
            <div className="relative z-10 p-8 sm:p-12 flex flex-col justify-end" style={{ minHeight: '360px' }}>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#27AE60] mb-3">Featured</span>
              <h2 className="font-display text-2xl sm:text-3xl text-[#F0EBE3] max-w-lg mb-4">
                The Seven Chakras: A Beginner&apos;s Guide to Energy Centers
              </h2>
              <p className="text-[#B8AEAD] text-sm max-w-md mb-4">
                Understand the seven energy centers that govern your physical, emotional, and spiritual wellbeing.
              </p>
              <Link href="/editorial/1">
                <Button variant="secondary" size="sm">Read Article</Button>
              </Link>
            </div>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
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
        </div>
      </div>
    </CategoryBackground>
  )
}
