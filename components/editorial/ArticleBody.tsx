interface ArticleBodyProps {
  children: React.ReactNode
}

export default function ArticleBody({ children }: ArticleBodyProps) {
  return (
    <article
      className="prose prose-invert max-w-none
        prose-headings:font-display prose-headings:text-[#F0EBE3]
        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-[#FECB7D]
        prose-p:text-[#B8AEAD] prose-p:leading-relaxed prose-p:mb-5
        prose-a:text-[#FECB7D] prose-a:no-underline hover:prose-a:underline
        prose-strong:text-[#F0EBE3]"
    >
      {children}
    </article>
  )
}
