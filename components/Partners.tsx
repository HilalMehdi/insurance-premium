'use client'
import { motion } from 'framer-motion'

const partners = [
  'LIC of India', 'New India Assurance', 'HDFC Ergo', 'ICICI Lombard',
  'Star Health', 'Bajaj Allianz', 'Tata AIG', 'Oriental Insurance',
  'United India', 'SBI General', 'Niva Bupa', 'Care Health',
]

const colors = ['from-teal to-cyan-500', 'from-ins-blue to-blue-500', 'from-amber-400 to-orange-500',
  'from-rose-400 to-pink-500', 'from-violet-400 to-purple-500', 'from-green-400 to-teal']

export default function Partners() {
  return (
    <section className="py-20 bg-white border-y border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-teal font-semibold text-sm uppercase tracking-widest">Trusted Partners</span>
          <h2 className="font-serif text-3xl font-bold text-navy mt-3">India's Leading Insurers, All in One Place</h2>
        </motion.div>

        <div
          className="relative overflow-hidden"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)' }}
        >
          <div className="flex gap-5 animate-marquee w-max">
            {[...partners, ...partners].map((name, i) => (
              <div key={i}
                className="flex-shrink-0 flex items-center gap-3 bg-slate-50 hover:bg-gradient-to-r hover:from-teal/8 hover:to-ins-blue/8 border border-slate-200 hover:border-teal/30 rounded-2xl px-7 py-4 transition-all duration-300 group cursor-default"
              >
                <div className={`w-9 h-9 bg-gradient-to-br ${colors[i % colors.length]} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
                  <span className="text-white text-sm font-bold">{name.charAt(0)}</span>
                </div>
                <span className="font-semibold text-slate-700 group-hover:text-navy whitespace-nowrap text-sm">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
