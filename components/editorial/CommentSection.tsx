'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

interface Comment {
  id: string
  author: string
  body: string
  date: string
}

interface CommentSectionProps {
  comments: Comment[]
}

export default function CommentSection({ comments }: CommentSectionProps) {
  const [text, setText] = useState('')

  return (
    <div className="mt-12 pt-8 border-t border-white/10">
      <h3 className="font-display text-xl text-[#F0EBE3] mb-6">
        {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
      </h3>

      <div className="space-y-4 mb-8">
        {comments.map((comment, i) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
            className="rounded-xl p-5"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-[#F0EBE3] font-medium">{comment.author}</span>
              <span className="text-xs text-[#B8AEAD]">{comment.date}</span>
            </div>
            <p className="text-sm text-[#B8AEAD] leading-relaxed">{comment.body}</p>
          </motion.div>
        ))}
      </div>

      <div className="space-y-3">
        <h4 className="font-display text-lg text-[#F0EBE3]">Leave a Comment</h4>
        <Input
          placeholder="Share your thoughts..."
          value={text}
          onChange={setText}
        />
        <Button variant="secondary" onClick={() => setText('')}>
          Post Comment
        </Button>
      </div>
    </div>
  )
}
