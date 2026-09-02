'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Send, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react'
import { SiTelegram } from 'react-icons/si'

const CONTACT_METHODS = [
  {
    Icon: Phone,
    label: 'Phone Number',
    value: '011 880 778',
    href: 'tel:011880778',
    color: '#10b981',
  },
  {
    Icon: SiTelegram,
    label: 'Telegram',
    value: 'ស៊ុន គឹមស្រ៊ុន · SunKimsrun',
    href: 'https://t.me/sunkimsrun',
    color: '#2aabee',
  },
  {
    Icon: Mail,
    label: 'Email',
    value: 'sunkimsrun123@gmail.com',
    href: 'mailto:sunkimsrun123@gmail.com',
    color: '#3b82f6',
  },
  {
    Icon: MapPin,
    label: 'Address',
    value: 'Phnom Penh, Cambodia',
    href: 'https://maps.google.com/?q=Phnom+Penh,+Cambodia',
    color: '#f59e0b',
  },
]

interface FormState { name: string; email: string; phone: string; message: string }
interface FormErrors { name?: string; email?: string; message?: string }

export function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')

  const validate = (): boolean => {
    const e: FormErrors = {}
    if (!form.name.trim()) e.name = 'Name is required.'
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!form.email.trim()) e.email = 'Email is required.'
    else if (!emailRe.test(form.email)) e.email = 'Enter a valid email address.'
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = 'Message must be at least 10 characters.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
    if (errors[name as keyof FormErrors]) setErrors((p) => ({ ...p, [name]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerError('')
    if (!validate()) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Server error')
      setSubmitted(true)
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch {
      setServerError('Failed to send. Please email me directly at sunkimsrun123@gmail.com')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative py-16 sm:py-20 overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Contact Me
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">

          {/* Left — Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div
              className="p-8 rounded-3xl border glass space-y-4"
              style={{ borderColor: 'var(--glass-border)', background: 'var(--bg-card)' }}
            >
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                <Sparkles className="w-4 h-4 text-cyan-400" /> Direct Contact
              </div>

              {CONTACT_METHODS.map(({ Icon, label, value, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 group"
                  style={{ background: 'var(--bg-secondary)', borderColor: 'var(--glass-border)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${color}50` }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--glass-border)' }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                    style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">{label}</div>
                    <div className="text-sm font-semibold truncate transition-colors" style={{ color: 'var(--text-primary)' }}>{value}</div>
                  </div>
                  <Send className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5" style={{ color }} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — Message form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div
              className="rounded-3xl p-8 sm:p-10 border glass"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--glass-border)', boxShadow: '0 8px 32px var(--shadow-color)' }}
            >
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Message Sent!</h3>
                  <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
                    Thanks for reaching out. I'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-xl text-xs font-mono font-semibold text-white hover:opacity-80 transition-opacity"
                    style={{ background: 'var(--accent-blue)' }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="flex items-center justify-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider mb-1 text-[var(--accent-blue)]">
                    Leave a Message
                  </div>

                  {/* Name */}
                  <div>
                    <label htmlFor="cf-name" className="block text-xs font-mono font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                      Your Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="cf-name" name="name" type="text"
                      value={form.name} onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all"
                      style={{ background: 'var(--input-bg)', border: errors.name ? '1px solid rgba(239,68,68,0.6)' : '1px solid var(--input-border)', color: 'var(--text-primary)' }}
                    />
                    {errors.name && <FieldError msg={errors.name} />}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="cf-email" className="block text-xs font-mono font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="cf-email" name="email" type="email"
                      value={form.email} onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all"
                      style={{ background: 'var(--input-bg)', border: errors.email ? '1px solid rgba(239,68,68,0.6)' : '1px solid var(--input-border)', color: 'var(--text-primary)' }}
                    />
                    {errors.email && <FieldError msg={errors.email} />}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="cf-phone" className="block text-xs font-mono font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                      Your Phone <span className="text-zinc-600">(optional)</span>
                    </label>
                    <input
                      id="cf-phone" name="phone" type="tel"
                      value={form.phone} onChange={handleChange}
                      placeholder="+855 ..."
                      className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all"
                      style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-primary)' }}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="cf-message" className="block text-xs font-mono font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="cf-message" name="message"
                      value={form.message} onChange={handleChange}
                      rows={5} placeholder="Tell me about your project, idea, or opportunity…"
                      className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all resize-none"
                      style={{ background: 'var(--input-bg)', border: errors.message ? '1px solid rgba(239,68,68,0.6)' : '1px solid var(--input-border)', color: 'var(--text-primary)' }}
                    />
                    {errors.message && <FieldError msg={errors.message} />}
                  </div>

                  {serverError && (
                    <div className="flex items-start gap-2 text-xs text-red-400 font-mono bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                      <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-xl text-sm font-bold font-mono text-white flex items-center justify-center gap-2.5 transition-all hover:opacity-90 shadow-lg disabled:opacity-50"
                    style={{ background: 'var(--accent-blue)' }}
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

function FieldError({ msg }: { msg: string }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-red-400 mt-1.5 font-mono">
      <AlertCircle className="w-3.5 h-3.5" />
      <span>{msg}</span>
    </div>
  )
}
