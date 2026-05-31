"use client"

import React from 'react'

export default function GlobalError({ error, reset }: { error: Error, reset: () => void }) {
  console.error(error)
  return (
    <html>
      <body className="bg-gray-900 text-white flex items-center justify-center min-h-screen">
        <div className="max-w-xl p-8 bg-gray-800/60 backdrop-blur rounded-lg">
          <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
          <p className="text-gray-300 mb-4">An unexpected error occurred. Try refreshing the page.</p>
          <div className="flex gap-3">
            <button onClick={() => reset()} className="px-4 py-2 bg-indigo-600 rounded">Try again</button>
          </div>
        </div>
      </body>
    </html>
  )
}
