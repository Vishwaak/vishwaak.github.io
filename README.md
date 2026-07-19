# vishwaak.github.io

Personal portfolio site for Vishwaak Chandran — About, Projects, Poems, and a Notion-backed Blog. Built with Vite, React, TypeScript, Tailwind CSS, and shadcn-ui, deployed to GitHub Pages.

## Development

Requires Node.js.

```sh
npm install
npm run dev
```

The dev server runs at `http://localhost:8080`.

## Building

```sh
npm run build
```

This regenerates `public/blog-data.json` from Notion (or falls back to sample data if Notion isn't configured) before running the Vite build. See `CLAUDE.md` for details on the Notion integration and environment variables.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages. A separate scheduled/manual workflow (`.github/workflows/deploy-notion.yml`) rebuilds the site to pick up new Notion content without a code push.
