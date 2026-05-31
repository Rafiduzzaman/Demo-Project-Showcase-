"use client"

import React from 'react'
import ContactForm from '../../components/ContactForm'

export default function ContactPage() {
  return (
    <div className="mx-auto min-h-screen max-w-7xl px-6 py-16 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300/80">Contact</p>
        <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">Start a project or ask a question</h1>
        <p className="mt-4 text-slate-300">Use the form below and I&apos;ll get back with a proper response path.</p>
      </div>
      <div className="mt-10 max-w-3xl">
        <ContactForm />
      </div>
    </div>
  )
}
