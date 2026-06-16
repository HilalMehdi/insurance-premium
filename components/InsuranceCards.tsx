'use client'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Heart, Shield, Car, Home, Plane, Briefcase, Building2, Bike } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const cards = [
  { icon: Heart,     label: 'Health Insurance',    desc: 'Cashless hospitalisation & full medical coverage for the whole family. Access to 5000+ premium hospitals nationwide.', color: 'from-rose-400 to-pink-500',    bg: '#FFF1F2', span: 'md:col-span-2 md:row-span-2', theme: 'light' },
  { icon: Shield,    label: 'Life Insurance',       desc: 'Secure your family\'s financial future.',     color: 'from-indigo-400 to-ins-blue',  bg: '#EEF2FF', span: 'md:col-span-1 md:row-span-1', theme: 'light' },
  { icon: Car,       label: 'Car Insurance',        desc: 'Third-party & total coverage.',            color: 'from-amber-400 to-orange-500', bg: '#FFFBEB', span: 'md:col-span-1 md:row-span-1', theme: 'light' },
  { icon: Building2, label: 'Corporate Insurance',  desc: 'Group health, keyman & employee benefit packages built exactly for your organisation\'s scale and needs.',        color: 'from-slate-700 to-[#050505]',    bg: '#ffffff20', span: 'md:col-span-2 md:row-span-1', theme: 'dark' },
  { icon: Bike,      label: 'Bike Insurance',       desc: 'Mandatory & total two-wheeler protection.',             color: 'from-green-400 to-teal',       bg: '#F0FDF4', span: 'md:col-span-1 md:row-span-1', theme: 'light' },
  { icon: Home,      label: 'Home Insurance',       desc: 'Protect your home from fire, theft & flood.',               color: 'from-purple-400 to-violet-500', bg: '#F5F3FF', span: 'md:col-span-1 md:row-span-1', theme: 'light' },
  { icon: Plane,     label: 'Travel Insurance',     desc: 'Global coverage for medical & trip cancellation.',     color: 'from-cyan-400 to-teal',        bg: '#ECFEFF', span: 'md:col-span-1 md:row-span-1', theme: 'light' },
  { icon: Briefcase, label: 'Business Insurance',   desc: 'Total protection for business assets.',       color: 'from-slate-500 to-slate-700',  bg: '#F8FAFC', span: 'md:col-span-1 md:row-span-1', theme: 'light' },
]

export default function InsuranceCards() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useGSAP(() => {
    gsap.fromTo(cardsRef.current, 
      { y: 50, scale: 0.9, opacity: 0, rotation: 2 },
      { 
        y: 0, scale: 1, opacity: 1, rotation: 0, 
        duration: 1, 
        stagger: 0.1, 
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%'
        }
      }
    )
  }, { scope: containerRef })

  return (
    <section ref={containerRef} id="insurance" className="section-padding bg-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-[clamp(2rem,6vw,3rem)] font-bold text-navy mt-3 mb-4 leading-tight">
            All Your Insurance Needs,
            <span className="gradient-text block">One Trusted Partner</span>
          </h2>
          <p className="text-slate-500 text-[clamp(1rem,4vw,1.125rem)] max-w-xl mx-auto">
            From health to wealth - explore our complete range of insurance solutions for every stage of life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-flow-row-dense gap-6">
          {cards.map(({ icon: Icon, label, desc, color, bg, span, theme }, i) => (
            <div
              key={label}
              ref={el => { if(el) cardsRef.current[i] = el }}
              className={`group relative rounded-3xl p-8 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] overflow-hidden cursor-pointer hover:-translate-y-1 will-change-transform ${span} ${theme === 'dark' ? 'bg-[#050505] text-white shadow-2xl border border-white/10' : 'bg-white border border-slate-100 shadow-sm hover:shadow-2xl'}`}
            >
              {/* Hover bg glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 ${theme === 'dark' ? 'group-hover:opacity-20' : 'group-hover:opacity-[0.04]'} transition-opacity duration-400 rounded-3xl`} />

              <div className="relative z-10 flex flex-col h-full">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300" style={{ background: bg }}>
                  <Icon className={`w-7 h-7 ${theme === 'dark' ? 'text-white' : ''}`} style={theme !== 'dark' ? { color: `var(--icon-color)` } : {}} />
                </div>

                <div className="mt-auto">
                  <h3 className={`font-bold text-[1.25rem] mb-3 transition-colors ${theme === 'dark' ? 'text-white' : 'text-[#050505] group-hover:text-ins-blue'}`}>{label}</h3>
                  <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-500'}`}>{desc}</p>
                </div>

                <div className={`mt-6 text-sm font-semibold bg-gradient-to-r ${color} bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0`}>
                  <p className="font-medium flex items-center gap-2 transition-colors">
                    View Details <span className="text-xl transform group-hover:translate-x-2 transition-transform">→</span>
                  </p>
                </div>
              </div>

              {/* Bottom accent */}
              <div className={`absolute bottom-0 left-8 right-8 h-[2px] bg-gradient-to-r ${color} scale-x-0 group-hover:scale-x-100 transition-transform duration-400 rounded-full origin-left`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
