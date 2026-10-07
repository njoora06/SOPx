import "server-only";
import { Resend } from "resend";
import { getServerEnv } from "@/lib/env";

interface SendEmailOptions {
  subject: string;
  text: string;
  replyTo?: string;
}

/** Sends a notification email to the SOPX Tech inbox via Resend. */
export async function sendNotificationEmail({ subject, text, replyTo }: SendEmailOptions) {
  const env = getServerEnv();
  if (!env.RESEND_API_KEY) {
    console.warn("[email] RESEND_API_KEY is not set; skipping email:", subject);
    return { skipped: true as const };
  }

  const resend = new Resend(env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: env.EMAIL_FROM,
    to: env.EMAIL_TO,
    subject,
    text,
    replyTo,
  });
  if (error) throw new Error(`Email delivery failed: ${error.message}`);
  return { skipped: false as const };
}
