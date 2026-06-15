'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export const stories = [
  {
    title: "Protect Your Family",
    desc: "Comprehensive health and life coverage ensuring your loved ones are never left vulnerable.",
    img: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=2000&q=80"
  },
  {
    title: "Secure Your Future",
    desc: "Expert guidance from 30+ years of PSU experience to build a solid financial foundation.",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=2000&q=80"
  },
  {
    title: "Drive With Confidence",
    desc: "Premium motor insurance that keeps you moving, with fast and hassle-free claim settlements.",
    img: "https://images.unsplash.com/photo-1605478620424-2a10480432ee?auto=format&fit=crop&w=2000&q=80"
  },
  {
    title: "Travel Without Worries",
    desc: "Explore the world knowing you're protected against medical emergencies and trip cancellations.",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80"
  },
  {
    title: "Grow Your Business Safely",
    desc: "Customized corporate solutions designed to mitigate risks and secure your enterprise.",
    img: "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=2000&q=80"
  }
]

export default function PinnedStorytelling() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLDivElement[]>([])
  const textsRef = useRef<HTMLDivElement[]>([])
  const progressRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // We only enable this heavy pin on non-mobile to keep performance smooth
    let mm = gsap.matchMedia()

    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%', // 400vh scroll duration
          scrub: 1,
          pin: true,
        }
      })

      // Progress bar animation
      tl.to(progressRef.current, { scaleX: 1, ease: 'none' }, 0)

      // Setup initial states
      gsap.set(imagesRef.current.slice(1), { opacity: 0 })
      gsap.set(textsRef.current.slice(1), { opacity: 0, y: 50 })

      // Create sequence
      const step = 1 / (stories.length - 1)
      
      stories.forEach((_, i) => {
        if (i === 0) return // first is already visible
        
        const startTime = i * step - (step * 0.2)
        
        // Hide previous
        tl.to(imagesRef.current[i - 1], { opacity: 0, duration: 0.1 }, startTime)
        tl.to(textsRef.current[i - 1], { opacity: 0, y: -50, duration: 0.1 }, startTime)

        // Show current
        tl.to(imagesRef.current[i], { opacity: 1, duration: 0.2 }, startTime)
        tl.to(textsRef.current[i], { opacity: 1, y: 0, duration: 0.2 }, startTime)
      })
    })

  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-navy overflow-hidden">
      
      {/* Background Images Layer */}
      <div className="absolute inset-0 w-full h-full">
        {stories.map((story, i) => (
          <div 
            key={i}
            ref={el => { if(el) imagesRef.current[i] = el }}
            className="absolute inset-0 w-full h-full"
          >
            <img 
              src={story.img}
              alt={story.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-opacity"
            />
            <div className="absolute inset-0 bg-navy/70 backdrop-blur-[2px]"></div>
          </div>
        ))}
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-6">
        <div className="relative h-40 w-full max-w-4xl flex items-center justify-center">
          {stories.map((story, i) => (
            <div 
              key={i}
              ref={el => { if(el) textsRef.current[i] = el }}
              className="absolute w-full"
            >
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">
                {story.title}
              </h2>
              <p className="text-lg text-white/70 font-light max-w-2xl mx-auto">
                {story.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-20">
        <div 
          ref={progressRef}
          className="h-full bg-teal origin-left scale-x-0"
        ></div>
      </div>

      {/* Mobile Fallback - Static list */}
      <div className="md:hidden absolute inset-0 z-30 bg-navy overflow-y-auto hidden">
         {/* This ensures mobile users still see content if JS fails or media query excludes them */}
      </div>
    </section>
  )
}
