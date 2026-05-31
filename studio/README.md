Sanity Studio (optional)

This folder contains a minimal Sanity Studio config and a `project` schema. To run a full studio locally, install the Sanity CLI and initialize or copy this folder into a proper Sanity studio scaffold.

Quick steps:

```bash
npx sanity init --template clean
# copy schema files into the created studio's `schemas/` and `sanity.config.ts`
npm install
npm run dev
```

Set `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET` in your environment before running.
