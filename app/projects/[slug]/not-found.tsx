import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-6 px-6"
      style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
    >
      <div className="text-6xl font-extrabold font-mono text-cyan-400">404</div>
      <h1 className="text-2xl font-bold tracking-tight">Project Not Found</h1>
      <p className="text-sm text-zinc-400">That project doesn&apos;t exist or has been removed.</p>
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
        style={{ background: 'var(--accent-blue)' }}
      >
        ← Back to Projects
      </Link>
    </div>
  )
}
