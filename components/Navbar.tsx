'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'
import { useDevMode } from './DevModeProvider'

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'Education', href: '#education' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrollProgress, setScrollProgress] = useState(0)
  const { isDevMode, toggleDevMode } = useDevMode()

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY
          const docHeight = document.documentElement.scrollHeight - window.innerHeight
          setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
          setIsScrolled(scrollTop > 40)

          const navOffset = 160
          const ids = NAV_LINKS.map((l) => l.href.slice(1))
          let current = ids[0]

          for (const id of ids) {
            const el = document.getElementById(id)
            if (el) {
              const rect = el.getBoundingClientRect()
              if (rect.top <= navOffset) {
                current = id
              }
            }
          }
          setActiveSection(current)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMenuOpen(false)
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)

    if (element) {
      e.preventDefault()
      const navHeight = 75
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - navHeight

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      })
      setActiveSection(targetId)
    } else {
      // If element is not on current page (e.g., inside /projects/[slug]), navigate to home with hash
      window.location.href = `/${href}`
    }
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: isScrolled ? 'var(--glass-strong-bg)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: `1px solid ${isScrolled ? 'var(--glass-border)' : 'transparent'}`,
      }}
    >
      {/* Scroll-progress indicator */}
      <div
        className="absolute top-0 left-0 h-px transition-all duration-150"
        style={{ width: `${scrollProgress}%`, background: 'var(--accent-blue)' }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* ── Left spacer (logo removed) ── */}
          <div />

          {/* ── Center: nav links with spacious padding & gaps ── */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1)
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3.5 py-2 text-xs xl:text-sm font-medium rounded-xl transition-all duration-200 whitespace-nowrap cursor-pointer"
                  style={{
                    color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                    background: isActive ? 'var(--hover-overlay)' : 'transparent',
                    border: isActive ? '1px solid var(--glass-border)' : '1px solid transparent',
                  }}
                >
                  {link.name}
                </a>
              )
            })}
          </div>

          {/* ── Right: Contact button + (Under Dev Mode) + hamburger ── */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-opacity duration-200 hover:opacity-85 shadow-md cursor-pointer"
              style={{ background: 'var(--accent-blue)' }}
            >
              Contact Me
            </a>

            {/* (Under Dev Mode) Toggle Button */}
            <button
              type="button"
              onClick={toggleDevMode}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-mono font-medium transition-all duration-300 cursor-pointer"
              style={{
                background: isDevMode
                  ? 'rgba(6, 182, 212, 0.15)'
                  : 'rgba(127, 125, 125, 0.05)',
                border: isDevMode
                  ? '1px solid rgba(6, 182, 212, 0.6)'
                  : '1px solid var(--glass-border)',
                color: isDevMode ? '#22d3ee' : 'var(--text-muted)',
                boxShadow: isDevMode
                  ? '0 0 15px rgba(6, 182, 212, 0.25)'
                  : 'none',
              }}
              title={
                isDevMode
                  ? 'Dev Mode active (3D Landing Page ON). Click to switch to normal portfolio.'
                  : 'Click to enable Dev Mode (3D Interactive Landing Page).'
              }
            >
              <span className="relative flex h-2 w-2">
                {isDevMode && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                )}
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{
                    background: isDevMode ? '#18d4f5ff' : 'rgba(223, 255, 16, 0.35)',
                  }}
                />
              </span>
              <span>Under Development Mode</span>
            </button>

            {/* Mobile / Tablet hamburger */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((o) => !o)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl transition-colors duration-200 cursor-pointer"
              style={{
                border: '1px solid var(--glass-border)',
                color: 'var(--text-secondary)',
                background: 'var(--hover-overlay)',
              }}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile & Tablet drawer ── */}
      {isMenuOpen && (
        <div
          style={{
            borderTop: '1px solid var(--glass-border)',
            background: 'var(--glass-strong-bg)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        >
          <div className="px-6 py-4 space-y-1.5 max-h-[70vh] overflow-y-auto">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1)
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 cursor-pointer"
                  style={{
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    background: isActive ? 'var(--hover-overlay)' : 'transparent',
                  }}
                >
                  {isActive && (
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: 'var(--accent-blue)' }}
                    />
                  )}
                  {link.name}
                </a>
              )
            })}
          </div>

          <div
            className="px-6 pb-6 pt-4 flex flex-col sm:flex-row gap-3"
            style={{ borderTop: '1px solid var(--glass-border)' }}
          >
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="flex items-center justify-center gap-2 flex-1 py-3 rounded-xl text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-85 shadow-md cursor-pointer"
              style={{ background: 'var(--accent-blue)' }}
            >
              Get In Touch
            </a>

            <button
              type="button"
              onClick={() => {
                toggleDevMode()
                setIsMenuOpen(false)
              }}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-mono font-medium transition-all duration-300 cursor-pointer"
              style={{
                background: isDevMode
                  ? 'rgba(6, 182, 212, 0.15)'
                  : 'rgba(255, 255, 255, 0.05)',
                border: isDevMode
                  ? '1px solid rgba(6, 182, 212, 0.6)'
                  : '1px solid var(--glass-border)',
                color: isDevMode ? '#22d3ee' : 'var(--text-muted)',
              }}
            >
              <span className="relative flex h-2 w-2">
                {isDevMode && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                )}
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{
                    background: isDevMode ? '#06b6d4' : 'rgba(255, 255, 255, 0.35)',
                  }}
                />
              </span>
              <span>(Under Dev Mode: {isDevMode ? 'ON' : 'OFF'})</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}


