'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowLeft,
  Github,
  ExternalLink,
  ChevronDown,
  ArrowUpRight,
  Code2,
  Check,
} from 'lucide-react'
import { ProjectCaseStudy } from '@/data/projects'

interface Props {
  project: ProjectCaseStudy
}

export default function ProjectDetailClient({ project }: Props) {
  const contentRef = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll()

  // Background image subtle zoom
  const imageScale = useTransform(scrollY, [0, 1000], [1, 1.05])
  const heroTextOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const heroTextY = useTransform(scrollY, [0, 300], [0, -40])

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const accentColor = project.accent || '#06b6d4'

  return (
    <div
      className="relative min-h-screen selection:bg-cyan-500/30 selection:text-white"
      style={{ color: '#f4f4f5' }}
    >
      {/* ─────────────────────────────────────────────────────────────
          STICKY TOP NAVIGATION BAR
      ────────────────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 pointer-events-none">
        <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
          {/* Back Button */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-medium backdrop-blur-xl bg-black/60 border border-white/20 text-zinc-200 hover:text-white hover:border-cyan-400/60 hover:bg-black/80 transition-all shadow-2xl group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to Projects</span>
          </Link>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          PINNED FULL-SCREEN IMAGE (ALWAYS FULLY VISIBLE IN BACKGROUND)
      ────────────────────────────────────────────────────────────── */}
      <div className="fixed inset-0 w-full h-screen z-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ scale: imageScale }}
          className="w-full h-full relative flex items-center justify-center p-2 sm:p-6 lg:p-8"
        >
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-contain object-center"
            />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-[#0e0033] via-[#080022] to-black flex items-center justify-center">
              <Code2 className="w-24 h-24 text-zinc-700" />
            </div>
          )}

          {/* Shading for text contrast without hiding image */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/30" />
        </motion.div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          HERO SCREEN 1 (FULL VIEWPORT ON INITIAL LOAD)
      ────────────────────────────────────────────────────────────── */}
      <section className="relative w-full h-dvh flex flex-col justify-end z-10 pointer-events-auto">
        <motion.div
          style={{ y: heroTextY, opacity: heroTextOpacity }}
          className="max-w-5xl mx-auto w-full px-5 sm:px-8 pb-16 sm:pb-24 flex flex-col items-start gap-4"
        >
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className="px-3.5 py-1 rounded-full text-xs font-mono font-medium backdrop-blur-xl shadow-lg"
              style={{
                background: `${accentColor}35`,
                color: '#fff',
                border: `1px solid ${accentColor}70`,
              }}
            >
              {project.timeline}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] max-w-4xl leading-tight">
            {project.title}
          </h1>

          <p className="text-sm sm:text-lg text-zinc-200 font-normal max-w-2xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {project.tagline}
          </p>

          <button
            onClick={scrollToContent}
            className="mt-4 inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-mono font-semibold text-white bg-black/60 hover:bg-black/85 border border-white/30 backdrop-blur-xl transition-all shadow-2xl group cursor-pointer hover:scale-105"
          >
            <span>Scroll down for details</span>
            <ChevronDown className="w-4 h-4 text-cyan-400 animate-bounce group-hover:translate-y-1 transition-transform" />
          </button>
        </motion.div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          PURE TEXT DETAILS (NO CARD BACKGROUNDS)
      ────────────────────────────────────────────────────────────── */}
      <div
        ref={contentRef}
        className="relative z-20 min-h-screen px-5 sm:px-10 md:px-14 py-20 pb-32"
      >
        <div className="max-w-4xl mx-auto space-y-14">
          {/* ═══════════════════════════════════════════════════════════
              1. OVERVIEW
          ════════════════════════════════════════════════════════════ */}
          <section className="space-y-4">
            <h2
              className="text-2xl sm:text-3xl font-black tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
              style={{ color: accentColor }}
            >
              Overview
            </h2>

            <p className="text-base sm:text-lg text-zinc-100 leading-relaxed font-normal drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              {project.overview}
            </p>

            {(project.problem || project.solution) && (
              <div className="grid sm:grid-cols-2 gap-6 pt-3">
                {project.problem && (
                  <div className="space-y-2">
                    <span className="text-sm font-mono font-bold text-red-400 uppercase tracking-wider block">
                      Problem Context:
                    </span>
                    <p className="text-sm text-zinc-200 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                      {project.problem}
                    </p>
                  </div>
                )}
                {project.solution && (
                  <div className="space-y-2">
                    <span className="text-sm font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                      Architectural Solution:
                    </span>
                    <p className="text-sm text-zinc-200 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                      {project.solution}
                    </p>
                  </div>
                )}
              </div>
            )}
          </section>

          <hr className="border-white/15" />

          {/* ═══════════════════════════════════════════════════════════
              2. CLIENT, START, COMPLETE
          ════════════════════════════════════════════════════════════ */}
          <section className="space-y-4">
            <h2
              className="text-2xl sm:text-3xl font-black tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
              style={{ color: accentColor }}
            >
              Client, Start, Complete
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-1">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                  Client
                </span>
                <p className="text-base sm:text-lg font-bold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                  {project.client || 'Independent / Open Source Project'}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                  Start Date
                </span>
                <p className="text-base sm:text-lg font-bold text-white font-mono drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                  {project.startDate || 'October 2024'}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                  Complete Date
                </span>
                <p className="text-base sm:text-lg font-bold text-white font-mono drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                  {project.completeDate || project.timeline || 'Completed'}
                </p>
              </div>
            </div>
          </section>

          <hr className="border-white/15" />

          {/* ═══════════════════════════════════════════════════════════
              3. ROLE
          ════════════════════════════════════════════════════════════ */}
          <section className="space-y-3">
            <h2
              className="text-2xl sm:text-3xl font-black tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
              style={{ color: accentColor }}
            >
              Role
            </h2>

            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-bold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                {project.role}
              </h3>
              <p className="text-sm sm:text-base text-zinc-200 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                Owned full-lifecycle development, system design, architectural decisions, and responsive production implementation.
              </p>
            </div>
          </section>

          <hr className="border-white/15" />

          {/* ═══════════════════════════════════════════════════════════
              4. SERVICES
          ════════════════════════════════════════════════════════════ */}
          <section className="space-y-4">
            <h2
              className="text-2xl sm:text-3xl font-black tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
              style={{ color: accentColor }}
            >
              Services
            </h2>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {(project.services && project.services.length > 0
                ? project.services
                : [
                  'Full-Stack Web Architecture',
                  'Database Schema & Index Modeling',
                  'RESTful API Implementation',
                  'Responsive UI/UX System Design',
                  'Security Hardening & Key Protection',
                ]
              ).map((service, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 text-sm sm:text-base text-zinc-100 font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: accentColor }}
                  />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </section>

          <hr className="border-white/15" />

          {/* ═══════════════════════════════════════════════════════════
              5. KEY FEATURE
          ════════════════════════════════════════════════════════════ */}
          <section className="space-y-5">
            <h2
              className="text-2xl sm:text-3xl font-black tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
              style={{ color: accentColor }}
            >
              Key Feature
            </h2>

            <div className="space-y-5">
              {project.keyFeatures.map((feat, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-bold text-base sm:text-lg text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                      {feat.title}
                    </h3>
                    <span className="text-xs font-mono text-cyan-300">
                      [{feat.tag}]
                    </span>
                  </div>
                  <p className="text-sm text-zinc-200 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    {feat.description}
                  </p>
                  {feat.implementationNote && (
                    <p className="text-xs font-mono text-zinc-400">
                      Implementation: {feat.implementationNote}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <hr className="border-white/15" />

          {/* ═══════════════════════════════════════════════════════════
              6. TECHNOLOGY USED
          ════════════════════════════════════════════════════════════ */}
          <section className="space-y-4">
            <h2
              className="text-2xl sm:text-3xl font-black tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
              style={{ color: accentColor }}
            >
              Technology used
            </h2>

            {project.techCategories && project.techCategories.length > 0 ? (
              <div className="space-y-4">
                {project.techCategories.map((cat, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider block">
                      {cat.category}:
                    </span>
                    <p className="text-sm sm:text-base text-zinc-100 font-mono leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                      {cat.items.join(' · ')}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm sm:text-base text-zinc-100 font-mono leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                {project.tech.join(' · ')}
              </p>
            )}
          </section>

          <hr className="border-white/15" />

          {/* ═══════════════════════════════════════════════════════════
              7. LINK (GITHUB REPOSITORY)
          ════════════════════════════════════════════════════════════ */}
          <section className="space-y-5">
            <h2
              className="text-2xl sm:text-3xl font-black tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
              style={{ color: accentColor }}
            >
              Link
            </h2>

            <div className="space-y-4">
              <p className="text-sm sm:text-base text-zinc-200 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                Explore the complete source code, documentation, and installation instructions directly on GitHub.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-mono text-xs sm:text-sm font-semibold text-white bg-cyan-600 hover:bg-cyan-500 transition-all shadow-2xl hover:scale-105"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub Repository</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-mono text-xs sm:text-sm font-semibold text-white border border-white/30 bg-black/50 hover:bg-black/80 transition-all shadow-2xl"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </section>

          {/* Bottom Return Button */}
          <div className="pt-12 flex justify-start">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-mono text-zinc-300 hover:text-white bg-black/60 hover:bg-black/80 border border-white/20 transition-all shadow-xl backdrop-blur-xl group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Return to Portfolio Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
