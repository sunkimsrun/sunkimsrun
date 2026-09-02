'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Github,
  ExternalLink,
  Cpu,
  Layers,
  Database,
  Lock,
  ShieldCheck,
  Zap,
  Server,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  Award,
  Terminal,
  Activity,
  Code2,
  Box,
} from 'lucide-react'
import { ProjectCaseStudy, DiagramNode } from '@/data/projects'

interface ProjectModalProps {
  project: ProjectCaseStudy | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'flagship' | 'features' | 'challenges' | 'results'>('overview')
  const [selectedScreenshotIndex, setSelectedScreenshotIndex] = useState<number>(0)
  const modalContentRef = useRef<HTMLDivElement>(null)

  // Keyboard trap and ESC handling + Body scroll lock
  useEffect(() => {
    if (!project) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [project, onClose])

  if (!project) return null

  const scrollToSection = (id: string, tabName: typeof activeTab) => {
    setActiveTab(tabName)
    const element = document.getElementById(id)
    if (element && modalContentRef.current) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const getNodeColor = (type: DiagramNode['type']) => {
    switch (type) {
      case 'client':
        return { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.4)', text: '#60a5fa' }
      case 'gateway':
        return { bg: 'rgba(168, 85, 247, 0.15)', border: 'rgba(168, 85, 247, 0.4)', text: '#c084fc' }
      case 'service':
        return { bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.4)', text: '#34d399' }
      case 'database':
        return { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.4)', text: '#fbbf24' }
      case 'cache':
        return { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.4)', text: '#f472b6' }
      case 'external':
        return { bg: 'rgba(14, 165, 233, 0.15)', border: 'rgba(14, 165, 233, 0.4)', text: '#38bdf8' }
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 lg:p-8 overflow-hidden">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          aria-describedby="modal-project-tagline"
          tabIndex={-1}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl max-h-[95vh] sm:max-h-[92vh] flex flex-col rounded-t-2xl sm:rounded-2xl overflow-hidden glass-strong border shadow-2xl z-10 focus:outline-none"
          style={{
            borderColor: 'var(--glass-strong-border)',
            background: 'var(--bg-card-solid)',
          }}
        >
          {/* Header Accent Glow Bar */}
          <div
            className="h-1.5 w-full shrink-0"
            style={{
              background: `linear-gradient(90deg, ${project.accent}, #a855f7, #3b82f6)`,
            }}
          />

          {/* Sticky Header */}
          <div
            className="px-4 sm:px-6 py-4 sm:py-5 shrink-0 flex flex-col gap-3 sm:gap-4 border-b z-20 backdrop-blur-xl"
            style={{
              background: 'var(--glass-strong-bg)',
              borderColor: 'var(--glass-border)',
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  {project.isFlagship && (
                    <span
                      className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-mono font-semibold"
                      style={{
                        background: 'rgba(245, 158, 11, 0.15)',
                        color: '#f59e0b',
                        border: '1px solid rgba(245, 158, 11, 0.3)',
                      }}
                    >
                      <Sparkles className="w-3 h-3" /> Flagship Case Study
                    </span>
                  )}
                  {project.featured && (
                    <span
                      className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-mono"
                      style={{
                        background: `${project.accent}18`,
                        color: project.accent,
                        border: `1px solid ${project.accent}35`,
                      }}
                    >
                      Featured Project
                    </span>
                  )}
                  <span
                    className="text-xs px-2.5 py-0.5 rounded-full font-mono"
                    style={{
                      background: 'var(--hover-overlay)',
                      color: 'var(--text-muted)',
                      border: '1px solid var(--glass-border)',
                    }}
                  >
                    {project.timeline}
                  </span>
                </div>
                <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                  {project.title}
                </h2>
                <p id="modal-project-tagline" className="text-sm text-balance max-w-3xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {project.tagline}
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="p-2 rounded-xl transition-colors hover:bg-white/10 shrink-0"
                style={{ color: 'var(--text-muted)' }}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Quick Action Links & Metadata Bar */}
            <div className="flex items-center justify-between gap-4 pt-1 flex-wrap border-t border-white/5">
              <div className="flex items-center gap-4 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                <span className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-cyan-400" /> <strong className="text-slate-300">Role:</strong> {project.role}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80"
                  style={{
                    background: 'var(--hover-overlay)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--glass-border)',
                  }}
                >
                  <Github className="w-3.5 h-3.5" /> Repository
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white shadow-md transition-all hover:opacity-90"
                  style={{
                    background: project.accent,
                  }}
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                </a>
              </div>
            </div>

            {/* Quick Navigation Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pt-2 no-scrollbar border-t border-white/5">
              {[
                { id: 'sec-overview', tab: 'overview' as const, label: 'Overview & Problem' },
                { id: 'sec-architecture', tab: 'architecture' as const, label: 'System Architecture' },
                ...(project.flagshipSpecs
                  ? [{ id: 'sec-flagship', tab: 'flagship' as const, label: 'Technical Specs' }]
                  : []),
                { id: 'sec-features', tab: 'features' as const, label: 'Key Features' },
                { id: 'sec-challenges', tab: 'challenges' as const, label: 'Challenges & Solutions' },
                { id: 'sec-results', tab: 'results' as const, label: 'Results & Metrics' },
              ].map((item) => (
                <button
                  key={item.tab}
                  onClick={() => scrollToSection(item.id, item.tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${activeTab === item.tab ? 'bg-white/10 text-white font-semibold' : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Scrollable Modal Content */}
          <div
            ref={modalContentRef}
            className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 sm:py-8 space-y-10 sm:space-y-12"
            style={{ color: 'var(--text-primary)' }}
          >
            {/* SECTION 1: PROJECT OVERVIEW, PROBLEM & SOLUTION */}
            <section id="sec-overview" className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: project.accent }} />
                <h3 className="text-lg font-bold tracking-tight uppercase font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                  01. Project Overview & Business Value
                </h3>
              </div>

              <div className="p-6 rounded-2xl border glass" style={{ borderColor: 'var(--glass-border)' }}>
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {project.overview}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {/* Problem */}
                <div
                  className="p-6 rounded-2xl border space-y-3"
                  style={{
                    background: 'rgba(239, 68, 68, 0.04)',
                    borderColor: 'rgba(239, 68, 68, 0.2)',
                  }}
                >
                  <div className="flex items-center gap-2 text-red-400 font-semibold text-sm">
                    <AlertTriangle className="w-4 h-4" /> Problem Statement
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {project.problem}
                  </p>
                </div>

                {/* Solution */}
                <div
                  className="p-6 rounded-2xl border space-y-3"
                  style={{
                    background: 'rgba(16, 185, 129, 0.04)',
                    borderColor: 'rgba(16, 185, 129, 0.2)',
                  }}
                >
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                    <CheckCircle2 className="w-4 h-4" /> Architectural Solution
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {project.solution}
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: SYSTEM ARCHITECTURE & DIAGRAM */}
            <section id="sec-architecture" className="space-y-6 pt-4 border-t border-white/5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: project.accent }} />
                <h3 className="text-lg font-bold tracking-tight uppercase font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                  02. System Architecture Blueprint
                </h3>
              </div>

              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {project.systemArchitecture.summary}
              </p>

              {/* Interactive Architecture SVG Visualizer */}
              <div
                className="p-6 rounded-2xl border space-y-6"
                style={{
                  background: 'var(--bg-secondary)',
                  borderColor: 'var(--glass-border)',
                }}
              >
                <div>
                  <h4 className="font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
                    {project.systemArchitecture.diagram.title}
                  </h4>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                    {project.systemArchitecture.diagram.description}
                  </p>
                </div>

                {/* Diagram Nodes Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {project.systemArchitecture.diagram.nodes.map((node) => {
                    const style = getNodeColor(node.type)
                    return (
                      <div
                        key={node.id}
                        className="p-3.5 rounded-xl border flex flex-col justify-between transition-transform hover:-translate-y-0.5"
                        style={{
                          background: style.bg,
                          borderColor: style.border,
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-black/30" style={{ color: style.text }}>
                            {node.type}
                          </span>
                          <Server className="w-3.5 h-3.5 opacity-60" style={{ color: style.text }} />
                        </div>
                        <div>
                          <div className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                            {node.label}
                          </div>
                          {node.sublabel && (
                            <div className="text-xs font-mono mt-0.5 opacity-75" style={{ color: 'var(--text-secondary)' }}>
                              {node.sublabel}
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Connection Data Flows */}
                <div className="space-y-2 pt-2 border-t border-white/5">
                  <div className="text-xs font-mono uppercase font-semibold text-zinc-400">Data Flow Protocol Pathways</div>
                  <div className="grid gap-2 text-xs">
                    {project.systemArchitecture.diagram.connections.map((conn, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2.5 rounded-lg bg-black/20 border border-white/5 font-mono">
                        <span className="font-semibold text-cyan-400">{conn.from}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                        <span className="font-semibold text-purple-400">{conn.to}</span>
                        <span className="text-zinc-400 text-right ml-auto text-[11px] font-sans truncate">{conn.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: FLAGSHIP TECHNICAL ARCHITECTURE DEEP DIVE */}
            {project.flagshipSpecs && (
              <section id="sec-flagship" className="space-y-6 pt-4 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <h3 className="text-lg font-bold tracking-tight uppercase font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                    03. Flagship Deep-Dive Technical Specifications
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Frontend Architecture */}
                  <div className="p-5 rounded-xl border glass space-y-2" style={{ borderColor: 'var(--glass-border)' }}>
                    <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm font-mono">
                      <Code2 className="w-4 h-4" /> Frontend Architecture
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {project.flagshipSpecs.frontendArchitecture}
                    </p>
                  </div>

                  {/* Backend Architecture */}
                  <div className="p-5 rounded-xl border glass space-y-2" style={{ borderColor: 'var(--glass-border)' }}>
                    <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm font-mono">
                      <Cpu className="w-4 h-4" /> Backend & Serverless Pipeline
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {project.flagshipSpecs.backendArchitecture}
                    </p>
                  </div>

                  {/* Database Architecture */}
                  <div className="p-5 rounded-xl border glass space-y-2" style={{ borderColor: 'var(--glass-border)' }}>
                    <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm font-mono">
                      <Database className="w-4 h-4" /> Database & Caching Topology
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {project.flagshipSpecs.databaseArchitecture}
                    </p>
                  </div>

                  {/* API Communication */}
                  <div className="p-5 rounded-xl border glass space-y-2" style={{ borderColor: 'var(--glass-border)' }}>
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm font-mono">
                      <Activity className="w-4 h-4" /> API Communication Protocols
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {project.flagshipSpecs.apiCommunication}
                    </p>
                  </div>

                  {/* Authentication & Security */}
                  <div className="p-5 rounded-xl border glass space-y-2" style={{ borderColor: 'var(--glass-border)' }}>
                    <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm font-mono">
                      <Lock className="w-4 h-4" /> Auth & Permissions (RBAC)
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {project.flagshipSpecs.authentication}
                    </p>
                  </div>

                  {/* Encryption & Security */}
                  <div className="p-5 rounded-xl border glass space-y-2" style={{ borderColor: 'var(--glass-border)' }}>
                    <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm font-mono">
                      <ShieldCheck className="w-4 h-4" /> Encryption & OWASP Security
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {project.flagshipSpecs.encryptionSecurity}
                    </p>
                  </div>
                </div>

                {/* Performance Considerations */}
                <div
                  className="p-5 rounded-xl border space-y-2"
                  style={{
                    background: 'rgba(59, 130, 246, 0.05)',
                    borderColor: 'rgba(59, 130, 246, 0.2)',
                  }}
                >
                  <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm font-mono">
                    <Zap className="w-4 h-4" /> Performance & Optimization Engineering
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {project.flagshipSpecs.performanceConsiderations}
                  </p>
                </div>
              </section>
            )}

            {/* SECTION 4: TECHNOLOGIES USED */}
            <section className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: project.accent }} />
                <h3 className="text-lg font-bold tracking-tight uppercase font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                  Technologies & Ecosystem Badges
                </h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {project.techCategories.map((cat, idx) => (
                  <div key={idx} className="p-4 rounded-xl border glass space-y-2.5" style={{ borderColor: 'var(--glass-border)' }}>
                    <div className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">{cat.category}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.items.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-2.5 py-1 rounded-lg font-mono"
                          style={{
                            background: 'var(--hover-overlay)',
                            color: 'var(--text-primary)',
                            border: '1px solid var(--glass-border)',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 5: KEY FEATURES */}
            <section id="sec-features" className="space-y-6 pt-4 border-t border-white/5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: project.accent }} />
                <h3 className="text-lg font-bold tracking-tight uppercase font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                  Key Engineered Features
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {project.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="p-5 rounded-xl border glass space-y-2" style={{ borderColor: 'var(--glass-border)' }}>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                        {feat.title}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-cyan-400 shrink-0">
                        {feat.tag}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {feat.description}
                    </p>
                    {feat.implementationNote && (
                      <div className="text-[11px] font-mono p-2 rounded bg-black/20 text-zinc-400 mt-2 border border-white/5">
                        <strong className="text-zinc-300">Impl:</strong> {feat.implementationNote}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 6: DEVELOPMENT PROCESS */}
            <section className="space-y-6 pt-4 border-t border-white/5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: project.accent }} />
                <h3 className="text-lg font-bold tracking-tight uppercase font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                  Development Lifecycle & Timeline
                </h3>
              </div>

              <div className="relative pl-6 border-l-2 space-y-6" style={{ borderColor: project.accent }}>
                {project.developmentProcess.map((proc, idx) => (
                  <div key={idx} className="relative space-y-1">
                    <span
                      className="absolute -left-[31px] top-1 w-3 h-3 rounded-full border-2 bg-black"
                      style={{ borderColor: project.accent }}
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-cyan-400">{proc.phase}</span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400">
                        {proc.duration}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {proc.details}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 7: CHALLENGES & SOLUTIONS */}
            <section id="sec-challenges" className="space-y-6 pt-4 border-t border-white/5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: project.accent }} />
                <h3 className="text-lg font-bold tracking-tight uppercase font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                  Engineering Challenges & Solutions
                </h3>
              </div>

              <div className="space-y-4">
                {project.challenges.map((item, idx) => (
                  <div key={idx} className="p-5 rounded-2xl border glass space-y-3" style={{ borderColor: 'var(--glass-border)' }}>
                    <h4 className="font-bold text-sm text-amber-400 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0" /> Challenge #{idx + 1}: {item.title}
                    </h4>
                    <div className="text-xs space-y-2" style={{ color: 'var(--text-secondary)' }}>
                      <div>
                        <strong className="text-zinc-300">The Problem:</strong> {item.challenge}
                      </div>
                      <div className="p-3 rounded-lg bg-black/30 border border-white/5 text-emerald-300 font-mono text-[11px]">
                        <strong className="text-white">Solution:</strong> {item.solution}
                      </div>
                      <div className="text-cyan-400 font-mono text-[11px]">
                        <strong>Measured Impact:</strong> {item.impact}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 8: RESULTS & OUTCOMES */}
            <section id="sec-results" className="space-y-6 pt-4 border-t border-white/5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: project.accent }} />
                <h3 className="text-lg font-bold tracking-tight uppercase font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                  Results & Quantitative Metrics
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {project.results.map((res, idx) => (
                  <div key={idx} className="p-4 rounded-xl border glass text-center space-y-1" style={{ borderColor: 'var(--glass-border)' }}>
                    <div className="text-2xl sm:text-3xl font-extrabold font-mono" style={{ color: project.accent }}>
                      {res.value}
                    </div>
                    {res.change && (
                      <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {res.change}
                      </span>
                    )}
                    <div className="font-bold text-xs" style={{ color: 'var(--text-primary)' }}>
                      {res.label}
                    </div>
                    <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                      {res.description}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 9: VISUAL SHOWCASE / SCREENSHOTS */}
            <section className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: project.accent }} />
                  <h3 className="text-lg font-bold tracking-tight uppercase font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                    Visual Interface Showcase
                  </h3>
                </div>
              </div>

              {/* Interactive Visual Canvas Mock */}
              <div className="rounded-2xl overflow-hidden border glass space-y-3 p-4" style={{ borderColor: 'var(--glass-border)' }}>
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    <span className="text-xs font-mono text-zinc-400 ml-2">
                      {project.screenshots[selectedScreenshotIndex]?.title || 'Preview Workspace'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {project.screenshots.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedScreenshotIndex(i)}
                        className={`w-2 h-2 rounded-full transition-all ${selectedScreenshotIndex === i ? 'bg-cyan-400 scale-125' : 'bg-white/20'
                          }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Stylized Visual Mockup Frame */}
                <div
                  className="aspect-video w-full rounded-xl border flex flex-col items-center justify-center p-8 relative overflow-hidden group"
                  style={{
                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95))',
                    borderColor: 'var(--glass-border)',
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                      backgroundImage: `radial-gradient(${project.accent} 1px, transparent 1px)`,
                      backgroundSize: '24px 24px',
                    }}
                  />

                  <div className="z-10 text-center space-y-3 max-w-md">
                    <div
                      className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center border shadow-lg"
                      style={{
                        background: `${project.accent}20`,
                        borderColor: project.accent,
                        color: project.accent,
                      }}
                    >
                      {selectedScreenshotIndex === 0 ? (
                        <Layers className="w-8 h-8" />
                      ) : selectedScreenshotIndex === 1 ? (
                        <Cpu className="w-8 h-8" />
                      ) : (
                        <Activity className="w-8 h-8" />
                      )}
                    </div>
                    <h4 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>
                      {project.screenshots[selectedScreenshotIndex]?.title}
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {project.screenshots[selectedScreenshotIndex]?.caption}
                    </p>
                    <div className="pt-2">
                      <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400">
                        Interactive Demonstration Snapshot #{selectedScreenshotIndex + 1}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Thumbnail Selectors */}
                <div className="grid grid-cols-3 gap-2 pt-2">
                  {project.screenshots.map((screen, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedScreenshotIndex(idx)}
                      className={`p-3 rounded-lg border text-left transition-all ${selectedScreenshotIndex === idx
                        ? 'border-cyan-400 bg-cyan-400/10'
                        : 'border-white/5 bg-black/20 hover:bg-white/5'
                        }`}
                    >
                      <div className="text-xs font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                        {screen.title}
                      </div>
                      <div className="text-[10px] text-zinc-500 capitalize">{screen.type} preview</div>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Footer Action Bar */}
          <div
            className="px-4 sm:px-6 py-3 sm:py-4 shrink-0 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 backdrop-blur-xl"
            style={{ background: 'var(--glass-strong-bg)' }}
          >
            <div className="text-xs text-zinc-500 font-mono hidden sm:block">
              Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-zinc-300">Esc</kbd> to close
            </div>

            <div className="flex items-center gap-3 ml-auto">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium border transition-colors hover:bg-white/5"
                style={{ borderColor: 'var(--glass-border)' }}
              >
                <Github className="w-4 h-4" /> View Source
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-lg transition-transform hover:scale-[1.02]"
                style={{ background: project.accent }}
              >
                <ExternalLink className="w-4 h-4" /> Launch Live Demo
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
