'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export const stories = [
  {
    title: "Starting Your Career",
    desc: "Building a solid financial foundation and health coverage as a young professional.",
    img: "/insurance-premium/images/ai/story_1_career_1781532823001.png"
  },
  {
    title: "Marriage & Family",
    desc: "Securing your growing family's future with robust life and health insurance plans.",
    img: "/insurance-premium/images/ai/story_2_marriage_1781532836651.png"
  },
  {
    title: "Buying a Home",
    desc: "Protecting your biggest investment and most cherished memories with comprehensive home coverage.",
    img: "/insurance-premium/images/ai/story_3_home_1781532849339.png"
  },
  {
    title: "Children's Education",
    desc: "Guaranteeing their dreams remain uninterrupted with dedicated education planning.",
    img: "/insurance-premium/images/ai/story_4_education_1781532869133.png"
  },
  {
    title: "Growing Your Business",
    desc: "Customized corporate solutions designed to mitigate risks and secure your enterprise.",
    img: "/insurance-premium/images/ai/story_5_business_1781532880854.png"
  },
  {
    title: "Retirement Planning",
    desc: "Enjoying your golden years with complete peace of mind and lifetime financial security.",
    img: "/insurance-premium/images/ai/story_6_retirement_1781532894656.png"
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

    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300%', // shorter pin for mobile
          scrub: true,
          pin: true,
        }
      })

      tl.to(progressRef.current, { scaleX: 1, ease: 'none' }, 0)
      gsap.set(imagesRef.current.slice(1), { opacity: 0 })
      gsap.set(textsRef.current.slice(1), { opacity: 0, y: 20 })

      const step = 1 / (stories.length - 1)
      
      stories.forEach((_, i) => {
        if (i === 0) return
        
        const startTime = i * step - (step * 0.2)
        tl.to(imagesRef.current[i - 1], { opacity: 0, duration: 0.1 }, startTime)
        tl.to(textsRef.current[i - 1], { opacity: 0, y: -20, duration: 0.1 }, startTime)
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
            className="absolute inset-0 w-full h-full will-change-transform"
          >
            <img 
              src={story.img}
              alt={story.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-opacity will-change-transform"
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
              className="absolute w-full will-change-transform px-4"
            >
              <h2 className="text-[clamp(2rem,6vw,3.75rem)] font-serif font-bold text-white mb-4">
                {story.title}
              </h2>
              <p className="text-[clamp(1rem,4vw,1.125rem)] text-white/70 font-light max-w-2xl mx-auto">
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

      {/* Mobile Fallback Removed since we now animate on mobile */}
    </section>
  )
}
