'use client'

import { motion } from 'framer-motion'

interface ForumCardProps {
  id: string
  title: string
  author: string
  excerpt: string
  tags: string[]
  image?: string
  isTransformation?: boolean
  likes?: number
  comment_count: number
  created_at: string
}

export default function ForumCard({
  id: _id,
  title,
  author,
  excerpt,
  tags,
  image,
  isTransformation,
  likes,
  comment_count,
  created_at,
}: ForumCardProps) {
  return (
    <motion.div
      className="relative group cursor-pointer"
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="relative rounded-xl overflow-hidden transition-all duration-200"
        style={{
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
          e.currentTarget.style.borderColor = 'rgba(254,203,125,0.3)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
        }}
      >
        {/* Optional image section */}
        {image && (
          <div
            className="relative w-full overflow-hidden"
            style={{
              aspectRatio: isTransformation ? '16/9' : '16/10',
            }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            />
            {/* Bottom gradient overlay for text legibility */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(10,10,26,0.55) 0%, transparent 50%)',
              }}
            />
            {isTransformation && (
              <span
                className="absolute top-3 left-3 text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full"
                style={{
                  background: 'rgba(254,203,125,0.12)',
                  color: 'var(--gold-accent)',
                  border: '1px solid rgba(254,203,125,0.25)',
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '0.1em',
                }}
              >
                Transformation Story
              </span>
            )}
          </div>
        )}

        {/* Card body */}
        <div style={{ padding: image ? '16px 20px 20px' : '20px' }}>
          {/* Title */}
          <h3
            className="font-display text-sm mb-2 transition-colors duration-200"
            style={{
              color: 'var(--text-primary)',
              lineHeight: 1.4,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = 'var(--gold-accent)'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'
            }}
          >
            {title}
          </h3>

          {/* Excerpt */}
          <p
            style={{
              fontSize: '0.82rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
              marginBottom: '12px',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {excerpt}
          </p>

          {/* Tags */}
          <div className="flex items-center gap-1.5 flex-wrap mb-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded-full"
                style={{
                  border: '1px solid rgba(255,255,255,0.10)',
                  color: 'var(--text-secondary)',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Meta row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {/* Likes */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span>{likes ?? 0}</span>
            </div>

            {/* Comments */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
              <span>{comment_count}</span>
            </div>

            <span style={{ color: 'rgba(255,255,255,0.12)' }}>·</span>
            <span>{author}</span>
            <span style={{ color: 'rgba(255,255,255,0.12)' }}>·</span>
            <span>{created_at}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
