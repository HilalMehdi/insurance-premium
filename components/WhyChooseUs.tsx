'use client'
import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { CheckCircle, Clock, Award, Users, Star, Phone, Shield, Zap } from 'lucide-react'

const stats = [
  { end: 50000, suffix: '+', label: 'Policies Issued', icon: Users },
  { end: 98, suffix: '%', label: 'Claim Success Rate', icon: CheckCircle },
  { end: 24, suffix: '/7', label: 'Support Available', icon: Clock },
  { end: 15, suffix: '+', label: 'Insurance Partners', icon: Award },
]

const features = [
  { icon: Star,   title: 'Best Price Guarantee',   desc: 'We compare across 15+ insurers to find the lowest premium for maximum coverage.' },
  { icon: Phone,  title: 'Dedicated Claims Support', desc: 'Expert claims team guides you every step for hassle-free, fast settlement.' },
  { icon: Zap,    title: 'Instant Policy Issuance', desc: 'Get your policy document in minutes after payment. 100% paperless.' },
  { icon: Shield, title: 'IRDAI Regulated',         desc: 'All partners are IRDAI licensed for your complete peace of mind.' },
]

function Counter({ end, suffix, label, icon: Icon, trigger }: { end: number; suffix: string; label: string; icon: React.ElementType; trigger: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    if (!trigger || !ref.current) return
    gsap.fromTo(ref.current,
      { innerText: 0 },
      { innerText: end, duration: 2.2, ease: 'power2.out', snap: { innerText: 1 },
        onUpdate() { if (ref.current) ref.current.textContent = Math.round(+ref.current.innerText).toLocaleString() } }
    )
  }, [trigger, end])

  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-gradient-to-br from-teal to-ins-blue rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-teal/20">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <div className="text-4xl md:text-5xl font-bold text-white mb-1">
        <span ref={ref}>0</span><span>{suffix}</span>
      </div>
      <p className="text-white/50 text-sm font-medium">{label}</p>
    </div>
  )
}

export default function WhyChooseUs() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="why-us" className="section-padding bg-navy relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-teal/15 to-transparent" />
        <div className="absolute top-1/2 w-full h-px bg-gradient-to-r from-transparent via-teal/15 to-transparent" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-ins-blue/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal/8 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
          <span className="text-teal font-semibold text-sm uppercase tracking-widest">Why InsureShield</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mt-3">
            Numbers That Speak<br /><span className="gradient-text">For Themselves</span>
          </h2>
        </motion.div>

        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-24">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Counter {...s} trigger={inView} />
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <motion.div key={title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass rounded-3xl p-7 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-teal/15 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6 text-teal" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
