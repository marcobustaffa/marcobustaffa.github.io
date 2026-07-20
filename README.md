# marcobustaffa.github.io

Personal portfolio, built with [Astro](https://astro.build).

## Develop

```bash
npm install
npm run dev      # local dev server
npm test         # component tests (Vitest)
npm run check    # type check
npm run build    # production build to dist/
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes to GitHub Pages. One-time repo setup: **Settings > Pages > Build and
deployment > Source: GitHub Actions**.
