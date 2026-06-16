'use client'
import { motion } from 'framer-motion'
import { Briefcase, CheckCircle } from 'lucide-react'

const benefits = [
  'Tailored business plans',
  'Flexible coverage',
  'Expert support',
  'Fast claim process'
]

export default function BusinessInsurance() {
  return (
    <section id="business-insurance" className="section-padding bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 80, damping: 20 }}
            className="flex flex-col gap-8"
          >
            <div>
              <span className="text-teal font-semibold text-sm uppercase tracking-widest">Business Insurance</span>
              <h2 className="font-serif text-[clamp(2rem,6vw,3rem)] font-bold text-navy mt-3 leading-tight mb-6">
                Protect Your Business<br />from <span className="gradient-text">Unexpected Risks</span>
              </h2>
              <p className="text-slate-500 text-[clamp(1rem,4vw,1.125rem)] leading-relaxed mb-4">
                Comprehensive protection for:
              </p>
              <ul className="text-slate-600 mb-6 space-y-2 font-medium">
                <li>• Offices</li>
                <li>• Shops</li>
                <li>• Startups</li>
                <li>• SMEs</li>
                <li>• Manufacturing units</li>
              </ul>
              
              <p className="text-slate-500 text-[clamp(1rem,4vw,1.125rem)] leading-relaxed mb-4">
                Coverage includes:
              </p>
              <ul className="text-slate-600 mb-8 space-y-2 font-medium">
                <li>• Property damage</li>
                <li>• Employee protection</li>
                <li>• Public liability</li>
                <li>• Cyber threats</li>
                <li>• Business interruption</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-navy text-xl mb-4">Benefits</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map(b => (
                  <div key={b} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-teal" />
                    <span className="text-slate-700 font-medium">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.a
              href="#quote"
              whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 10 } }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 mt-4 bg-gradient-to-r from-teal to-ins-blue text-white px-8 py-4 rounded-full font-semibold shadow-xl shadow-teal/20 hover:opacity-90 transition-all w-fit"
            >
              Talk to an Advisor →
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 80, damping: 20 }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-500/20 to-transparent z-10" />
              <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" alt="Modern business building" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -left-8 glass rounded-3xl p-6 shadow-xl border border-white/20 z-20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-slate-700" />
                </div>
                <div>
                  <div className="text-sm text-slate-500 font-medium">Enterprise</div>
                  <div className="text-navy font-bold text-lg">Coverage</div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
