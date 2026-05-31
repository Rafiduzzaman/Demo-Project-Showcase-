import './globals.css'
import React from 'react'
import Link from 'next/link'
import FloatingContact from '../components/FloatingContact'

const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com'

export const metadata = {
  metadataBase: new URL(base),
  title: 'AI/ML Portfolio',
  description: 'Portfolio showcasing AI/ML projects and case studies',
  openGraph: {
    title: 'AI/ML Portfolio',
    description: 'Portfolio showcasing AI/ML projects and case studies',
    url: base,
    siteName: 'AI/ML Portfolio'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI/ML Portfolio',
    description: 'Portfolio showcasing AI/ML projects and case studies'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="fixed left-4 right-4 top-4 z-50">
          <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-slate-950/70 px-5 py-3 backdrop-blur-xl shadow-2xl shadow-black/20">
            <Link href="/" className="text-sm font-semibold tracking-[0.24em] uppercase text-white/90 transition-colors duration-200 hover:text-white">
              YourBrand
            </Link>
            <div className="hidden items-center gap-6 text-sm text-white/70 md:flex">
              <Link href={`/#about`} className="transition-colors duration-200 hover:text-white">About</Link>
              <Link href={`/#projects`} className="transition-colors duration-200 hover:text-white">Projects</Link>
              <Link href={`/contact`} className="transition-colors duration-200 hover:text-white">Contact</Link>
            </div>
          </div>
        </div>
        <main className="min-h-screen w-full pt-24">{children}</main>
        <FloatingContact />
      </body>
    </html>
  )
}
