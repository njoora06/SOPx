import { defineConfig } from "prisma/config";

// Prisma 7 no longer reads .env automatically; Node's built-in loader does it.
try {
  process.loadEnvFile();
} catch {
  // No .env file (e.g. CI / production) — rely on real environment variables.
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: {
    // A placeholder keeps `prisma generate` working before a database exists.
    url: process.env.DATABASE_URL ?? "postgresql://placeholder:placeholder@localhost:5432/placeholder",
  },
});
