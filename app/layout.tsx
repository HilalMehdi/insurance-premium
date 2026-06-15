import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import Chatbot from '@/components/Chatbot'
import SmoothScroll from '@/components/SmoothScroll'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'BimaKavach — Protect What Matters Most',
  description: 'Expert insurance advisory by Anwar Hussain Zaidi, retired officer from New India Assurance. 30+ years of experience. Serving Dehradun and beyond.',
  keywords: 'BimaKavach, insurance Dehradun, Anwar Hussain Zaidi, health insurance, life insurance, car insurance, New India Assurance',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-slate-50 text-navy antialiased`}>
        <SmoothScroll>
          {children}
          <Chatbot />
        </SmoothScroll>
      </body>
    </html>
  )
}
