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
          end: '+=120%',
          scrub: 1.5,
          pin: true,
        }
      })
      // Sequence 1: Video scales/dims slightly, heavily blurred instead of completely dimmed
      tl.to(bgRef.current, { scale: 1.05, opacity: 0.8, filter: 'blur(20px)', ease: 'power1.inOut' }, 0)
      tl.to(textRef.current, { y: -150, opacity: 0, scale: 0.9, ease: 'power1.inOut' }, 0)
      
      // Sequence 2: Bring in the Highlight block & AI Aurora
      tl.fromTo(highlightRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, ease: 'power1.out' }, 0.2)
      tl.fromTo('.ai-aurora', { scale: 0.8, opacity: 0 }, { scale: 1.2, opacity: 0.8, ease: 'power2.out', duration: 1.5 }, 0.2)

      // Sequence 3: Scrub the text soft gradient reveal
      tl.fromTo('.highlight-mask-video', 
        { backgroundPosition: '100% 0%' },
        { backgroundPosition: '0% 0%', ease: 'none', duration: 1.5 }, 0.2)
    });

    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=120%',
          scrub: 1.5,
          pin: true,
        }
      })
      tl.to(bgRef.current, { scale: 1.05, opacity: 0.8, filter: 'blur(15px)', ease: 'power1.inOut' }, 0)
      tl.to(textRef.current, { y: -50, opacity: 0, ease: 'power1.inOut' }, 0)
      
      tl.fromTo(highlightRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, ease: 'power1.out' }, 0.3)
      tl.fromTo('.ai-aurora', { scale: 0.8, opacity: 0 }, { scale: 1.2, opacity: 0.6, ease: 'power2.out', duration: 1.5 }, 0.3)
      
      tl.fromTo('.highlight-mask-video', 
        { backgroundPosition: '100% 0%' },
        { backgroundPosition: '0% 0%', ease: 'none', duration: 1.5 }, 0.3)
    });

    return () => mm.revert();
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-navy flex items-center">
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
          poster="/images/ai/hero_family_1781532809939.png"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 40, damping: 20, duration: 2 }}
          src="/hero-video.mp4"
          className="absolute inset-0 w-full h-full"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-[#050505]/60 backdrop-blur-[4px] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-1000"></div>
      </div>

      {/* Hero Content */}
      <div ref={textRef} className="relative z-10 w-full px-4 md:px-12 lg:px-24 max-w-7xl mx-auto pt-20 will-change-transform text-left">
        <span className="inline-block px-4 py-1.5 rounded-full border border-teal/30 bg-teal/10 text-teal text-sm font-semibold tracking-wider uppercase mb-6 shadow-[0_0_15px_rgba(20,184,166,0.3)]">
          Redefining Protection
        </span>
        <h1 className="text-[clamp(2.75rem,8vw,4.5rem)] font-serif font-bold text-white leading-[1.1] mb-6">
          Protect What <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-blue-400">Matters Most</span>
        </h1>
        <p className="text-[clamp(1rem,4vw,1.25rem)] text-white/70 max-w-2xl mb-10 leading-relaxed font-light">
          Experience a new standard of luxury insurance advisory. Custom plans, absolute security, and peace of mind for you and your family.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 opacity-70">
        <span className="text-xs text-white uppercase tracking-widest font-semibold">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
      </div>

      {/* The Highlight Text Reveal (Hidden initially, animates in over the video) */}
      <div ref={highlightRef} className="absolute inset-0 z-20 flex items-center px-4 md:px-12 lg:px-24 max-w-7xl mx-auto opacity-0 pointer-events-none overflow-hidden text-left">
        
        {/* Google Labs Style AI Aurora Background */}
        <div className="ai-aurora absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl aspect-square opacity-0 pointer-events-none mix-blend-screen">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal/40 rounded-full mix-blend-screen filter blur-[100px] animate-[spin_8s_linear_infinite]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/40 rounded-full mix-blend-screen filter blur-[100px] animate-[spin_10s_linear_infinite_reverse]" />
          <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-fuchsia-500/30 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" />
        </div>

        <div className="relative text-left w-full max-w-5xl z-10">
          {/* Highlighted Foreground Soft Text Reveal */}
          <h2 
            className="highlight-mask-video text-[clamp(1.75rem,5vw,4.5rem)] font-serif font-bold text-transparent bg-clip-text leading-[1.2]"
            style={{ 
              backgroundImage: 'linear-gradient(to right, #ffffff 0%, #ffffff 33%, #60a5fa 45%, #2dd4bf 55%, rgba(255,255,255,0.1) 66%, rgba(255,255,255,0.1) 100%)',
              backgroundSize: '300% 100%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '100% 0%'
            }}
          >
            We believe protection is a fundamental right. Not a luxury. Experience zero-friction claims, zero hidden clauses, and absolute transparency.
          </h2>
        </div>
      </div>
    </section>
  )
}
