'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  { name: 'Priya Sharma',  role: 'Software Engineer, Bangalore', rating: 5, review: 'BimaKavach helped me find the perfect health insurance for my family. The comparison tool saved me ₹12,000 annually! The claim process was incredibly smooth - reimbursed within 5 days.', initials: 'PS', color: 'from-rose-400 to-pink-500' },
  { name: 'Rajesh Kumar',  role: 'Business Owner, Mumbai',       rating: 5, review: 'After years of struggling with insurance paperwork, BimaKavach made everything so simple. Their team guided me through my car insurance claim after an accident. Outstanding 5-star service!', initials: 'RK', color: 'from-ins-blue to-blue-400' },
  { name: 'Anita Mehta',   role: 'Doctor, Delhi',                rating: 5, review: 'As a medical professional, I understand insurance complexities. BimaKavach\'s advisors are incredibly knowledgeable. They got me the best corporate health policy at 30% lower premium.', initials: 'AM', color: 'from-teal to-cyan-400' },
  { name: 'Vikram Singh',  role: 'Army Officer, Pune',           rating: 5, review: 'Trustworthy, transparent and fast. No hidden clauses, no surprises. BimaKavach recommended the right term plan for my family\'s security. The digital process was frictionless.', initials: 'VS', color: 'from-amber-400 to-orange-500' },
]

export default function Testimonials() {
  const [cur, setCur] = useState(0)
  useEffect(() => { const t = setInterval(() => setCur(c => (c + 1) % testimonials.length), 5500); return () => clearInterval(t) }, [])

  return (
    <section className="section-padding bg-navy relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-ins-blue/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="text-teal font-semibold text-sm uppercase tracking-widest">Testimonials</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mt-3">
            Loved by <span className="gradient-text">50,000+ Customers</span>
          </h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div key={cur} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }}
              className="glass rounded-3xl p-8 md:p-12"
            >
              <Quote className="w-10 h-10 text-teal/25 mb-6" />
              <p className="text-white/75 text-lg md:text-xl leading-relaxed mb-8 font-light italic">
                "{testimonials[cur].review}"
              </p>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${testimonials[cur].color} rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                    {testimonials[cur].initials}
                  </div>
                  <div>
                    <p className="font-bold text-white">{testimonials[cur].name}</p>
                    <p className="text-white/45 text-sm">{testimonials[cur].role}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: testimonials[cur].rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-5 mt-8">
            <button onClick={() => setCur(c => (c - 1 + testimonials.length) % testimonials.length)} className="w-11 h-11 glass rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCur(i)} className={`transition-all duration-300 rounded-full ${i === cur ? 'w-8 h-2 bg-teal' : 'w-2 h-2 bg-white/25 hover:bg-white/50'}`} />
              ))}
            </div>
            <button onClick={() => setCur(c => (c + 1) % testimonials.length)} className="w-11 h-11 glass rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
