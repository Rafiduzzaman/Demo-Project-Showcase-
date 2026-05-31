import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DATA_PATH = path.join(process.cwd(), 'src', 'data', 'projects.json')

async function readData() {
  const raw = await fs.promises.readFile(DATA_PATH, 'utf-8')
  return JSON.parse(raw)
}

async function writeData(data: any) {
  await fs.promises.writeFile(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8')
}

export async function GET() {
  const data = await readData()
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const body = await req.json()
  const data = await readData()
  data.push(body)
  await writeData(data)
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: Request) {
  const url = new URL(req.url)
  const slug = url.searchParams.get('slug')
  if (!slug) return NextResponse.json({ ok: false, error: 'slug required' }, { status: 400 })
  const data = await readData()
  const filtered = data.filter((p: any) => p.slug !== slug)
  await writeData(filtered)
  return NextResponse.json({ ok: true })
}

export async function PUT(req: Request) {
  const body = await req.json()
  if (!body?.slug) return NextResponse.json({ ok: false, error: 'slug required' }, { status: 400 })
  const data = await readData()
  const idx = data.findIndex((p: any) => p.slug === body.slug)
  if (idx === -1) return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 })
  data[idx] = { ...data[idx], ...body }
  await writeData(data)
  return NextResponse.json({ ok: true })
}
