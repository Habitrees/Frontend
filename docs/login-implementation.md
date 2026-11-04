# Habitree login implementation

Implemented in the existing repository `D:\software\Frontend`, on `feat/login-page`.
The login route is `/login`; `/` continues to render the existing Habitree homepage.
The original screenshot is the primary visual reference. Only the floral PNG was copied
from the Figma Make reference; its scaffold, configuration, and simulated success were not copied.

## Files created

| File | Responsibility |
| --- | --- |
| `src/features/authentication/LoginPage.tsx` | Page composition, RTL form section, document title. |
| `src/features/authentication/components/BotanicalWelcome.tsx` | Botanical desktop panel and exact reference artwork. |
| `src/features/authentication/components/LoginHeader.tsx` | Brand and functional links to the existing homepage. |
| `src/features/authentication/components/LoginForm.tsx` | Accessible form presentation, visibility toggle, unavailable-action notices. |
| `src/features/authentication/components/PrivacyFooter.tsx` | Reference reassurance footer. |
| `src/features/authentication/hooks/useLogin.ts` | Typed validation/submission state, duplicate-submit guard, remember preference. |
| `src/features/authentication/services/auth.types.ts` | UI credentials/options, opaque authentication result, service interface. |
| `src/features/authentication/services/auth.service.ts` | Adapter boundary using the existing Axios client; rejects until configured. |
| `src/shared/components/Button.tsx` | Reusable typed button with safe default type and disabled styling. |
| `src/shared/components/Input.tsx` | Reusable typed labelled input, icon/action slots, field errors. |
| `src/shared/utils/phone.ts` | Persian/Arabic numeral normalization for local phone validation. |
| `src/assets/login-botanical.png` | Original transparent floral asset from the supplied reference. |
| `e2e/login.spec.ts` | Interaction, responsive, contrast, and required-field checks. |
| `docs/login-implementation.md` | This handoff, verification record, and checklist. |

## Files modified and existing code reused

- `src/app/router.tsx`: adds `/login`; preserves `/` and its existing component.
- `src/index.css`: retains existing tokens and Tailwind import, adds login semantic colors,
  reusable typography, focus styling, and responsive composition rules.
- Reused unchanged: `src/lib/api/axios.ts`, its `VITE_API_BASE_URL` convention,
  `src/main.tsx` and local Vazirmatn font import, `vite.config.ts` with Tailwind v4,
  the existing router, `src/App.tsx`, Playwright configuration, and homepage test.
- No shared Button/Input existed before this change. No habits/profile implementations
  existed in the inspected checkout; no placeholder features or empty feature folders were added.
- `package.json`, `package-lock.json`, TypeScript/build configuration, and the reference
  project's files are unchanged. Only already-declared dependencies were installed via npm ci.

## Backend handoff

The service intentionally performs no network requests and returns no simulated successful login.
A valid form currently produces an honest Persian "login is not active yet" error.

Supply a `LoginAdapter` to `createAuthenticationService` in `auth.service.ts` when documentation
is available. The existing Axios client is passed to the adapter and remains the sole source
of API base URL configuration. The adapter must implement the documented endpoint, serialize
the UI credentials, validate/map the response, and map backend errors to application errors.
`AuthenticationResult.backendResult` is an opaque application wrapper, NOT an invented wire
response; replace `unknown` with the documented domain result after reviewing the API contract.

Still pending:

- Login endpoint, HTTP method, payload/response types, error codes, and rate-limit behavior.
- Backend-approved phone formats; current UI validation accepts local Iranian `09` + 9 digits,
  including Persian/Arabic digits and whitespace. It is not a backend serializer.
- Password policy: only presence is checked, with no invented minimum length.
- Session/token/cookie/CSRF policy and remember-me semantics; no persistence is implemented.
- Post-login navigation, authenticated user state, and any protected-route policy.
- Password-recovery and signup flows. Their controls display unavailable notices instead
  of pointing at invented routes or using dead links.

The hook separates idle/loading/error/success with a discriminated union. The form renders
loading/disabled/spinner and error/status feedback; success requires the configured service
to resolve. No adapter is configured in this implementation. Backend latency, success, and
session behavior require integration verification when the contract exists.

## Responsive and visual behavior

- Desktop at 1440x1000: left botanical panel, right 440px form, matched artwork position,
  header/footer, rounded controls, and source screenshot colors.
- Desktop at 1024x768: narrower panel, smaller panel heading and artwork; natural vertical
  scrolling when the content requires more height, without clipped artwork or dots.
- Below 1024px: botanical panel is hidden; brand/header, form, and footer remain.
- Below 640px: 20px side gutters, smaller semantic heading token, full available form width.
- Input/button height is 54px. Form width is at most 440px. Short and landscape viewports
  scroll vertically. No horizontal scrolling was observed in the tested sizes.
- Deliberate visual adjustment: muted text, panel copy, and placeholders are slightly darker
  than the screenshot to meet a minimum normal-text contrast ratio of 4.5:1.
- Exact screenshot artwork was reused. Its softened opacity matches the original visual.
  No pixel-perfect or cross-browser certification is claimed.

## Verification

- Strict application TypeScript: `node node_modules/typescript/bin/tsc -p tsconfig.app.json --strict --noEmit`.
- Existing scripts: `npm run lint` and `npm run build`.
- Browser suite: 12 Playwright tests, including the unchanged homepage test and 11 login tests.
  All passed using installed Google Chrome with a temporary config outside the repository.
  Playwright Chromium download was unavailable (connection resets and regional HTTP 403),
  so the repository's normal Playwright config was left unchanged.
- Viewports: 1440x1000, 1024x768, 768x1024, 390x844, 320x568, 844x390.
- Browser-generated full-page screenshots are in ignored `test-results/login-*.png`.
  Desktop, small desktop, tablet, mobile, and narrow mobile screenshots were visually reviewed.
- Validation checks required fields, invalid phone, Persian/Arabic digits, first-error focus,
  and does not impose a password minimum. Valid submission is verified to make no API request
  and not show a successful login. Visibility, keyboard checkbox use, action notices, unchanged
  home navigation, absence of storage, form width, artwork loading, and overflow are checked.
- Accessibility checks cover labels, required/invalid descriptions, first-error focus,
  keyboard checkbox operation, visible focus styling, named toggle/pressed state,
  live error/status feedback, autocomplete, RTL, reduced motion, and text-token contrast.
  This is a scoped check, not a full assistive-technology certification.

## Implementation checklist

| Requirement | Status | Evidence |
| --- | --- | --- |
| Original Figma visual fidelity | PASS | Original floral asset; final 1440x1000 screenshot visually compared with supplied reference; contrast adjustment documented above. |
| Correct project folder structure | PASS | Authentication components/hooks/services under `src/features/authentication`; shared primitives/utilities under `src/shared`; original files preserved. |
| TypeScript implementation | PASS | All new application components are `.tsx`; logic/types are `.ts`; strict application check passes; no `any`. |
| Tailwind CSS usage | PASS | Existing v4 Vite plugin/import retained; semantic utility classes compile in production build. |
| CSS variables used for colors and fonts | PASS | `src/index.css` centralizes colors, typography and font mapping; new components contain no literal colors or font families. |
| Responsive desktop layout | PASS | Playwright 1440x1000 and 1024x768 layout checks plus visual review. |
| Responsive tablet layout | PASS | Playwright 768x1024 width/overflow checks plus screenshot review. |
| Responsive mobile layout | PASS | Playwright 390x844, 320x568 and 844x390 checks; mobile screenshots reviewed. |
| Reusable components | PASS | Shared Button/Input, authentication panel/header/form/footer and useLogin hook. |
| No unnecessary duplicate components | PASS | Original repository inventory had no shared primitives; one Button and one Input introduced. |
| Form validation | PASS | Playwright required/invalid phone, first-focus and Persian/Arabic digit tests; `LoginForm.tsx`, `phone.ts`. |
| Loading and error states | PASS | Typed state/duplicate-submit guard reviewed in `useLogin.ts`; spinner/disabled rendering in `LoginForm.tsx`; backend-unavailable error/reset tested. Real latency remains backend-dependent. |
| Accessibility | PASS | Scoped keyboard/semantic/contrast tests and focus/reduced-motion source review; limitations described above. |
| Backend-ready authentication service | PASS | Typed injectable adapter reuses existing Axios configuration; unconfigured submission tested. |
| No invented API contracts | PASS | No endpoint, payload serializer, wire schema, or session policy; opaque result and explicit TODOs in service/types. |
| No hardcoded backend secrets | PASS | New source reviewed; only existing public API base URL configuration reused. |
| No unrelated project changes | PASS | Git diff limited to login, shared controls, tokens, route, tests, artwork and this report; existing home E2E passes. |
| TypeScript checks | PASS | Strict application TypeScript command exits 0. |
| Lint checks | PASS | Existing lint script exits 0 after final source changes. |
| Build verification | PASS | Existing production build exits 0 after final source changes. |
| Real backend login/session integration | BLOCKED | Actual backend contract is not supplied; no fake success or storage added. |

Git branch remains `feat/login-page`. No branches were switched and no commit, push, merge,
rebase, or checkout was performed. Changes are left uncommitted for review.
