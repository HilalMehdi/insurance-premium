import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import CinematicHero from '@/components/CinematicHero'
import SmoothScroll from '@/components/SmoothScroll'
import CustomCursor from '@/components/CustomCursor'
import WebGLBackground from '@/components/WebGLBackground'

// Dynamic imports for heavy GSAP / below-the-fold components
const PinnedStorytelling = dynamic(() => import('@/components/PinnedStorytelling'))
const AppleShieldMorph = dynamic(() => import('@/components/AppleShieldMorph'))
const InsuranceCards = dynamic(() => import('@/components/InsuranceCards'))
const HorizontalScroll = dynamic(() => import('@/components/HorizontalScroll'))
const HomeInsurance = dynamic(() => import('@/components/HomeInsurance'))
const TravelInsurance = dynamic(() => import('@/components/TravelInsurance'))
const BusinessInsurance = dynamic(() => import('@/components/BusinessInsurance'))
const Comparison = dynamic(() => import('@/components/Comparison'))
const ClaimProcess = dynamic(() => import('@/components/ClaimProcess'))
const StatisticsCounter = dynamic(() => import('@/components/StatisticsCounter'))
const ImageReveal = dynamic(() => import('@/components/ImageReveal'))
const TestimonialStack = dynamic(() => import('@/components/TestimonialStack'))
const Founder = dynamic(() => import('@/components/Founder'))
const WhyChooseUs = dynamic(() => import('@/components/WhyChooseUs'))
const FAQ = dynamic(() => import('@/components/FAQ'))
const PremiumCalculator = dynamic(() => import('@/components/PremiumCalculator'))
const QuoteForm = dynamic(() => import('@/components/QuoteForm'))
const Footer = dynamic(() => import('@/components/Footer'))

export default function ActiveTheoryHome() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <WebGLBackground />
      <main>
        <Navbar />
        <CinematicHero />
        <PinnedStorytelling />
        <AppleShieldMorph />
        <InsuranceCards />
        <HomeInsurance />
        <TravelInsurance />
        <BusinessInsurance />
        <Comparison />
        <ClaimProcess />
        <HorizontalScroll />
        <StatisticsCounter />
        <ImageReveal />
        <TestimonialStack />
        <Founder />
        <WhyChooseUs />
        <FAQ />
        <PremiumCalculator />
        <QuoteForm />
        <Footer />
      </main>
    </SmoothScroll>
  )
}
