import "server-only";
import { z } from "zod";

/**
 * Server-side environment, validated lazily so the site still builds and
 * renders before email and rate-limit credentials are configured. Empty values
 * (e.g. `EMAIL_TO=""` copied from .env.example) count as unset, so defaults apply.
 */
const unsetIfEmpty = <T extends z.ZodType>(schema: T) => z.preprocess((v) => (v === "" ? undefined : v), schema);

const serverEnvSchema = z.object({
  RESEND_API_KEY: unsetIfEmpty(z.string().min(1).optional()),
  // Must be on a domain verified in Resend; Resend can't send from gmail.com.
  EMAIL_FROM: unsetIfEmpty(z.string().min(1).default("SOPX Tech <noreply@sopxtech.com>")),
  EMAIL_TO: unsetIfEmpty(z.email().default("sopxtech@gmail.com")),
  GOOGLE_SHEETS_WEB_APP_URL: unsetIfEmpty(z.url().optional()),
  UPSTASH_REDIS_REST_URL: unsetIfEmpty(z.url().optional()),
  UPSTASH_REDIS_REST_TOKEN: unsetIfEmpty(z.string().min(1).optional()),
});

export function getServerEnv() {
  return serverEnvSchema.parse(process.env);
}
