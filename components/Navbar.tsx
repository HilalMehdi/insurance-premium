'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Shield, ChevronDown } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Insurance', href: '#insurance', dropdown: ['Health', 'Life', 'Car', 'Home', 'Travel', 'Business'] },
  { label: 'Compare', href: '#compare' },
  { label: 'Claims', href: '#claims' },
  { label: 'About', href: '#why-us' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdown, setDropdown] = useState<string | null>(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-dark shadow-2xl' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-gradient-to-br from-teal to-ins-blue rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold text-xl tracking-tight">
            Bima<span className="text-teal">Kavach</span>
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map(link => (
            <li 
              key={link.label} 
              className="relative py-4"
              onMouseEnter={() => link.dropdown && setDropdown(link.label)}
              onMouseLeave={() => setDropdown(null)}
            >
              <a
                href={link.href}
                className="flex items-center gap-1 text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                {link.label}
                {link.dropdown && <ChevronDown className="w-3 h-3" />}
              </a>
              {link.dropdown && dropdown === link.label && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 w-48 glass-dark rounded-2xl p-2 shadow-2xl"
                >
                  {link.dropdown.map(item => (
                    <a key={item} href="#insurance" className="block px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all">
                      {item} Insurance
                    </a>
                  ))}
                </motion.div>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <a href="#quote" className="bg-gradient-to-r from-teal to-ins-blue text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 hover:scale-105 transition-all shadow-lg">
            Get Free Quote
          </a>
        </div>

        <button className="lg:hidden text-white" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden glass-dark border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {navLinks.map(link => (
                <a key={link.label} href={link.href} className="text-white/80 hover:text-white font-medium py-2 border-b border-white/10" onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              ))}
              <a href="#quote" className="bg-gradient-to-r from-teal to-ins-blue text-white px-5 py-3 rounded-full text-center font-semibold mt-2" onClick={() => setMenuOpen(false)}>
                Get Free Quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
