'use client'

import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import CategoryBackground from '@/components/backgrounds/CategoryBackground'
import Button from '@/components/ui/Button'
import ArticleHero from '@/components/editorial/ArticleHero'
import ArticleBody from '@/components/editorial/ArticleBody'
import CommentSection from '@/components/editorial/CommentSection'

export default function EditorialSlugPage() {
  const params = useParams()
  const slug = params.slug as string

  return (
    <CategoryBackground category="courses">
      <div className="min-h-screen pt-20 pb-20">
        <ArticleHero
          title="The Seven Chakras: A Beginner's Guide"
          author="Sara Light"
          date="May 10, 2025"
          category="Free Learning"
          image="/images/backgrounds/courses-bg.webp"
        />

        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ArticleBody>
              <p>
                The chakra system is an ancient map of the body&apos;s energy centers, originating from
                the Vedic traditions of India over 3,000 years ago. The word &quot;chakra&quot; translates to
                &quot;wheel&quot; or &quot;disk&quot; in Sanskrit, referring to spinning vortexes of energy that run
                along the spine.
              </p>
              <h2>The Seven Major Chakras</h2>
              <p>
                Each chakra corresponds to specific physical, emotional, and spiritual functions.
                When these energy centers are balanced and aligned, we experience health, vitality,
                and a deep sense of connection. When blocked or overactive, we may encounter
                physical illness or emotional turbulence.
              </p>
              <h3>Root Chakra (Muladhara)</h3>
              <p>
                Located at the base of the spine, the root chakra governs our sense of safety,
                security, and belonging. Its color is red, and it connects us to the earth and
                our physical existence. Practices like walking barefoot, working with red stones,
                and grounding meditations help balance this center.
              </p>
              <h3>Sacral Chakra (Svadhisthana)</h3>
              <p>
                Below the navel lies the sacral chakra, the center of creativity, pleasure, and
                emotional flow. Orange in color, it governs our relationships, artistic expression,
                and capacity for joy. Movement practices, creative arts, and working with carnelian
                or orange calcite support this chakra.
              </p>
              <h2>Beginning Your Practice</h2>
              <p>
                Start by simply bringing awareness to each chakra during meditation. Visualize
                its color, feel its location in the body, and notice any sensations or emotions
                that arise. With consistent practice, you&apos;ll develop a deeper relationship with
                your energy system and learn to recognize when a particular center needs attention.
              </p>
            </ArticleBody>

            <div className="flex items-center justify-between py-8 border-t border-white/10 mt-8">
              <Link href="/editorial">
                <Button variant="ghost" size="sm">All Articles</Button>
              </Link>
              <Button variant="secondary" size="sm" onClick={() => console.log('Share')}>
                Share
              </Button>
            </div>

            <CommentSection
              comments={[
                {
                  id: '1',
                  author: 'Nia Sol',
                  body: 'Beautiful breakdown of the chakras. The root chakra section really resonated with me.',
                  date: 'May 12, 2025',
                },
                {
                  id: '2',
                  author: 'Darius Ray',
                  body: 'I\'ve been practicing chakra meditation for years and this is one of the clearest explanations I\'ve read.',
                  date: 'May 13, 2025',
                },
              ]}
            />
          </motion.div>
        </div>
      </div>
    </CategoryBackground>
  )
}
