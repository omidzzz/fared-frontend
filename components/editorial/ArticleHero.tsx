'use client'

import { motion } from 'framer-motion'

interface ArticleHeroProps {
  title: string
  author: string
  date: string
  category: string
  image: string
}

export default function ArticleHero({ title, author, date, category, image }: ArticleHeroProps) {
  return (
    <div className="relative mb-10" style={{ minHeight: '420px' }}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(10,10,26,0.95) 0%, rgba(10,10,26,0.6) 50%, rgba(10,10,26,0.3) 100%)',
        }}
      />
      <motion.div
        className="relative z-10 flex flex-col justify-end px-4 pb-12"
        style={{ minHeight: '420px' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-3xl mx-auto w-full">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#FECB7D]/60 mb-3 block">
            {category}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#F0EBE3] mb-4 leading-tight">
            {title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-[#B8AEAD]">
            <span>{author}</span>
            <span className="text-white/20">·</span>
            <span>{date}</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
