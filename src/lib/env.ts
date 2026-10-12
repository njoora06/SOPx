import "server-only";
import { z } from "zod";

/**
 * Server-side environment, validated lazily so the site still builds and
 * renders before email and rate-limit credentials are configured. Empty values
 * (e.g. `CONTACT_EMAIL=""` copied from .env.example) count as unset, so defaults apply.
 */
const unsetIfEmpty = <T extends z.ZodType>(schema: T) => z.preprocess((v) => (v === "" ? undefined : v), schema);

const serverEnvSchema = z.object({
  SMTP_HOST: unsetIfEmpty(z.string().min(1).default("smtp.gmail.com")),
  SMTP_PORT: unsetIfEmpty(z.coerce.number().int().min(1).max(65535).default(587)),
  SMTP_USER: unsetIfEmpty(z.string().min(1).optional()),
  // Gmail shows app passwords in groups of four ("abcd efgh ..."); the spaces aren't part of it.
  SMTP_PASSWORD: unsetIfEmpty(z.string().min(1).transform((v) => v.replace(/\s+/g, "")).optional()),
  // Inbox that receives the notifications.
  CONTACT_EMAIL: unsetIfEmpty(z.email().default("sopxtech@gmail.com")),
  GOOGLE_SHEETS_WEB_APP_URL: unsetIfEmpty(z.url().optional()),
  UPSTASH_REDIS_REST_URL: unsetIfEmpty(z.url().optional()),
  UPSTASH_REDIS_REST_TOKEN: unsetIfEmpty(z.string().min(1).optional()),
});

export function getServerEnv() {
  return serverEnvSchema.parse(process.env);
}
