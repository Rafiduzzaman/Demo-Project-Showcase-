import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

export async function GET() {
  const dataPath = path.join(process.cwd(), 'src', 'data', 'projects.json')
  const raw = await fs.promises.readFile(dataPath, 'utf-8')
  const projects = JSON.parse(raw)

  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com'
  const urls = [
    `${base}/`,
    ...projects.map((p: any) => `${base}/projects/${p.slug}`)
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.map(u => `<url><loc>${u}</loc></url>`).join('\n')}
  </urlset>`

  return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml' } })
}
