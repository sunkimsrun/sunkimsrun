import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const { name, email, phone, message } = await req.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: 'sunkimsrun123@gmail.com',
      replyTo: email,
      subject: `New message from ${name} — Portfolio`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:auto;background:#0f0f12;color:#e4e4e7;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#3b82f6,#06b6d4);padding:24px 32px;">
            <h2 style="margin:0;color:#fff;font-size:20px;">New Portfolio Message</h2>
          </div>
          <div style="padding:32px;border:1px solid #27272a;border-top:none;border-radius:0 0 12px 12px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:10px 0;color:#a1a1aa;font-size:12px;width:120px;">Name</td><td style="padding:10px 0;font-weight:600;">${name}</td></tr>
              <tr><td style="padding:10px 0;color:#a1a1aa;font-size:12px;">Email</td><td style="padding:10px 0;">${email}</td></tr>
              <tr><td style="padding:10px 0;color:#a1a1aa;font-size:12px;">Phone</td><td style="padding:10px 0;">${phone || '—'}</td></tr>
            </table>
            <hr style="border:none;border-top:1px solid #27272a;margin:20px 0;" />
            <p style="color:#a1a1aa;font-size:12px;margin:0 0 8px;">Message</p>
            <p style="margin:0;line-height:1.7;white-space:pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Mail error:', err)
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 })
  }
}
