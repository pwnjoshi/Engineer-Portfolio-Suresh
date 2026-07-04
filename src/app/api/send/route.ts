import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields (name, email, message) are required.' },
        { status: 400 }
      );
    }

    // Default receiver is the sender's configured destination, fallback to onboarding@resend.dev
    const toEmail = process.env.CONTACT_RECEIVER_EMAIL || 'onboarding@resend.dev';

    const data = await resend.emails.send({
      from: 'Suresh Portfolio <noreply@sureshpal.com.np>',
      to: [toEmail],
      subject: `New Contact Submission from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #111115; max-width: 600px; border: 1px solid #E2E2E8; border-radius: 12px;">
          <h2 style="border-bottom: 1px solid #E2E2E8; padding-bottom: 10px; margin-top: 0;">New Contact Form Message</h2>
          <p style="margin: 15px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 15px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p style="margin: 15px 0;"><strong>Message:</strong></p>
          <div style="background-color: #F8F8FA; padding: 15px; border-radius: 8px; font-style: italic; white-space: pre-wrap;">${message}</div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to send email.' },
      { status: 500 }
    );
  }
}
