# AI/ML Portfolio — Starter

Starter scaffold for the AI/ML portfolio (Next.js + TypeScript + Tailwind).

Quick start:

```bash
npm install
npm run dev
```

This repo contains an initial app layout, a dynamic projects JSON data file, and a sample dynamic project route. Customize content in `src/data/projects.json`.

Environment variables (create `.env.local` from `.env.local.example`):

 - `NEXT_PUBLIC_BASE_URL` — Your site base URL (used for sitemap and OpenGraph)
 - `SENDGRID_API_KEY` — (optional) SendGrid API key to enable contact emails
 - `CONTACT_TO_EMAIL` — Destination email for contact form
 - `CONTACT_FROM_EMAIL` — From email for contact messages
 - `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET` — (optional) Sanity CMS config

Build for production:

```bash
npm run build
npm start
```

Deployment:

 - Vercel is recommended for best Next.js support. Ensure `NEXT_PUBLIC_BASE_URL` is set in your Vercel environment variables.


Sanity CMS (optional)
 - This starter supports optional Sanity CMS integration. If you set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`, the site will fetch projects from Sanity.
 - To enable: create a Sanity studio, define a `project` schema with fields like `title`, `slug`, `short`, `technologies`, `description`, `details`, then set the env vars and deploy.

Quick Sanity setup (high level):

```bash
# in a separate folder
npx create-sanity@latest
# follow prompts to create a studio, add a `project` schema
# set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local
```

The project includes a simple file-based admin at `/admin` which edits `src/data/projects.json` directly when running locally.

If you create or add a `studio/` folder, you can run the studio locally from the repo root with:

```bash
npm run studio
```

When deploying, consider running Sanity as a separate service and set `NEXT_PUBLIC_SANITY_PROJECT_ID` in your deployment environment.
