import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { rateLimit } from "./rate-limit";

const opts = { limit: 3, windowMs: 60_000 };

// Without Upstash credentials the limiter uses its in-memory fallback, tested here.
describe("rateLimit (in-memory fallback)", () => {
  beforeEach(() => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "");
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllEnvs();
  });

  it("allows up to the limit, then blocks", async () => {
    const results = [];
    for (let i = 0; i < 5; i++) results.push(await rateLimit("limit-test", opts));
    expect(results).toEqual([true, true, true, false, false]);
  });

  it("counts each key separately", async () => {
    for (let i = 0; i < 3; i++) await rateLimit("key-a", opts);
    expect(await rateLimit("key-a", opts)).toBe(false);
    expect(await rateLimit("key-b", opts)).toBe(true);
  });

  it("starts a fresh window once the old one expires", async () => {
    for (let i = 0; i < 4; i++) await rateLimit("window-test", opts);
    expect(await rateLimit("window-test", opts)).toBe(false);
    vi.advanceTimersByTime(60_000);
    expect(await rateLimit("window-test", opts)).toBe(true);
  });
});
