'use client'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function StickyQuote() {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.5, type: 'spring', stiffness: 200 }}
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 lg:hidden"
    >
      <a href="#quote" className="flex items-center gap-2 bg-gradient-to-r from-teal to-ins-blue text-white px-7 py-3.5 rounded-full font-semibold shadow-2xl shadow-teal/40 hover:scale-105 active:scale-95 transition-all text-sm">
        Get Free Insurance Quote <ArrowRight className="w-4 h-4" />
      </a>
    </motion.div>
  )
}
