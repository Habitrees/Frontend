# Habitree Frontend

Frontend for the Habitree habit-tracking project: React, TypeScript, Vite and Tailwind CSS.

## Run locally

```bash
npm ci
npm run dev
```

The current feature branch `feat/my-habits` provides the **mock-only My Habits** screen at `http://localhost:5173/my-habits`. It does not need a Django backend for the preview. The three-dot menu exposes icon-only edit/delete actions; edit opens a temporary mock dialog, and delete requires confirmation. The three named botanical PNGs are bundled from `src/features/habits/assets/plants/` (bluebell/daisy/lavender); the earlier placeholder plant SVGs were removed. The Figma SVG UI icons and supplied PNG plants are bundled via static Vite imports, so missing assets are caught by the build. The action popup closes when clicking outside it or pressing Escape.

## Quality checks

```bash
npm run lint
npm run build
npm run test:e2e
```

Playwright may require `npx playwright install chromium` on first use. CI runs the same checks. Failure artifacts are generated locally but intentionally ignored by Git.

## Documentation

- [My Habits: full feature documentation, tests, acceptance criteria, results and limitations](docs/my-habits.md)
- [Frontend Docker](docs/frontend-docker.md) — infrastructure guide retained from the existing project

## Merge and security

`feat/authentication` is a separate branch. Preserve its routes, shared components and styles during merge; see the merge section in the My Habits documentation. The mock screen is **not** protected by an auth guard yet and must not display real user data before authenticated routing and Django authorization are integrated. The Figma file is read-only.

**My Habits mock UI:** deletion requires an accessible in-page confirmation dialog (no browser `window.confirm`); sorting uses a styled keyboard-accessible dropdown. See `docs/my-habits.md` for acceptance criteria.
