'use client'
import { motion } from 'framer-motion'
import { Heart, Shield, Car, Home, Plane, Briefcase, Building2, Bike } from 'lucide-react'

const cards = [
  { icon: Heart,     label: 'Health Insurance',    desc: 'Cashless hospitalisation & comprehensive medical coverage for the whole family.', color: 'from-rose-400 to-pink-500',    bg: '#FFF1F2' },
  { icon: Shield,    label: 'Life Insurance',       desc: 'Secure your family\'s financial future with term, whole life & ULIP plans.',     color: 'from-indigo-400 to-ins-blue',  bg: '#EEF2FF' },
  { icon: Car,       label: 'Car Insurance',        desc: 'Third-party & comprehensive coverage — compare 20+ plans instantly.',            color: 'from-amber-400 to-orange-500', bg: '#FFFBEB' },
  { icon: Bike,      label: 'Bike Insurance',       desc: 'Mandatory & comprehensive two-wheeler protection at the best rates.',             color: 'from-green-400 to-teal',       bg: '#F0FDF4' },
  { icon: Home,      label: 'Home Insurance',       desc: 'Protect your home from fire, theft, flood & natural calamities.',               color: 'from-purple-400 to-violet-500', bg: '#F5F3FF' },
  { icon: Plane,     label: 'Travel Insurance',     desc: 'Global coverage for medical emergencies, trip cancellation & lost baggage.',     color: 'from-cyan-400 to-teal',        bg: '#ECFEFF' },
  { icon: Briefcase, label: 'Business Insurance',   desc: 'Comprehensive protection for business assets, liability & key employees.',       color: 'from-slate-500 to-slate-700',  bg: '#F8FAFC' },
  { icon: Building2, label: 'Corporate Insurance',  desc: 'Group health, keyman & employee benefit packages for your organisation.',        color: 'from-ins-blue to-blue-600',    bg: '#EFF6FF' },
]

export default function InsuranceCards() {
  return (
    <section id="insurance" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-teal font-semibold text-sm uppercase tracking-widest">What We Cover</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy mt-3 mb-4">
            All Your Insurance Needs,
            <span className="gradient-text block">One Trusted Partner</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            From health to wealth — explore our complete range of insurance solutions for every stage of life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map(({ icon: Icon, label, desc, color, bg }, i) => (
            <motion.a
              key={label}
              href="#quote"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white rounded-3xl p-7 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-400 overflow-hidden cursor-pointer"
            >
              {/* Hover bg glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-400 rounded-3xl`} />

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300" style={{ background: bg }}>
                <Icon className="w-7 h-7" style={{ color: `var(--icon-color)` }} />
              </div>

              <h3 className="font-bold text-navy text-[1.05rem] mb-2 group-hover:text-ins-blue transition-colors">{label}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>

              <div className={`mt-5 text-sm font-semibold bg-gradient-to-r ${color} bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0`}>
                Get Quote →
              </div>

              {/* Bottom accent */}
              <div className={`absolute bottom-0 left-6 right-6 h-[2px] bg-gradient-to-r ${color} scale-x-0 group-hover:scale-x-100 transition-transform duration-400 rounded-full`} />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
