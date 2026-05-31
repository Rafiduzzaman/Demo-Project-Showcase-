import projects from '../../../data/projects.json'
import React from 'react'
import Link from 'next/link'
import Gallery from '../../../components/Gallery'
import AnimatedFade from '../../../components/AnimatedFade'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = (projects as any[]).find(p => p.slug === params.slug)
  if (!project) return { title: 'Project' }
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com'
  const url = `${base}/projects/${project.slug}`
  return {
    title: project.title,
    description: project.short,
    openGraph: {
      title: project.title,
      description: project.short,
      url,
      images: project.thumbnail ? [{ url: base + project.thumbnail }] : undefined
    }
  }
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = (projects as any[]).find(p => p.slug === params.slug)
  if (!project) return (
    <div>
      <p>Project not found.</p>
      <Link href="/">Back</Link>
    </div>
  )

  return (
    <main className="w-full min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.85fr] items-start">
          <article>
            <AnimatedFade>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">{project.title}</h1>
              <p className="mt-4 text-slate-300 max-w-3xl">{project.short || project.description}</p>
            </AnimatedFade>

            <div className="mt-8 space-y-8 text-slate-300">
              <AnimatedFade delay={0.06}>
                <section>
                  <h2 className="text-lg font-semibold text-white">Problem</h2>
                  <p className="mt-2">{project.details?.problem}</p>
                </section>
              </AnimatedFade>

              {project.details?.solution && (
                <AnimatedFade delay={0.12}>
                  <section>
                    <h2 className="text-lg font-semibold text-white">Solution</h2>
                    <p className="mt-2">{project.details.solution}</p>
                  </section>
                </AnimatedFade>
              )}

              {project.details?.impact && (
                <AnimatedFade delay={0.18}>
                  <section>
                    <h2 className="text-lg font-semibold text-white">Impact</h2>
                    <p className="mt-2">{project.details.impact}</p>
                  </section>
                </AnimatedFade>
              )}

              {project.details?.challenges && (
                <AnimatedFade delay={0.24}>
                  <section>
                    <h2 className="text-lg font-semibold text-white">Challenges & Solutions</h2>
                    <p className="mt-2">{project.details.challenges}</p>
                  </section>
                </AnimatedFade>
              )}
            </div>

            {(project.repo || project.live) && (
              <div className="mt-8">
                <h3 className="text-sm font-semibold text-white mb-2">Links</h3>
                <div className="flex gap-3">
                  {project.repo && (
                    <a className="inline-flex items-center px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500" href={project.repo} target="_blank" rel="noreferrer">GitHub</a>
                  )}
                  {project.live && (
                    <a className="inline-flex items-center px-3 py-2 rounded-md border border-slate-700 text-slate-100 hover:bg-slate-800" href={project.live} target="_blank" rel="noreferrer">Live demo</a>
                  )}
                </div>
              </div>
            )}

            <div className="mt-8">
              <Link href="/" className="text-sm text-slate-400 hover:text-slate-200">← Back to home</Link>
            </div>
          </article>

          <aside>
            <div className="sticky top-24">
              <AnimatedFade delay={0.3}>
                <div className="rounded-lg overflow-hidden bg-slate-900/40 p-1 shine float-up">
                  <Gallery images={project.screenshots || []} videoUrl={project.videoUrl} />
                </div>
              </AnimatedFade>
              <div className="mt-4 flex gap-3">
                {project.repo && (
                  <a className="text-sm text-indigo-400" href={project.repo} target="_blank" rel="noreferrer">Repo</a>
                )}
                {project.live && (
                  <a className="text-sm text-indigo-400" href={project.live} target="_blank" rel="noreferrer">Live</a>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
