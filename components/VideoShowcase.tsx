'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause } from 'lucide-react'

export default function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-[clamp(2rem,5vw,3rem)] font-bold text-navy mb-4 leading-tight">
            See the <span className="gradient-text">BimaKavach</span> Difference
          </h2>
          <p className="text-slate-500 text-[clamp(1rem,3vw,1.125rem)] max-w-2xl mx-auto">
            Watch how our premium concierge service transforms the way high-net-worth families experience insurance.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl group border border-slate-100 cursor-pointer"
          onClick={togglePlay}
        >
          {/* REPLACE src="/hero-video.mp4" with your custom video path (e.g. src="/my-video.mp4") once you upload it to the public folder */}
          <video 
            ref={videoRef}
            src="/hero-video.mp4" 
            className="w-full h-full object-cover"
            playsInline
            loop
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
          
          {/* Overlay */}
          <div className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors border border-white/30 shadow-[0_0_40px_rgba(20,184,166,0.3)]">
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-white fill-white" />
                ) : (
                  <Play className="w-8 h-8 text-white fill-white ml-2" />
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
