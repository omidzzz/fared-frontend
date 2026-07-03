import type { Metadata } from 'next'
import { Playfair_Display, Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import PageWrapper from '@/components/layout/PageWrapper'
import QueryProvider from '@/components/providers/QueryProvider'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from '@/lib/cart-context'
import { WishlistProvider } from '@/lib/wishlist-context'
import { AuthProvider } from '@/lib/auth-context'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'فارد — انرژی کیهان در دستان توست',
  description: 'فروشگاه معنوی فارد — کریستال، شمع، تور، دوره و منتورشیپ برای سفر معنوی شما',
  keywords: 'کریستال، شمع، چاکرا، انرژی درمانی، تور معنوی، دوره آنلاین',
  authors: [{ name: 'فارد' }],
  openGraph: {
    title: 'فارد',
    description: 'انرژی کیهان در دستان توست',
    locale: 'fa_IR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${playfair.variable} ${cormorantGaramond.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-[#0A0A1A] text-[#F0EBE3] font-farsi antialiased" suppressHydrationWarning>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
            <QueryProvider>
            <PageWrapper>
              {children}
            </PageWrapper>
            <Toaster position="top-center" />
          </QueryProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}