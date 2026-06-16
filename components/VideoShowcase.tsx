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

    const setupScroll = () => {
      // Timeout ensures layout is ready
      setTimeout(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=400%', // Creates a long scrolling runway (4x screen height)
            scrub: 1.5, // Smooth scrubbing
            pin: true,
          }
        })
        tl.to(video, {
          currentTime: video.duration || 10,
          ease: 'none'
        })
      }, 100)
    }

    // Attach sequence when metadata is ready
    if (video.readyState >= 1) {
      setupScroll()
    } else {
      video.addEventListener('loadedmetadata', setupScroll)
    }

    return () => video.removeEventListener('loadedmetadata', setupScroll)
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="h-screen w-full bg-[#050505] relative overflow-hidden">
      {/* The cinematic video layer */}
      <video 
        ref={videoRef}
        src="/my-awesome-video.mp4" 
        className="absolute inset-0 w-full h-full object-cover opacity-70 will-change-transform"
        playsInline
        muted
        preload="auto"
      />
      
      {/* Luxury Vignette and Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] z-10 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.8)_100%)] z-10 pointer-events-none"></div>

      {/* Foreground Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-4 text-center">
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
    </section>
  )
}
