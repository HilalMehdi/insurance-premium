'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { useForm, Controller } from 'react-hook-form'
import { Calculator, ChevronDown, Activity, User, ShieldCheck, HeartPulse, Clock, Sparkles, MessageCircle, Phone, ArrowRight, ShieldAlert, BadgeCheck, Loader2, CheckCircle } from 'lucide-react'

// --- Custom Animated Counter Component ---
function AnimatedNumber({ value }: { value: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const node = nodeRef.current
    if (!node) return

    const start = parseInt(node.textContent?.replace(/,/g, '') || '0')
    const end = value
    const duration = 800 // ms
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function (easeOutExpo)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      
      const currentVal = Math.floor(start + (end - start) * easeProgress)
      node.textContent = currentVal.toLocaleString('en-IN')

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [value])

  return <span ref={nodeRef}>0</span>
}


// --- Types & Constants ---
type FormValues = {
  type: string
  age: number
  coverage: number
  duration: number
  smoker: boolean
  medical: boolean
  addons: Record<string, boolean>
}

const INSURANCE_TYPES = ['Health Insurance', 'Life Insurance', 'Car Insurance', 'Home Insurance', 'Travel Insurance']
const ADD_ONS = [
  { id: 'critical', label: 'Critical Illness Cover' },
  { id: 'accidental', label: 'Accidental Cover' },
  { id: 'family', label: 'Family Floater' },
  { id: 'zeroDep', label: 'Zero Depreciation' }
]

export default function PremiumCalculator() {
  const [showBreakdown, setShowBreakdown] = useState(false)
  const [phone, setPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { control, watch } = useForm<FormValues>({
    defaultValues: {
      type: 'Health Insurance',
      age: 30,
      coverage: 10000000, // 1 Crore
      duration: 1,
      smoker: false,
      medical: false,
      addons: {}
    }
  })

  const formValues = watch()

  // --- Core Calculation Engine ---
  const premiumData = useMemo(() => {
    const { age, coverage, duration, smoker, medical, addons, type } = formValues

    // Base calculation (approximate generic logic)
    const baseRate = type === 'Life Insurance' ? 0.001 : 0.0015
    const base = coverage * baseRate

    // Adjustments
    let ageMulti = 0
    if (age > 30 && age <= 45) ageMulti = 0.10
    else if (age > 45 && age <= 60) ageMulti = 0.25
    else if (age > 60) ageMulti = 0.50

    const ageAdj = base * ageMulti

    let riskMulti = 0
    if (smoker) riskMulti += 0.20
    if (medical) riskMulti += 0.25
    
    const riskAdj = base * riskMulti

    // Addons
    const activeAddons = Object.values(addons || {}).filter(Boolean).length
    const addonCost = base * (activeAddons * 0.05)

    // Duration Discounts
    let discountMulti = 0
    if (duration === 5) discountMulti = 0.05
    else if (duration === 10) discountMulti = 0.10
    else if (duration === 20) discountMulti = 0.15

    const subtotal = base + ageAdj + riskAdj + addonCost
    const discount = subtotal * discountMulti
    
    const finalYearly = Math.round(subtotal - discount)
    const finalMonthly = Math.round(finalYearly / 12)

    // Protection Score (0-100)
    let score = 50 // Base score
    if (coverage >= 10000000) score += 20 // 1Cr+
    else if (coverage >= 5000000) score += 10
    if (duration >= 10) score += 10
    score += (activeAddons * 5)
    score = Math.min(100, Math.max(0, score))

    return { base: Math.round(base), ageAdj: Math.round(ageAdj), riskAdj: Math.round(riskAdj), addonCost: Math.round(addonCost), discount: Math.round(discount), finalYearly, finalMonthly, score }

  }, [JSON.stringify(formValues)])

  // Helpers
  const formatINR = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)} Crore`
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)} Lakh`
    return `₹${val.toLocaleString('en-IN')}`
  }

  const getRiskColor = () => {
    if (formValues.smoker && formValues.medical) return 'text-rose-500 bg-rose-50 border-rose-200'
    if (formValues.smoker || formValues.medical || formValues.age > 50) return 'text-amber-500 bg-amber-50 border-amber-200'
    return 'text-emerald-500 bg-emerald-50 border-emerald-200'
  }
  
  const getRiskLabel = () => {
    if (formValues.smoker && formValues.medical) return 'High Risk'
    if (formValues.smoker || formValues.medical || formValues.age > 50) return 'Medium Risk'
    return 'Low Risk'
  }

  // --- CTA Handlers ---
  const handleConsultation = async () => {
    if (!phone) return;
    setIsSubmitting(true);
    // Simulate CRM API webhook call
    await new Promise(r => setTimeout(r, 1200));
    setIsSubmitting(false);
    setIsSubmitted(true);
  }

  return (
    <section id="calculator" className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-ins-blue/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* LEFT COLUMN: Value Prop & CTA */}
          <div className="w-full lg:w-5/12 flex flex-col justify-center">
            <span className="text-teal font-semibold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Live Calculator
            </span>
            <h2 className="font-serif text-[clamp(2.5rem,6vw,3rem)] font-bold text-navy mb-6 leading-tight">
              Estimate Your Premium in <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-blue-500">Seconds.</span>
            </h2>
            <p className="text-slate-500 text-[clamp(1rem,4vw,1.125rem)] mb-10 leading-relaxed">
              Adjust the parameters to get an instant, personalized premium estimate built for your exact needs. No paperwork. No waiting.
            </p>

            {/* Premium CTA Card (Lead Generation) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-4 bg-white/60 backdrop-blur-xl border border-white rounded-3xl p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2"></div>
              
              <h3 className="text-2xl font-bold text-navy mb-3">Need Personalized Guidance?</h3>
              <p className="text-slate-500 mb-8 text-sm">
                Our experts can help you compare plans, understand coverage options, and find the absolute best policy for your family's needs.
              </p>

              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-teal/10 text-teal-700 p-5 rounded-2xl border border-teal/20 flex gap-4 mb-8 items-start"
                >
                  <CheckCircle className="w-6 h-6 text-teal shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-teal-800 mb-1">Request Received</h4>
                    <p className="text-sm font-medium text-teal-700/80">
                      Our private concierge desk will contact you at <strong className="text-teal-900">{phone}</strong> within the hour.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col gap-3 mb-8">
                  <input 
                    type="tel"
                    placeholder="Enter your number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white/80 border border-slate-200 rounded-xl py-3.5 px-4 text-navy font-medium focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-all"
                  />
                  <button 
                    onClick={handleConsultation}
                    disabled={isSubmitting || !phone}
                    className="group w-full bg-gradient-to-r from-teal to-ins-blue text-white py-3.5 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-teal/20 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <MessageCircle className="w-5 h-5" />}
                    {isSubmitting ? 'Securing Slot...' : 'Schedule Private Consultation'}
                    {!isSubmitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                  </button>
                </div>
              )}

              <div className="border-t border-slate-100 pt-5 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden">
                      <User className="w-4 h-4 text-slate-400" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-1 mb-1">
                    {[1,2,3,4,5].map(s => <Sparkles key={s} className="w-3 h-3 text-amber-400 fill-amber-400" />)}
                  </div>
                  <p className="text-xs font-semibold text-slate-600">Certified Expert Advisors</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Interactive Calculator */}
          <div className="w-full lg:w-7/12">
            <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] p-6 md:p-10 border border-white shadow-2xl shadow-slate-200/50">
              
              <div className="space-y-8">
                
                {/* Insurance Type */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-navy mb-3">
                    <ShieldCheck className="w-4 h-4 text-teal" /> Insurance Type
                  </label>
                  <Controller
                    name="type"
                    control={control}
                    render={({ field }) => (
                      <div className="relative">
                        <select 
                          {...field}
                          className="w-full appearance-none bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-5 pr-12 text-navy text-base font-semibold focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all cursor-pointer"
                        >
                          {INSURANCE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                      </div>
                    )}
                  />
                </div>

                {/* Grid for Age & Coverage */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Coverage Slider */}
                  <div>
                    <div className="flex justify-between items-end mb-3">
                      <label className="text-sm font-bold text-navy">Coverage Amount</label>
                      <span className="text-teal font-bold bg-teal/10 px-3 py-1 rounded-lg text-sm">
                        {formatINR(formValues.coverage)}
                      </span>
                    </div>
                    <Controller
                      name="coverage"
                      control={control}
                      render={({ field }) => (
                        <div className="relative pt-2 pb-6">
                          <input 
                            type="range" 
                            min={1000000} 
                            max={1000000000} 
                            step={10000000}
                            {...field}
                            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-teal hover:accent-teal/80 transition-all"
                          />
                          <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                            <span>₹10L</span>
                            <span>₹100Cr</span>
                          </div>
                        </div>
                      )}
                    />
                  </div>

                  {/* Age Slider */}
                  <div>
                    <div className="flex justify-between items-end mb-3">
                      <label className="text-sm font-bold text-navy">Your Age</label>
                      <span className="text-teal font-bold bg-teal/10 px-3 py-1 rounded-lg text-sm">
                        {formValues.age} Yrs
                      </span>
                    </div>
                    <Controller
                      name="age"
                      control={control}
                      render={({ field }) => (
                        <div className="relative pt-2 pb-6">
                          <input 
                            type="range" 
                            min={18} 
                            max={80} 
                            {...field}
                            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-teal hover:accent-teal/80 transition-all"
                          />
                          <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                            <span>18</span>
                            <span>80</span>
                          </div>
                        </div>
                      )}
                    />
                  </div>
                </div>

                {/* Duration & Risk Toggles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Duration */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-navy mb-3">
                      <Clock className="w-4 h-4 text-teal" /> Policy Duration
                    </label>
                    <Controller
                      name="duration"
                      control={control}
                      render={({ field }) => (
                        <div className="flex gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                          {[1, 5, 10, 20].map(yrs => (
                            <button
                              key={yrs}
                              type="button"
                              onClick={() => field.onChange(yrs)}
                              className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${field.value === yrs ? 'bg-white shadow-sm text-teal border border-slate-200/50' : 'text-slate-500 hover:text-navy'}`}
                            >
                              {yrs}Y
                            </button>
                          ))}
                        </div>
                      )}
                    />
                  </div>

                  {/* Risk Profile */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-navy mb-3">
                      <Activity className="w-4 h-4 text-teal" /> Lifestyle Factors
                    </label>
                    <div className="flex gap-4">
                      <Controller
                        name="smoker"
                        control={control}
                        render={({ field }) => (
                          <button
                            type="button"
                            onClick={() => field.onChange(!field.value)}
                            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${field.value ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100'}`}
                          >
                            Smoker
                          </button>
                        )}
                      />
                      <Controller
                        name="medical"
                        control={control}
                        render={({ field }) => (
                          <button
                            type="button"
                            onClick={() => field.onChange(!field.value)}
                            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${field.value ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100'}`}
                          >
                            History
                          </button>
                        )}
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* LIVE RESULTS PANEL */}
              <div className="mt-10 bg-navy rounded-3xl p-1 relative overflow-hidden shadow-2xl shadow-navy/20">
                <div className="absolute inset-0 bg-gradient-to-br from-teal/20 to-transparent opacity-50"></div>
                
                <div className="bg-navy/90 backdrop-blur-md rounded-[1.4rem] p-6 md:p-8 relative z-10 border border-white/10">
                  
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
                    <div>
                      <p className="text-white/60 text-sm font-medium mb-1 uppercase tracking-wider">Est. Annual Premium</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-[clamp(2rem,6vw,3rem)] font-serif font-bold text-white leading-none">
                          ₹<AnimatedNumber value={premiumData.finalYearly} />
                        </span>
                        <span className="text-white/50">/ year</span>
                      </div>
                      <p className="text-teal text-sm mt-2 font-medium">
                        ≈ ₹<AnimatedNumber value={premiumData.finalMonthly} /> / month
                      </p>
                    </div>

                    <div className="flex gap-4 items-center bg-white/5 py-3 px-5 rounded-2xl border border-white/5">
                      <div className="relative w-14 h-14">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          <path strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                          <path strokeDasharray={`${premiumData.score}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#14B8A6" strokeWidth="3" className="transition-all duration-1000 ease-out" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                          <span className="text-white font-bold text-sm">{premiumData.score}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">Protection</div>
                        <div className="text-white/50 text-xs">Score</div>
                      </div>
                    </div>
                  </div>

                  {/* Risk Profile Pill */}
                  <div className="flex gap-3 mb-6">
                     <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getRiskColor()}`}>
                       {getRiskLabel()}
                     </span>
                     {premiumData.discount > 0 && (
                        <span className="text-xs font-bold px-3 py-1 rounded-full border text-teal bg-teal/10 border-teal/20">
                          Duration Discount Applied
                        </span>
                     )}
                  </div>

                  {/* Expandable Breakdown Accordion */}
                  <div className="border-t border-white/10 pt-4">
                    <button 
                      onClick={() => setShowBreakdown(!showBreakdown)}
                      className="w-full flex justify-between items-center text-sm font-medium text-white/70 hover:text-white transition-colors"
                    >
                      View Premium Breakdown
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showBreakdown ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {showBreakdown && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-5 space-y-3 text-sm">
                            <div className="flex justify-between text-white/80">
                              <span>Base Premium</span>
                              <span>₹{premiumData.base.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between text-white/80">
                              <span>Age Adjustment</span>
                              <span className="text-amber-400">+{premiumData.ageAdj > 0 ? `₹${premiumData.ageAdj.toLocaleString('en-IN')}` : '₹0'}</span>
                            </div>
                            <div className="flex justify-between text-white/80">
                              <span>Risk Factors</span>
                              <span className="text-amber-400">+{premiumData.riskAdj > 0 ? `₹${premiumData.riskAdj.toLocaleString('en-IN')}` : '₹0'}</span>
                            </div>
                            <div className="flex justify-between text-teal font-medium border-t border-white/10 pt-2 mt-2">
                              <span>Long-term Discount</span>
                              <span>-₹{premiumData.discount.toLocaleString('en-IN')}</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

