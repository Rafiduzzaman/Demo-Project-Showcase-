"use client"

import React, { useEffect, useState } from 'react'

type Project = {
  slug: string
  title: string
  short: string
  technologies: string[]
}

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [short, setShort] = useState('')
  const [tech, setTech] = useState('')

  useEffect(() => { fetchProjects() }, [])

  async function fetchProjects() {
    const res = await fetch('/api/projects')
    const data = await res.json()
    setProjects(data)
  }

  async function addProject() {
    const payload = { slug, title, short, technologies: tech.split(',').map(t => t.trim()) }
    if (editing) {
      await fetch('/api/projects', { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) })
    } else {
      await fetch('/api/projects', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) })
    }
    setTitle(''); setSlug(''); setShort(''); setTech('')
    setEditing(false)
    fetchProjects()
  }

  const [editing, setEditing] = useState(false)

  function startEdit(p: Project) {
    setTitle(p.title); setSlug(p.slug); setShort(p.short); setTech(p.technologies.join(',')); setEditing(true)
  }

  function cancelEdit() {
    setTitle(''); setSlug(''); setShort(''); setTech(''); setEditing(false)
  }

  async function removeProject(s: string) {
    await fetch(`/api/projects?slug=${s}`, { method: 'DELETE' })
    fetchProjects()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin — Projects</h1>

      <div className="mb-6">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="p-2 bg-gray-800 mr-2" />
        <input value={slug} onChange={e=>setSlug(e.target.value)} placeholder="slug" className="p-2 bg-gray-800 mr-2" />
        <input value={short} onChange={e=>setShort(e.target.value)} placeholder="short" className="p-2 bg-gray-800 mr-2" />
        <input value={tech} onChange={e=>setTech(e.target.value)} placeholder="tech,comma,separated" className="p-2 bg-gray-800 mr-2" />
        <button onClick={addProject} className="px-3 py-1 bg-primary rounded">Add</button>
      </div>

      <ul className="space-y-3">
        {projects.map(p => (
          <li key={p.slug} className="bg-gray-800 p-3 rounded flex justify-between items-center">
            <div>
              <div className="font-semibold">{p.title}</div>
              <div className="text-xs text-gray-400">{p.slug} — {p.short}</div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={()=>startEdit(p)} className="text-sm px-2 py-1 bg-yellow-600 rounded">Edit</button>
              <button onClick={()=>removeProject(p.slug)} className="text-sm px-2 py-1 bg-red-600 rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
