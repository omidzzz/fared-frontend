'use client'

import { motion } from 'framer-motion'

interface EditorialCardProps {
  title: string
  category: string
  author: string
  image: string
  date: string
}

const categoryLabels: Record<string, { label: string; color: string }> = {
  'free-learning': { label: 'Free Learning', color: '#27AE60' },
  books: { label: 'Books', color: '#8E44AD' },
  poems: { label: 'Poems', color: '#F1C40F' },
  content: { label: 'Content', color: '#E67E22' },
}

export default function EditorialCard({
  title,
  category,
  author,
  image,
  date,
}: EditorialCardProps) {
  const cat = categoryLabels[category] ?? categoryLabels.content

  return (
    <motion.div
      className="relative group cursor-pointer"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="relative rounded-2xl overflow-hidden transition-all duration-400"
        style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.08)',
          minHeight: '360px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(254,203,125,0.4)'
          e.currentTarget.style.boxShadow =
            '0 0 24px rgba(142,68,173,0.15), 0 4px 24px rgba(0,0,0,0.3)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        <div className="relative w-full aspect-[16/10] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(10,10,26,0.85) 0%, transparent 55%)',
            }}
          />
          <div className="absolute top-3 left-3 z-10">
            <span
              className="text-[10px] tracking-wider uppercase rounded-full px-2.5 py-0.5 border"
              style={{
                color: cat.color,
                borderColor: `${cat.color}60`,
                background: `${cat.color}15`,
              }}
            >
              {cat.label}
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-display text-base text-[#F0EBE3] group-hover:text-[#FECB7D] transition-colors duration-200 leading-snug mb-3">
            {title}
          </h3>
          <div className="flex items-center justify-between text-xs text-[#B8AEAD]">
            <span>{author}</span>
            <span>{date}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
