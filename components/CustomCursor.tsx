'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    // Only enable custom cursor on devices with a precise pointer (mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)')
    setIsDesktop(mediaQuery.matches)
    
    if (!mediaQuery.matches) return
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      if (mediaQuery.matches) {
        window.removeEventListener('mousemove', updateMousePosition)
        window.removeEventListener('mouseover', handleMouseOver)
      }
    }
  }, [])

  if (!isDesktop) return null

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        * { cursor: none !important; }
      `}} />
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-teal pointer-events-none z-[99999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? 'rgba(20, 184, 166, 0.5)' : 'rgba(20, 184, 166, 0)',
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.5
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[99999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          opacity: isHovering ? 0 : 1
        }}
        transition={{
          type: 'tween',
          ease: 'linear',
          duration: 0.05
        }}
      />
    </>
  )
}
