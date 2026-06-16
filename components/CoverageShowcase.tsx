'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Plane, Briefcase, CheckCircle, ArrowRight } from 'lucide-react'

const coverages = [
  {
    id: 'home',
    icon: Home,
    title: 'Home Insurance',
    headline: 'Protect Your Sanctuary',
    desc: 'Safeguard your house and valuable belongings against fire, natural disasters, theft, and structural damage with guaranteed full protection.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200',
    benefits: ['Affordable premiums', 'Quick claim settlement', 'Comprehensive coverage', '24/7 assistance']
  },
  {
    id: 'travel',
    icon: Plane,
    title: 'Travel Insurance',
    headline: 'Travel with Absolute Confidence',
    desc: 'Stay protected during domestic and international travel. Coverage includes medical emergencies, trip cancellations, and lost baggage.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1200',
    benefits: ['Global coverage', 'Cashless hospitalization', 'Instant policy issuance', 'Emergency evacuation']
  },
  {
    id: 'business',
    icon: Briefcase,
    title: 'Business Insurance',
    headline: 'Secure Your Enterprise',
    desc: 'Comprehensive protection for offices, startups, and manufacturing units against property damage, public liability, and cyber threats.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
    benefits: ['Tailored business plans', 'Flexible coverage', 'Expert support', 'Business interruption']
  }
]

export default function CoverageShowcase() {
  const [activeTab, setActiveTab] = useState(coverages[0].id)
  
  const activeData = coverages.find(c => c.id === activeTab)!

  return (
    <section id="coverage-showcase" className="section-padding bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: Interactive Navigation */}
          <div className="lg:col-span-4 flex flex-col gap-6 relative">
            {/* The single eyebrow allowed for this entire block */}
            <h2 className="font-serif text-[clamp(2rem,4vw,2.5rem)] font-bold text-[#050505] leading-tight mb-8">
              Tailored <br/>
              <span className="text-slate-400">For Your Life.</span>
            </h2>
            
            <div className="flex flex-col gap-3">
              {coverages.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-4 p-5 rounded-2xl transition-all duration-500 text-left w-full group relative overflow-hidden border ${isActive ? 'bg-[#050505] border-[#050505] shadow-xl' : 'bg-white border-slate-200 hover:border-slate-300'}`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${isActive ? 'bg-white/10 text-white' : 'bg-slate-100 text-[#050505] group-hover:bg-slate-200'}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`font-semibold text-lg transition-colors ${isActive ? 'text-white' : 'text-[#050505]'}`}>
                      {tab.title}
                    </span>
                    {isActive && (
                      <motion.div layoutId="activeTabIndicator" className="absolute left-0 top-0 bottom-0 w-1.5 bg-teal" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right Column: Dynamic Content Area */}
          <div className="lg:col-span-8 relative min-h-[600px] lg:min-h-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeData.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full flex flex-col"
              >
                {/* Image Showcase */}
                <div className="w-full h-[350px] sm:h-[450px] rounded-3xl overflow-hidden relative mb-8 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent z-10" />
                  <img 
                    src={activeData.image} 
                    alt={activeData.headline} 
                    className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                    <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-2">{activeData.headline}</h3>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <p className="text-slate-600 text-lg leading-relaxed">{activeData.desc}</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    {activeData.benefits.map((benefit, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 + 0.2 }}
                        key={benefit} 
                        className="flex items-center gap-3"
                      >
                        <CheckCircle className="w-5 h-5 text-teal" />
                        <span className="text-slate-700 font-medium">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  )
}
