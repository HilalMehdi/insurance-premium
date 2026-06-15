'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Zoom background and fade out text on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1, // Smooth scrubbing
        pin: true,
      }
    })

    tl.to(bgRef.current, {
      scale: 1.2,
      opacity: 0.6,
      ease: 'none'
    }, 0)
    
    tl.to(textRef.current, {
      y: -150,
      opacity: 0,
      scale: 0.9,
      ease: 'none'
    }, 0)

  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-navy flex items-center justify-center">
      {/* Background Image */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
      >
        <img 
          src="https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=2000&q=80"
          alt="BimaKavach Hero"
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/60 backdrop-blur-[2px]"></div>
      </div>

      {/* Hero Content */}
      <div ref={textRef} className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20">
        <span className="inline-block px-4 py-1.5 rounded-full border border-teal/30 bg-teal/10 text-teal text-sm font-semibold tracking-wider uppercase mb-6 shadow-[0_0_15px_rgba(20,184,166,0.3)]">
          Redefining Protection
        </span>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-6">
          Protect What <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-blue-400">Matters Most</span>
        </h1>
        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Experience a new standard of luxury insurance advisory. Tailored plans, absolute security, and peace of mind for you and your family.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 opacity-70">
        <span className="text-xs text-white uppercase tracking-widest font-semibold">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </section>
  )
}
