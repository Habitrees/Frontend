# Password recovery implementation

Implemented in the existing `D:\software\Frontend` repository on `feat/login-page`.
This continues the approved Login 1 feature. Pre-existing uncommitted Login 1 work was
preserved. No dependencies, build tooling, fonts, colors, or visual assets were added/replaced.

## Routes and flow

`/login` -> `/forgot-password` -> `/verify-reset-code` -> `/reset-password` -> `/login`.
The existing forgot-password action is now a real router link. The existing homepage `/`
and brand/back-to-site links are preserved. All three recovery routes share one in-memory
provider. A challenge must precede verification and a grant must precede reset; direct
links and page reloads restart the flow at the phone page. This is frontend flow control,
not a replacement for backend authorization.

## New source files

| File | Responsibility |
| --- | --- |
| `src/features/authentication/ForgotPasswordPage.tsx` | Phone validation, request form, registration prompt, next-step navigation. |
| `src/features/authentication/VerifyOtpPage.tsx` | Six-digit validation, guarded verification, next-step navigation. |
| `src/features/authentication/ResetPasswordPage.tsx` | New/confirmation fields, matching validation, return to Login 1. |
| `src/features/authentication/components/AuthLayout.tsx` | Exact Login 1 layout reused by all pages; recovery alignment and no footer match references. |
| `src/features/authentication/components/PasswordRecoveryProvider.tsx` | Keeps the recovery controller mounted across the three recovery routes. |
| `src/features/authentication/components/PhoneNumberInput.tsx` | Existing shared Input specialized for LTR telephone entry. |
| `src/features/authentication/components/PasswordInput.tsx` | Existing shared Input with independent accessible show/hide toggle and LTR entry. |
| `src/features/authentication/components/OtpInput.tsx` | Six LTR cells, focus movement, backspace, arrows/Home/End, localized digits, paste/autofill. |
| `src/features/authentication/components/RegistrationPrompt.tsx` | Reference registration prompt with honest unavailable notice. |
| `src/features/authentication/components/RecoverySubmitButton.tsx` | Existing shared Button with pending spinner/disabled presentation. |
| `src/features/authentication/components/RecoveryFeedback.tsx` | Service error presentation and explicit simulation notice. |
| `src/features/authentication/hooks/usePasswordRecovery.ts` | In-memory state/context, duplicate-submit protection, service calls, pending/error states. |
| `src/features/authentication/services/auth-recovery.mock.ts` | Isolated gated development adapter; validates demo code without any real SMS/reset. |
| `src/features/authentication/utils/recoveryValidation.ts` | Local phone validation and provisional password baseline. |
| `e2e/recovery.spec.ts` | Full flow, validation, keyboard/paste, route guards, flag/production behavior, all requested viewport sizes. |
| `docs/auth-recovery-implementation.md` | This handoff and evidence checklist. |

## Existing files modified

- `src/app/router.tsx`: three routes inside the recovery provider, original routes preserved.
- `src/features/authentication/LoginPage.tsx`: uses AuthLayout and displays a truthful completion
  notice only after a recovery flow. Normal Login 1 appearance is unchanged.
- `src/features/authentication/components/LoginForm.tsx`: connects only the forgot action to its route.
- `src/features/authentication/services/auth.types.ts`: application recovery input/result/service types.
- `src/features/authentication/services/auth.service.ts`: existing Axios client reused by the typed
  recovery adapter boundary; original login service remains unchanged in behavior.
- `src/shared/components/Input.tsx`: chooses left alignment for explicit LTR fields, keeps placeholders
  right-aligned and existing Login 1 fields unchanged.
- `src/index.css`: recovery positioning, responsive OTP grid, and simulation notice using existing tokens.
- `.env.example`: documents the disabled-by-default development flag; preserves `VITE_API_BASE_URL=/api`.
- `e2e/login.spec.ts`: updates the old unavailable-forgot assertion for the new flow and supports
  minified three-digit hex tokens in the existing contrast test.

Reused unchanged: BotanicalWelcome, LoginHeader, PrivacyFooter, botanical PNG, shared Button,
phone digit normalization, useLogin, Axios configuration, font setup, package files, Vite/
TypeScript/Playwright configuration, original App/homepage, and original homepage E2E test.
The earlier `docs/login-implementation.md` is the historical Login 1 handoff; this document
supersedes its statement that recovery routes are pending.

## Backend integration

No backend endpoint or wire response contract has been invented. Input interfaces describe
UI values, and RecoveryChallenge/RecoveryGrant carry opaque adapter-owned `context: unknown`.
The real adapter must implement the documented endpoint/method, serializers, response validation,
challenge/grant semantics, error mapping, expiry/rate limiting, and session/security requirements.

Connect a PasswordRecoveryAdapter through createPasswordRecoveryService in auth.service.ts.
Its methods receive the existing Axios instance, which already uses VITE_API_BASE_URL.
An adapter can also override validateNewPassword with the documented password rules.
The current fallback is a provisional eight-character UI minimum with a nonblank password,
plus exact confirmation matching. It is not claimed to be the backend policy.
No page needs to know endpoint paths or backend payload formats.

Only a real adapter's resolved reset operation can produce a real-change notice. The mock
produces a distinct "test finished; no real password changed" notice on return to Login 1.
Passwords and OTP codes exist only in component/submission memory. They are not put into
URLs, navigation state, storage, logs, or the mock's challenge/grant registries. Inputs are
cleared/unmounted after successful transitions. Navigation state contains only a notice.

Actual SMS delivery, backend OTP verification, real password changes, session behavior,
expiry/rate limits, and the real password policy remain pending backend documentation.

## Explicit development simulation

The adapter is enabled only when BOTH import.meta.env.DEV and
VITE_ENABLE_AUTH_RECOVERY_MOCK === "true". It is disabled by default. Its own operations
repeat the same check, and its dynamic import is removed from the production build.
The UI visibly states that no SMS is sent and no real password is changed.

To opt in locally in PowerShell before starting the existing dev script:

```powershell
$env:VITE_ENABLE_AUTH_RECOVERY_MOCK = 'true'
npm run dev
```

Use any locally valid Iranian mobile number and the explicitly advertised demo code `123456`.
The mock rejects other codes. Each mock challenge/grant is single-use and remains in memory.
Restart Vite after changing the flag. Set the flag to `false` (or remove it) to disable the mock.
Never configure this mock as a production authentication mechanism; the production guard ignores
this flag even if it is true during a production build.

## Visual and responsive verification

All pages reuse the exact approved botanical panel, illustration, logo/header, tokens, font,
440px maximum form width, 54px inputs/buttons, borders, radii, and shadows.
Recovery form heading/input/button positions were compared with screenshots 2/3/4 at 1440x1000.
The notices are an intentional development-only addition in the otherwise empty upper form area.
The original screenshot's absent footer on recovery pages is respected.

At 1280x800 the same two-column layout fits naturally with vertical scrolling if required.
Below 1024px the illustration hides as in the approved Login 1 responsiveness. At mobile widths,
20px gutters and the existing smaller heading token are used; OTP cells shrink as a six-column
LTR grid with controls at least 40px wide at the tested sizes. Forms retain RTL content and
labels; telephone/password/OTP entry uses LTR. There was no horizontal overflow.

Generated visual evidence is in ignored `test-results/auth-{login,forgot,otp,reset}-{viewport}.png`.
All four pages were tested at 1440x1000, 1280x800, 768x1024, 390x844, and 360x740. Desktop
captures for all new pages, mobile captures for all new pages, a laptop reset capture, and tablet
OTP capture were visually reviewed. Existing Login 1 is pixel-identical to the saved pre-change
1440x1000 screenshot: zero differing pixels out of 1,440,000 in the comparison.

## Verification results

- Strict application TypeScript: PASS (`tsc -p tsconfig.app.json --strict --noEmit`).
- Existing ESLint check: PASS (no suppressed rules).
- Existing production build: PASS; deliberately built with the mock flag true.
- Production bundle scan: mock adapter implementation excluded.
- Development mock suite: 22 passed, 1 expected skip (the default-off test).
- Production preview suite, flag true: 15 passed, 8 expected skips (mock-only cases).
- Development with flag false: dedicated unavailable/no-request test passed.
- Browser runtime: installed Google Chrome via temporary Playwright configs outside the
  repository; no repository Playwright config or dependency changes were required.
- No API requests, storage writes, or browser page errors occurred in the complete demo flow.
- The contrast helper was corrected to understand production minification's three-digit hex
  notation; the final development and production suites both pass.

## Final checklist

| Requirement | Status | Evidence |
| --- | --- | --- |
| Login 1 remains functional and visually unchanged | PASS | Existing login/home tests; zero changed desktop pixels; only forgot link is connected. |
| Login 2 matches its Figma screenshot | PASS | `auth-forgot-desktop.png`, visual comparison with screenshot 2; notice only in explicit demo mode. |
| Login 3 matches its Figma screenshot | PASS | `auth-otp-desktop.png`, visual comparison with screenshot 3; correct six-cell LTR layout. |
| Login 4 matches its Figma screenshot | PASS | `auth-reset-desktop.png`, visual comparison with screenshot 4; shared password controls. |
| Navigation between all four pages works | PASS | Full-flow Playwright test returns to Login 1 with an honest simulated-completion notice. |
| Mobile number validation works | PASS | Empty/invalid values rejected; Persian/Arabic digit numbers tested. |
| OTP input and validation work | PASS | Incomplete/wrong codes rejected; focus, backspace, arrows, Home/End, Persian paste and completion tested. |
| Password visibility toggles work | PASS | Independent show/hide controls tested; named buttons and pressed states. |
| Password confirmation validation works | PASS | Missing, short, mismatched, and matching passwords tested. |
| RTL layout is correct | PASS | RTL forms tested; LTR number/password/OTP entry and visual review. |
| Responsive desktop/laptop/tablet/mobile layouts | PASS | All four pages tested at all five requested viewport sizes without horizontal scrolling. |
| Reusable existing layout/assets/tokens | PASS | AuthLayout composes existing panel/header/footer; no new colors/fonts/assets/dependencies. |
| Accessible semantics and keyboard interactions | PASS | Labels/error descriptions, first-invalid focus, OTP keyboard/paste, live feedback, toggles, reduced-motion spinner. Scoped check, not assistive-technology certification. |
| Loading/error states | PASS | Pending/disabled button observed; incorrect-code and disabled-service errors tested; retry succeeds. |
| Backend-ready service and request/result types | PASS | Typed adapter boundary uses the existing Axios instance; opaque results are explicitly not wire contracts. |
| Development mock explicitly gated | PASS | Mock-enabled flow and default-off development test both pass. |
| Mock never silently enabled in production | PASS | Production build with flag true excludes adapter and production browser submission remains unavailable. |
| No password/OTP storage or logs | PASS | Source review, no storage in full-flow test; only empty opaque registries exist in adapter. |
| Existing user work and unrelated features preserved | PASS | Branch/status inspection before work, limited changes, unchanged homepage test passes. |
| TypeScript/lint/build | PASS | Final checks pass; no new dependency or configuration replacement. |
| Real SMS / backend OTP / real password reset | NOT TESTED | Backend is unavailable; simulation is explicitly labelled and does not claim these effects. |

All changes remain uncommitted on the same feature branch. No branch switch, develop edit,
commit, push, merge, or rebase was performed.
