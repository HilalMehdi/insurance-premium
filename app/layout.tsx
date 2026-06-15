import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'InsureShield — Protect What Matters Most',
  description: 'Comprehensive insurance solutions for your family, health, vehicle, home, travel, and business. Compare plans from 15+ top insurers.',
  keywords: 'insurance, health insurance, life insurance, car insurance, home insurance, travel insurance, compare insurance India',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
