'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Github,
  GitBranch,
  Star,
  GitCommit,
  ExternalLink,
  Flame,
  Code2,
  TrendingUp,
  FolderGit2,
} from 'lucide-react'
import { githubMockData, ContributionDay } from '@/data/githubData'

export function GitHubActivity() {
  const containerRef = useRef<HTMLElement>(null)
  const inView = useInView(containerRef, { once: true, margin: '-80px' })
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null)

  const getIntensityColor = (level: ContributionDay['level']) => {
    switch (level) {
      case 0:
        return 'rgba(255, 255, 255, 0.04)'
      case 1:
        return 'rgba(16, 185, 129, 0.25)'
      case 2:
        return 'rgba(16, 185, 129, 0.5)'
      case 3:
        return 'rgba(16, 185, 129, 0.75)'
      case 4:
        return '#10b981'
    }
  }

  return (
    <section id="github" ref={containerRef} className="relative py-14 sm:py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-16"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-mono tracking-widest" style={{ color: 'var(--accent-cyan)' }}>
                06 /
              </span>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400">
                Open Source & Development Telemetry
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              GitHub Activity & Repositories
            </h2>
          </div>

          <a
            href={githubMockData.profile.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold font-mono text-white transition-transform hover:scale-105 shadow-md w-fit"
            style={{ background: 'var(--accent-blue)' }}
          >
            <Github className="w-4 h-4" /> @{githubMockData.profile.username}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        {/* Stats Telemetry Header Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10"
        >
          <div className="p-4 sm:p-5 rounded-2xl border glass flex items-center gap-3 sm:gap-4" style={{ borderColor: 'var(--glass-border)' }}>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">
                {githubMockData.profile.totalContributions}+
              </div>
              <div className="text-[10px] sm:text-xs font-mono text-zinc-400 leading-tight">Total Contributions</div>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl border glass flex items-center gap-3 sm:gap-4" style={{ borderColor: 'var(--glass-border)' }}>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <FolderGit2 className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <div className="text-xl sm:text-2xl font-bold font-mono" style={{ color: 'var(--text-primary)' }}>
                {githubMockData.profile.publicRepos}
              </div>
              <div className="text-[10px] sm:text-xs font-mono text-zinc-400 leading-tight">Public Repositories</div>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl border glass flex items-center gap-3 sm:gap-4" style={{ borderColor: 'var(--glass-border)' }}>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Star className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <div className="text-xl sm:text-2xl font-bold font-mono text-amber-400">
                {githubMockData.profile.totalStars}
              </div>
              <div className="text-[10px] sm:text-xs font-mono text-zinc-400 leading-tight">Stars Earned</div>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl border glass flex items-center gap-3 sm:gap-4" style={{ borderColor: 'var(--glass-border)' }}>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <div className="text-xl sm:text-2xl font-bold font-mono text-purple-400 flex items-center gap-1">
                {githubMockData.profile.currentStreak} <span className="text-xs font-sans text-zinc-400">days</span>
              </div>
              <div className="text-[10px] sm:text-xs font-mono text-zinc-400 leading-tight">Current Commit Streak</div>
            </div>
          </div>
        </motion.div>

        {/* 52-Week Contribution Activity Graph */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-6 sm:p-8 rounded-3xl border glass mb-12 space-y-4"
          style={{ borderColor: 'var(--glass-border)', background: 'var(--bg-card)' }}
        >
          <div className="flex items-center justify-between gap-4 flex-wrap pb-2 border-b border-white/5">
            <div className="flex items-center gap-2">
              <GitCommit className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-sm font-mono tracking-wider uppercase" style={{ color: 'var(--text-primary)' }}>
                52-Week Contribution Matrix
              </h3>
            </div>
            <div className="text-xs font-mono text-zinc-400">
              {hoveredDay ? (
                <span className="text-emerald-400 font-semibold">
                  {hoveredDay.count} contributions on {hoveredDay.date}
                </span>
              ) : (
                'Hover over cells to inspect daily commit density'
              )}
            </div>
          </div>

          {/* Grid Container */}
          <div className="overflow-x-auto pb-2 no-scrollbar">
            <div className="min-w-[680px]">
              {/* Heatmap Grid */}
              <div className="grid grid-rows-7 grid-flow-col gap-1.5 pt-2">
                {githubMockData.contributionHistory.map((day, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredDay(day)}
                    onMouseLeave={() => setHoveredDay(null)}
                    className="w-3 h-3 rounded-sm transition-all duration-150 hover:scale-125 hover:z-10 cursor-pointer"
                    style={{
                      background: getIntensityColor(day.level),
                      border: day.level > 0 ? 'none' : '1px solid var(--glass-border)',
                    }}
                  />
                ))}
              </div>

              {/* Intensity Legend */}
              <div className="flex items-center justify-between pt-4 text-[11px] font-mono text-zinc-400">
                <span>364 Days Monitored</span>
                <div className="flex items-center gap-1.5">
                  <span>Less</span>
                  <span className="w-3 h-3 rounded-sm bg-white/5 border border-white/10" />
                  <span className="w-3 h-3 rounded-sm bg-emerald-500/25" />
                  <span className="w-3 h-3 rounded-sm bg-emerald-500/50" />
                  <span className="w-3 h-3 rounded-sm bg-emerald-500/75" />
                  <span className="w-3 h-3 rounded-sm bg-emerald-500" />
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Primary Language Distribution Bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="p-6 rounded-2xl border glass mb-12 space-y-4"
          style={{ borderColor: 'var(--glass-border)', background: 'var(--bg-card)' }}
        >
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-cyan-400" />
            <h3 className="font-bold text-xs font-mono uppercase tracking-wider text-zinc-400">
              Primary Language Distribution
            </h3>
          </div>

          {/* Multi-segment Segmented Bar */}
          <div className="h-3 w-full rounded-full overflow-hidden flex bg-white/5 border border-white/10 p-0.5">
            {githubMockData.languages.map((lang) => (
              <div
                key={lang.name}
                className="h-full first:rounded-l-full last:rounded-r-full transition-all duration-500 hover:opacity-80"
                style={{
                  width: `${lang.percentage}%`,
                  background: lang.color,
                }}
              />
            ))}
          </div>

          {/* Language Legend */}
          <div className="flex flex-wrap gap-4 pt-1">
            {githubMockData.languages.map((lang) => (
              <div key={lang.name} className="flex items-center gap-2 text-xs font-mono">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: lang.color }} />
                <span style={{ color: 'var(--text-primary)' }}>{lang.name}</span>
                <span className="text-zinc-500">{lang.percentage}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Featured Repositories Grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-6 mb-12"
        >
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-purple-400" />
            <h3 className="font-bold text-xs font-mono uppercase tracking-wider text-zinc-400">
              Featured Public Repositories
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {githubMockData.featuredRepos.map((repo) => (
              <div
                key={repo.id}
                className="p-6 rounded-2xl border glass flex flex-col justify-between space-y-4 transition-all duration-300 hover:-translate-y-1 group"
                style={{ borderColor: 'var(--glass-border)', background: 'var(--bg-card)' }}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-3">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-base font-mono group-hover:text-cyan-400 transition-colors inline-flex items-center gap-2 truncate"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      <FolderGit2 className="w-4 h-4 shrink-0 text-cyan-400" />
                      <span className="truncate">{repo.name}</span>
                    </a>
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors shrink-0"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                    {repo.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs font-mono pt-3 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: repo.languageColor }} />
                    <span style={{ color: 'var(--text-muted)' }}>{repo.primaryLanguage}</span>
                  </div>

                  <div className="flex items-center gap-4 text-zinc-400">
                    <span className="flex items-center gap-1 hover:text-amber-400 transition-colors">
                      <Star className="w-3.5 h-3.5" /> {repo.stars}
                    </span>
                    <span className="flex items-center gap-1 hover:text-purple-400 transition-colors">
                      <GitBranch className="w-3.5 h-3.5" /> {repo.forks}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Commit Log Stream */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="p-6 rounded-2xl border glass space-y-4"
          style={{ borderColor: 'var(--glass-border)', background: 'var(--bg-card)' }}
        >
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <div className="flex items-center gap-2">
              <GitCommit className="w-4 h-4 text-cyan-400" />
              <h3 className="font-bold text-xs font-mono uppercase tracking-wider text-zinc-400">
                Recent Commit Activity Feed
              </h3>
            </div>
            <span className="text-[11px] font-mono text-zinc-500">Live Commit Stream</span>
          </div>

          <div className="space-y-3">
            {githubMockData.recentCommits.map((commit) => (
              <a
                key={commit.id}
                href={commit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 p-3 rounded-xl bg-black/20 border border-white/5 hover:border-cyan-500/30 transition-all group font-mono text-xs"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="px-2 py-0.5 rounded bg-white/5 text-cyan-400 font-semibold shrink-0">
                    {commit.hash}
                  </span>
                  <span className="text-zinc-300 truncate group-hover:text-white transition-colors">
                    {commit.message}
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0 text-zinc-500 text-[11px]">
                  <span className="hidden sm:inline text-purple-400">{commit.repoName}</span>
                  <span>{commit.timeAgo}</span>
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
