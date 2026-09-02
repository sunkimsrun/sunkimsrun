'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Github,
  ArrowUpRight,
  Sparkles,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Code2,
  Eye,
} from 'lucide-react'
import { projectsData } from '@/data/projects'

export function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const playingRef = useRef(true)

  const currentProject = projectsData[currentIndex]

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projectsData.length)
    }, 3000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const togglePlay = () => {
    if (playingRef.current) {
      if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null }
      playingRef.current = false
      setIsPlaying(false)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % projectsData.length)
      }, 3000)
      playingRef.current = true
      setIsPlaying(true)
    }
  }

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % projectsData.length)
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length)

  const goToDetail = (slug: string) => { window.location.href = `/projects/${slug}` }

  return (
    <section id="projects" className="relative py-16 sm:py-20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 sm:mb-10">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Projects
            </h2>
            <div className="hidden sm:block h-px w-20" style={{ background: 'var(--glass-border)' }} />
          </div>
        </div>

        <div className="relative rounded-3xl border glass overflow-hidden shadow-2xl"
          style={{ borderColor: 'var(--glass-border)', background: 'var(--bg-card)' }}>

          {isPlaying && (
            <div className="w-full h-1 bg-white/5 overflow-hidden">
              <div key={currentIndex} className="h-full bg-linear-to-r from-cyan-500 via-blue-500 to-indigo-500"
                style={{ animation: 'progressBar 3s linear forwards' }} />
            </div>
          )}

          <div className="relative z-20 px-6 py-4 border-b border-white/5 flex items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="font-bold text-cyan-400">0{currentIndex + 1} / 0{projectsData.length}</span>
              <span className="hidden sm:inline text-white/30">|</span>
              <span className="hidden sm:inline text-white/70">Click project to view full case study</span>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={togglePlay}
                className="p-1.5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors text-white/70 hover:text-white cursor-pointer"
                title={isPlaying ? 'Pause' : 'Resume'}>
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button type="button" onClick={handlePrev}
                className="p-1.5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors text-white/70 hover:text-white cursor-pointer">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button type="button" onClick={handleNext}
                className="p-1.5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors text-white/70 hover:text-white cursor-pointer">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onAnimationStart={() => setIsAnimating(true)}
            onAnimationComplete={() => setIsAnimating(false)}
            transition={{ duration: 0.25 }}
            className={`relative z-0 p-4 sm:p-6 lg:p-10 grid lg:grid-cols-12 gap-6 lg:gap-12 items-center ${isAnimating ? 'pointer-events-none' : ''}`}
          >
            <div onClick={() => goToDetail(currentProject.slug)}
              className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 aspect-video flex items-center justify-center hover:border-cyan-500/40 transition-colors shadow-xl min-h-45 sm:min-h-60 cursor-pointer group/img">
              {currentProject.image
                ? <img src={currentProject.image} alt={currentProject.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/img:scale-105" />
                : <div className="flex flex-col items-center gap-3 p-8 text-center">
                  <Code2 className="w-12 h-12 text-cyan-400" />
                  <span className="text-sm font-mono text-white/70">{currentProject.title}</span>
                </div>
              }
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px] font-mono text-white/90 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" /> View Case Study ↗
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center gap-2 flex-wrap">
                {currentProject.isFlagship && (
                  <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full font-mono font-semibold"
                    style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.3)' }}>
                    <Sparkles className="w-3.5 h-3.5" /> Flagship System
                  </span>
                )}
                <span className="text-xs px-3 py-1 rounded-full font-mono"
                  style={{ background: `${currentProject.accent}20`, color: currentProject.accent, border: `1px solid ${currentProject.accent}40` }}>
                  {currentProject.timeline}
                </span>
              </div>

              <h3 onClick={() => goToDetail(currentProject.slug)}
                className="text-2xl sm:text-3xl font-bold tracking-tight hover:text-cyan-400 transition-colors cursor-pointer"
                style={{ color: 'var(--text-primary)' }}>
                {currentProject.title}
              </h3>

              <p className="text-sm sm:text-base leading-relaxed text-slate-300">{currentProject.tagline}</p>

              <div className="flex flex-wrap gap-2 pt-1">
                {currentProject.tech.map((t) => (
                  <span key={t} className="text-xs px-3 py-1 rounded-lg font-mono"
                    style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', border: '1px solid var(--glass-border)' }}>
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-4 flex-wrap">
                <button type="button" onClick={() => goToDetail(currentProject.slug)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-semibold text-white transition-all shadow-lg hover:scale-105 cursor-pointer"
                  style={{ background: `linear-gradient(135deg, ${currentProject.accent}cc, ${currentProject.accent}88)`, border: `1px solid ${currentProject.accent}60` }}>
                  <Eye className="w-4 h-4" /> View Project Detail
                </button>
                <a href={currentProject.github} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all">
                  <Github className="w-4 h-4" /> GitHub
                </a>
              </div>
            </div>
          </motion.div>
        </div>

      </div>

      <style jsx global>{`
        @keyframes progressBar { 0% { width: 0% } 100% { width: 100% } }
      `}</style>
    </section>
  )
}
