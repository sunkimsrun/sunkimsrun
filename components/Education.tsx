'use client'

import { GraduationCap, Building2, Calendar, Globe2 } from 'lucide-react'
import { motion } from 'framer-motion'

const REAL_EDUCATION = [
  {
    degree: 'B.A. IT',
    major: 'Information Technology',
    institution: 'Royal University of Phnom Penh (RUPP)',
    location: 'Cambodia',
    period: '2023 — 2026',
    status: 'Graduated',
    statusColor: '#60a5fa',
    statusBg: 'rgba(59,130,246,0.15)',
    statusBorder: 'rgba(59,130,246,0.3)',
    highlight: 'Software Engineering, Web Systems & Databases.',
    accent: '#3b82f6',
  },
  {
    degree: 'Short Course Program',
    major: 'Web Development',
    institution: 'Instinct Institute',
    location: 'Cambodia',
    period: '2022 — 2026',
    status: 'Graduated',
    statusColor: '#34d399',
    statusBg: 'rgba(52,211,153,0.12)',
    statusBorder: 'rgba(52,211,153,0.3)',
    highlight: 'Web Development & Database Design.',
    accent: '#34d399',
  },
  {
    degree: 'Study Abroad',
    major: 'Japanese Language',
    institution: 'Nihon Wellness University',
    location: 'Japan',
    period: '2016 — 2017',
    status: 'Graduated',
    statusColor: '#ea455bff',
    statusBg: 'rgba(192,132,252,0.12)',
    statusBorder: 'rgba(192,132,252,0.3)',
    highlight: 'Study abroad in Japan.',
    accent: '#ea455bff',
  },
  {
    degree: 'B.A. Japanese',
    major: 'Japanese Language',
    institution: 'Institute of Foreign Languages',
    location: 'Cambodia',
    period: '2013 — 2018',
    status: 'Graduated',
    statusColor: '#e5ff25ff',
    statusBg: 'rgba(192,132,252,0.12)',
    statusBorder: 'rgba(192,132,252,0.3)',
    highlight: 'Professional Japanese & translation.',
    accent: '#e5ff25ff',
  },
  {
    degree: 'B.A. English',
    major: 'English Language',
    institution: 'Cambodia Mekong University',
    location: 'Cambodia',
    period: '2011 — 2015',
    status: 'Graduated',
    statusColor: '#2dfff5ff',
    statusBg: 'rgba(52,211,153,0.12)',
    statusBorder: 'rgba(52,211,153,0.3)',
    highlight: 'English proficiency & academic writing.',
    accent: '#2dfff5ff',
  },
]

export function Education() {
  return (
    <section id="education" className="relative py-16 sm:py-20 overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: 'var(--accent-blue)' }}>
              Education History
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-xs leading-relaxed">
            Multilingual background IT, Japanese, and English degrees.
          </p>
        </motion.div>

        {/* All 5 cards in one view — responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {REAL_EDUCATION.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="relative flex flex-col p-5 rounded-2xl border glass group hover:-translate-y-1 transition-all duration-300"
              style={{
                borderColor: 'var(--glass-border)',
                background: 'var(--bg-card)',
                borderTop: `2px solid ${edu.accent}`,
              }}
            >

              {/* Degree badge */}
              <span
                className="inline-block text-[10px] font-mono font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full mb-2 w-fit"
                style={{ color: edu.statusColor, background: edu.statusBg, border: `1px solid ${edu.statusBorder}` }}
              >
                {edu.degree}
              </span>

              {/* Major */}
              <h3
                className="text-sm font-bold leading-snug mb-2 group-hover:text-cyan-400 transition-colors"
                style={{ color: 'var(--text-primary)' }}
              >
                {edu.major}
              </h3>

              {/* Institution */}
              <div className="flex items-center gap-1.5 text-xs font-medium mb-1" style={{ color: edu.accent }}>
                <Building2 className="w-3 h-3 shrink-0" />
                <span className="leading-tight line-clamp-1">{edu.institution}</span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-1 text-[11px] text-zinc-500 mb-3">
                <Globe2 className="w-3 h-3 shrink-0" />
                {edu.location}
              </div>

              {/* Highlight */}
              <p className="text-[11px] leading-relaxed text-zinc-500 flex-1 mb-4">
                {edu.highlight}
              </p>

              {/* Period + Status */}
              <div className="flex flex-col gap-1.5 mt-auto pt-3 border-t" style={{ borderColor: 'var(--glass-border)' }}>
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 font-mono">
                  <Calendar className="w-3 h-3" />
                  {edu.period}
                </div>
                <span
                  className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full w-fit"
                  style={{ color: edu.statusColor, background: edu.statusBg, border: `1px solid ${edu.statusBorder}` }}
                >
                  {edu.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
