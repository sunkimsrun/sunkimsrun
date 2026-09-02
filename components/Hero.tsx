'use client'

import Image from 'next/image'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import { useRef } from 'react'
import ParticleText from './ParticleText'

const SOCIAL = [
  { icon: Github, href: 'https://github.com/sunkimsrun', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/sun-kimsrun-143152415', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:sunkimsrun.dev@gmail.com', label: 'Email' },
]

function TiltPhoto() {
  const ref = useRef<HTMLDivElement>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const springConfig = { stiffness: 220, damping: 22, mass: 0.6 }
  const x = useSpring(rawX, springConfig)
  const y = useSpring(rawY, springConfig)
  const rotateY = useTransform(x, [-1, 1], [-14, 14])
  const rotateX = useTransform(y, [-1, 1], [14, -14])
  const glareX = useTransform(x, [-1, 1], ['0%', '100%'])
  const glareY = useTransform(y, [-1, 1], ['0%', '100%'])
  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]: string[]) =>
      `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.18) 0%, transparent 60%)`
  )

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    rawX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2)
    rawY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2)
  }
  function handleMouseLeave() { rawX.set(0); rawY.set(0) }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        position: 'relative',
        width: '100%',
        aspectRatio: '1 / 1',
        borderRadius: '1.5rem',
        overflow: 'hidden',
        border: '2px solid rgba(59,130,246,0.35)',
        background: 'var(--bg-card)',
        boxShadow:
          '0 0 0 8px rgba(59,130,246,0.08), 0 30px 80px rgba(0,0,0,0.5)',
        cursor: 'pointer',
      }}
    >
      <Image
        src="/sun kimsrun1-img.jpg"
        alt="Sun Kimsrun"
        fill
        className="object-cover object-top"
        priority
      />
      {/* Subtle blue gradient overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: glareBackground,
        }}
      />
    </motion.div>
  )
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden scroll-mt-20"
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 65%)',
          }}
        />
        <div
          className="absolute bottom-0 -left-40 w-[400px] h-[400px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 65%)',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
        {/* Two-column grid: left = text, right = photo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── LEFT SIDE: Text Content ── */}
          <div className="flex flex-col gap-5 sm:gap-6 items-start text-left">

            {/* Name — ParticleText */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="w-full"
              aria-label="Sun Kimsrun"
            >
              <ParticleText
                text="Sun Kimsrun"
                align="left"
                fontSize="clamp(2rem, 6vw, 4rem)"
                fontWeight={800}
                color="#006effff"
                highlightColor="#ff0033ff"
                particleSize={2}
                density={2}
                scatter={200}
                gatherDuration={1400}
                stagger={380}
                pointerRepel={50}
                repelRadius={110}
                idleDrift={0.6}
                glow
                trigger="mount"
                className="h-20 sm:h-24 lg:h-28"
              />
            </motion.h1>

            {/* Role tag */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm sm:text-base lg:text-lg leading-relaxed"
              style={{ color: 'var(--text-muted)' }}
            >
              Web Developer · Mobile Developer · Software Engineer · UI/UX Design
            </motion.p>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="h-px w-16 origin-left"
              style={{ background: 'var(--accent-blue)', opacity: 0.4 }}
            />

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-2 flex-wrap"
            >
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm transition-all duration-200"
                  style={{
                    border: '1px solid var(--glass-border)',
                    color: 'var(--text-muted)',
                    background: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--text-primary)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'
                    e.currentTarget.style.background = 'var(--hover-overlay)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-muted)'
                    e.currentTarget.style.borderColor = 'var(--glass-border)'
                    e.currentTarget.style.background = 'transparent'
                  }}
                  aria-label={label}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT SIDE: Photo ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="flex justify-center lg:justify-end order-first lg:order-last"
          >
            {/* Decorative ring + glow behind the card */}
            <div className="relative w-48 sm:w-64 md:w-80 lg:w-full" style={{ maxWidth: '380px', perspective: 900 }}>
              {/* Glow blob */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at 60% 40%, rgba(59,130,246,0.18) 0%, rgba(99,102,241,0.10) 50%, transparent 70%)',
                  filter: 'blur(24px)',
                  transform: 'scale(1.15)',
                }}
              />
              {/* Decorative corner accent */}
              <div
                aria-hidden="true"
                className="absolute -top-3 -right-3 w-16 h-16 rounded-full pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)',
                  filter: 'blur(12px)',
                }}
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-3 -left-3 w-12 h-12 rounded-full pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)',
                  filter: 'blur(12px)',
                }}
              />
              <TiltPhoto />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
