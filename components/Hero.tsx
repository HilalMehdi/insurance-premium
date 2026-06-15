'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Shield, Heart, Car, Home } from 'lucide-react'

const floatingIcons = [
  { Icon: Shield, color: 'from-teal to-cyan-400', x: '8%', y: '22%', delay: 0.3, dur: 5 },
  { Icon: Heart, color: 'from-rose-400 to-pink-500', x: '84%', y: '18%', delay: 0.6, dur: 6 },
  { Icon: Car, color: 'from-ins-blue to-blue-400', x: '6%', y: '68%', delay: 0.9, dur: 7 },
  { Icon: Home, color: 'from-amber-400 to-orange-500', x: '86%', y: '64%', delay: 1.2, dur: 5.5 },
]

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      o: Math.random() * 0.45 + 0.08,
    }))

    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(20,184,166,${p.o})`
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy">
      {/* Gradient blobs */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-ins-blue/20 to-navy" />
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-teal/8 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-ins-blue/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />

      {/* Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Floating icons */}
      {floatingIcons.map(({ Icon, color, x, y, delay, dur }, i) => (
        <motion.div key={i} className="absolute hidden xl:block" style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay, duration: 0.6, type: 'spring' }}
        >
          <motion.div
            animate={{ y: [-12, 12, -12] }}
            transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut' }}
            className={`w-16 h-16 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center shadow-2xl`}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8"
        >
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="text-white/80 text-sm font-medium">Trusted by 50,000+ families across India</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.9 }}
          className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-white leading-[1.08] mb-6"
        >
          Protect What<br />
          <span className="gradient-text">Matters Most.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
          className="text-white/55 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Comprehensive insurance solutions for your family, health, vehicle, home, travel, and business — backed by India's top 15+ insurers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a href="#quote" className="group flex items-center gap-2 bg-gradient-to-r from-teal to-ins-blue text-white px-9 py-4 rounded-full font-semibold text-lg shadow-2xl shadow-teal/20 hover:scale-105 hover:shadow-teal/40 transition-all duration-300">
            Get Free Quote <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#insurance" className="flex items-center gap-2 glass text-white px-9 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300">
            <Play className="w-4 h-4 fill-white" /> Explore Plans
          </a>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {[['50K+', 'Happy Customers'], ['98%', 'Claim Success'], ['24/7', 'Support'], ['15+', 'Insurers']].map(([v, l]) => (
            <div key={l} className="glass rounded-2xl p-5 text-center">
              <div className="text-2xl md:text-3xl font-bold text-teal mb-1">{v}</div>
              <div className="text-white/55 text-xs font-medium">{l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-white/30 text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  )
}
