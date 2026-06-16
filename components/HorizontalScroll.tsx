'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { CheckCircle2, Clock, HeadphonesIcon, TrendingUp, ShieldCheck } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const cards = [
  { icon: ShieldCheck, title: "Maximum Coverage", desc: "Our policies offer up to 2x more coverage than standard industry plans." },
  { icon: Clock, title: "Fast Claims", desc: "98% of our claims are settled within 24 hours of submission." },
  { icon: HeadphonesIcon, title: "24/7 Support", desc: "Our dedicated advisory team is available round the clock for emergencies." },
  { icon: TrendingUp, title: "Premium Savings", desc: "Save up to 30% on premiums through our multi-policy discount packages." },
  { icon: CheckCircle2, title: "Zero Hassle", desc: "100% digital paperwork and frictionless onboarding process." }
]

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    let mm = gsap.matchMedia()

    mm.add("(min-width: 768px)", () => {
      // Calculate how far to scroll based on wrapper width vs viewport width
      const scrollWidth = wrapperRef.current ? wrapperRef.current.scrollWidth - window.innerWidth : 0

      gsap.to(wrapperRef.current, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${scrollWidth}`, // scroll distance equals the width of the cards
          scrub: 1.5,
          pin: true,
        }
      })
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="h-screen w-full bg-slate-50 flex flex-col justify-center overflow-hidden py-20">
      
      <div className="px-6 md:px-20 mb-12 flex-shrink-0">
        <h2 className="text-[clamp(2rem,6vw,3rem)] font-serif font-bold text-navy leading-tight">
          Why Choose <span className="text-teal">BimaKavach</span>
        </h2>
        <p className="text-slate-500 mt-4 max-w-xl text-lg">
          Experience the difference of a premium advisory service that puts your peace of mind above all else.
        </p>
      </div>

      {/* Horizontal Track */}
      <div 
        ref={wrapperRef}
        className="flex gap-6 px-6 md:px-20 w-max md:w-auto overflow-x-auto md:overflow-visible pb-10 hide-scrollbar will-change-transform"
      >
        {cards.map((card, i) => (
          <div 
            key={i} 
            className="w-[300px] md:w-[400px] h-[300px] flex-shrink-0 bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-100 flex flex-col justify-between group hover:border-teal/30 transition-colors"
          >
            <div className="w-14 h-14 bg-teal/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <card.icon className="w-7 h-7 text-teal" />
            </div>
            <div>
              <h3 className="text-[clamp(1.25rem,4vw,1.5rem)] font-bold text-navy mb-3">{card.title}</h3>
              <p className="text-[clamp(0.9rem,3vw,1rem)] text-slate-500 leading-relaxed">{card.desc}</p>
            </div>
          </div>
        ))}
        {/* Padding element for the end of the scroll */}
        <div className="w-[10vw] flex-shrink-0 hidden md:block"></div>
      </div>
      
    </section>
  )
}
