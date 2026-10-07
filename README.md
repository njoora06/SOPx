# SOPX Tech — Website

Next.js 16 (App Router, Cache Components) · TypeScript (strict) · Tailwind CSS v4 · shadcn/ui · Framer Motion · React Hook Form + Zod · Prisma 7 + PostgreSQL · Resend.

## Getting started

```bash
cp .env.example .env   # fill in values
npm install            # also runs `prisma generate`
npm run dev
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Generate Prisma client + production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | Route type generation + `tsc` |
| `npm run db:migrate` | Create/apply a Prisma migration (needs `DATABASE_URL`) |
| `npm run db:studio` | Browse the database |

## Design

Design system: **Obsidian Kinetic** (DESIGN.md). All tokens live in `src/app/globals.css`:

- Colours: `bg-obsidian-0/1/2`, `bg-void`, `text-vermilion`, `text-silver`, `border-carbon`, `border-slate-border`, plus the generated palette (`bg-surface-container`, …)
- Type: `text-display-hero`, `text-headline-lg/md/sm`, `text-title-md`, `text-body-lg/md/sm`, `text-code-badge`, `text-label-caps`, `tabular`
- Layout: `layout-grid` (4 / 8 / 12 columns), spacing `p-space-md`, `gap-gutter`, …
- Elevation: `layer-0` … `layer-3`, `edge-light`, `shadow-glow-*`
- Components (`src/components/ui`): Button, Badge, Input, Checkbox, RadioGroup, Card, Terminal

## Conventions

- Server Components by default; `"use client"` only for interactivity (nav state, forms, motion).
- Content lives in `src/data/*` and is typed in `src/types` so it can later move to a CMS or the database.
- Form schemas in `src/lib/validations.ts` are shared by the client and the Server Actions in `src/actions`.
- `src/components/ui` is shadcn/ui-owned; add components with `npx shadcn@latest add <name>`.
