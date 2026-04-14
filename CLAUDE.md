# AI Strategy Discovery Dashboard — Handoff

## What this project is
A full-stack Next.js 15 dashboard for sharing progress and insights from a 53-leader AI discovery interview series across the organization. Built for Sonja to share with stakeholders including the CEO (Adam Pettit).

## Tech stack
- **Next.js 15** (App Router, TypeScript)
- **Clerk** — authentication (protects all routes)
- **Neon** — serverless PostgreSQL database
- **Drizzle ORM** — type-safe DB queries
- **shadcn/ui** — component library (dark theme)
- **Recharts** — charts (bar, radar, doughnut)
- **Vercel** — deployment target

## Current status
**Code is complete and pushed.** Everything is built and committed.
- Branch: `claude/organize-ai-interviews-7gw09`
- Repo: `sonja257/ai-strategy-dashboard`
- 2 commits on the feature branch (on top of the original `index.html` commit)

**What is NOT done yet: deployment.**
The app has never been run. It needs:
1. A Neon database (free tier) with env var `DATABASE_URL`
2. A Clerk app (free tier) with env vars `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` + `CLERK_SECRET_KEY`
3. `npm run db:push` — pushes schema to Neon
4. `npm run db:seed` — loads all 53 leaders + themes + risks + recommendations
5. Deploy to Vercel (connect repo, add env vars, deploy)

## File structure
```
app/
  (auth)/sign-in/[[...sign-in]]/page.tsx   — Clerk sign-in page
  (auth)/sign-up/[[...sign-up]]/page.tsx   — Clerk sign-up page
  (dashboard)/layout.tsx                    — Sticky header + Clerk UserButton
  (dashboard)/page.tsx                      — Server component: fetches DB, passes to client
  globals.css                               — Dark theme CSS variables
  layout.tsx                                — Root layout with ClerkProvider
middleware.ts                               — Clerk auth guard (protects all non-auth routes)
components/
  dashboard-client.tsx                      — Main "use client" tabbed dashboard (965 lines)
  ui/                                       — shadcn components (badge, button, card, etc.)
db/
  schema.ts                                 — 4 tables: interviewees, themes, risks, recommendations
  index.ts                                  — Drizzle client connected to Neon
  seed.ts                                   — Full seed: 53 leaders, 8 themes, 7 risks, 8 recommendations
lib/
  utils.ts                                  — cn(), color configs for maturity/status/severity/dept
drizzle.config.ts                           — Points Drizzle Kit at db/schema.ts
```

## The dashboard — 5 tabs
1. **Overview** — 4 stat cards, overall % progress bar, per-department progress bars, status breakdown, maturity distribution
2. **Themes** — 8 theme cards + horizontal bar chart (Recharts) + radar chart by department
3. **Risks** — 7 risk cards sorted critical→high→medium→low, each with mitigation block
4. **Recommendations** — 8 recommendation cards with priority/impact/effort/owner/status tags
5. **Roster** — Searchable + filterable table of all 53 leaders (by dept, status, maturity level) with maturity badges, status dots, and standout quote tooltips

## Design
Dark theme matching original HTML dashboard:
- Background: `#0d1117` (deep navy)
- Cards: `#1a1d2e`
- Borders: `#2e3250`
- Indigo accent: `#6c63ff` (primary, L3 maturity)
- Teal: `#00d4aa` (completed, L4)
- Red: `#ff6b6b` (danger, L1, critical)
- Amber: `#ffd166` (warning, L2)
- Purple: `#a78bfa` (L5 transforming)

## Key commands
```bash
npm run dev          # local dev server
npm run db:push      # push schema to Neon (run once after setting DATABASE_URL)
npm run db:seed      # seed all data (run once after db:push)
npm run db:studio    # Drizzle Studio GUI for the DB
npm run build        # production build
```

## Environment variables needed
Copy `.env.example` to `.env.local` and fill in:
```
DATABASE_URL=          # from console.neon.tech → your project → Connection String
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=   # from dashboard.clerk.com → API Keys
CLERK_SECRET_KEY=      # from dashboard.clerk.com → API Keys
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

## Vercel deployment steps
1. vercel.com → New Project → Import `sonja257/ai-strategy-dashboard`
2. Change branch to `claude/organize-ai-interviews-7gw09`
3. Add the 3 env vars above
4. Deploy
5. After deploy: run `npm run db:push` and `npm run db:seed` locally against the production DATABASE_URL
6. In Clerk dashboard → Domains → add the `*.vercel.app` URL

## What the new session should help with
The user (Sonja) wants to deploy this to Vercel. She is signed into Vercel via Google Chrome.
She needs help with:
- Setting up Neon (if not done)
- Setting up Clerk (if not done)
- Walking through the Vercel import UI step by step
- Any build errors that come up during deploy

Note: browser automation tools were NOT available in the previous session. Check if they are available in the new session — if so, you can control the browser directly to deploy. If not, walk her through it step by step.
