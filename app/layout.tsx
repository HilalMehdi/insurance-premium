import type { Metadata } from 'next'
import { Outfit, Inter } from 'next/font/google'
import Chatbot from '@/components/Chatbot'
import SmoothScroll from '@/components/SmoothScroll'
import './globals.css'

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-inter', display: 'swap' })
const outfit = Outfit({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-outfit', display: 'swap' })

export const metadata: Metadata = {
  title: 'BimaKavach - Premium Insurance Advisory & Coverage',
  description: 'Expert insurance advisory by Anwar Hussain Zaidi, retired officer from New India Assurance. 30+ years of experience in health, life, and motor insurance. Serving Dehradun and pan-India.',
  keywords: 'BimaKavach, insurance Dehradun, Anwar Hussain Zaidi, health insurance, life insurance, car insurance, New India Assurance, premium insurance advisory',
  authors: [{ name: 'Anwar Hussain Zaidi' }],
  openGraph: {
    title: 'BimaKavach - Premium Insurance Advisory',
    description: 'Secure your family\'s future with expert insurance guidance. 30+ years of trusted experience.',
    url: 'https://hilalmehdi.github.io/insurance-premium/',
    siteName: 'BimaKavach',
    images: [{ url: '/insurance-premium/images/ai/hero_family_1781532809939.png', width: 1200, height: 630 }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BimaKavach - Premium Insurance Advisory',
    description: 'Secure your family\'s future with expert insurance guidance. 30+ years of trusted experience.',
    images: ['/insurance-premium/images/ai/hero_family_1781532809939.png'],
  },
  alternates: {
    canonical: 'https://hilalmehdi.github.io/insurance-premium/',
  }
}

// JSON-LD Schema Markup for Local Business / Financial Service to boost Google Rankings
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  name: 'BimaKavach',
  image: 'https://hilalmehdi.github.io/insurance-premium/images/ai/hero_family_1781532809939.png',
  '@id': 'https://hilalmehdi.github.io/insurance-premium/',
  url: 'https://hilalmehdi.github.io/insurance-premium/',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dehradun',
    addressRegion: 'Uttarakhand',
    addressCountry: 'IN'
  },
  description: 'Expert insurance advisory by Anwar Hussain Zaidi. Offering health, life, and motor insurance with 30+ years of experience.',
  founder: {
    '@type': 'Person',
    name: 'Anwar Hussain Zaidi',
    jobTitle: 'Insurance Advisor',
    description: 'Retired officer from New India Assurance with 30+ years of experience.'
  },
  areaServed: 'IN',
  priceRange: '$$'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} font-sans bg-[#050505] text-white antialiased`}>
        {/* Inject JSON-LD Schema directly into the HTML body for SEO crawlers */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          {children}
          <Chatbot />
        </SmoothScroll>
      </body>
    </html>
  )
}
