import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Elite Business Hub - Where Success Meets Luxury | Discover Top-Tier Enterprises',
  description: 'Explore the world of high-end enterprises and exclusive business ventures. Our platform showcases top-tier, affluent businesses, offering a glimpse into the lap of luxury and success. Join us in the realm of wealth and opulence.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
