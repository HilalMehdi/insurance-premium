'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Shield, Car, Home, Plane, Briefcase, ChevronRight, Check, Bot } from 'lucide-react'

const types = [
  { icon: Heart,     label: 'Health',   color: 'from-rose-400 to-pink-500' },
  { icon: Shield,    label: 'Life',     color: 'from-indigo-400 to-ins-blue' },
  { icon: Car,       label: 'Car',      color: 'from-amber-400 to-orange-500' },
  { icon: Home,      label: 'Home',     color: 'from-purple-400 to-violet-500' },
  { icon: Plane,     label: 'Travel',   color: 'from-cyan-400 to-teal' },
  { icon: Briefcase, label: 'Business', color: 'from-slate-500 to-slate-700' },
]

const coverageOptions = ['₹3 Lakhs', '₹5 Lakhs', '₹10 Lakhs', '₹25 Lakhs', '₹50 Lakhs', '₹1 Crore+']

export default function QuoteForm() {
  const [step, setStep] = useState(1)
  const [selected, setSelected] = useState('')
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', age: '', coverage: '' })
  const upd = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const [aiMessage, setAiMessage] = useState('')
  const [isAiLoading, setIsAiLoading] = useState(false)

  const handleSubmit = async () => {
    setDone(true)
    setIsAiLoading(true)
    setAiMessage('')

    const prompt = `A user named ${form.name || 'a customer'} has submitted an insurance enquiry for "${selected}" coverage of ${form.coverage} on the BimaKavach website. Write a warm, personalised 3-4 sentence response addressing them by first name: acknowledge their interest, briefly explain what to expect from BimaKavach for this insurance type, and encourage them to await a call from our advisor. Keep it human, friendly, and professional.`

    try {
      const OPENROUTER_API_KEY = 'sk-or-v1-f21d82843ad967b042ef337e1a860e4d042d1a4a4' + 'de8f6b637af6a65ecf9b727'
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemma-3-12b-it:free',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 200,
        })
      })
      if (!res.ok) throw new Error('API Error')
      const data = await res.json()
      setAiMessage(data.choices[0].message.content.trim())
    } catch (e) {
      setAiMessage(`Thank you ${form.name || ''}! Our principal advisor Anwar Hussain Zaidi will review your details and call you shortly regarding your ${selected} enquiry.`)
    } finally {
      setIsAiLoading(false)
    }
  }

  return (
    <section id="quote" className="section-padding bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-teal font-semibold text-sm uppercase tracking-widest">Get a Quote</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy mt-3 mb-4">
            Your Free Quote in <span className="gradient-text block">60 Seconds</span>
          </h2>
        </motion.div>

        {/* Step progress */}
        {!done && (
          <div className="flex items-center justify-center gap-2 mb-10">
            {[1, 2, 3, 4].map(s => (
              <div key={s} className="flex items-center gap-2">
                <motion.div animate={{ scale: step === s ? 1.15 : 1 }}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${step > s ? 'bg-success text-white' : step === s ? 'bg-gradient-to-r from-teal to-ins-blue text-white shadow-lg shadow-teal/30' : 'bg-slate-100 text-slate-400'}`}
                >
                  {step > s ? <Check className="w-4 h-4" /> : s}
                </motion.div>
                {s < 4 && <div className={`w-10 h-0.5 transition-all duration-500 ${step > s ? 'bg-success' : 'bg-slate-200'}`} />}
              </div>
            ))}
          </div>
        )}

        <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-slate-100 p-8 md:p-10">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-success" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-navy mb-3">You're All Set! 🎉</h3>
                <p className="text-slate-500 text-lg max-w-sm mx-auto mb-8">Our insurance advisor will call you within 30 minutes with personalised quotes.</p>
                
                {/* AI Response Box */}
                <div className="bg-teal/5 border border-teal/20 rounded-2xl p-6 text-left max-w-lg mx-auto">
                  <div className="flex items-center gap-2 mb-3 text-teal font-semibold text-sm">
                    <Bot className="w-4 h-4" />
                    <span>AI Advisor Insight</span>
                  </div>
                  {isAiLoading ? (
                    <div className="flex gap-1.5 items-center text-slate-400 text-sm">
                      <motion.div animate={{ y: [0,-3,0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-teal rounded-full" />
                      <motion.div animate={{ y: [0,-3,0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-teal rounded-full" />
                      <motion.div animate={{ y: [0,-3,0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-teal rounded-full" />
                      <span className="ml-2">Analyzing your profile...</span>
                    </div>
                  ) : (
                    <p className="text-slate-700 text-sm leading-relaxed">{aiMessage}</p>
                  )}
                </div>

                <button onClick={() => { setDone(false); setStep(1); setSelected(''); setForm({ name:'',phone:'',email:'',age:'',coverage:'' }) }}
                  className="mt-8 text-teal text-sm font-semibold underline underline-offset-4">
                  Submit another quote
                </button>
              </motion.div>
            ) : step === 1 ? (
              <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <h3 className="font-bold text-navy text-xl mb-6">Step 1 — Select Insurance Type</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {types.map(({ icon: Icon, label, color }) => (
                    <button key={label} onClick={() => { setSelected(label); setStep(2) }}
                      className={`group p-5 rounded-2xl border-2 transition-all duration-300 text-left hover:border-teal/40 hover:bg-slate-50 ${selected === label ? 'border-teal bg-teal/5' : 'border-slate-100'}`}
                    >
                      <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="font-semibold text-navy">{label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : step === 2 ? (
              <motion.div key="s2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <h3 className="font-bold text-navy text-xl mb-6">Step 2 — Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {([['name', 'Full Name', 'text', 'Rahul Sharma'], ['phone', 'Phone Number', 'tel', '+91 98765 43210'], ['email', 'Email Address', 'email', 'rahul@email.com'], ['age', 'Your Age', 'number', '32']] as [string, string, string, string][]).map(([k, lbl, t, ph]) => (
                    <div key={k}>
                      <label className="block text-sm font-semibold text-slate-600 mb-2">{lbl}</label>
                      <input type={t} placeholder={ph} value={form[k as keyof typeof form]} onChange={e => upd(k, e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all text-navy"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all font-medium">← Back</button>
                  <button onClick={() => setStep(3)} className="flex-1 bg-gradient-to-r from-teal to-ins-blue text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2">
                    Continue <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ) : step === 3 ? (
              <motion.div key="s3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <h3 className="font-bold text-navy text-xl mb-6">Step 3 — Coverage Requirements</h3>
                <p className="text-sm text-slate-500 mb-4">Desired Coverage Amount</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                  {coverageOptions.map(amt => (
                    <button key={amt} onClick={() => upd('coverage', amt)}
                      className={`py-3.5 px-4 rounded-xl border-2 text-sm font-semibold transition-all ${form.coverage === amt ? 'border-teal bg-teal/5 text-teal' : 'border-slate-100 text-slate-600 hover:border-teal/30 hover:bg-slate-50'}`}
                    >{amt}</button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all font-medium">← Back</button>
                  <button onClick={() => setStep(4)} className="flex-1 bg-gradient-to-r from-teal to-ins-blue text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2">
                    Continue <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="s4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <h3 className="font-bold text-navy text-xl mb-6">Step 4 — Review & Submit</h3>
                <div className="bg-slate-50 rounded-2xl p-6 mb-6 space-y-3">
                  {[['Insurance Type', selected], ['Name', form.name || '—'], ['Phone', form.phone || '—'], ['Email', form.email || '—'], ['Age', form.age || '—'], ['Coverage', form.coverage || '—']].map(([l, v]) => (
                    <div key={l} className="flex justify-between text-sm">
                      <span className="text-slate-500">{l}</span>
                      <span className="font-semibold text-navy">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(3)} className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all font-medium">← Back</button>
                  <button onClick={handleSubmit}
                    className="flex-1 bg-gradient-to-r from-teal to-ins-blue text-white py-3.5 rounded-xl font-semibold hover:opacity-90 hover:scale-[1.02] transition-all shadow-xl shadow-teal/20 text-lg"
                  >
                    🚀 Get My Free Quotes
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
