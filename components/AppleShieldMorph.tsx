'use client'

import { useRef, useState } from 'react'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { motion } from 'framer-motion'
import { Shield, Heart, Car, Home, Building2 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

import { X, ArrowRight, CheckCircle2 } from 'lucide-react'

const icons = [
  { 
    icon: Shield, color: 'text-teal', label: "Total Protection",
    title: "Comprehensive Wealth Protection",
    desc: "A unified risk management strategy covering your entire portfolio. We conduct a microscopic audit of your assets to eliminate exposure gaps.",
    features: ["Bespoke Risk Mapping", "Multi-generational Security", "Zero-friction Claims"]
  },
  { 
    icon: Heart, color: 'text-rose-500', label: "Health Insurance",
    title: "Global Private Health Coverage",
    desc: "Unrestricted access to the world's leading medical facilities and specialists. Complete discretion and zero-wait concierge hospitalization.",
    features: ["$10M+ Coverage Limits", "Global Air Evacuation", "Private Room Guarantee"]
  },
  { 
    icon: Car, color: 'text-orange-500', label: "Motor Insurance",
    title: "Exotic & Fleet Insurance",
    desc: "Specialized underwriting for hypercars, vintage collections, and luxury fleets with agreed-value coverage and authorized specialist repairs.",
    features: ["Agreed Value Protection", "Global Transit Coverage", "OEM Parts Guarantee"]
  },
  { 
    icon: Home, color: 'text-violet-500', label: "Home Insurance",
    title: "Estate & Art Collection Cover",
    desc: "Complete protection for primary residences, global vacation homes, and high-value interior assets including fine art and jewelry.",
    features: ["High-Value Art Cover", "Domestic Staff Liability", "Cyber Extortion Cover"]
  },
  { 
    icon: Building2, color: 'text-slate-400', label: "Business Insurance",
    title: "Corporate & Enterprise Risk",
    desc: "Director & Officer liability, key person insurance, and comprehensive cyber protection for your primary wealth-generating enterprises.",
    features: ["D&O Liability", "Key Person Protection", "Cyber Crime & Fraud"]
  }
]

export default function AppleShieldMorph() {
  const containerRef = useRef<HTMLDivElement>(null)
  const iconContainerRef = useRef<HTMLDivElement>(null)
  const iconsRef = useRef<HTMLDivElement[]>([])
  const labelsRef = useRef<HTMLHeadingElement[]>([])
  const activeIndexRef = useRef(0)
  
  const [selectedInfo, setSelectedInfo] = useState<typeof icons[0] | null>(null)

  useGSAP(() => {
    let mm = gsap.matchMedia()

    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300%', // 300vh
          scrub: true,
          pin: true,
          onUpdate: (self) => {
            const progress = self.progress;
            activeIndexRef.current = Math.round(progress * (icons.length - 1));
          }
        }
      })

      // Initial state
      gsap.set(iconsRef.current.slice(1), { scale: 0, opacity: 0, rotation: -90 })
      gsap.set(labelsRef.current.slice(1), { opacity: 0, y: 30 })

      const step = 1 / (icons.length - 1)

      icons.forEach((_, i) => {
        if (i === 0) return
        
        const startTime = i * step - (step * 0.2)
        
        // Hide previous
        tl.to(iconsRef.current[i - 1], { scale: 0, opacity: 0, rotation: 90, duration: 0.15 }, startTime)
        tl.to(labelsRef.current[i - 1], { opacity: 0, y: -30, duration: 0.15 }, startTime)

        // Show current
        tl.to(iconsRef.current[i], { scale: 1, opacity: 1, rotation: 0, duration: 0.2 }, startTime)
        tl.to(labelsRef.current[i], { opacity: 1, y: 0, duration: 0.2 }, startTime)
      })
    })

    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%', // shorter pin
          scrub: true,
          pin: true,
          onUpdate: (self) => {
            const progress = self.progress;
            activeIndexRef.current = Math.round(progress * (icons.length - 1));
          }
        }
      })
      gsap.set(iconsRef.current.slice(1), { scale: 0, opacity: 0, rotation: -90 })
      gsap.set(labelsRef.current.slice(1), { opacity: 0, y: 20 })

      const step = 1 / (icons.length - 1)
      icons.forEach((_, i) => {
        if (i === 0) return
        const startTime = i * step - (step * 0.2)
        tl.to(iconsRef.current[i - 1], { scale: 0, opacity: 0, rotation: 90, duration: 0.15 }, startTime)
        tl.to(labelsRef.current[i - 1], { opacity: 0, y: -20, duration: 0.15 }, startTime)
        tl.to(iconsRef.current[i], { scale: 1, opacity: 1, rotation: 0, duration: 0.2 }, startTime)
        tl.to(labelsRef.current[i], { opacity: 1, y: 0, duration: 0.2 }, startTime)
      })
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-white flex items-center justify-center overflow-hidden">
      
      {/* Central Device/Frame */}
      <div 
        onClick={() => setSelectedInfo(icons[activeIndexRef.current])}
        className="relative w-72 h-72 md:w-[400px] md:h-[400px] rounded-full border border-slate-100 shadow-[0_0_80px_rgba(20,184,166,0.1)] flex items-center justify-center bg-slate-50/50 cursor-pointer hover:scale-105 hover:shadow-[0_0_100px_rgba(20,184,166,0.2)] transition-all duration-500 group z-10"
      >
        
        {/* Pulsing prompt to click */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col items-center">
          <span className="text-xs font-bold uppercase tracking-widest text-teal mb-2">Click to Explore</span>
          <div className="w-px h-6 bg-gradient-to-b from-teal to-transparent"></div>
        </div>
        {/* Radar/Pulse rings */}
        <div className="absolute inset-0 rounded-full border border-teal/20 scale-[1.3] opacity-50"></div>
        <div className="absolute inset-0 rounded-full border border-teal/10 scale-[1.6] opacity-20"></div>

        {/* Dynamic Icons */}
        <div ref={iconContainerRef} className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
          {icons.map((Item, i) => (
            <div 
              key={i} 
              ref={el => { if(el) iconsRef.current[i] = el }}
              className="absolute inset-0 flex items-center justify-center will-change-transform"
            >
              <Item.icon className={`w-full h-full ${Item.color}`} strokeWidth={1.5} />
            </div>
          ))}
        </div>

      </div>

      {/* Dynamic Labels */}
      <div className="absolute bottom-20 w-full text-center">
        <div className="relative h-16 w-full max-w-md mx-auto">
          {icons.map((Item, i) => (
            <h3 
              key={i}
              ref={el => { if(el) labelsRef.current[i] = el }}
              className="absolute w-full text-[clamp(1.5rem,5vw,2.25rem)] font-serif font-bold text-navy will-change-transform"
            >
              {Item.label}
            </h3>
          ))}
        </div>
      </div>

      {/* Info Modal */}
      {selectedInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedInfo(null)}></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative bg-white w-full max-w-lg rounded-3xl p-8 md:p-10 shadow-2xl border border-slate-100 z-10"
          >
            <button 
              onClick={() => setSelectedInfo(null)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6">
              <selectedInfo.icon className={`w-8 h-8 ${selectedInfo.color}`} />
            </div>
            
            <h3 className="font-serif text-3xl font-bold text-navy mb-4">{selectedInfo.title}</h3>
            <p className="text-slate-500 text-lg leading-relaxed mb-8">{selectedInfo.desc}</p>
            
            <div className="space-y-4 mb-10">
              {selectedInfo.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal shrink-0" />
                  <span className="font-medium text-slate-700">{feat}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => {
                setSelectedInfo(null)
                document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="w-full group bg-gradient-to-r from-teal to-ins-blue text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-teal/20 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Schedule Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      )}
    </section>
  )
}
