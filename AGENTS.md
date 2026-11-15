<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# HelpHive

Early-stage Next.js 16 App Router app in **JavaScript** (no TypeScript) with shadcn/ui on Base UI. The only page is `src/app/page.js`; the rest is the default layout plus CLI-generated UI components.

## Commands

- `npm run dev` — Turbopack dev server on :3000.
- `npm run build` — the real verification step; currently passes. Next 16 no longer runs lint during build, and there is no test runner or `typecheck` script.
- `npm run lint` — runs plain `eslint` (flat config, Next core-web-vitals).
- **Lint baseline is red**: `src/components/ui/carousel.jsx` and `src/hooks/use-mobile.js` violate `react-hooks/set-state-in-effect`. Don't claim a regression or rewrite generated files over it unless the task is to fix lint.
- This Windows PowerShell blocks `npm.ps1`/`npx.ps1`: prefix commands with `cmd /c` (e.g. `cmd /c "npm run lint"`).

## Next.js config quirks (`next.config.mjs`)

- `cacheComponents: true` + `partialPrefetching: true`: use the Cache Components model (`use cache`, Suspense boundaries), not legacy `fetch` caching. Uncached/runtime data without a `<Suspense>` boundary becomes a build/dev blocking-route error. Read `node_modules/next/dist/docs/01-app/01-getting-started/08-caching.md` and `09-revalidating.md` first.
- Next 16 dynamic APIs are async: `await params`, `await searchParams`, `await cookies()`, `await headers()`.
- `reactCompiler: true`: the compiler handles memoization. Don't add `useMemo`/`useCallback`/`memo` preemptively, and keep effects free of synchronous `setState`.
- Tailwind v4 via `@tailwindcss/turbopack` (configured under `turbopack.rules`) and `@import "tailwindcss"` in `src/app/globals.css`. There is **no** `tailwind.config`; theme tokens live in `globals.css` as oklch CSS variables / `@theme inline`.
- `next dev` owns the managed `nextjs-agent-rules` and `nextjs-agent-feedback` blocks in this file. Never hand-edit inside those markers.

## Code conventions

- `@/*` maps to `src/*` (`jsconfig.json`). No `tsconfig`; keep files `.js`/`.jsx`.
- `src/components/ui/*` are shadcn CLI output for `components.json` style `base-nova`, `tsx: false`. Primitives come from `@base-ui/react/*` — **not Radix**, so standard Radix-based shadcn snippets are wrong here.
- Generated components import `cn` from `"cn"` (the package), while `@/lib/utils` re-exports the same helper. Both work; don't introduce `clsx`/`tailwind-merge` wrappers.
- Add UI with the installed CLI (`cmd /c "npx shadcn add <name>"`) instead of hand-writing components, so aliases/style stay consistent. `src/components/ui/` is a component library: don't delete unused files as dead code.
- Prefer theme classes (`bg-primary`, `text-muted-foreground`, `border-border`) over hard-coded colors. Icons are `lucide-react`; interactive components declare `"use client"` themselves.
- `README.md` is unmodified create-next-app boilerplate and its path (`app/page.js`) is wrong; trust the files, not the README.
