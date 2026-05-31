import React from 'react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Page not found</h1>
        <p className="mt-4 text-gray-300">We couldn't find the page you're looking for.</p>
        <div className="mt-6">
          <Link href="/" className="px-4 py-2 bg-indigo-600 rounded">Go home</Link>
        </div>
      </div>
    </div>
  )
}
