import { NextResponse } from 'next/server'

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY

export async function POST(req: Request) {
  const body = await req.json()
  const { name, email, message } = body

  if (SENDGRID_API_KEY) {
    try {
      const resp = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${SENDGRID_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: process.env.CONTACT_TO_EMAIL || 'owner@example.com' }]}],
          from: { email: process.env.CONTACT_FROM_EMAIL || 'noreply@example.com' },
          subject: `Website contact from ${name} <${email}>`,
          content: [{ type: 'text/plain', value: message }]
        })
      })

      if (!resp.ok) {
        const text = await resp.text()
        console.error('SendGrid response error', resp.status, text)
        return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 500 })
      }
      return NextResponse.json({ ok: true })
    } catch (err) {
      console.error('SendGrid error', err)
      return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 500 })
    }
  }

  console.log('Contact form submission:', { name, email, message })
  return NextResponse.json({ ok: true })
}
