'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function VideoShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useGSAP(() => {
    const video = videoRef.current
    if (!video) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=250%', // 2.5x screen height runway
        scrub: 1.5, // Buttery smooth scrubbing for UI elements
        pin: true,
        onEnter: () => video.play().catch(() => {}),
        onLeave: () => video.pause(),
        onEnterBack: () => video.play().catch(() => {}),
        onLeaveBack: () => video.pause(),
      }
    })

    // Cinematic scroll animations (UI only, letting video play natively for 0 lag)
    tl.fromTo('.cinematic-overlay', 
      { opacity: 0.8 }, 
      { opacity: 0.3, duration: 1 }
    )
    tl.fromTo('.cinematic-text',
      { y: 50, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power2.out' },
      0.5
    )
    tl.to('.cinematic-video-container', {
      scale: 0.95,
      borderRadius: '2rem',
      duration: 1.5,
      ease: 'power1.inOut'
    }, 1.5)
    tl.to('.cinematic-text', {
      y: -50,
      opacity: 0,
      duration: 1
    }, 1.5)

  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="h-screen w-full bg-[#050505] relative flex items-center justify-center p-0 md:p-8">
      <div className="cinematic-video-container relative w-full h-full overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        {/* The cinematic video layer */}
        <video 
          ref={videoRef}
          src="/my-awesome-video.mp4" 
          className="absolute inset-0 w-full h-full object-cover"
          playsInline
          muted
          loop
          preload="auto"
        />
        
        {/* Luxury Vignette and Gradients */}
        <div className="cinematic-overlay absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] z-10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.8)_100%)] z-10 pointer-events-none"></div>

        {/* Foreground Content */}
        <div className="cinematic-text absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-4 text-center opacity-0">
        <span className="text-teal font-semibold tracking-[0.2em] text-sm uppercase mb-6 drop-shadow-md">
          Control The Narrative
        </span>
        <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-bold text-white mb-6 tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-blue-400">Seamless</span> Experience
        </h2>
        <div className="flex flex-col items-center gap-2 mt-8 opacity-60">
          <p className="text-white text-sm font-light tracking-widest uppercase">Scroll to explore</p>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </div>
      </div>
    </section>
  )
}
