import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BimaKavach — Protect What Matters Most',
  description: 'Expert insurance advisory by Anwar Hussain Zaidi, retired officer from New India Assurance. 30+ years of experience. Serving Dehradun and beyond.',
  keywords: 'BimaKavach, insurance Dehradun, Anwar Hussain Zaidi, health insurance, life insurance, car insurance, New India Assurance',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
