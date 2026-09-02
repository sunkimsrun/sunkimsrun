'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Globe2,
  Briefcase,
  Code2,
  Terminal,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'

interface TimelineYear {
  year: string
  period: string
  title: string
  subtitle: string
  icon: typeof Code2
  accent: string
  skills: string[]
  highlights: string
}

const REAL_TIMELINE_DATA: TimelineYear[] = [
  {
    year: '2011 — 2018',
    period: 'Linguistic & Global Exchange Foundations',
    title: 'Multilingual Communication & International Study',
    subtitle: 'Earned B.A. in English (CMU), B.A. in Japanese (IFL), and completed Japanese study abroad (Nihon Wellness University).',
    icon: Globe2,
    accent: '#3b82f6',
    skills: ['Japanese Fluency', 'English Proficiency', 'Cross-Cultural Communication', 'Academic Research'],
    highlights: 'Achieved professional fluency in Japanese and English, completing international academic exchange in Japan.',
  },
  {
    year: '2018 — 2023',
    period: 'Professional Operations & Teaching',
    title: 'Educational Management & Instruction',
    subtitle: 'Japanese Teacher & Manager at One Visa Education Center, HIRAYAMA School Co., Ltd, and International Easy Reach.',
    icon: Briefcase,
    accent: '#a855f7',
    skills: ['School Management', 'Japanese Instruction', 'Technical Translation', 'Team Leadership'],
    highlights: 'Managed school operational workflows and led technical/business translation projects across Japanese and Khmer.',
  },
  {
    year: '2022 — 2026',
    period: 'IT & Systems Specialization',
    title: 'Software Development & Computer Science Studies',
    subtitle: 'Enrolled in Instinct Institute (IT School, Graduated 2026) and RUPP Information Technology B.S. degree.',
    icon: Terminal,
    accent: '#10b981',
    skills: ['Programming in C / C++', 'Java', 'Data Structures & Algorithms', 'Database Systems', 'Web Development'],
    highlights: 'Mastered core computer science principles, database modeling, and full-stack software development.',
  },
  {
    year: '2026+',
    period: 'Full-Stack Software Engineering',
    title: 'Enterprise Web Applications & Security Engineering',
    subtitle: 'Architecting high-performance full-stack web applications, microservices, and security solutions.',
    icon: ShieldCheck,
    accent: '#f59e0b',
    skills: [
      'Next.js 15 & React',
      'TypeScript & Node.js',
      'PostgreSQL & Redis',
      'Application Security & Cryptography',
    ],
    highlights: 'Building production-ready scalable web platforms, real-time collaboration engines, and API microservices.',
  },
]

export function Timeline() {
  const containerRef = useRef<HTMLElement>(null)
  const inView = useInView(containerRef, { once: true, margin: '-80px' })

  return (
    <section id="journey" ref={containerRef} className="relative py-36 sm:py-44 overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-20 sm:mb-24">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono tracking-widest" style={{ color: 'var(--accent-cyan)' }}>
                03 /
              </span>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400">
                Personal & Career Progression
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Development Journey
            </h2>
          </div>
          <p className="text-sm sm:text-base max-w-md leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            My evolution from multilingual education and international study in Japan to software engineering and Information Technology.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Glowing Line */}
          <div
            className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 rounded-full hidden sm:block opacity-30"
            style={{
              background: 'linear-gradient(180deg, #3b82f6 0%, #a855f7 33%, #10b981 66%, #f59e0b 100%)',
            }}
          />

          {/* Timeline Nodes */}
          <div className="space-y-16 sm:space-y-24">
            {REAL_TIMELINE_DATA.map((item, idx) => {
              const Icon = item.icon
              const isEven = idx % 2 === 0

              return (
                <div
                  key={item.year}
                  className={`relative flex flex-col sm:flex-row items-stretch sm:items-center gap-8 sm:gap-12 ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Center Node Badge */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-0 sm:top-1/2 -translate-y-1/2 z-10 hidden sm:flex items-center justify-center">
                    <div
                      className="w-12 h-12 rounded-full border-2 flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                      style={{
                        background: 'var(--bg-card-solid)',
                        borderColor: item.accent,
                        boxShadow: `0 0 20px ${item.accent}30`,
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: item.accent }} />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="w-full sm:w-[calc(50%-3rem)]">
                    <div
                      className="p-8 sm:p-9 rounded-3xl border glass transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group space-y-5"
                      style={{
                        borderColor: 'var(--glass-border)',
                        background: 'var(--bg-card)',
                      }}
                    >
                      {/* Top Bar: Year & Badge */}
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className="text-xs font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                            style={{
                              background: `${item.accent}15`,
                              color: item.accent,
                              border: `1px solid ${item.accent}35`,
                            }}
                          >
                            {item.year}
                          </span>
                          <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                            {item.period}
                          </span>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors" style={{ color: 'var(--text-primary)' }}>
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                          {item.subtitle}
                        </p>
                      </div>

                      {/* Topic Progression Chips (→ Item) */}
                      <div className="space-y-3 pt-2">
                        <div className="text-[11px] font-mono uppercase font-semibold tracking-wider text-zinc-400">
                          Milestones & Skills
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {item.skills.map((skill) => (
                            <span
                              key={skill}
                              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl font-mono transition-colors group-hover:border-white/20"
                              style={{
                                background: 'var(--hover-overlay)',
                                color: 'var(--text-primary)',
                                border: '1px solid var(--glass-border)',
                              }}
                            >
                              <ArrowRight className="w-3 h-3 shrink-0" style={{ color: item.accent }} />
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Summary Highlight */}
                      <div
                        className="p-4 rounded-2xl border text-xs font-mono flex items-start gap-3"
                        style={{
                          background: 'rgba(0,0,0,0.2)',
                          borderColor: 'var(--glass-border)',
                          color: 'var(--text-muted)',
                        }}
                      >
                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: item.accent }} />
                        <span className="leading-relaxed">{item.highlights}</span>
                      </div>
                    </div>
                  </div>

                  {/* Empty Spacer for layout balance */}
                  <div className="hidden sm:block w-[calc(50%-3rem)]" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
