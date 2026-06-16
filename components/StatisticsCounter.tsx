'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, animate } from 'framer-motion'

const stats = [
  { label: "Families Protected", value: 10000, suffix: "+", prefix: "" },
  { label: "Claim Settlement", value: 98, suffix: "%", prefix: "" },
  { label: "Support Available", value: 24, suffix: "/7", prefix: "" },
  { label: "Years Experience", value: 30, suffix: "+", prefix: "" }
]

function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (inView && ref.current) {
      animate(0, value, {
        duration: 2.5,
        ease: [0.22, 1, 0.36, 1], // Custom Apple-like easing
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = Math.ceil(latest).toLocaleString('en-IN')
          }
        }
      })
    }
  }, [inView, value])

  return <span ref={ref}>0</span>
}

export default function StatisticsCounter() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30, scale: 0.95, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      filter: "blur(0px)",
      transition: { type: 'spring', stiffness: 80, damping: 20 }
    }
  }

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 divide-x-0 md:divide-x divide-slate-100"
        >
          {stats.map((stat, i) => (
            <motion.div key={i} variants={itemVariants} className="text-center px-4">
              <div className="text-[clamp(2rem,6vw,3.75rem)] font-serif font-bold text-[#050505] mb-2 flex items-center justify-center">
                <span>{stat.prefix}</span>
                <AnimatedNumber value={stat.value} />
                <span className="text-teal">{stat.suffix}</span>
              </div>
              <p className="text-sm md:text-base text-slate-500 font-medium uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
