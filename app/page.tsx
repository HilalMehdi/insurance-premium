import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import InsuranceCards from '@/components/InsuranceCards'
import WhyChooseUs from '@/components/WhyChooseUs'
import Comparison from '@/components/Comparison'
import ClaimProcess from '@/components/ClaimProcess'
import Testimonials from '@/components/Testimonials'
import Partners from '@/components/Partners'
import Founder from '@/components/Founder'
import FAQ from '@/components/FAQ'
import QuoteForm from '@/components/QuoteForm'
import Footer from '@/components/Footer'
import StickyQuote from '@/components/StickyQuote'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <InsuranceCards />
      <WhyChooseUs />
      <Comparison />
      <ClaimProcess />
      <Testimonials />
      <Partners />
      <Founder />
      <FAQ />
      <QuoteForm />
      <Footer />
      <StickyQuote />
    </main>
  )
}
