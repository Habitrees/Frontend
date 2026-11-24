# Habitree Frontend

Habitree helps users build habits and follow their progress. The frontend uses React, TypeScript, Vite and Tailwind CSS.

## Getting started

Requires Node.js 22 and npm.

```bash
npm ci
npm run dev
```

Open the URL printed by Vite. The current My Habits implementation is available at `/my-habits`; `/` redirects to it. It uses in-memory demo data and does not require a backend. Changes are reset on refresh.

## Development checks

```bash
npx playwright install chromium
npm run lint
npm run build
npm run test:e2e
```

The Playwright configuration starts the development server and writes an HTML report to `playwright-report/`. GitHub Actions runs the frontend checks and uploads test artifacts. Do not commit local environment files, dependencies, build output or test reports.

## Documentation

- [My Habits — functionality, architecture and integration](docs/my-habits.md)
- [Frontend Docker](docs/frontend-docker.md)
- [Design reference (Figma)](https://www.figma.com/design/XtaN3iBwuZM6Y2f7vfJVfC/Habitree?node-id=92-42458)

## Contributing

Create a feature or fix branch from `develop`, use Conventional Commits, and submit a pull request with passing checks and a review before merging.
