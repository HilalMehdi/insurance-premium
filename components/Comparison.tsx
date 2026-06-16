'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Star } from 'lucide-react'

const filters = ['All', 'Health', 'Life', 'Motor', 'Home']

const plans = [
  // Health
  {
    name: 'Global Concierge Health', category: 'Health', price: '₹2.5 Lakhs', period: '/year',
    coverage: '₹10 Crores', claimRatio: '99%', badge: null, color: 'from-slate-400 to-slate-600',
    features: ['Global Cashless', 'Private Room Guarantee', 'Air Evacuation', null, null],
  },
  {
    name: 'Prime Syndicate Health', category: 'Health', price: '₹5.2 Lakhs', period: '/year',
    coverage: '₹25 Crores', claimRatio: '99.5%', badge: 'Most Popular', color: 'from-teal to-ins-blue',
    features: ['Global Cashless', 'Private Room Guarantee', 'Air Evacuation', 'Zero-wait OPD', 'Maternity Cover'],
  },
  {
    name: 'Private Office Health', category: 'Health', price: '₹14.5 Lakhs', period: '/year',
    coverage: '₹100 Crores', claimRatio: '100%', badge: 'Family Office', color: 'from-amber-400 to-orange-500',
    features: ['Global Cashless', 'Private Room Guarantee', 'Air Evacuation', 'Zero-wait OPD', 'Experimental Meds'],
  },
  
  // Life
  {
    name: 'Generational Secure', category: 'Life', price: '₹12.5 Lakhs', period: '/year',
    coverage: '₹100 Crores', claimRatio: '99.5%', badge: 'Estate Choice', color: 'from-indigo-400 to-ins-blue',
    features: ['Zero-wait payout', 'Trust Structuring', 'Terminal Illness', 'Premium Waiver', 'Global Portability'],
  },

  // Motor
  {
    name: 'Exotic Fleet Cover', category: 'Motor', price: '₹4.5 Lakhs', period: '/year',
    coverage: '₹10 Crores', claimRatio: '99%', badge: 'Hypercar Ready', color: 'from-orange-400 to-red-500',
    features: ['Agreed Value Settlement', 'OEM Parts Guarantee', 'Global Transit', 'Return to Invoice', 'Engine Protection'],
  },

  // Home
  {
    name: 'Estate & Art Shield', category: 'Home', price: '₹8.5 Lakhs', period: '/year',
    coverage: '₹50 Crores', claimRatio: '98%', badge: 'Premium Villas', color: 'from-purple-400 to-violet-500',
    features: ['Fine Art & Jewelry', 'Staff Liability', 'Cyber Extortion', 'Alternative Stay', 'Natural Disasters'],
  },
]

export default function Comparison() {
  const [active, setActive] = useState('All')
  const filtered = plans.filter(p => active === 'All' || p.category === active)

  return (
    <section id="compare" className="section-padding bg-slate-50 overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 80, damping: 20 }} className="text-center mb-12">
          <span className="text-teal font-semibold text-sm uppercase tracking-widest">Compare Plans</span>
          <h2 className="font-serif text-[clamp(2rem,6vw,3rem)] font-bold text-navy mt-3 mb-4 leading-tight">
            Compare Insurance Plans <span className="gradient-text">Easily</span>
          </h2>
          <p className="text-slate-500 text-[clamp(1rem,4vw,1.125rem)]">
            Compare multiple plans side by side based on: Premium amount, Coverage benefits, Claim settlement ratio, Network hospitals, Add-on features.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map(f => (
            <motion.button key={f} onClick={() => setActive(f)}
              whileHover={{ scale: 1.05, transition: { type: 'spring', stiffness: 400, damping: 10 } }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 ${active === f ? 'bg-gradient-to-r from-teal to-ins-blue text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
            >{f}</motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? filtered.map(plan => (
              <motion.div key={plan.name} layout initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 25 } }} exit={{ opacity: 0, scale: 0.92 }}
                className={`relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] border-2 ${plan.badge === 'Most Popular' ? 'border-teal' : 'border-transparent'}`}
              >
                {plan.badge && (
                  <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r ${plan.color} text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5`}>
                    <Star className="w-3 h-3 fill-white" /> {plan.badge}
                  </div>
                )}
                <div className="mb-5">
                  <h3 className="font-bold text-navy text-xl mb-0.5">{plan.name}</h3>
                  <span className="text-xs text-slate-400 uppercase tracking-wide">{plan.category}</span>
                </div>
                <div className="mb-6">
                  <span className={`text-[clamp(2rem,5vw,2.25rem)] font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>{plan.price}</span>
                  <span className="text-slate-400 text-sm ml-1">{plan.period}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-6 p-4 bg-slate-50 rounded-2xl">
                  <div><p className="text-xs text-slate-400 mb-1">Coverage</p><p className="font-bold text-navy">{plan.coverage}</p></div>
                  <div><p className="text-xs text-slate-400 mb-1">Claim Ratio</p><p className="font-bold text-success">{plan.claimRatio}</p></div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      {f ? <><Check className="w-4 h-4 text-success flex-shrink-0" /><span className="text-slate-600">{f}</span></>
                        : <><X className="w-4 h-4 text-slate-300 flex-shrink-0" /><span className="text-slate-300">Not included</span></>}
                    </li>
                  ))}
                </ul>
                <motion.a href="#calculator" whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 10 } }} whileTap={{ scale: 0.95 }} className={`block text-center bg-gradient-to-r ${plan.color} text-white py-3.5 rounded-2xl font-semibold shadow-lg`}>
                  Get Expert Guidance
                </motion.a>
              </motion.div>
            )) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-3 text-center py-16 text-slate-400">
                <p className="text-lg">No plans available for this category yet - check back soon!</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
