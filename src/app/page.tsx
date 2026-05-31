"use client"

import Link from 'next/link'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import CarouselGallery from '../components/CarouselGallery'
import ContactForm from '../components/ContactForm'
const ThreeScene = dynamic(() => import('../components/ThreeScene'), { ssr: false })

type Project = {
  slug: string
  title: string
  short: string
  technologies: string[]
  thumbnail?: string
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch('/api/projects')
        const data = await res.json()
        setProjects(data)
      } catch (e) {
        // fallback: set empty projects (avoid dynamic JSON import in client)
        setProjects([])
      }
    }
    run()
  }, [])

  return (
    <div className="space-y-0">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.22),transparent_34%),radial-gradient(circle_at_top_right,rgba(217,70,239,0.16),transparent_28%),linear-gradient(180deg,rgba(2,6,23,0.92),rgba(15,23,42,0.98))]" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 py-24 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-32">
          <div>
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium tracking-[0.2em] text-white/70 uppercase">
              AI/ML Portfolio • UI UX Pro Max Layout
            </div>
            <motion.h1 className="mt-6 max-w-4xl text-5xl font-extrabold leading-[0.95] tracking-tight text-white md:text-7xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >Design-forward UI & Modern Product Engineering</motion.h1>
            <motion.p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >I build elegant, accessible, and performant user experiences for AI products — with modern design systems, smooth animations, and production-ready engineering.</motion.p>

            <motion.div className="mt-8 flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link href="#projects" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition-transform duration-200 hover:-translate-y-0.5">View Projects</Link>
              <Link href="/contact" className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10">Get in touch</Link>
              <Link href="/resume" className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition-colors duration-200 hover:bg-white/5 hover:text-white">Resume</Link>
            </motion.div>

            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-4">
              <Stat label="Years" value="4+" />
              <Stat label="Products" value={String(projects.length || 1)} />
              <Stat label="Focus" value="AI & UX" />
            </div>
          </div>

          <div className="lg:pl-8">
            {projects.length > 0 && (
              <>
                <motion.div initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }}>
                  <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
                    <CarouselGallery images={projects.flatMap(p => (p as any).screenshots || [(p.thumbnail || '/images/placeholder.png')])} />
                  </div>
                </motion.div>

                <div className="mt-6">
                  <ThreeScene />
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section id="features" className="border-b border-white/10 bg-slate-950/80 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300/80">What I Do</p>
              <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">Product layouts with strong hierarchy and stable interactions</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {t: 'Design Systems', d: 'AI-driven, accessible design systems with scalable components.'},
              {t: 'Motion & UX', d: 'Polished interactions and animations to guide users.'},
              {t: 'Frontend Engineering', d: 'Next.js, performance-oriented, and testable code.'}
            ].map((f, i) => (
              <motion.div key={i} className="group cursor-pointer rounded-3xl border border-white/10 bg-white/5 p-6 transition-colors duration-200 hover:border-cyan-400/30 hover:bg-white/7"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <h3 className="mb-2 text-xl font-semibold text-white">{f.t}</h3>
                <p className="text-slate-300">{f.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="border-b border-white/10 bg-slate-900/70 py-20 scroll-mt-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-fuchsia-300/80">About</p>
            <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">Built for AI product teams and portfolio case studies</h2>
          </div>
          <p className="max-w-3xl text-lg leading-8 text-slate-300">I have 4+ years of experience in AI/ML engineering building production-ready AI applications, LLM integrations, computer vision pipelines, and automation systems. I focus on crafting design-forward user experiences that combine performance, accessibility, and elegant motion.</p>
        </div>
      </section>

      <section id="skills" className="border-b border-white/10 bg-slate-950/80 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300/80">Skills</p>
              <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">Technologies and systems I use regularly</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {['Python','PyTorch','TensorFlow','OpenAI APIs','LangChain','FastAPI','React','Next.js','Tailwind','Framer Motion','Docker','PostgreSQL','AWS/GCP'].map(s=> (
              <div key={s} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 transition-colors duration-200 hover:border-emerald-300/30 hover:bg-white/10">{s}</div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="bg-slate-900/80 py-20 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-300/80">Selected Projects</p>
              <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">Case-study style cards with responsive previews</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <motion.article key={p.slug} className="group cursor-pointer overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 shadow-[0_16px_60px_rgba(0,0,0,0.25)] transition-colors duration-200 hover:border-blue-400/30 hover:bg-white/7"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative h-56 bg-slate-800">
                  {p.thumbnail ? <img src={p.thumbnail} alt={p.title} className="object-cover w-full h-full"/> : <div className="flex items-center justify-center h-full text-gray-500">No image</div>}
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-white">{p.title}</h3>
                  <p className="mt-2 text-slate-300">{p.short}</p>
                  <div className="mt-3 flex gap-2 flex-wrap">
                    {p.technologies.map(t => <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/80">{t}</span>)}
                  </div>
                  <div className="mt-4">
                    <Link href={`/projects/${p.slug}`} className="text-sm font-semibold text-cyan-300 transition-colors duration-200 hover:text-cyan-200">View Project</Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* contact moved to /contact page */}
    </div>
  )
}

function Stat({ label, value }: { label: string, value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"> 
      <div className="text-sm text-white/55">{label}</div>
      <div className="text-2xl font-bold text-white">{value}</div>
    </div>
  )
}

// ContactForm is moved to `src/components/ContactForm.tsx`
