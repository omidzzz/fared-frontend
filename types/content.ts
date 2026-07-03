export type EditorialCategory = 'free-learning' | 'books' | 'poems' | 'content'

export interface EditorialPost {
  id: string
  title_en: string
  title_fa: string
  slug: string
  body_en: string
  body_fa: string
  category: EditorialCategory
  author_name: string
  cover_image: string
  published_at: string
}

export interface ForumPost {
  id: string
  title: string
  body: string
  author_id: string
  author_name: string
  author_avatar?: string
  tags: string[]
  likes: number
  views: number
  comment_count: number
  is_pinned: boolean
  created_at: string
}

export interface ForumComment {
  id: string
  post_id: string
  parent_id: string | null
  author_name: string
  author_avatar?: string
  body: string
  likes: number
  created_at: string
}
