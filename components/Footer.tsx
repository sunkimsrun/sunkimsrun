'use client'

import { Github, Linkedin, Mail } from 'lucide-react'

export function Footer() {
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Education', href: '#education' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ]

  const socialLinks = [
    { icon: Github, href: 'https://github.com/sunkimsrun', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/sun-kimsrun-143152415', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:sunkimsrun.dev@gmail.com', label: 'Email' },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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
    }
  }

  return (
    <footer
      className="relative z-10 border-t py-12"
      style={{
        borderColor: 'var(--glass-border)',
        background: 'var(--bg-secondary)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-8">
        {/* Top Row: Name & Title + Social Icons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight" style={{ color: '#007bffff' }}>
                Sun Kimsrun
              </span>
            </div>

          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="p-2.5 rounded-xl border transition-all duration-200 hover:scale-105 hover:border-cyan-500/40"
                style={{
                  borderColor: 'var(--glass-border)',
                  background: 'var(--bg-card)',
                  color: 'var(--text-secondary)',
                }}
                aria-label={label}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Center: Minimal Navigation Bar */}
        <div className="pt-6 border-t border-white/5">
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium font-mono">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="transition-colors hover:text-cyan-400 cursor-pointer"
                style={{ color: 'var(--text-muted)' }}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>

      </div>
    </footer>
  )
}
