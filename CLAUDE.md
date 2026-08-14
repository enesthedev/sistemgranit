# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A Payload CMS 3 application running inside Next.js 16 (App Router, React 19). The Payload admin
and the public marketing frontend share one Next.js app, split by route group.

## Verification

Do **not** use browser automation (claude-in-chrome, chrome-devtools MCP, etc.) to verify
changes. Verify with `bunx tsc --noEmit`, `bun test`, and non-interactive `curl` against the
running dev server. If a change genuinely needs in-browser (interactive) verification, ask the
user to check it themselves rather than driving a browser.

## Package manager

This project uses **bun** (`bun.lock`). Use `bun add` / `bun add -d` / `bunx`, not pnpm or npm.
(`README.md` is the stock Payload template and is stale — it references pnpm and MongoDB, neither
of which this project uses.)

## Commands

- `bun dev` — start the dev server (http://localhost:3000; admin at `/admin`)
- `bun run devsafe` — dev server after wiping `.next` (use when the build cache is corrupt)
- `bun run build` — production build (runs with `--max-old-space-size=8000`)
- `bun run lint` — ESLint
- `bun run generate:types` — regenerate `src/payload-types.ts` from the Payload config
- `bun run generate:importmap` — regenerate `src/app/(payload)/admin/importMap.js`
- `bun test` — run integration then e2e suites
- `bun run test:int` — Vitest integration tests (`tests/int/**/*.int.spec.ts`, jsdom)
- `bun run test:e2e` — Playwright e2e tests (`tests/e2e/`)
- Single integration test: `bunx vitest run tests/int/api.int.spec.ts`
- Single e2e test: `bunx playwright test tests/e2e/frontend.e2e.spec.ts`

After changing any collection, field, or config in `src/`, run `bun run generate:types` so
`src/payload-types.ts` stays in sync. After adding/removing admin components, run
`generate:importmap`.

## Architecture

- **Payload config**: `src/payload.config.ts` is the single source of truth — registers
  collections, the Lexical rich-text editor, the DB adapter, and the admin user collection.
  Database is **Vercel Postgres** (`@payloadcms/db-vercel-postgres`), not MongoDB.
- **Collections**: `src/collections/` (`Users` = auth + admin access, `Media` = uploads).
  Add a new collection here and register it in `payload.config.ts`'s `collections` array.
- **Route groups** under `src/app/`:
  - `(payload)/` — Payload-generated admin UI, REST (`/api`), and GraphQL routes. Treat as
    generated; keeps its own SCSS (`custom.scss`) and must stay free of Tailwind (see Styling).
  - `(frontend)/` — the public site (Tailwind + shadcn). Server Components by default.
- **Accessing Payload from app code**: `getPayload({ config })` with the `@payload-config`
  alias (see `src/app/my-route/route.ts`). Path alias `@/*` → `src/*`.

## Environment

Requires `POSTGRES_URL` (Postgres connection string) and `PAYLOAD_SECRET`. Note `.env.example`
is the stale template default (`DATABASE_URL`/Mongo) — the live config reads `POSTGRES_URL`.
`docker-compose.yml` is the stock Mongo template and does not match the Postgres setup.

## Styling

The public frontend (`src/app/(frontend)/`) uses **Tailwind CSS v4** (CSS-first config in
`src/app/(frontend)/globals.css`, no `tailwind.config.js`) and **shadcn/ui** (`new-york`
style, components in `src/components/ui/`, `cn()` helper in `src/lib/utils.ts`). Add
components with `bunx --bun shadcn@latest add <name>`.

Tailwind is imported **only** in `(frontend)/layout.tsx` (via `globals.css`). The Payload admin
route group `(payload)/` keeps its own SCSS and must stay free of Tailwind so preflight resets
never leak into the admin UI.

## Commit conventions

- Write commit messages in English.
- Keep commits atomic — one logical change per commit.
- Do not mention "Claude" or AI assistance in commit messages, and do not add a
  `Co-Authored-By` trailer.

## Payload skill

This project ships the Payload CMS skill at `.claude/skills/payload/`. Start with
`.claude/skills/payload/SKILL.md` for a quick reference, then see
`.claude/skills/payload/reference/` for detailed docs (collections, fields, hooks, access
control, queries, endpoints, adapters).
