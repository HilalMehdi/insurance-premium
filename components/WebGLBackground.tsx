'use client'
import { useEffect, useRef } from 'react'

export default function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = canvas.width = window.innerWidth
    let h = canvas.height = window.innerHeight

    let mouseX = w / 2
    let mouseY = h / 2
    let currentX = w / 2
    let currentY = h / 2

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const handleResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    let animationFrame: number

    const isMobile = window.innerWidth < 768
    const maxGrain = isMobile ? 100 : 500 // Dramatically reduce grain count on mobile

    let lastDrawTime = 0
    const fpsLimit = isMobile ? 30 : 60 // Cap framerate to save battery on mobile
    const frameInterval = 1000 / fpsLimit

    const draw = (timestamp: number) => {
      animationFrame = requestAnimationFrame(draw)

      if (timestamp - lastDrawTime < frameInterval) return
      lastDrawTime = timestamp

      // Lerp for smooth following
      currentX += (mouseX - currentX) * 0.05
      currentY += (mouseY - currentY) * 0.05

      ctx.clearRect(0, 0, w, h)

      // Create ambient glowing orb
      const gradient = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, 600)
      gradient.addColorStop(0, 'rgba(20, 184, 166, 0.08)') // teal glow
      gradient.addColorStop(0.5, 'rgba(10, 37, 64, 0.03)') // navy glow
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, w, h)

      // Add grain effect
      ctx.fillStyle = 'rgba(255,255,255,0.01)'
      for (let i = 0; i < maxGrain; i++) {
        ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1)
      }
    }

    animationFrame = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-[-1]"
      style={{ opacity: 0.7 }}
    />
  )
}
