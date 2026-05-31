import Link from 'next/link'

export default function ResumePage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-fuchsia-300/80">Resume</p>
        <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">Download the current resume placeholder</h1>
        <p className="mt-4 text-slate-300">Replace this with your real resume in <strong className="text-white">public/resume.txt</strong> or a PDF at <strong className="text-white">public/resume.pdf</strong>.</p>
      </div>
      <div className="flex gap-4">
        <a href="/resume.txt" download className="px-4 py-2 bg-indigo-600 text-white rounded">Download TXT Resume</a>
        <Link href="/contact" className="px-4 py-2 border border-gray-700 rounded text-gray-200">Contact</Link>
      </div>
    </div>
  )
}
