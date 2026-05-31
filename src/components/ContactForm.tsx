"use client"

import React from 'react'

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function ContactForm() {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [fieldErrors, setFieldErrors] = React.useState<{name?:string,email?:string,message?:string}>({})
  const [status, setStatus] = React.useState<'idle'|'sending'|'success'|'error'>('idle')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFieldErrors({})
    const errs: any = {}
    if (!name.trim()) errs.name = 'Name is required'
    if (!validateEmail(email)) errs.email = 'Valid email is required'
    if (!message.trim()) errs.message = 'Message is required'
    if (Object.keys(errs).length) { setFieldErrors(errs); return }

    setStatus('sending')
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ name, email, message }) })
      const data = await res.json()
      if (res.ok && data.ok) {
        setStatus('success')
        setName(''); setEmail(''); setMessage('')
      } else {
        setStatus('error')
        setFieldErrors(prev => ({...prev, message: data?.error || 'Send failed'}))
      }
    } catch (err) {
      setStatus('error')
      setFieldErrors(prev => ({...prev, message: 'Network error'}))
    }
  }

  return (
    <form className="max-w-2xl bg-gray-900 p-6 rounded-lg" onSubmit={onSubmit}>
      <h2 className="text-2xl font-semibold mb-4">Contact</h2>
      {status === 'success' && <div className="mb-2 text-green-400">Message sent successfully.</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="block">Name
          <input aria-invalid={Boolean(fieldErrors.name)} aria-describedby={fieldErrors.name ? 'name-error' : undefined} value={name} onChange={e=>setName(e.target.value)} className="w-full p-2 bg-gray-800 rounded mt-1" />
          {fieldErrors.name && <div id="name-error" className="text-sm text-red-400">{fieldErrors.name}</div>}
        </label>
        <label className="block">Email
          <input aria-invalid={Boolean(fieldErrors.email)} aria-describedby={fieldErrors.email ? 'email-error' : undefined} value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-2 bg-gray-800 rounded mt-1" />
          {fieldErrors.email && <div id="email-error" className="text-sm text-red-400">{fieldErrors.email}</div>}
        </label>
      </div>
      <label className="block my-4">Message
        <textarea aria-invalid={Boolean(fieldErrors.message)} aria-describedby={fieldErrors.message ? 'message-error' : undefined} value={message} onChange={e=>setMessage(e.target.value)} className="w-full p-2 bg-gray-800 rounded mt-1" rows={5}></textarea>
        {fieldErrors.message && <div id="message-error" className="text-sm text-red-400">{fieldErrors.message}</div>}
      </label>
      <div className="mt-3">
        <button type="submit" disabled={status==='sending'} className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded">
          {status === 'sending' ? 'Sending...' : 'Send'}
        </button>
      </div>
    </form>
  )
}
