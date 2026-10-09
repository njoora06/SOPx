import "server-only";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getServerEnv } from "@/lib/env";

/**
 * Fixed-window rate limiter. With UPSTASH_REDIS_REST_URL/TOKEN set, counts
 * live in Upstash Redis and are shared across all serverless instances.
 * Without them (local dev) it falls back to per-process memory, which on
 * multi-instance hosting lets each instance count separately.
 */
type Options = { limit: number; windowMs: number };

const limiters = new Map<string, Ratelimit>();
let redis: Redis | null | undefined;

function getRedis() {
  if (redis === undefined) {
    const { UPSTASH_REDIS_REST_URL: url, UPSTASH_REDIS_REST_TOKEN: token } = getServerEnv();
    redis = url && token ? new Redis({ url, token }) : null;
    if (!redis && process.env.NODE_ENV === "production") {
      console.warn("[rate-limit] Upstash Redis is not configured; using per-instance memory");
    }
  }
  return redis;
}

function getLimiter(redis: Redis, { limit, windowMs }: Options) {
  const id = `${limit}:${windowMs}`;
  let limiter = limiters.get(id);
  if (!limiter) {
    limiter = new Ratelimit({ redis, limiter: Ratelimit.fixedWindow(limit, `${windowMs} ms`), prefix: "sopx:rl" });
    limiters.set(id, limiter);
  }
  return limiter;
}

export async function rateLimit(key: string, options: Options): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return memoryRateLimit(key, options);
  try {
    const { success } = await getLimiter(redis, options).limit(key);
    return success;
  } catch (err) {
    // Fail open: a Redis outage shouldn't block genuine enquiries.
    console.error("[rate-limit] Upstash", err);
    return true;
  }
}

const MAX_TRACKED_KEYS = 10_000;
const windows = new Map<string, { count: number; resetAt: number }>();

function memoryRateLimit(key: string, { limit, windowMs }: Options): boolean {
  const now = Date.now();
  const entry = windows.get(key);
  if (!entry || entry.resetAt <= now) {
    // Keep memory bounded: drop expired windows once the map grows large.
    if (windows.size >= MAX_TRACKED_KEYS) {
      for (const [k, v] of windows) if (v.resetAt <= now) windows.delete(k);
      if (windows.size >= MAX_TRACKED_KEYS) windows.clear();
    }
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  entry.count += 1;
  return entry.count <= limit;
}
