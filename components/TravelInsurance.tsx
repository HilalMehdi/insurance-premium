'use client'
import { motion } from 'framer-motion'
import { Plane, CheckCircle } from 'lucide-react'

const benefits = [
  'Global coverage',
  'Cashless hospitalization',
  '24/7 support',
  'Instant policy issuance'
]

export default function TravelInsurance() {
  return (
    <section id="travel-insurance" className="section-padding bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center flex-col-reverse lg:flex-row-reverse">
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 80, damping: 20 }}
            className="flex flex-col gap-8 order-1 lg:order-2"
          >
            <div>
              <span className="text-teal font-semibold text-sm uppercase tracking-widest">Travel Insurance</span>
              <h2 className="font-serif text-[clamp(2rem,6vw,3rem)] font-bold text-navy mt-3 leading-tight mb-6">
                Travel with Confidence<br />Anywhere in the <span className="gradient-text">World</span>
              </h2>
              <p className="text-slate-500 text-[clamp(1rem,4vw,1.125rem)] leading-relaxed mb-4">
                Stay protected during domestic and international travel. Coverage includes:
              </p>
              <ul className="text-slate-600 mb-8 space-y-2 font-medium">
                <li>• Medical emergencies</li>
                <li>• Trip cancellation</li>
                <li>• Lost baggage</li>
                <li>• Flight delays</li>
                <li>• Passport loss</li>
                <li>• Emergency evacuation</li>
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
            className="relative order-2 lg:order-1"
          >
            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-ins-blue/20 to-transparent z-10" />
              <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800" alt="Travel insurance protection" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-8 glass rounded-3xl p-6 shadow-xl border border-white/20 z-20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-ins-blue/10 rounded-full flex items-center justify-center">
                  <Plane className="w-6 h-6 text-ins-blue" />
                </div>
                <div>
                  <div className="text-sm text-slate-500 font-medium">Worldwide</div>
                  <div className="text-navy font-bold text-lg">Assistance</div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
