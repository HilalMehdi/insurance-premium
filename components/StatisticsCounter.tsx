'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { label: "Families Protected", value: 10000, suffix: "+", prefix: "" },
  { label: "Claim Settlement", value: 98, suffix: "%", prefix: "" },
  { label: "Support Available", value: 24, suffix: "/7", prefix: "" },
  { label: "Years Experience", value: 30, suffix: "+", prefix: "" }
]

export default function StatisticsCounter() {
  const containerRef = useRef<HTMLDivElement>(null)
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([])

  useGSAP(() => {
    // Animate numbers counting up when they enter viewport
    numbersRef.current.forEach((el, index) => {
      if (!el) return
      
      const targetValue = stats[index].value
      
      gsap.to(el, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        innerText: targetValue,
        duration: 2.5,
        ease: "power2.out",
        snap: { innerText: 1 }, // Snap to whole numbers
        onUpdate: function() {
          // Format with commas if needed (for 10000)
          el.innerText = Math.ceil(Number(el.innerText)).toLocaleString('en-IN')
        }
      })
    })

    // Fade up the whole section
    gsap.from(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
      },
      y: 50,
      opacity: 0,
      duration: 1
    })

  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 divide-x-0 md:divide-x divide-slate-100">
          {stats.map((stat, i) => (
            <div key={i} className="text-center px-4">
              <div className="text-4xl md:text-6xl font-serif font-bold text-navy mb-2 flex items-center justify-center">
                <span>{stat.prefix}</span>
                <span ref={el => { numbersRef.current[i] = el }}>0</span>
                <span className="text-teal">{stat.suffix}</span>
              </div>
              <p className="text-sm md:text-base text-slate-500 font-medium uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
