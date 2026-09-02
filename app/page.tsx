'use client'

import dynamic from 'next/dynamic'
import { ThemeProvider } from '@/components/ThemeProvider'
import { DevModeProvider, useDevMode } from '@/components/DevModeProvider'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Education } from '@/components/Education'
import { Experience } from '@/components/Experience'
import { Projects } from '@/components/Projects'
import { Skills } from '@/components/Skills'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

const Scene3D = dynamic(
  () => import('@/components/Scene3D').then(mod => ({ default: mod.Scene3D })),
  { ssr: false }
)

const BaseballIntro = dynamic(
  () => import('@/components/BaseballIntro').then(mod => ({ default: mod.BaseballIntro })),
  { ssr: false }
)

function PortfolioMain() {
  const { isDevMode } = useDevMode()

  return (
    <>
      {/* ── Fixed Global Navigation Bar (z-50) ── */}
      <Navbar />

      {/* ── 1. Fullscreen 3D Baseball Intro (Only visible in Dev Mode) ── */}
      {isDevMode && <BaseballIntro />}

      {/* ── 2. Standard Portfolio Content (When Dev Mode: padded 100vh; When Normal: standard pt-0) ── */}
      <div
        className="relative min-h-screen grid-bg transition-[padding] duration-500"
        style={{
          background: 'var(--bg-primary)',
          paddingTop: isDevMode ? '100vh' : '0px',
        }}
      >
        <Scene3D />
        <div className="relative z-10">
          <Hero />
          <Education />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
          <Footer />
        </div>
      </div>
    </>
  )
}

export default function Home() {
  return (
    <ThemeProvider>
      <DevModeProvider>
        <PortfolioMain />
      </DevModeProvider>
    </ThemeProvider>
  )
}

