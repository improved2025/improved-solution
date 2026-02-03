export const runtime = "nodejs";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function clean(v: unknown) {
  return (v ?? "").toString().trim();
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    const fullName = clean(body.fullName);
    const email = clean(body.email);
    const service = clean(body.service);
    const message = clean(body.message);

    if (fullName.length < 2) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (!email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
    }
    if (!service) {
      return NextResponse.json({ error: "Service is required." }, { status: 400 });
    }
    if (message.length < 10) {
      return NextResponse.json({ error: "Message is too short." }, { status: 400 });
    }

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      SMTP_FROM,
      QUOTE_TO_EMAIL,
    } = process.env;

    // Use your current inbox as a safe default
    const toEmail = QUOTE_TO_EMAIL || "jefinno73@gmail.com";

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
      return NextResponse.json(
        { error: "Email server is not configured. Missing SMTP environment variables." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const subject = `New Quote Request — ${service}`;
    const text = `
New Quote Request

Name: ${fullName}
Email: ${email}
Service: ${service}

Message:
${message}
`.trim();

    await transporter.sendMail({
      from: SMTP_FROM,
      to: toEmail,
      replyTo: email,
      subject,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send. Please try again." },
      { status: 500 }
    );
  }
}
