import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import CinematicHero from '@/components/CinematicHero'

// Dynamic imports for heavy GSAP / below-the-fold components
const PinnedStorytelling = dynamic(() => import('@/components/PinnedStorytelling'))
const AppleShieldMorph = dynamic(() => import('@/components/AppleShieldMorph'))
const InsuranceCards = dynamic(() => import('@/components/InsuranceCards'))
const HorizontalScroll = dynamic(() => import('@/components/HorizontalScroll'))
const StatisticsCounter = dynamic(() => import('@/components/StatisticsCounter'))
const ImageReveal = dynamic(() => import('@/components/ImageReveal'))
const TestimonialStack = dynamic(() => import('@/components/TestimonialStack'))
const Founder = dynamic(() => import('@/components/Founder'))
const FAQ = dynamic(() => import('@/components/FAQ'))
const PremiumCalculator = dynamic(() => import('@/components/PremiumCalculator'))
const QuoteForm = dynamic(() => import('@/components/QuoteForm'))
const Footer = dynamic(() => import('@/components/Footer'))

export default function Home() {
  return (
    <main>
      <Navbar />
      <CinematicHero />
      <PinnedStorytelling />
      <AppleShieldMorph />
      <InsuranceCards />
      <HorizontalScroll />
      <StatisticsCounter />
      <ImageReveal />
      <TestimonialStack />
      <Founder />
      <FAQ />
      <PremiumCalculator />
      <QuoteForm />
      <Footer />
    </main>
  )
}
