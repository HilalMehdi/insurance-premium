'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Star } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Business Owner",
    text: "BimaKavach transformed how I view corporate risk. Mr. Zaidi's 30 years of experience shone through when he identified gaps in my previous factory insurance that could have cost me everything.",
    color: "bg-white"
  },
  {
    name: "Dr. Priya Sharma",
    role: "Surgeon",
    text: "As a medical professional, I thought I understood health coverage. The comprehensive family floater plan recommended here was not only cheaper but offered 2x the coverage.",
    color: "bg-slate-50"
  },
  {
    name: "Amit Patel",
    role: "IT Director",
    text: "Zero-depreciation motor insurance claim settled in 24 hours. The digital process is flawless, and having a dedicated human advisor makes all the difference in emergencies.",
    color: "bg-teal-50"
  }
]

export default function TestimonialStack() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useGSAP(() => {
    let mm = gsap.matchMedia()

    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 20%',
          end: '+=200%', // 200vh
          scrub: true,
          pin: true,
        }
      })

      // The first card is already visible. We animate the subsequent ones.
      testimonials.forEach((_, i) => {
        if (i === 0) return

        // Slide the new card up from below
        tl.fromTo(cardsRef.current[i], 
          { y: '100%', scale: 0.9, opacity: 0, boxShadow: '0 -20px 40px rgba(0,0,0,0.1)' },
          { y: '0%', scale: 1, opacity: 1, duration: 1, ease: 'power2.inOut' }
        )
        
        // Slightly shrink and push back the previous card
        if (i > 0) {
          tl.to(cardsRef.current[i - 1], {
            scale: 0.95,
            y: -20,
            filter: 'brightness(0.9)',
            duration: 1,
            ease: 'power2.inOut'
          }, "<")
        }
      })
    })

    // Mobile fade-in fallback
    mm.add("(max-width: 767px)", () => {
      cardsRef.current.forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
          y: 30,
          opacity: 0,
          duration: 0.6
        })
      })
    })

  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="py-24 bg-white overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 md:px-6 relative md:h-[500px]">
        
        <div className="text-center mb-12 relative z-10">
          <h2 className="text-[clamp(2rem,6vw,3rem)] font-serif font-bold text-navy leading-tight">
            Client <span className="text-teal">Stories</span>
          </h2>
        </div>

        <div className="relative w-full flex flex-col md:block gap-6 md:h-[350px]">
          {testimonials.map((t, i) => (
            <div 
              key={i}
              ref={el => { if(el) cardsRef.current[i] = el }}
              className={`relative md:absolute md:inset-0 w-full rounded-3xl border border-slate-100 p-8 md:p-12 shadow-2xl flex flex-col justify-center will-change-transform ${t.color}`}
              style={{ zIndex: i }}
            >
              <div className="flex gap-1 mb-6">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-5 h-5 text-amber-400 fill-amber-400" />)}
              </div>
              <p className="text-[clamp(1rem,4vw,1.25rem)] text-navy leading-relaxed font-serif italic mb-8">
                "{t.text}"
              </p>
              <div>
                <h4 className="font-bold text-navy">{t.name}</h4>
                <p className="text-sm text-slate-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  )
}

