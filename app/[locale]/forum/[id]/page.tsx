'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

/* ── Post data ── */

interface Reply {
  id: string
  author: string
  date: string
  text: string
}

interface Comment {
  id: string
  author: string
  date: string
  text: string
  replies: Reply[]
}

interface PostDetail {
  id: number
  author: string
  category: string
  date: string
  title: string
  fullContent: string
  comments: Comment[]
}

const postDetails: Record<string, PostDetail> = {
  '1': {
    id: 1,
    author: 'Aurora Moon',
    category: 'Personal Journey',
    date: 'May 18, 2025',
    title: 'How Amethyst Helped Me Sleep Again',
    fullContent: `After months of restless nights and overthinking, I began sleeping with amethyst under my pillow. Within a week, I felt calmer, lighter, and finally at peace.

The amethyst I chose was a raw cluster — deep purple with natural formations. I placed it on my nightstand at first, but then moved it under my pillow after reading about direct contact amplifying the crystal's energy.

The first night, I noticed my mind quieted faster than usual. By the third night, I was falling asleep within 20 minutes — something that hadn't happened in over a year. By the end of the week, I was sleeping through the night.

I believe the amethyst helped me release the anxious thoughts that were keeping me awake. It became a ritual — placing it under my pillow each night felt like a signal to my mind that it was time to let go.

If you're struggling with sleep, I truly recommend trying amethyst. Start with just holding it before bed, breathing deeply, and setting an intention for peaceful rest.`,
    comments: [
      {
        id: 'c1',
        author: 'Luna Hart',
        date: 'May 18, 2025',
        text: 'This is so beautiful! I had a similar experience with lepidolite. The purple stones really do carry such calming energy.',
        replies: [
          {
            id: 'c1r1',
            author: 'Aurora Moon',
            date: 'May 19, 2025',
            text: 'Yes! I\'ve heard wonderful things about lepidolite too. Maybe I\'ll try that next.',
          },
        ],
      },
      {
        id: 'c2',
        author: 'Solene Light',
        date: 'May 19, 2025',
        text: 'Thank you for sharing this. I\'ve been struggling with sleep for months. Just ordered an amethyst cluster — hoping it works for me too!',
        replies: [],
      },
    ],
  },
  '2': {
    id: 2,
    author: 'Luna Hart',
    category: 'Moon Rituals',
    date: 'May 17, 2025',
    title: 'Full Moon Release Ritual That Transformed Me',
    fullContent: `This full moon was incredibly powerful. I wrote down everything I was ready to release and burned it under the moonlight.

I've been doing moon rituals for two years now, but this one felt different. I prepared by cleansing my space with selenite, lighting a white candle, and sitting quietly for ten minutes before beginning.

Then I wrote — everything I wanted to release: old patterns, fears, a relationship that had ended, self-doubt. I wrote until my hand ached. When I was done, I read each thing aloud, acknowledged it, and said "I release you with love."

Then I burned the paper in a small ceramic bowl, watching the smoke carry my intentions upward.

The clarity I felt afterward was immediate and profound. Something genuinely shifted.`,
    comments: [
      {
        id: 'c3',
        author: 'Isabella Rose',
        date: 'May 17, 2025',
        text: 'This moved me deeply. I\'ve been afraid to try burning rituals but your description makes me feel safe about it.',
        replies: [],
      },
    ],
  },
  '3': {
    id: 3,
    author: 'Solene Light',
    category: 'Energy Work',
    date: 'May 16, 2025',
    title: 'Clearing My Energy with Selenite',
    fullContent: `I've been working with selenite daily to cleanse my energy field and protect my aura. The shift has been incredible.

Every morning, I hold my selenite wand and slowly move it around my body, about 2-3 inches from my skin. I visualize it drawing out stagnant or heavy energy, replacing it with white light.

What I've noticed: I feel lighter throughout the day. Interactions that used to drain me no longer affect me as strongly. My focus has improved. And I sleep better.

Selenite doesn't need cleansing itself — it self-clears — which makes it perfect for daily use. I also place pieces in the corners of my bedroom and workspace.

If you're new to crystals, selenite is where I'd tell everyone to start.`,
    comments: [],
  },
  '4': {
    id: 4,
    author: 'Isabella Rose',
    category: 'Crystal Healing',
    date: 'May 15, 2025',
    title: 'Labradorite: My Shield in Difficult Times',
    fullContent: `During one of the hardest seasons of my life, labradorite became my safe space. It protected my energy and helped me trust the process.

I discovered labradorite during a particularly difficult period — a job loss, a move, and a health scare all within three months. I was overwhelmed and energetically depleted.

A friend gave me a labradorite palm stone and told me to carry it everywhere. I was skeptical, but desperate.

Within days, I noticed I felt less reactive to difficult situations. I handled conversations I'd been dreading with more grace. The iridescent flash of the stone — called labradorescence — became a reminder that beauty exists even in dark times.

I still carry it. I always will.`,
    comments: [],
  },
  '5': {
    id: 5,
    author: 'Maya Willow',
    category: 'Meditation',
    date: 'May 14, 2025',
    title: 'Morning Meditation with Clear Quartz',
    fullContent: `Starting my day with clear quartz and 10 minutes of stillness has completely changed my mindset.

I used to reach for my phone the moment I woke up. Now I reach for my clear quartz point.

I hold it in both hands, close my eyes, and breathe. Just ten minutes. I set an intention for the day — sometimes it's a word (clarity, presence, courage), sometimes it's a feeling I want to cultivate.

Clear quartz amplifies intention. It's called the master healer for a reason — it works with whatever energy you bring to it.

Since starting this practice three months ago: I'm more patient. I handle stress better. I make better decisions. I feel more connected to myself.

Ten minutes. That's all it takes.`,
    comments: [],
  },
}

/* ── Page ── */

export default function PostDetailPage() {
  const { id } = useParams()
  const post = postDetails[id as string]
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [commentText, setCommentText] = useState('')
  const [replyText, setReplyText] = useState('')
  const [localComments, setLocalComments] = useState<Comment[]>(post?.comments || [])

  if (!post) {
    return (
      <div style={{ color: '#fff', padding: '100px 40px', textAlign: 'center' }}>
        <p style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Post not found.</p>
        <Link href="/forum" style={{ color: '#d4af64' }}>← Back to Community</Link>
      </div>
    )
  }

  const handleAddComment = () => {
    if (!commentText.trim()) return
    setLocalComments(prev => [...prev, {
      id: `c${Date.now()}`,
      author: 'You',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      text: commentText.trim(),
      replies: [],
    }])
    setCommentText('')
  }

  const handleAddReply = (commentId: string) => {
    if (!replyText.trim()) return
    setLocalComments(prev => prev.map(c =>
      c.id === commentId
        ? { ...c, replies: [...c.replies, {
            id: `r${Date.now()}`,
            author: 'You',
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            text: replyText.trim(),
          }]}
        : c
    ))
    setReplyText('')
    setReplyingTo(null)
  }

  return (
    <>
      {/* Fixed background */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        backgroundImage: 'url(/images/hero-backgrounds/mentorship-bg.webp)',
        backgroundSize: 'cover', backgroundPosition: 'center',
      }} />

      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', padding: '100px 0 80px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 40px' }}>

          {/* Back link */}
          <Link href="/forum" style={{
            color: 'rgba(212,175,100,0.7)', fontSize: '0.82rem',
            textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px',
            marginBottom: '32px',
          }}>
            ← Back to Community
          </Link>

          {/* Post header */}
          <div style={{
            background: 'rgba(15,8,40,0.7)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(212,175,100,0.15)',
            borderRadius: '20px',
            padding: '40px',
            marginBottom: '24px',
          }}>
            {/* Author row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%',
                border: '2px solid rgba(212,175,100,0.4)',
                background: 'rgba(212,175,100,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.1rem', color: '#d4af64', fontWeight: 600,
              }}>
                {post.author[0]}
              </div>
              <div>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>{post.author}</p>
                <p style={{ fontSize: '0.72rem', color: '#d4af64' }}>{post.category} · {post.date}</p>
              </div>
            </div>

            {/* Title */}
            <h1 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
              fontWeight: 600, color: '#ffffff',
              lineHeight: 1.3, marginBottom: '28px',
            }}>
              {post.title}
            </h1>

            {/* Full content */}
            <div style={{
              fontSize: '0.95rem', color: 'rgba(255,255,255,0.82)',
              lineHeight: 1.9,
            }}>
              {post.fullContent.split('\n\n').map((paragraph: string, i: number) => (
                <p key={i} style={{ marginBottom: '20px' }}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Comments section */}
          <div style={{
            background: 'rgba(15,8,40,0.65)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px',
            padding: '32px',
          }}>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '1.2rem', color: '#fff',
              marginBottom: '24px',
              paddingBottom: '16px',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}>
              💬 {localComments.length} Comments
            </h2>

            {/* Comment list */}
            {localComments.length === 0 && (
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginBottom: '24px' }}>
                Be the first to share your thoughts.
              </p>
            )}

            {localComments.map((comment: Comment) => (
              <div key={comment.id} style={{ marginBottom: '24px' }}>
                {/* Comment */}
                <div style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '14px',
                  padding: '18px 20px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '36px', height: '36px', borderRadius: '50%',
                        background: 'rgba(212,175,100,0.15)',
                        border: '1px solid rgba(212,175,100,0.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.85rem', color: '#d4af64', fontWeight: 600,
                      }}>
                        {comment.author[0]}
                      </div>
                      <div>
                        <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fff' }}>{comment.author}</p>
                        <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)' }}>{comment.date}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                      style={{
                        background: 'none', border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '100px', padding: '4px 14px',
                        color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem',
                        cursor: 'pointer', transition: 'all 0.2s ease',
                      }}
                    >
                      Reply
                    </button>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>
                    {comment.text}
                  </p>
                </div>

                {/* Replies */}
                {comment.replies?.map((reply: Reply) => (
                  <div key={reply.id} style={{
                    marginLeft: '32px', marginTop: '8px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderLeft: '2px solid rgba(212,175,100,0.3)',
                    borderRadius: '0 12px 12px 0',
                    padding: '14px 16px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <div style={{
                        width: '28px', height: '28px', borderRadius: '50%',
                        background: 'rgba(212,175,100,0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.72rem', color: '#d4af64',
                      }}>
                        {reply.author[0]}
                      </div>
                      <p style={{ fontSize: '0.78rem', fontWeight: 600, color: '#fff' }}>{reply.author}</p>
                      <p style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.35)' }}>{reply.date}</p>
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                      {reply.text}
                    </p>
                  </div>
                ))}

                {/* Reply input */}
                {replyingTo === comment.id && (
                  <div style={{ marginLeft: '32px', marginTop: '8px', display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder="Write a reply..."
                      value={replyText}
                      onChange={e => setReplyText(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleAddReply(comment.id)}
                      style={{
                        flex: 1, background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '10px', padding: '10px 14px',
                        color: '#fff', fontSize: '0.82rem', outline: 'none',
                      }}
                    />
                    <button
                      onClick={() => handleAddReply(comment.id)}
                      style={{
                        padding: '10px 18px', borderRadius: '10px',
                        background: 'rgba(212,175,100,0.2)',
                        border: '1px solid rgba(212,175,100,0.4)',
                        color: '#d4af64', fontSize: '0.78rem',
                        cursor: 'pointer',
                      }}
                    >
                      Send
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* Add comment input */}
            <div style={{
              borderTop: '1px solid rgba(255,255,255,0.08)',
              paddingTop: '24px', marginTop: '8px',
            }}>
              <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>
                Share your thoughts
              </p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAddComment()}
                  style={{
                    flex: 1, background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '12px', padding: '12px 16px',
                    color: '#fff', fontSize: '0.85rem', outline: 'none',
                  }}
                />
                <button
                  onClick={handleAddComment}
                  style={{
                    padding: '12px 24px', borderRadius: '12px',
                    background: 'linear-gradient(135deg, #c8a24a, #e8c96a 50%, #c8a24a)',
                    border: 'none', color: '#1a0d00',
                    fontSize: '0.82rem', fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
