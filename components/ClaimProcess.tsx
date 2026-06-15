'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FileText, Upload, Search, ThumbsUp, Banknote } from 'lucide-react'

const steps = [
  { icon: FileText, step: '01', title: 'Notify Claim',          desc: 'Notify us online or via phone immediately after the incident. Available 24/7.', color: 'from-teal to-cyan-400' },
  { icon: Upload,   step: '02', title: 'Submit Documents',      desc: 'Upload required documents through our secure portal or WhatsApp.',             color: 'from-ins-blue to-blue-400' },
  { icon: Search,   step: '03', title: 'Verification',          desc: 'Our claims team verifies documents and assesses the claim within 48 hours.',    color: 'from-violet-400 to-purple-500' },
  { icon: ThumbsUp, step: '04', title: 'Approval',              desc: 'Receive claim approval notification via SMS and email instantly.',              color: 'from-amber-400 to-orange-500' },
  { icon: Banknote, step: '05', title: 'Settlement',            desc: 'Amount transferred directly to your account within 7 working days.',           color: 'from-success to-emerald-400' },
]

export default function ClaimProcess() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] })
  const lineW = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="claims" className="section-padding bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
          <span className="text-teal font-semibold text-sm uppercase tracking-widest">Easy Claims</span>
          <h2 className="font-serif text-[clamp(2rem,6vw,3rem)] font-bold text-navy mt-3 mb-4 leading-tight">
            Fast & Hassle-Free <span className="gradient-text">Claims</span>
          </h2>
          <p className="text-slate-500 text-[clamp(1rem,4vw,1.125rem)] max-w-xl mx-auto">Simple claim process. Average settlement time: 7 days. 24/7 claim support availability with dedicated assistance.</p>
        </motion.div>

        <div ref={ref} className="relative">
          {/* Animated progress line */}
          <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-slate-100 z-0">
            <motion.div className="h-full bg-gradient-to-r from-teal to-success rounded-full" style={{ width: lineW }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 relative z-10">
            {steps.map(({ icon: Icon, step, title, desc, color }, i) => (
              <motion.div key={step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="flex flex-col items-center text-center"
              >
                <motion.div whileHover={{ scale: 1.12, rotate: 6 }} className={`w-20 h-20 bg-gradient-to-br ${color} rounded-3xl flex items-center justify-center mb-5 shadow-xl cursor-default`}>
                  <Icon className="w-9 h-9 text-white" />
                </motion.div>
                <div className={`text-xs font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent mb-2 tracking-wide`}>STEP {step}</div>
                <h3 className="font-bold text-navy text-lg mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-16">
          <a href="#quote" className="inline-flex items-center gap-2 bg-gradient-to-r from-teal to-ins-blue text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-all shadow-xl shadow-teal/20">
            Start a Claim →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
