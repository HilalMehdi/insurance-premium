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
          <h2 className="font-serif text-[clamp(2rem,6vw,3rem)] font-bold text-white mt-3">
            The Principal <span className="gradient-text">Advisor</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - avatar + badge + CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 80, damping: 20 }}
            className="flex flex-col items-center gap-10"
          >
            {/* Portrait frame */}
            <div className="relative w-72 md:w-80">
              <img 
                src="/images/founder_real.png"
                alt="Rakesh Sharma"
                loading="lazy"
                className="w-full h-auto object-contain drop-shadow-[0_20px_30px_rgba(20,184,166,0.15)]"
              />

              {/* Experience badge */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -right-6 w-28 h-28 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex flex-col items-center justify-center shadow-2xl shadow-amber-500/30 text-navy text-center"
              >
                <span className="text-[clamp(1.5rem,4vw,1.875rem)] font-bold leading-none">30+</span>
                <span className="text-xs font-semibold mt-1 leading-tight px-2">Years of<br />Excellence</span>
              </motion.div>

              {/* Glow ring */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-teal/20 pointer-events-none" />
            </div>

          </motion.div>

          {/* Right - bio */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 80, damping: 20 }}
          >
            <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4 mb-6">
              <div>
                <h3 className="font-serif text-[clamp(1.5rem,5vw,1.875rem)] font-bold text-white mb-1">Anwar Hussain Zaidi</h3>
                <p className="text-teal font-semibold text-sm uppercase tracking-widest">
                  Founder &amp; Principal Insurance Advisor
                </p>
              </div>
              <motion.a
                href="#calculator"
                whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 10 } }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center bg-gradient-to-r from-teal to-blue-500 text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-teal/20 hover:shadow-teal/40 transition-all whitespace-nowrap text-sm mt-1"
              >
                Get Free Quote
              </motion.a>
            </div>

            <div className="space-y-4 mb-8 text-white/60 leading-relaxed text-[0.95rem]">
              <p>
                Retiring as an esteemed Officer from the <strong className="text-white/80">New India Assurance Company</strong>, Mr. Anwar Hussain Zaidi brings an unparalleled depth of knowledge to the insurance sector.
              </p>
              <p>
                With over three decades of hands-on experience in <strong className="text-white/80">underwriting, claims management, and risk assessment</strong>, he understands the intricacies of the Indian insurance industry like few others.
              </p>
              <p>
                His philosophy is simple: <em className="text-teal">"Insurance is not just a product - it is a promise of protection when you need it most."</em>
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
              whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 10 } }}
              whileTap={{ scale: 0.98 }}
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
