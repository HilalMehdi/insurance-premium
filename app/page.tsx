import Navbar from '@/components/Navbar'
import CinematicHero from '@/components/CinematicHero'
import PinnedStorytelling from '@/components/PinnedStorytelling'
import AppleShieldMorph from '@/components/AppleShieldMorph'
import InsuranceCards from '@/components/InsuranceCards'
import HorizontalScroll from '@/components/HorizontalScroll'
import StatisticsCounter from '@/components/StatisticsCounter'
import ImageReveal from '@/components/ImageReveal'
import TestimonialStack from '@/components/TestimonialStack'
import Founder from '@/components/Founder'
import FAQ from '@/components/FAQ'
import PremiumCalculator from '@/components/PremiumCalculator'
import QuoteForm from '@/components/QuoteForm'
import Footer from '@/components/Footer'

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
