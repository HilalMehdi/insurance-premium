'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function ImageReveal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    })

    // Image scales down from 1.3 to 1
    tl.fromTo(imgRef.current, 
      { scale: 1.3 },
      { scale: 1, ease: 'none' },
      0
    )

    // Overlay fades out
    tl.to(overlayRef.current, {
      opacity: 0.3,
      ease: 'none'
    }, 0)

    // Text parallax
    tl.fromTo(textRef.current,
      { y: 100 },
      { y: -100, ease: 'none' },
      0
    )

  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative h-[80vh] w-full overflow-hidden bg-navy flex items-center justify-center">
      
      <div className="absolute inset-0 w-full h-full">
        <img 
          ref={imgRef}
          src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=2000&q=80"
          alt="Generations"
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-navy/80"
      ></div>

      <div className="relative z-10 px-6 max-w-5xl mx-auto text-center">
        <h2 
          ref={textRef}
          className="text-4xl md:text-7xl font-serif font-bold text-white leading-tight"
        >
          Your legacy, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-blue-400">secured for generations.</span>
        </h2>
      </div>

    </section>
  )
}
