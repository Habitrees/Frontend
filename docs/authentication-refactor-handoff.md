# Authentication cleanup handoff

## Changes in this update

- Kept Login, Register, and Recovery in separate feature folders.
- Kept each journey's pages at the journey root and its components, hooks, and services in
  journey-owned subfolders.
- Removed root-level duplicate locations from `features/authentication`; there are no
  `authentication/components`, `authentication/hooks`, `authentication/services`,
  `authentication/utils`, or loose page files.
- Kept reusable authentication UI under `authentication/shared/components`.
- Clarified the distinction between app-wide `src/shared` primitives and auth-only
  `src/features/authentication/shared` controls.
- Kept one `OtpInput` for Registration and Recovery. Login currently uses mobile plus password.
- Strengthened the success-green token and added a high-priority semantic CSS rule so satisfied
  password checklist text and icons are visibly green.
- Increased password checklist icon size and weight.
- Set the desktop auth shell to the viewport height for standard desktop/laptop sizes, tightened
  registration-details spacing, and allowed natural scrolling on short screens and mobile instead
  of clipping fields.
- Updated the registration visual regression test to check the success-green color and standard
  desktop heights.

## Validation performed on the cleaned source

| Check | Result |
| --- | --- |
| TypeScript project build (`tsc -b`) | PASS |
| ESLint (`eslint .`) | PASS |
| Playwright test discovery | PASS — 28 tests discovered |
| Vite production build | NOT RUN — supplied `node_modules` does not contain the Linux Rolldown native binding required in this environment |
| Browser E2E execution | NOT RUN — Vite cannot start here until platform-specific dependencies are installed |

The TypeScript and ESLint checks were run after removing the duplicate auth modules and updating
the router imports. Browser layout and computed styles still need a local Playwright run.

## Backend status

No backend API contract was supplied. Login, Registration, and Recovery retain separate typed
adapter boundaries and reuse the existing Axios client. No endpoint, request/response schema,
SMS behavior, or token/session policy has been invented. The shared password rules are provisional
client-side guidance and must be reconciled with the backend's actual password policy.
