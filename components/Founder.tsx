'use client'
import { motion } from 'framer-motion'
import { CheckCircle, Award, Star, Users } from 'lucide-react'

const credentials = [
  { icon: Award,       text: '30+ Years PSU Experience' },
  { icon: CheckCircle, text: 'Retired Officer, New India Assurance' },
  { icon: Star,        text: 'Deep Expertise in Claim Settlement' },
  { icon: Users,       text: 'Personalised Portfolio Management' },
]

export default function Founder() {
  return (
    <section id="founder" className="section-padding bg-navy relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-ins-blue/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-teal/10 to-transparent -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-teal font-semibold text-sm uppercase tracking-widest">Meet the Expert</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mt-3">
            The Principal <span className="gradient-text">Advisor</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — CTA Button replacing photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center"
          >
            <motion.a
              href="#calculator"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-teal to-ins-blue text-white px-8 py-6 rounded-3xl font-bold shadow-2xl shadow-teal/30 hover:shadow-teal/40 transition-all flex flex-col items-center gap-2 group w-full max-w-sm text-center border border-white/10"
            >
              <span className="text-2xl font-serif">Calculate Premium</span>
              <span className="text-white/80 font-normal">Get instant estimate in seconds &rarr;</span>
            </motion.a>
          </motion.div>

          {/* Right — bio */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="font-serif text-3xl font-bold text-white mb-1">Anwar Hussain Zaidi</h3>
            <p className="text-teal font-semibold text-sm mb-6 uppercase tracking-widest">
              Founder &amp; Principal Insurance Advisor
            </p>

            <div className="space-y-4 mb-8 text-white/60 leading-relaxed text-[0.95rem]">
              <p>
                Retiring as an esteemed Officer from the <strong className="text-white/80">New India Assurance Company</strong>, Mr. Anwar Hussain Zaidi brings an unparalleled depth of knowledge to the insurance sector.
              </p>
              <p>
                With over three decades of hands-on experience in <strong className="text-white/80">underwriting, claims management, and risk assessment</strong>, he understands the intricacies of the Indian insurance landscape like few others.
              </p>
              <p>
                His philosophy is simple: <em className="text-teal">"Insurance is not just a product — it is a promise of protection when you need it most."</em>
              </p>
            </div>

            {/* Credential grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {credentials.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 glass rounded-xl px-4 py-3">
                  <Icon className="w-4 h-4 text-teal flex-shrink-0" />
                  <span className="text-white/70 text-sm font-medium">{text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <motion.a
              href="#quote"
              whileHover={{ scale: 1.04 }}
              className="inline-flex items-center gap-2 mt-8 bg-gradient-to-r from-teal to-ins-blue text-white px-7 py-3.5 rounded-full font-semibold shadow-xl shadow-teal/20 hover:opacity-90 transition-all"
            >
              Book a Free Consultation →
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
