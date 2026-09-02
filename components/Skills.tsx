'use client'

import { useRef } from 'react'
import { FaJava } from 'react-icons/fa'
import { motion, useInView } from 'framer-motion'
import { Database, Globe, Lock, ShieldAlert, ShieldCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import {
  SiC,
  SiCplusplus,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiPhp,
  SiHtml5,
  SiCss,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiJquery,
  SiNodedotjs,
  SiLaravel,
  SiFlask,
  SiMysql,
  SiPostgresql,
  SiSupabase,
  SiFirebase,
  SiFigma,
  SiGit,
  SiGithub,
  SiDocker,
  SiVite,
  SiVscodium,
  SiLinux,
} from 'react-icons/si'
import type { IconType } from 'react-icons'
import { LogoLoop, type LogoItem } from './LogoLoop'

type AnyIcon = LucideIcon | IconType

interface Skill {
  name: string
  Icon: AnyIcon
  color: string
}

// ── Row 1: Languages & Frontend (Moves Left → Right) ─────────────────────────
const ROW_1_SKILLS: Skill[] = [
  { name: 'React', Icon: SiReact, color: '#61dafb' },
  { name: 'Next.js', Icon: SiNextdotjs, color: '#ffffff' },
  { name: 'TypeScript', Icon: SiTypescript, color: '#3178c6' },
  { name: 'JavaScript', Icon: SiJavascript, color: '#f7df1e' },
  { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#06b6d4' },
  { name: 'HTML5', Icon: SiHtml5, color: '#e34f26' },
  { name: 'CSS3', Icon: SiCss, color: '#1572b6' },
  { name: 'Python', Icon: SiPython, color: '#4584b6' },
  { name: 'Java', Icon: FaJava, color: '#ed8b00' },
  { name: 'C++', Icon: SiCplusplus, color: '#659ad2' },
  { name: 'C', Icon: SiC, color: '#a8b9cc' },
]

// ── Row 2: Backend, APIs & Databases (Moves Right → Left) ────────────────────
const ROW_2_SKILLS: Skill[] = [
  { name: 'Laravel', Icon: SiLaravel, color: '#ff2d20' },
  { name: 'PHP', Icon: SiPhp, color: '#8892be' },
  { name: 'Node.js', Icon: SiNodedotjs, color: '#339933' },
  { name: 'REST APIs', Icon: Globe, color: '#6366f1' },
  { name: 'MySQL', Icon: SiMysql, color: '#4479a1' },
  { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169e1' },
  { name: 'Supabase', Icon: SiSupabase, color: '#3ecf8e' },
  { name: 'Firebase', Icon: SiFirebase, color: '#ffca28' },
  { name: 'Flask', Icon: SiFlask, color: '#9ca3af' },
  { name: 'SQL', Icon: Database, color: '#4479a1' },
  { name: 'jQuery', Icon: SiJquery, color: '#0769ad' },
]

// ── Row 3: Tools, UI/UX & Security (Moves Left → Right) ──────────────────────
const ROW_3_SKILLS: Skill[] = [
  { name: 'Figma', Icon: SiFigma, color: '#f24e1e' },
  { name: 'GitHub', Icon: SiGithub, color: '#d1d5db' },
  { name: 'Git', Icon: SiGit, color: '#f05032' },
  { name: 'Docker', Icon: SiDocker, color: '#2496ed' },
  { name: 'Vite', Icon: SiVite, color: '#646cff' },
  { name: 'VS Code', Icon: SiVscodium, color: '#007acc' },
  { name: 'Linux', Icon: SiLinux, color: '#fcc624' },
  { name: 'AES-256', Icon: Lock, color: '#60a5fa' },
  { name: 'ChaCha20', Icon: Lock, color: '#34d399' },
  { name: 'Blowfish', Icon: Lock, color: '#fb923c' },
  { name: 'Cryptography', Icon: ShieldCheck, color: '#a78bfa' },
  { name: 'Web Security', Icon: ShieldAlert, color: '#ef4444' },
]

function skillsToLogoItems(skills: Skill[]): LogoItem[] {
  return skills.map((skill) => ({
    node: (
      <div className="flex flex-col items-center gap-2 px-5">
        <skill.Icon style={{ color: skill.color, width: 26, height: 26, flexShrink: 0 }} />
        <span
          style={{
            color: 'var(--text-secondary)',
            fontSize: '11px',
            fontWeight: 500,
            whiteSpace: 'nowrap',
          }}
        >
          {skill.name}
        </span>
      </div>
    ),
    title: skill.name,
  }))
}

export function Skills() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const row1Items = skillsToLogoItems(ROW_1_SKILLS)
  const row2Items = skillsToLogoItems(ROW_2_SKILLS)
  const row3Items = skillsToLogoItems(ROW_3_SKILLS)

  return (
    <section id="skills" ref={ref} className="relative py-16 sm:py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* ── LEFT SIDE: Main Title + Detailed Text + What I Do ── */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                Technical Skills
              </h2>
            </div>

            <p className="text-sm sm:text-base leading-relaxed text-zinc-300 font-normal">
              I work across the full web development process—from designing interfaces to building the backend that makes them work. I enjoy turning ideas into practical applications by combining clean UI, reliable databases, APIs, and modern web technologies.
            </p>

            <div className="space-y-4 pt-2">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider font-mono text-cyan-500">
                What I do:
              </h3>

              <div className="space-y-3 text-sm leading-relaxed text-zinc-300">
                <div>
                  <span className="font-bold text-white">Full-Stack Development: </span>
                  <span>React, Next.js, TypeScript, Laravel, PHP, MySQL, Supabase, and Firebase.</span>
                </div>

                <div>
                  <span className="font-bold text-white">Frontend &amp; UI/UX: </span>
                  <span>Figma, Tailwind CSS, responsive interfaces, prototyping, and user-focused design.</span>
                </div>

                <div>
                  <span className="font-bold text-white">Backend &amp; APIs: </span>
                  <span>Laravel, REST APIs, authentication, CRUD operations, and database.</span>
                </div>

                <div>
                  <span className="font-bold text-white">Development Tools: </span>
                  <span>GitHub, Docker, Vite, MySQL Workbench, VS Code, and draw.io.</span>
                </div>

                <div>
                  <span className="font-bold text-white">Security &amp; Cryptography: </span>
                  <span>Encryption/decryption Algorithms, Web security, Penetration testing.</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT SIDE: 3-Row Alternating LogoLoop (No Card Background) ── */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 flex flex-col justify-center space-y-5 overflow-hidden py-2"
          >
            {/* Row 1: Left to Right */}
            <div className="overflow-hidden py-1">
              <LogoLoop
                logos={row1Items}
                speed={70}
                direction="right"
                gap={8}
                logoHeight={52}
                pauseOnHover
                scaleOnHover
                ariaLabel="Languages and Frontend Skills"
              />
            </div>

            {/* Row 2: Right to Left */}
            <div className="overflow-hidden py-1">
              <LogoLoop
                logos={row2Items}
                speed={70}
                direction="left"
                gap={8}
                logoHeight={52}
                pauseOnHover
                scaleOnHover
                ariaLabel="Backend and Database Skills"
              />
            </div>

            {/* Row 3: Left to Right */}
            <div className="overflow-hidden py-1">
              <LogoLoop
                logos={row3Items}
                speed={70}
                direction="right"
                gap={8}
                logoHeight={52}
                pauseOnHover
                scaleOnHover
                ariaLabel="Tools and Security Skills"
              />
            </div>


          </motion.div>

        </div>
      </div>
    </section>
  )
}

