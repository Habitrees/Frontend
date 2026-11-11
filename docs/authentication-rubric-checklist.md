# Authentication review — Master Metrics checklist

**Scope:** frontend Login, Registration and Password Recovery, checked against the supplied frontend ZIP, Django source archive, Master Metrics sheet and project FS on 2026-11-11.

| Mandatory metric relevant to authentication | Current evidence | Status |
| --- | --- | --- |
| Design consistency and responsive rules | Shared CSS tokens, RTL/LTR form rules, breakpoints and responsive Playwright coverage for Login/Register/Recovery | Implemented in code; browser execution still pending |
| Figma prototype for major screens | Botanical exports exist, but no Figma prototype URL/file is present in the submitted repository | Not verified; add the approved Figma link |
| Software architecture documentation | Feature-per-journey structure and layer responsibilities are documented | Frontend structure documented |
| C4 Context / Container / Component diagrams | No complete C4 diagram set was found in the submitted repository | Missing at project level |
| Sequence diagrams for key flows | Three Mermaid sequence diagrams (Login, Registration, Recovery) are in `authentication-implementation.md` | Added for authentication |
| Live API documentation | Django source exposes `/api/schema/`, `/api/docs/` (Swagger) and `/api/redoc/`; auth views use OpenAPI schema decorators | Source routes/decorators present; live Try-it-out still needs checking |
| Frontend E2E for user journeys | 28 Playwright tests are discovered across five spec files; API responses are intercepted for deterministic tests | Test discovery passes; browser execution pending |
| Mock external services for reliable tests | Playwright `page.route` mocks API responses; explicit local mocks are development-only and send no network request | Implemented for frontend tests |
| Backend unit/API integration tests | Supplied `Backend/accounts/tests.py` contains only the default empty test skeleton | Missing; backend team action required |
| JWT/session security | Access token is memory-only; Django sets an HttpOnly refresh cookie | Partially implemented; cookie-aware refresh/session bootstrap and logout are missing |
| Password/sensitive-data handling | Django config uses Argon2 first and Django password validators; frontend does not persist passwords | Implemented with policy mismatch to reconcile |
| Input validation / injection protection | React forms validate usability; DRF serializers validate backend input and Django ORM is used | Basic controls present; dedicated XSS/SQLi security tests not supplied |
| CI automated test execution | Frontend CI runs on pushes to all branches and PRs to main/develop; runs npm ci, lint, build and Playwright; uploads reports/artifacts | Configured; successful hosted run still required |
| Secrets management | `.env.local` is ignored and not tracked; `.env.example` contains only public Vite settings | Implemented; do not include `.env.local` in shared ZIPs |
| Project-wide deployment / HTTPS / CORS / observability | These are deployment/backend-wide criteria, not proven by the frontend archive | Must be checked with DevOps/backend evidence |

## Frontend architecture review

- Login, Register and Recovery are separated by feature folder.
- Shared OTP, countdown/resend controls, password input, password requirements and auth layout are centralized under `authentication/shared`.
- App-wide Axios, generic inputs/buttons and phone normalization remain under `src/shared`.
- No duplicate OTP input implementation was found.
- The previous dead `rememberMe` hook state was removed; the UI checkbox remains intentionally disabled because the backend does not accept the preference.
- Registration and recovery both use backend-derived OTP deadlines and auto-submit after six digits.

## Release blockers / follow-up

1. Run `npm ci`, `npm run build`, `npm run lint` and `npm run test:e2e` on the Windows developer machine or the GitHub Actions Linux runner with platform-native dependencies. In this audit workspace TypeScript and ESLint pass, and Playwright discovers 28 tests, but Vite build/browser E2E could not execute because the supplied `node_modules` lacks the Linux Rolldown binding.
2. Implement backend cookie-aware refresh/session bootstrap and logout, then add frontend authenticated-user state and protected routes. Keep Remember Me disabled until its server semantics are real.
3. Add backend auth unit/API integration tests. The supplied backend test file is empty.
4. Attach the approved Figma prototype and complete project C4 Context/Container/Component diagrams.
5. Reconcile the frontend password checklist (8 chars + English letter + digit) with Django's actual validators (user similarity, minimum length, common-password and numeric-password validators).
