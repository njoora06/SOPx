import { afterEach, describe, expect, it, vi } from "vitest";
import { getServerEnv } from "./env";

describe("getServerEnv", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("treats empty values (as copied from .env.example) as unset", () => {
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("EMAIL_FROM", "");
    vi.stubEnv("EMAIL_TO", "");
    vi.stubEnv("GOOGLE_SHEETS_WEB_APP_URL", "");
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "");

    const env = getServerEnv();
    expect(env.RESEND_API_KEY).toBeUndefined();
    expect(env.GOOGLE_SHEETS_WEB_APP_URL).toBeUndefined();
    expect(env.UPSTASH_REDIS_REST_URL).toBeUndefined();
    expect(env.EMAIL_TO).toBe("sopxtech@gmail.com");
    expect(env.EMAIL_FROM).toContain("noreply@sopxtech.com");
  });

  it("keeps configured values", () => {
    vi.stubEnv("EMAIL_TO", "team@example.com");
    expect(getServerEnv().EMAIL_TO).toBe("team@example.com");
  });

  it("rejects malformed values", () => {
    vi.stubEnv("EMAIL_TO", "not-an-email");
    expect(() => getServerEnv()).toThrow();
  });
});
