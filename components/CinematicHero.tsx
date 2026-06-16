'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

export default function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  const highlightRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: 1.5,
          pin: true,
        }
      })
      // Sequence 1: Video scales/dims, Hero Text fades up & out
      tl.to(bgRef.current, { scale: 1.05, opacity: 0.3, ease: 'power1.inOut' }, 0)
      tl.to(textRef.current, { y: -150, opacity: 0, scale: 0.9, ease: 'power1.inOut' }, 0)
      
      // Sequence 2: Bring in the Highlight block
      tl.fromTo(highlightRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, ease: 'power1.out' }, 0.2)

      // Sequence 3: Scrub the text gradient mask
      tl.fromTo('.highlight-mask-video', 
        { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' },
        { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', ease: 'none' }, 0.4)
    });

    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: 1.5,
          pin: true,
        }
      })
      tl.to(bgRef.current, { scale: 1.05, opacity: 0.4, ease: 'power1.inOut' }, 0)
      tl.to(textRef.current, { y: -50, opacity: 0, ease: 'power1.inOut' }, 0)
      
      tl.fromTo(highlightRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, ease: 'power1.out' }, 0.3)
      
      tl.fromTo('.highlight-mask-video', 
        { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' },
        { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', ease: 'none' }, 0.5)
    });

    return () => mm.revert();
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-navy flex items-center justify-center">
      {/* Background Image */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-full will-change-transform"
      >
        <motion.video 
          autoPlay
          loop
          muted
          playsInline
          poster="/insurance-premium/images/ai/hero_family_1781532809939.png"
          initial={{ scale: 1.15, filter: 'blur(10px)' }}
          animate={{ scale: 1, filter: 'blur(0px)' }}
          transition={{ type: 'spring', stiffness: 40, damping: 20, duration: 2 }}
          src="/insurance-premium/hero-video.mp4"
          className="absolute inset-0 w-full h-full"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-navy/60 backdrop-blur-[2px]"></div>
      </div>

      {/* Hero Content */}
      <div ref={textRef} className="relative z-10 text-center px-4 md:px-6 max-w-4xl mx-auto pt-20 will-change-transform">
        <span className="inline-block px-4 py-1.5 rounded-full border border-teal/30 bg-teal/10 text-teal text-sm font-semibold tracking-wider uppercase mb-6 shadow-[0_0_15px_rgba(20,184,166,0.3)]">
          Redefining Protection
        </span>
        <h1 className="text-[clamp(2.75rem,8vw,4.5rem)] font-serif font-bold text-white leading-[1.1] mb-6">
          Protect What <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-blue-400">Matters Most</span>
        </h1>
        <p className="text-[clamp(1rem,4vw,1.25rem)] text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Experience a new standard of luxury insurance advisory. Tailored plans, absolute security, and peace of mind for you and your family.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 opacity-70">
        <span className="text-xs text-white uppercase tracking-widest font-semibold">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
      </div>

      {/* The Highlight Text Reveal (Hidden initially, animates in over the video) */}
      <div ref={highlightRef} className="absolute inset-0 z-20 flex items-center justify-center px-4 md:px-6 max-w-6xl mx-auto opacity-0 pointer-events-none">
        <div className="relative text-center w-full">
          {/* Faded Background Text */}
          <h2 className="text-[clamp(1.75rem,5vw,4.5rem)] font-serif font-bold text-white/20 leading-[1.2]">
            We believe protection is a fundamental right. Not a luxury. Experience seamless claims, zero hidden clauses, and absolute transparency.
          </h2>
          
          {/* Highlighted Foreground Text Mask */}
          <h2 
            className="highlight-mask-video absolute top-0 left-0 w-full text-[clamp(1.75rem,5vw,4.5rem)] font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal to-blue-400 leading-[1.2]"
            style={{ clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }}
          >
            We believe protection is a fundamental right. Not a luxury. Experience seamless claims, zero hidden clauses, and absolute transparency.
          </h2>
        </div>
      </div>
    </section>
  )
}
