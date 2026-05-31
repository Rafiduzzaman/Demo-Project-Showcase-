"use client"
import React from 'react'

export default function FloatingContact() {
  return (
    <button onClick={() => { const el = document.getElementById('contact'); if (el) el.scrollIntoView({ behavior: 'smooth' }) }} className="floating-action" aria-label="Contact">Contact</button>
  )
}
