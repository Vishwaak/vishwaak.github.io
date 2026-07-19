# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Vishwaak's personal site: a single-page portfolio (About / Projects / Blog / Footer) built with Vite + React + TypeScript, styled with Tailwind and shadcn-ui, deployed to GitHub Pages. Originally scaffolded via Lovable (see `lovable-tagger` dev-mode plugin in `vite.config.ts`).

## Commands

```sh
npm run dev                # start dev server (port 8080)
npm run build               # generate-blog-data.js + generate-poems-data.js, then vite build -> dist/
npm run build:dev           # same, but vite build --mode development
npm run lint                 # eslint .
npm run preview              # preview built dist/
npm run deploy                # gh-pages -d dist (manual publish)
npm run generate-blog-data    # regenerate public/blog-data.json only
npm run generate-poems-data   # regenerate public/poems-data.json only
```

There is no test suite configured in this repo.

## Architecture

**Single-page app, no real routing.** `src/App.tsx` wraps everything in `QueryClientProvider` + `TooltipProvider` + `HashRouter`, but there is effectively one route (`/`) rendering `src/pages/Index.tsx`, which just stacks the section components in order: `Navigation`, `About`, `Projects`, `Blog`, `Footer`. A catch-all route renders `NotFound`. New sections get added as components composed into `Index.tsx`, not as new routes.

**Content (blog posts, poems) is fetched from Notion at *build time*, not runtime.** Both follow the identical pattern, in separate Notion databases:
- `scripts/generate-blog-data.js` / `scripts/generate-poems-data.js` run before every `vite build` (wired via the `build` npm script) and write `public/blog-data.json` / `public/poems-data.json` as static files.
- They read `VITE_NOTION_TOKEN` + `VITE_NOTION_DATABASE_ID` (blog) or `VITE_NOTION_POEMS_DATABASE_ID` (poems) + `VITE_USE_NOTION` from the environment, falling back to parsing `.env.local` manually if unset. If Notion isn't configured (or `VITE_USE_NOTION !== 'true'`), they fall back to hardcoded sample data.
- At runtime, `src/lib/notion.ts`'s `getBlogPosts()` / `getPoems()` just `fetch('/blog-data.json')` / `fetch('/poems-data.json')` — they do **not** call the Notion API from the browser. Each has a duplicate hardcoded sample array in `src/lib/notion.ts` used only as a fallback if the static JSON fetch fails.
- `src/hooks/useBlogPosts.ts` / `src/hooks/usePoems.ts` are the React hooks consuming those.
- If you change the shape of blog/poem data or Notion property mapping, update it in **both** the relevant `scripts/generate-*-data.js` (build-time fetch/mapping) and the corresponding interface/sample data in `src/lib/notion.ts` — they're not shared code.
- **`Poems` is intentionally not rendered on the homepage** (`src/pages/Index.tsx` and the `Navigation` links omit it) even though its Notion pipeline is fully wired up — it's built for a future page/route that doesn't exist yet.

**Deployment is GitHub Actions, not the local `deploy` script.** `.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main`, injecting `NOTION_TOKEN`/`NOTION_DATABASE_ID`/`NOTION_POEMS_DATABASE_ID` repo secrets and setting `VITE_USE_NOTION=true`. `.github/workflows/deploy-notion.yml` is a separate workflow for rebuilding on a schedule (daily 9 AM UTC cron), manual `workflow_dispatch`, or a `repository_dispatch` webhook from Notion — same build/deploy steps, intended for content-only refreshes without a code push. `base: '/'` in `vite.config.ts` is set for a GitHub Pages *user* site (`username.github.io`); change to `/repo-name/` only if this ever becomes a project site.

**UI components:** `src/components/ui/*` is the standard shadcn-ui set (Radix primitives + `cva` variants), added via the shadcn CLI (`components.json` configures aliases: `@/components`, `@/lib`, `@/hooks`, `@/components/ui`). Treat these as generated/vendored — prefer composing them over editing internals.

## Notes

- `@typescript-eslint/no-unused-vars` is turned off in `eslint.config.js` — don't add it back without checking why it was disabled.
- HashRouter is used (not BrowserRouter) so client-side routing works on GitHub Pages without server-side rewrite support.
