# SOPX Tech website

Marketing site for SOPX Tech Private Limited: a home page, an About page and a Contact page with a consultation form.

Built with Next.js 16 (App Router, Cache Components), React 19, Tailwind CSS 4 and TypeScript. Every page is prerendered as static HTML. The only server code is the contact form's Server Action.

> **Note:** This Next.js version differs from older releases. Check `node_modules/next/dist/docs/` before using an unfamiliar API (see `AGENTS.md`).

## Getting started

Requires Node 24 or newer (see `.nvmrc`).

```bash
npm install
cp .env.example .env # then fill in the values below
npm run dev          # http://localhost:3000
```

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes in production | Public origin, used for canonical URLs, the sitemap, Open Graph and structured data. Defaults to `https://www.sopxtech.com`. |
| `GOOGLE_SHEETS_WEB_APP_URL` | Yes | Apps Script web app that stores enquiries (see below). Without it, every form submission fails. |
| `RESEND_API_KEY` | No | Sends a notification email for each enquiry. If unset, the email is skipped and a warning is logged. |
| `EMAIL_FROM` | No | Sender, for example `SOPX Tech <noreply@sopxtech.com>`. Must be a domain verified in Resend. |
| `EMAIL_TO` | No | Inbox that receives notifications. Defaults to `sopxtech@gmail.com`. |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Yes in production | Upstash Redis for the form's rate limiter. Without them, the limiter falls back to per-process memory. |

Server variables are validated in `src/lib/env.ts`. An empty value such as `EMAIL_TO=""` counts as unset.

Never commit `.env`. If a key is ever committed, rotate it right away.

## How the contact form works

1. `ConsultationForm` (`src/components/forms/consultation-form.tsx`) validates on the client with `contactSchema` (`src/lib/validations.ts`), then calls the `submitContact` Server Action (`src/actions/enquiry.ts`).
2. `submitContact` does the following, in order:
   - rate-limits by client IP (5 per 10 minutes);
   - validates again with the same schema;
   - silently accepts and discards submissions that fill the hidden `website` honeypot field;
   - appends a row to the Google Sheet;
   - sends a notification email.
3. A failed email doesn't fail the submission, because the enquiry is already saved.

### Google Sheets contract

The action POSTs form-encoded fields to `GOOGLE_SHEETS_WEB_APP_URL`. The Apps Script reads them from `e.parameter`, and each key must match a header in the sheet's first row:

`timestamp`, `name`, `email`, `phone`, `company`, `focusAreas`, `message`, `nda`

- **Formula escaping:** a value that starts with `=`, `+`, `-` or `@` arrives with a leading `'`, so Sheets stores it as text instead of running it as a formula.
- **Response:** reply with JSON. `{ "result": "error", "error": "…" }` is treated as a failure, and any other 2xx response as success.

### Rate limiting

The limiter (`src/lib/rate-limit.ts`) keeps its counts in Upstash Redis when `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are set, so every server instance shares them.

- **Without credentials:** it falls back to per-process memory, which is fine locally but counts each instance separately in production.
- **If Redis is down:** it fails open, so a Redis outage never blocks real enquiries.
- **Client IP:** it reads the IP from `x-forwarded-for`, which is reliable only when your host or proxy sets that header (Vercel does).

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | Generate route types, then `tsc --noEmit` |
| `npm test` | Run the unit tests once (Vitest) |
| `npm run test:watch` | Run the unit tests in watch mode |

CI (`.github/workflows/ci.yml`) runs on pushes to `main` and `dev` and on every pull request. It runs lint, typecheck, tests, the build and a production dependency audit.

## Project layout

```
src/
  actions/      Server Actions (contact form)
  app/          Routes, metadata, sitemap, robots, global CSS (design tokens)
  components/
    animations/ Reveal, Enter, TiltCard, scroll progress, cursor spotlight…
    contact/    Contact page cards and the HQ map
    forms/      Consultation form
    layout/     Header, footer, container, background
    navigation/ Nav, mobile drawer, ⌘K service search, logo
    sections/   Page sections, including the hero and its 3D scene
    services/   Service grid and filters
    ui/         Base controls (button, input, checkbox, sheet)
  data/         All site copy and content
  hooks/        Shared React hooks
  lib/          Env, validation, email, Sheets, rate limiting, SEO, theme
test/           Test helpers (stub for `server-only`)
public/logo/    sopx-logo-light.png (light theme), sopx-logo-dark.png (dark theme)
```

Tests sit next to the code they cover (`*.test.ts`).

## Design system and theming

`src/app/globals.css` is the source of truth for the design tokens: colours, type scale, spacing and elevation.

- **Theme switching:** the `<html data-theme="light|dark">` attribute holds the theme. Light is the default, and the visitor's choice is saved in `localStorage` (`src/lib/theme.ts`). An inline script applies it before first paint.
- **`white` means "max-contrast ink":** Tailwind's `white` is remapped to the `--ink` token, so `text-white` becomes near-black in the light theme. For true white on red, use `text-primary-foreground`.
- **Light-theme overrides:** some palette shades (`slate-300`, `red-400`, `emerald-400`…) are remapped in the light theme. The `light:` variant handles one-off overrides.
- **Dark islands:** `data-theme="dark"` on a subtree keeps it dark in both themes. The hero's 3D screen and the HQ map use this. Their fixed colours are the `brand-*` and `hud-*` tokens.

## Security

- **Response headers:** a Content Security Policy, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy` and HSTS (production only) are set in `next.config.ts`.
- **CSP and inline scripts:** the CSP has no nonces, so pages can stay static. That means `script-src` allows `'unsafe-inline'`.
- **Updating the CSP:** if you add a third-party script, font, image host or iframe, add its origin to the CSP.
