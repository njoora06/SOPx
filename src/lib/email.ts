import "server-only";
import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import { getServerEnv } from "@/lib/env";

interface SendEmailOptions {
  subject: string;
  text: string;
  replyTo?: string;
}

let cached: { key: string; transporter: Transporter } | undefined;

/** One SMTP transporter per configuration, reused across requests. */
function getTransporter(host: string, port: number, user: string, pass: string) {
  const key = `${host}:${port}:${user}:${pass}`;
  if (cached?.key !== key) {
    cached = {
      key,
      transporter: nodemailer.createTransport({
        host,
        port,
        // 465 is TLS from the start; other ports (587) must upgrade with STARTTLS.
        secure: port === 465,
        requireTLS: port !== 465,
        auth: { user, pass },
      }),
    };
  }
  return cached.transporter;
}

/** Sends a notification email to the SOPX Tech inbox over SMTP (Nodemailer). */
export async function sendNotificationEmail({ subject, text, replyTo }: SendEmailOptions) {
  const env = getServerEnv();
  if (!env.SMTP_USER || !env.SMTP_PASSWORD) {
    // The subject carries the sender's name, so it stays out of the logs.
    console.warn("[email] SMTP_USER or SMTP_PASSWORD is not set; skipping notification email");
    return { skipped: true as const };
  }

  const transporter = getTransporter(env.SMTP_HOST, env.SMTP_PORT, env.SMTP_USER, env.SMTP_PASSWORD);
  try {
    await transporter.sendMail({
      // Gmail and most SMTP servers only send as the signed-in account.
      from: { name: "SOPX Tech Website", address: env.SMTP_USER },
      to: env.CONTACT_EMAIL,
      subject,
      text,
      replyTo,
    });
  } catch (error) {
    throw new Error(`Email delivery failed: ${error instanceof Error ? error.message : String(error)}`);
  }
  return { skipped: false as const };
}
