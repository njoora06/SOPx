"use server";

import { sendNotificationEmail } from "@/lib/email";
import { appendToGoogleSheet } from "@/lib/google-sheets";
import { contactSchema, type ContactInput } from "@/lib/validations";

export type ActionResult = { ok: true } | { ok: false; error: string };

/**
 * Contact form submission. Validates on the server with the same schema as
 * the client, then saves the enquiry to the Google Sheet. Persisting to
 * Postgres (db.enquiry.create) gets wired in once the database is provisioned.
 */
export async function submitContact(input: ContactInput): Promise<ActionResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Please check the form and try again." };

  const data = parsed.data;
  if (data.website) return { ok: true }; // honeypot tripped — silently accept

  // Keys match the Google Sheet's header row.
  try {
    await appendToGoogleSheet({
      timestamp: new Date().toISOString(),
      name: data.name,
      email: data.email,
      phone: data.phone ?? "",
      company: data.company ?? "",
      focusAreas: data.focusAreas?.join(", ") ?? "",
      message: data.message,
      nda: data.nda ? "Yes" : "No",
    });
  } catch (err) {
    console.error("[submitContact] Google Sheets", err);
    return { ok: false, error: "Something went wrong. Please try again or email us directly." };
  }

  // The enquiry is already saved, so a failed notification email shouldn't fail the submission.
  try {
    await sendNotificationEmail({
      subject: `New enquiry from ${data.name}`,
      replyTo: data.email,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Company: ${data.company || "-"}`,
        `Phone: ${data.phone || "-"}`,
        `Focus: ${data.focusAreas?.length ? data.focusAreas.join(", ") : "-"}`,
        `NDA requested: ${data.nda ? "Yes" : "No"}`,
        "",
        data.message,
      ].join("\n"),
    });
  } catch (err) {
    console.error("[submitContact] email", err);
  }
  return { ok: true };
}
