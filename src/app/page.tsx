"use client"

import Link from 'next/link'
import dynamic from 'next/dynamic'
import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import CarouselGallery from '../components/CarouselGallery'

const ThreeScene = dynamic(() => import('../components/ThreeScene'), { ssr: false })

type Project = {
  slug: string
  title: string
  short: string
  technologies: string[]
  thumbnail?: string
}

// ─── Animated counter that counts up when it enters the viewport ──────────────
function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    const num = parseInt(value, 10)
    if (isNaN(num) || !isInView) { setDisplay(value); return }
    const suffix = value.replace(String(num), '')
    let startTime: number | null = null
    const duration = 1200
    const tick = (ts: number) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(num * eased)
      setDisplay(progress < 1 ? String(current) : `${num}${suffix}`)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isInView, value])

  return <span ref={ref}>{display}</span>
}

// ─── 3-D perspective tilt on hover ───────────────────────────────────────────
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width - 0.5) * 10
    const y = ((e.clientY - r.top) / r.height - 0.5) * -10
    ref.current.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) scale3d(1.025,1.025,1.025)`
  }

  const handleLeave = () => {
    if (ref.current)
      ref.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{ transition: 'transform 0.18s ease', willChange: 'transform' }}
    >
      {children}
    </div>
  )
}

// ─── Stat card with animated counter ─────────────────────────────────────────
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
      <div className="text-sm text-white/55">{label}</div>
      <div className="text-2xl font-bold text-white">
        <AnimatedCounter value={value} />
      </div>
    </div>
  )
}

// ─── Hero ambient gradient blobs ──────────────────────────────────────────────
function HeroBlobs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="animate-blob1 absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-blue-600/18 blur-[110px]" />
      <div className="animate-blob2 absolute -right-32 top-0 h-[420px] w-[420px] rounded-full bg-purple-600/18 blur-[100px]" />
      <div className="animate-blob3 absolute bottom-0 left-1/3 h-[360px] w-[360px] rounded-full bg-cyan-500/14 blur-[90px]" />
    </div>
  )
}

// ─── Skills data grouped by category ─────────────────────────────────────────
const SKILLS = [
  { name: 'Python',        dot: 'bg-blue-400' },
  { name: 'PyTorch',       dot: 'bg-orange-400' },
  { name: 'TensorFlow',    dot: 'bg-orange-500' },
  { name: 'OpenAI APIs',   dot: 'bg-emerald-400' },
  { name: 'LangChain',     dot: 'bg-green-400' },
  { name: 'FastAPI',       dot: 'bg-teal-400' },
  { name: 'React',         dot: 'bg-cyan-400' },
  { name: 'Next.js',       dot: 'bg-white' },
  { name: 'Tailwind',      dot: 'bg-sky-400' },
  { name: 'Framer Motion', dot: 'bg-pink-400' },
  { name: 'Docker',        dot: 'bg-blue-500' },
  { name: 'PostgreSQL',    dot: 'bg-indigo-400' },
  { name: 'AWS / GCP',     dot: 'bg-yellow-400' },
]

// ─── Feature cards data ───────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: '⬡',
    t: 'Design Systems',
    d: 'AI-driven, accessible design systems with scalable, composable components.',
    accent: 'group-hover:text-cyan-300',
    border: 'hover:border-cyan-400/30',
  },
  {
    icon: '◎',
    t: 'Motion & UX',
    d: 'Polished interactions and spring animations that guide and delight users.',
    accent: 'group-hover:text-fuchsia-300',
    border: 'hover:border-fuchsia-400/30',
  },
  {
    icon: '◈',
    t: 'Frontend Engineering',
    d: 'Next.js, performance-oriented, type-safe, and production-ready code.',
    accent: 'group-hover:text-emerald-300',
    border: 'hover:border-emerald-400/30',
  },
]

// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    fetch('/api/projects')
      .then((r) => r.json())
      .then(setProjects)
      .catch(() => setProjects([]))
  }, [])

  return (
    <div className="space-y-0">

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-white/10">
        <HeroBlobs />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.88),rgba(15,23,42,0.97))]" />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 py-24 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-32">
          <div>
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium tracking-[0.2em] text-white/70 uppercase"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
              </span>
              AI/ML Portfolio • Open to work
            </motion.div>

            <motion.h1
              className="mt-6 max-w-4xl text-5xl font-extrabold leading-[0.95] tracking-tight text-white md:text-7xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Design-forward UI &{' '}
              <span className="glow-text bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent">
                Modern Product
              </span>{' '}
              Engineering
            </motion.h1>

            <motion.p
              className="mt-6 max-w-2xl text-lg leading-8 text-slate-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.28 }}
            >
              I build elegant, accessible, and performant user experiences for AI products — with
              modern design systems, smooth animations, and production-ready engineering.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.42 }}
            >
              <Link
                href="#projects"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-white/10 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-white/20"
              >
                View Projects
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/10"
              >
                Get in touch
              </Link>
              <Link
                href="/resume"
                className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white/75 transition-colors duration-200 hover:bg-white/5 hover:text-white"
              >
                Resume
              </Link>
            </motion.div>

            <motion.div
              className="mt-10 grid max-w-2xl grid-cols-3 gap-4"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
            >
              <Stat label="Years" value="4+" />
              <Stat label="Products" value={String(projects.length || 1)} />
              <Stat label="Focus" value="AI & UX" />
            </motion.div>
          </div>

          <div className="lg:pl-8">
            <AnimatePresence>
              {projects.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.2 }}
                >
                  <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
                    <CarouselGallery
                      images={projects.flatMap(
                        (p) => (p as any).screenshots ?? [p.thumbnail ?? '/images/placeholder.png']
                      )}
                    />
                  </div>
                  <div className="mt-6">
                    <ThreeScene />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────────── */}
      <section id="features" className="border-b border-white/10 bg-slate-950/80 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300/80">What I Do</p>
              <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
                Product layouts with strong hierarchy and stable interactions
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                className={`group cursor-default rounded-3xl border border-white/10 bg-white/5 p-7 transition-all duration-300 ${f.border} hover:bg-white/8 hover:shadow-[0_0_40px_-12px_rgba(34,211,238,0.2)]`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <div className={`mb-4 text-2xl transition-colors duration-300 ${f.accent}`}>{f.icon}</div>
                <h3 className={`mb-2 text-xl font-semibold text-white transition-colors duration-300 ${f.accent}`}>
                  {f.t}
                </h3>
                <p className="text-slate-400">{f.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────────── */}
      <section id="about" className="border-b border-white/10 bg-slate-900/70 py-20 scroll-mt-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-fuchsia-300/80">About</p>
            <motion.h2
              className="mt-2 text-3xl font-semibold text-white md:text-4xl"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Built for AI product teams and portfolio case studies
            </motion.h2>
          </div>

          <motion.p
            className="max-w-3xl text-lg leading-8 text-slate-300"
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            I have 4+ years of experience in AI/ML engineering building production-ready AI
            applications, LLM integrations, computer vision pipelines, and automation systems. I
            focus on crafting design-forward user experiences that combine performance,
            accessibility, and elegant motion.
          </motion.p>
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────────────────────────────────────── */}
      <section id="skills" className="border-b border-white/10 bg-slate-950/80 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300/80">Skills</p>
            <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
              Technologies and systems I use regularly
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {SKILLS.map((s, i) => (
              <motion.div
                key={s.name}
                className="group flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 transition-all duration-200 hover:border-emerald-300/30 hover:bg-white/10 hover:text-white"
                initial={{ opacity: 0, y: 12, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.35 }}
                whileHover={{ y: -2 }}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${s.dot} opacity-80 transition-opacity duration-200 group-hover:opacity-100`} />
                {s.name}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────────────────── */}
      <section id="projects" className="bg-slate-900/80 py-20 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-300/80">
                Selected Projects
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
                Case-study style cards with responsive previews
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, idx) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
              >
                <TiltCard>
                  <article className="group cursor-pointer overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 shadow-[0_16px_60px_rgba(0,0,0,0.25)] transition-colors duration-200 hover:border-blue-400/30 hover:bg-white/8">
                    <div className="relative h-56 overflow-hidden bg-slate-800">
                      {p.thumbnail ? (
                        <img
                          src={p.thumbnail}
                          alt={p.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-gray-500">
                          No image
                        </div>
                      )}
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>

                    <div className="p-5">
                      <h3 className="text-xl font-semibold text-white">{p.title}</h3>
                      <p className="mt-2 text-slate-400 text-sm leading-relaxed">{p.short}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {p.technologies.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/75"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="mt-5">
                        <Link
                          href={`/projects/${p.slug}`}
                          className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 transition-colors duration-200 hover:text-cyan-200"
                        >
                          View Project
                          <motion.span
                            className="inline-block"
                            initial={{ x: 0 }}
                            whileHover={{ x: 3 }}
                          >
                            →
                          </motion.span>
                        </Link>
                      </div>
                    </div>
                  </article>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
