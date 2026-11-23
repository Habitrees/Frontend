# Habitree — «عادت‌های من» (Mock MVP)

## Scope and visual source

This feature implements **only** `/my-habits` on `feat/my-habits`; no desktop sidebar, authentication screens, dashboard redesign or additional check-in forms. Visual references are the Desktop / Tablet / Mobile screenshots from Figma Make, its original UI icon SVGs and the three subsequently supplied botanical PNGs, not an invented interface. Figma is **read-only** and was not changed. Direct pixel-by-pixel comparison with the source Figma file remains unverified.

- **Desktop (≥1024px):** compact horizontal habit rows.
- **Tablet (640–1023px):** responsive cards with rearranged content and tablet navigation.
- **Mobile (<640px):** stacked cards and bottom navigation; avoid horizontal overflow.
- Use normal browser zoom (100%), RTL text, the bundled Vazirmatn font, and the existing `--habits-*` design tokens in `src/index.css`. The feature stylesheet is scoped in `src/features/habits/habits.css`.
- Original UI icon SVGs and the three user-supplied botanical PNGs are in `src/features/habits/assets/`. Decorative images have empty `alt`; meaningful plant images have descriptive `alt`.

## Architecture, paths and reusability

| Path | Responsibility |
| --- | --- |
| `src/app/router.tsx` | Existing router plus `/my-habits` registration |
| `src/features/habits/HabitsPage.tsx` | Page semantics, UI state, controls and mock actions |
| `src/features/habits/components/` | `HabitsHeader`, `HabitFilters`, `HabitSortDropdown`, `HabitCard`, `EditHabitDialog`, `DeleteHabitDialog`, asset mapping |
| `src/features/habits/types.ts` | Typed Habit view model and discriminated measurement union |
| `src/features/habits/data/mockHabits.ts` | Five demo habits used in the Figma Make design |
| `src/features/habits/utils/habitFilters.ts` | Pure query/status/sort/pagination helpers |
| `src/features/habits/hooks/useHabits.ts` | Async state, error/loading, reload and delete |
| `src/features/habits/services/` | Repository interface; in-memory and HTTP adapters |
| `src/shared/components/{Button,Input}.tsx` | Reused reference components from `e2e.zip` |
| `src/index.css` | Shared and semantic habit tokens |

The search control and "عادت جدید" button reuse the shared `Input` and `Button` from the Authentication reference rather than reimplementing them. The feature retains its own scoped layout CSS to match the Figma Make designs. The code uses React + TypeScript + Tailwind host integration, native controls, one visible `<h1>`, labels, keyboard-accessible actions, responsive layout, and accessible notifications.

## Mock behavior (today)

Search (habit title), status tabs, newest/oldest sorting with a custom keyboard-accessible dropdown, pagination and action menus operate on an in-memory repository. All cards start with a collapsed three-dot menu; it opens a **two-icon-only** edit/delete popover with accessible button names. The edit action opens a keyboard-accessible native modal (`<dialog>`) using the existing shared `Input`/`Button`, React Hook Form and Zod; saving changes only title/subtitle in memory. Escape/cancel closes the modal without saving. Delete opens a centered, accessible native `<dialog>` confirmation styled with project tokens. Cancelling or pressing Escape leaves mock data unchanged; only explicit confirmation deletes the habit. No browser `window.confirm` is used. Repository errors do not silently close the dialog. Reloading the page resets demonstration data. The **new-habit** control still shows a notice until its separate page/route is implemented. The Figma design has no in-card check-in form; **do not add one solely for tests**. Progress, Streak and plant stage are demonstration fields; the frontend does not calculate authoritative business rules.

**Assets:** There are **23 retained Figma Make icon SVGs** (`src/features/habits/assets/icons/{desktop,responsive}/*.svg`) and **3 user-provided plant PNGs** (`src/features/habits/assets/plants/{bluebell,daisy,lavender}.png`). All icons and plants are statically imported in `components/habitAssets.ts`; Vite bundles them with hashed, base-aware URLs and missing files fail the build. The eight obsolete plant SVG files were removed. No external image URL is required.

## Future API boundary / integration

`HabitsRepository` defines `getHabits`, `recordHabit`, `updateHabit`, `deleteHabit`. `MockHabitsRepository` is used for the present mock screen; `HttpHabitsRepository` accepts an injected Axios instance and injected endpoint paths (including a future edit route), without guessing a Django endpoint. The `Habit` type is a UI view model **not** a confirmed Django serializer. Agree on the DTO and map responses before enabling the real adapter. Django owns Streak calculations (Strict/Flexible), validation, plant stages and per-user authorization. Never include secrets/tokens in client source.

**Merge rules:** `feat/authentication` was a separate branch and is not merged here. Keep all Login/Register/Recovery routes when integrating `/my-habits`; resolve the likely router-import conflict instead of replacing the full Router. Deduplicate the shared `Button`/`Input`, merge `index.css` tokens selectively, and reconcile the two Axios client locations. The current `/my-habits` route has **no Auth Guard**; apply the authenticated-route mechanism after merging Authentication, before showing real personal records.

## Testing and acceptance

The test plan, acceptance criteria, commands, verified outcomes and limitations are documented **in this file below**. Tests prioritize user behavior and relevant Mandatory Core criteria instead of brittle pixel details. Existing CI / Playwright configuration is retained; failure artifacts are not part of the Git commit.

### Feature-level compliance (checked against project contract and Mandatory Core)

- [x] Feature-Based architecture, React/TS, reusable shared controls, semantic markup, correct `h1`.
- [x] Mock data boundary and injectable HTTP adapter; backend rules kept out of the UI.
- [x] Desktop/tablet/mobile layouts implemented with Figma Make references; no sidebar or extra form.
- [x] Playwright functional flows, edit and confirmed mock deletion, image loading and responsive checks included; CI configured to execute them.
- [x] README, consolidated feature/testing document, and executable test files included.
- [ ] Exact live comparison with three **original** Figma frames and complete keyboard/screen-reader audit not verified.
- [ ] Protected route and real API integration require the Authentication/backend branches.
- [ ] Final build, lint and Playwright execution for **this patch**: record actual outputs before claiming success.

The remaining 35 Mandatory Core items are **project-wide**, not all obligations of this single mock feature. Backend/API security, database, Docker deployment, HTTPS, reporting/architecture diagrams, monitoring and final CI branch-protection must be verified by their responsible workstreams; no unsupported passing claim is made here.


---

## Testing & Quality Assurance — Mock MVP

### Testing objective

The Mandatory Core requires real user flows in Playwright/Cypress, failure screenshots and reporting, and a CI run that blocks on errors. These tests validate the **mock feature** without a backend. They do **not** validate JWT, Django business rules, server permissions or real API availability. The project-level requirement of at least **three complete E2E user journeys** must be evaluated across the integrated product after Authentication and API integration; tests within this feature contribute flows but cannot claim the whole project requirement is finished.

### Browser E2E — `e2e/my-habits.spec.ts`

| Scenario | Acceptance criteria |
| --- | --- |
| Open My Habits | `/my-habits` loads, exactly one main `h1`, five mock cards, labeled search and status controls; no sidebar or unexpected check-in form |
| Search/filter/empty | Query narrows habits; completed tab selects correct mock state; nonexistent search shows a user-facing empty state |
| Sorting/pagination | Oldest-first order is correct; next/previous disabled when only one page exists |
| Actions/delete | Three-dot menu starts closed; opens two accessible icon-only actions, Escape, outside click and keyboard focus outside close it; clicking delete opens an accessible centered confirmation modal, cancelling/Escape preserves the habit, and confirming removes it (without `window.confirm`) |
| Mock edit | Clicking edit opens a modal; invalid title is rejected; saving modifies title and subtitle and closes it; cancel discards changes |
| Plant assets | All five cards load the three user-provided, correctly named PNG plant assets in mobile, tablet and desktop breakpoints (natural image width > 0) |
| Responsive mobile/tablet/desktop | At 390/768/1440px page renders cards and title without horizontal overflow |

### Isolated mock tests — `e2e/my-habits-mock.spec.ts`

These tests exercise the typed in-memory Repository and pure utilities independently of network/backend: defensive copies, deletion/unknown ID, editing/validation while retaining server-owned stats, search and paging without mutating original fixtures.

We intentionally removed pixel-exact button size, checking text absent in a particular header class, six nearly duplicate viewport tests, and implementation-specific CSS classname assertions. Visual fidelity is checked separately against Figma, not equated with E2E behavior tests.

### Commands (from Frontend root)

```bash
npm ci
npx playwright install chromium
npm run lint
npm run build
npm run test:e2e
```

To run only this feature:

```bash
npx playwright test e2e/my-habits.spec.ts e2e/my-habits-mock.spec.ts
```

CI is configured in `.github/workflows/frontend-ci.yml` to run all checks on push/PR and upload Playwright artifacts. The `playwright.config.ts` captures screenshot/video/trace **only on failure**; generated `playwright-report/` and `test-results/` should not be committed.

### Verified versus pending

- **User-supplied runs prior to this patch:** `npm run build` and `npm run lint` succeeded for earlier code; a later Playwright report contained **11 passed, 0 failed, 0 skipped** (on the previous suite). This is **not** the result of the present changes.
- **This image/menu/edit patch:** final `npm run lint`, `npm run build` and Playwright outcome must be recorded after running in the checkout. No passing claim should be inferred from previous reports.
- **Future API tests:** to add once routes, DTO, auth state and permissions exist; mock success does not demonstrate backend security or correctness.

### Before committing

1. Run lint, build and Playwright; capture actual output for review.
2. Ensure no `.env*`, `node_modules/`, `dist/`, `playwright-report/`, `test-results/` or `.git/` archives enter the commit.
3. Check visual parity for all 3 designs at browser zoom 100% and keyboard behavior.
4. Review `git diff --cached`, commit on `feat/my-habits`, and open a PR into `develop` after CI passes.


## Git readiness checklist

- [ ] In the local checkout, run `npm run lint`, `npm run build`, `npm run test:e2e`; record real output in the PR. Previous pass reports concern older revisions and are not evidence for this source.
- [ ] Visually compare Desktop / Tablet / Mobile at 100% zoom against the supplied reference screenshots; verify pointer click-outside, Tab, Escape, editing, deletion and all five plant images.
- [ ] Check staged files (`git diff --cached --check` and `git diff --cached --stat`). Do not commit `.env*`, `.git`, `node_modules`, `dist`, `test-results` or `playwright-report`.
- [ ] Open a reviewed PR from `feat/my-habits` to `develop`; only use this feature's mock data until the Authentication and backend permissions are integrated.

### Evidence from isolated checks on this revision

- **Source syntax:** 24 TypeScript/TSX files transpiled with no syntax diagnostics.
- **Mock data logic:** pure TypeScript compilation and 8 independent assertions passed (data isolation, edit, delete, search and pagination).
- **Image files:** all 23 retained Figma Make SVG icons and three uploaded PNG botanical illustrations have valid local paths. No old plant SVG assets or public-path dependencies remain in the clean source package.
- **Full project checks in this workspace:** `npm run lint` could not start (`eslint` unavailable); `npm run build` could not resolve `vite/client` and Node type definitions because npm dependencies were not installed. **Playwright was not run against this revision.** Do not report any of these as passing until they run successfully in the local project.

## Plant assets and action menu behavior

The three user-provided 320×320 transparent images were identified by their actual content:

| Supplied filename | Final asset | Plant | Mock habit mapping |
| --- | --- | --- | --- |
| `full.png` | `src/features/habits/assets/plants/bluebell.png` | Bluebell / گل زنگوله‌ای آبی | Water, Sleep |
| `full (1).png` | `src/features/habits/assets/plants/daisy.png` | Daisy / گل مینا | Exercise |
| `full (2).png` | `src/features/habits/assets/plants/lavender.png` | Lavender / اسطوخودوس | Study, Mindfulness |

These species assignments are mock visual fixtures, not an implementation of the backend-managed plant-growth rules. The images are the same across responsive breakpoints and use descriptive `alt` text. Eight unused plant SVGs were deleted; UI SVG icons were retained.

The mock deletion action opens a centered confirmation modal and only removes the selected habit after explicit confirmation; cancelling or pressing Escape preserves it. The three-dot popup is initially closed, contains only Edit/Delete SVG icons (accessible `aria-label`s, no visible text or tooltip), and is dismissed by clicking outside its trigger/popup, shifting keyboard focus outside it, or pressing Escape. Clicking inside the popup permits the chosen action to run. The action menu is only one at a time. All behaviors are covered in the **existing** `e2e/my-habits.spec.ts`; no extra spec or documentation files have been created.

### 2026-11-23 — asset loading hotfix (same feature)

The earlier instruction to delete `public/assets/habits` removed original Figma UI icons as well as obsolete plant artwork and caused broken images. This has been corrected by moving the **23 existing Figma SVG UI icons** and the **three user-provided plant PNGs** into `src/features/habits/assets/` and using static imports through `habitAssets.ts`. The new code does not use or require `public/assets/habits`. At build time Vite validates referenced assets; at runtime URLs use Vite's generated asset paths. Existing Playwright file `e2e/my-habits.spec.ts` was updated to assert that every visible icon and plant resolves (`naturalWidth > 0`) at mobile, tablet and desktop widths and that action popups dismiss on outside pointer interaction. No changes were made to auth, Router, shared controls or app tokens. The full test suite must be rerun in the user's local checkout before declaring success.

### 2026-11-23 — final mock UI controls revision

- Delete requires a centered, accessible confirmation modal in the mock UI; there is no `window.confirm` or external route. In the real backend integration, destructive-action product decisions and authorization must be reviewed before deployment.
- Sorting uses a feature-local, keyboard-accessible custom dropdown (button/listbox, arrow keys, Escape, outside click) to avoid operating-system-dependent native select styling.
- Shared `Button` and `Input` remain reused in the new-habit action and edit form; the shared Input's outer focus ring is retained while the duplicate inner input outline is suppressed only within My Habits.
- Playwright assertions in the existing `e2e/my-habits.spec.ts` now cover styled sorting, keyboard dismissal, presence of accessible confirmation, cancellation and absence of browser-native prompts, and input focus. Run lint, build and E2E locally for this exact revision before committing.

## Latest UI review — deletion confirmation and token usage

- Clicking the icon-only delete action opens `DeleteHabitDialog` (native HTML `<dialog>`), with the habit name and explicit **انصراف** / **بله، حذف شود** shared `Button` controls. No deletion occurs until confirmation; Escape and Cancel leave the mock data intact. Confirm performs a repository action; errors keep the dialog visible.
- The existing shared `Button` is also used for the new-habit action and edit modal; the existing shared `Input` is used for search and edit fields. No new shared component or global CSS change was necessary.
- Feature colors use existing `src/index.css` design tokens. The former direct `rgba` shadow in `habits.css` was changed to `color-mix` referencing `--brand-dark`; literal color values remain centralized as token definitions in `index.css`.
- `e2e/my-habits.spec.ts` was updated in-place for confirm/cancel/Escape and the absence of native browser prompts. Re-run actual lint/build/E2E on this revision before checking these items as passed.

- Sort dropdown highlighting: the selected option is indicated by text color/weight and `aria-selected`; the soft background follows only pointer hover or keyboard focus. The existing E2E suite checks that hovering the other option does not leave both options highlighted.
