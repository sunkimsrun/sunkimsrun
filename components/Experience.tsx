'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Briefcase, Calendar, Building2, CheckCircle2, Globe, Camera } from 'lucide-react'
import DriftWall, { DriftWallItem } from '@/components/DriftWall'
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack'

const PHOTO_MEMORIES: DriftWallItem[] = [
  { image: '/university-field-trip.jpeg', title: 'University Field Trip' },
  { image: '/college-apu.jpg', title: 'College & Academic Life' },
  { image: '/baseball-sport.JPG', title: 'Baseball & Sports Activities' },
  { image: '/university-nakano-campus.JPG', title: 'Nakano Campus Experience' },
  { image: '/university-nakano.JPG', title: 'University Days in Nakano' },
  { image: '/my-workplace.JPG', title: 'Workplace & Team Dynamics' },
  { image: '/my-hobby.jpg', title: 'Hobbies & Personal Passions' },
  { image: '/my-workplace-senior.JPG', title: 'Working with Senior Mentors' },
  { image: '/omochi-workplace-culture.JPG', title: 'Japanese Workplace & Culture' },
  { image: '/my-hobby1.jpg', title: 'Memories & Lifestyle' },
  { image: '/nihon-wellness-graduated.jpeg', title: 'Nihon Wellness Graduation' },
  { image: '/hokkaido-trip.jpg', title: 'Hokkaido Trip & Adventure' },
]

const REAL_WORK_EXPERIENCE = [
  {
    role: 'Japanese Teacher & Translator & Document Coordinator',
    company: 'International Easy Reach',
    period: '2023 — 2025',
    location: 'Phnom Penh, Cambodia',
    description: 'Japanese language education, coordination for students going to Japan, and technical translation between Japanese, English, and Khmer.',
    keyAchievements: [
      'Japanese language instruction and preparation for students going to Japan.',
      'Prepared and processed student documents required for sending students to Japan.',
      'Provided Japanese–English/Khmer translation and communication support.',
    ],
    accent: '#3b82f6',
  },
  {
    role: 'Japanese Teacher',
    company: 'HIRAYAMA School Co., Ltd',
    period: '2020 — 2023',
    location: 'Phnom Penh, Cambodia',
    description: 'Instructed Japanese language courses and prepared Khmer candidates to work in Japan.',
    keyAchievements: [
      'Japanese language instruction and classroom management.',
      'Prepared lessons and learning materials.',
      'Supported students in developing Japanese communication skills.',
    ],
    accent: '#a855f7',
  },
  {
    role: 'Japanese Teacher & School Management',
    company: 'One Visa Education Center',
    period: '2018 — 2020',
    location: 'Phnom Penh, Cambodia',
    description: 'Japanese language instruction with operational school management and student administration.',
    keyAchievements: [
      'Japanese language teaching and student guidance.',
      'School administration and daily academic coordination.',
      'Student communication and learning support.',
    ],
    accent: '#5df471ff',
  },
]

// ── Scroll-driven DriftWall: small box → full w×h on scroll ─────────────────
function ScrollExpandGallery() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start end', 'end start'],
  })

  // Height: compact → 100vh → compact
  const height = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], ['280px', '95vh', '95vh', '280px'])
  // Border radius: 24px → 0 → 24px
  const radius = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], ['1.5rem', '0.5rem', '0.5rem', '1.5rem'])
  // Horizontal padding: shrinks the box in → then goes full bleed
  const padX = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], ['1rem', '0.25rem', '0.25rem', '1rem'])
  // Label opacity
  const labelOp = useTransform(scrollYProgress, [0.15, 0.35, 0.65, 0.85], [0, 1, 1, 0])

  return (
    // Compact scroll zone so gallery transitions smoothly without excess dead space
    <div ref={wrapperRef} style={{ minHeight: '115vh', position: 'relative' }}>
      {/* Sticky frame: stays fixed in viewport while user scrolls through */}
      <div
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: '95vh', display: 'flex', alignItems: 'center' }}
      >
        {/* Padding wrapper: animates left/right padding for width illusion */}
        <motion.div
          style={{ paddingLeft: padX, paddingRight: padX, width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}
        >
          {/* Gallery box: animates height + border-radius */}
          <motion.div
            style={{
              height,
              borderRadius: radius,
              width: '100%',
              overflow: 'hidden',
              position: 'relative',
              border: '1px solid var(--glass-border)',
              background: 'var(--bg-card)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
            }}
          >
            <DriftWall items={PHOTO_MEMORIES} columns={5} speed={36} tileWidth={200} tileHeight={140} />

          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

// ── ScrollStack experience cards (Minimalist Editorial Typography) ────────
function StackingCards() {
  return (
    <ScrollStack
      useWindowScroll={true}
      itemDistance={40}
      itemScale={0.03}
      itemStackDistance={24}
      stackPosition="16%"
      scaleEndPosition="8%"
      baseScale={0.92}
      rotationAmount={0}
      blurAmount={0}
    >
      {REAL_WORK_EXPERIENCE.map((exp, idx) => (
        <ScrollStackItem
          key={idx}
          itemClassName="rounded-3xl border transition-all duration-500 hover:border-white/20 !p-6 sm:!p-10 lg:!p-12 relative overflow-hidden backdrop-blur-2xl"
          style={{
            borderColor: 'rgba(255, 255, 255, 0.1)',
            background: `radial-gradient(circle at top left, ${exp.accent}12, var(--bg-card) 60%)`,
            boxShadow: `0 ${12 + idx * 8}px ${40 + idx * 16}px rgba(0,0,0,0.5)`,
          }}
        >
          {/* Subtle top-left accent glow line */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background: `linear-gradient(90deg, ${exp.accent}, transparent 60%)`,
            }}
          />

          <div className="space-y-6">
            {/* Top metadata row: Number, Period, Location */}
            <div className="flex items-center justify-between gap-4 flex-wrap pb-2 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span
                  className="text-xs font-mono font-bold tracking-widest uppercase px-2.5 py-1 rounded-md"
                  style={{
                    background: `${exp.accent}18`,
                    color: exp.accent,
                    border: `1px solid ${exp.accent}35`,
                  }}
                >
                  0{idx + 1}
                </span>
                <span
                  className="text-xs font-mono font-medium px-3 py-1 rounded-full text-zinc-300 bg-white/5 border border-white/10"
                >
                  <Calendar className="w-3.5 h-3.5 inline mr-1.5 opacity-70" />
                  {exp.period}
                </span>
              </div>

              {exp.location && (
                <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-zinc-500" />
                  {exp.location}
                </span>
              )}
            </div>

            {/* Editorial Role & Company Header */}
            <div className="space-y-1.5">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {exp.role}
              </h3>
              <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-cyan-400">
                <Building2 className="w-4 h-4 shrink-0 opacity-80" />
                <span>{exp.company}</span>
              </div>
            </div>

            {/* High-Contrast Description */}
            <p className="text-sm sm:text-base leading-relaxed text-zinc-200 font-normal max-w-4xl">
              {exp.description}
            </p>

            {/* Key Achievements with subtle minimal bullets */}
            <ul className="space-y-2 pt-1">
              {exp.keyAchievements.map((item, aIdx) => (
                <li key={aIdx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                    style={{ background: exp.accent }}
                  />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>


          </div>
        </ScrollStackItem>
      ))}
    </ScrollStack>
  )
}

// ── Main section ─────────────────────────────────────────────────────────────
export function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-20">
      {/* ── Section header ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 sm:pt-20 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-6"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: 'var(--accent-blue)' }}>
              Photo Memories & Working Experience
            </h2>
          </div>

        </motion.div>
      </div>

      {/* ── DriftWall: full-bleed scroll-expand ── */}
      {/* Gallery OUTSIDE any max-w container for true full-bleed */}
      <ScrollExpandGallery />

      {/* ── Work Experience: ScrollStack cards ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8 pb-16 sm:pb-20">
        <div className="mb-8 flex items-center gap-3">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight" style={{ color: 'var(--accent-blue)' }}>
            Work Experience
          </h3>
          <div className="h-px flex-1" style={{ background: 'var(--glass-border)' }} />
          <span className="text-xs font-mono text-zinc-500">Scroll to stack cards</span>
        </div>
        <StackingCards />
      </div>
    </section>
  )
}
