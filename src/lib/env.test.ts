import { afterEach, describe, expect, it, vi } from "vitest";
import { getServerEnv } from "./env";

describe("getServerEnv", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("treats empty values (as copied from .env.example) as unset", () => {
    vi.stubEnv("SMTP_HOST", "");
    vi.stubEnv("SMTP_PORT", "");
    vi.stubEnv("SMTP_USER", "");
    vi.stubEnv("SMTP_PASSWORD", "");
    vi.stubEnv("CONTACT_EMAIL", "");
    vi.stubEnv("GOOGLE_SHEETS_WEB_APP_URL", "");
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "");

    const env = getServerEnv();
    expect(env.SMTP_USER).toBeUndefined();
    expect(env.SMTP_PASSWORD).toBeUndefined();
    expect(env.GOOGLE_SHEETS_WEB_APP_URL).toBeUndefined();
    expect(env.UPSTASH_REDIS_REST_URL).toBeUndefined();
    expect(env.CONTACT_EMAIL).toBe("sopxtech@gmail.com");
    expect(env.SMTP_HOST).toBe("smtp.gmail.com");
    expect(env.SMTP_PORT).toBe(587);
  });

  it("keeps configured values", () => {
    vi.stubEnv("CONTACT_EMAIL", "team@example.com");
    vi.stubEnv("SMTP_PORT", "465");
    vi.stubEnv("SMTP_PASSWORD", "abcd efgh ijkl mnop");
    const env = getServerEnv();
    expect(env.CONTACT_EMAIL).toBe("team@example.com");
    expect(env.SMTP_PORT).toBe(465);
    expect(env.SMTP_PASSWORD).toBe("abcdefghijklmnop");
  });

  it("rejects malformed values", () => {
    vi.stubEnv("CONTACT_EMAIL", "not-an-email");
    expect(() => getServerEnv()).toThrow();
  });
});
