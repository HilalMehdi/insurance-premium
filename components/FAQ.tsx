'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  { q: 'How do I choose the right insurance plan?', a: 'Our AI-powered comparison tool analyses your age, health, income, and lifestyle to recommend the most suitable plan. You can also speak with our expert advisors at no cost for personalised guidance.' },
  { q: 'What is the claim process and how long does it take?', a: 'Our 5-step process: Report → Submit Documents → Verification → Approval → Settlement. Cashless claims process within 24–48 hours; reimbursement claims settle within 7 working days.' },
  { q: 'Are there any hidden charges or fees?', a: 'Absolutely not. Our service is completely free for policyholders — we earn a small commission from insurance companies. The premium shown is exactly what you pay, with zero mark-up.' },
  { q: 'Can I port my existing insurance to InsureShield?', a: 'Yes! We make porting seamless without losing any benefits or waiting periods. Our advisors handle all paperwork and ensure zero break in coverage during transition.' },
  { q: 'Is my personal data safe with InsureShield?', a: 'Your data is encrypted with bank-grade 256-bit SSL encryption. We are IRDAI compliant and never share your information with third parties without your explicit consent.' },
  { q: 'Do you cover pre-existing conditions?', a: 'Many partners offer coverage for pre-existing conditions after a 2–4 year waiting period. Some premium plans offer immediate coverage for certain conditions. Our advisors can guide you to the best option.' },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="section-padding bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-teal font-semibold text-sm uppercase tracking-widest">FAQ</span>
          <h2 className="font-serif text-[clamp(2rem,6vw,3rem)] font-bold text-navy mt-3 mb-4 leading-tight">
            Got <span className="gradient-text">Questions?</span>
          </h2>
          <p className="text-slate-500 text-lg">Everything you need to know about insurance with InsureShield.</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left group hover:bg-slate-50/80 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold text-navy pr-4 group-hover:text-ins-blue transition-colors">{faq.q}</span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${open === i ? 'bg-gradient-to-r from-teal to-ins-blue' : 'bg-slate-100 group-hover:bg-slate-200'}`}>
                  {open === i ? <Minus className="w-4 h-4 text-white" /> : <Plus className="w-4 h-4 text-slate-500" />}
                </div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
                    <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-50 pt-4">{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
