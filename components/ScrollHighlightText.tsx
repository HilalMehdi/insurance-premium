'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollHighlightText() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Reveal text left-to-right smoothly on scroll using a clip-path mask
    gsap.to('.highlight-mask', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        end: 'bottom 50%',
        scrub: 1,
      }
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="py-40 px-6 bg-navy relative flex items-center justify-center min-h-[80vh] border-b border-white/5">
      <div className="max-w-6xl mx-auto relative text-center">
        {/* Faded Background Text */}
        <h2 className="text-[clamp(2rem,6vw,4.5rem)] font-serif font-bold text-white/10 leading-[1.2]">
          We believe protection is a fundamental right. Not a luxury. Experience seamless claims, zero hidden clauses, and absolute transparency.
        </h2>
        
        {/* Highlighted Foreground Text Mask */}
        <h2 
          className="highlight-mask absolute top-0 left-0 w-full text-[clamp(2rem,6vw,4.5rem)] font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal to-blue-400 leading-[1.2]"
          style={{ clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }}
        >
          We believe protection is a fundamental right. Not a luxury. Experience seamless claims, zero hidden clauses, and absolute transparency.
        </h2>
      </div>
    </section>
  )
}
