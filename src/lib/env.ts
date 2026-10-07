import "server-only";
import { z } from "zod";

/**
 * Server-side environment, validated lazily so the site still builds and
 * renders before email/database credentials are configured.
 */
const serverEnvSchema = z.object({
  DATABASE_URL: z.url().optional(),
  RESEND_API_KEY: z.string().min(1).optional(),
  EMAIL_FROM: z.string().min(1).default("SOPX Tech <noreply@sopxtech.com>"),
  EMAIL_TO: z.email().default("hello@sopxtech.com"),
  GOOGLE_SHEETS_WEB_APP_URL: z.url().optional(),
});

export function getServerEnv() {
  return serverEnvSchema.parse(process.env);
}
