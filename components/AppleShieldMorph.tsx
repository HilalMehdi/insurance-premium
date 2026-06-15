'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Shield, Heart, Car, Home, Building2 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const icons = [
  { icon: Shield, color: 'text-teal', label: "Total Protection" },
  { icon: Heart, color: 'text-rose-500', label: "Health Insurance" },
  { icon: Car, color: 'text-orange-500', label: "Motor Insurance" },
  { icon: Home, color: 'text-violet-500', label: "Home Insurance" },
  { icon: Building2, color: 'text-slate-400', label: "Business Insurance" }
]

export default function AppleShieldMorph() {
  const containerRef = useRef<HTMLDivElement>(null)
  const iconContainerRef = useRef<HTMLDivElement>(null)
  const iconsRef = useRef<HTMLDivElement[]>([])
  const labelsRef = useRef<HTMLHeadingElement[]>([])

  useGSAP(() => {
    let mm = gsap.matchMedia()

    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300%', // 300vh
          scrub: true,
          pin: true,
        }
      })

      // Initial state
      gsap.set(iconsRef.current.slice(1), { scale: 0, opacity: 0, rotation: -90 })
      gsap.set(labelsRef.current.slice(1), { opacity: 0, y: 30 })

      const step = 1 / (icons.length - 1)

      icons.forEach((_, i) => {
        if (i === 0) return
        
        const startTime = i * step - (step * 0.2)
        
        // Hide previous
        tl.to(iconsRef.current[i - 1], { scale: 0, opacity: 0, rotation: 90, duration: 0.15 }, startTime)
        tl.to(labelsRef.current[i - 1], { opacity: 0, y: -30, duration: 0.15 }, startTime)

        // Show current
        tl.to(iconsRef.current[i], { scale: 1, opacity: 1, rotation: 0, duration: 0.2 }, startTime)
        tl.to(labelsRef.current[i], { opacity: 1, y: 0, duration: 0.2 }, startTime)
      })
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-white flex items-center justify-center overflow-hidden">
      
      {/* Central Device/Frame */}
      <div className="relative w-72 h-72 md:w-[400px] md:h-[400px] rounded-full border border-slate-100 shadow-[0_0_80px_rgba(20,184,166,0.1)] flex items-center justify-center bg-slate-50/50">
        
        {/* Radar/Pulse rings */}
        <div className="absolute inset-0 rounded-full border border-teal/20 scale-[1.3] opacity-50"></div>
        <div className="absolute inset-0 rounded-full border border-teal/10 scale-[1.6] opacity-20"></div>

        {/* Dynamic Icons */}
        <div ref={iconContainerRef} className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
          {icons.map((Item, i) => (
            <div 
              key={i} 
              ref={el => { if(el) iconsRef.current[i] = el }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Item.icon className={`w-full h-full ${Item.color}`} strokeWidth={1.5} />
            </div>
          ))}
        </div>

      </div>

      {/* Dynamic Labels */}
      <div className="absolute bottom-20 w-full text-center">
        <div className="relative h-16 w-full max-w-md mx-auto">
          {icons.map((Item, i) => (
            <h3 
              key={i}
              ref={el => { if(el) labelsRef.current[i] = el }}
              className="absolute w-full text-2xl md:text-4xl font-serif font-bold text-navy"
            >
              {Item.label}
            </h3>
          ))}
        </div>
      </div>
    </section>
  )
}
