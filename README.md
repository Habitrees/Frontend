# Habitree Frontend

Habitree is a responsive React + TypeScript web application for habit tracking. The frontend uses Vite, React Router, Tailwind CSS v4 and Axios to communicate with the Django REST API.

## Requirements

- Node.js 22
- npm
- Django API reachable locally or through the configured reverse proxy

## Local development

```bash
cp .env.example .env.local
npm ci
npm run dev
```

On Windows PowerShell, copy the example with:

```powershell
Copy-Item .env.example .env.local
```

The default local Vite proxy target is `http://127.0.0.1:8000`. If Docker publishes Django on another host port, update `VITE_API_PROXY_TARGET` in the root `.env.local` file and restart Vite.

Keep both authentication mock flags set to `false` when testing real APIs:

```env
VITE_ENABLE_AUTH_REGISTRATION_MOCK=false
VITE_ENABLE_AUTH_RECOVERY_MOCK=false
```

Do not put API secrets, Django credentials, SMS provider credentials or other server secrets in `VITE_` variables. Do not commit `.env.local`.

## Quality checks

```bash
npm run build
npm run lint
npm run test:e2e
```

Playwright runs against the Vite development server and intercepts API responses for deterministic browser tests. The CI workflow installs Chromium, runs lint/build/E2E checks and uploads the Playwright report and failure artifacts.

## Authentication routes

- `/login`
- `/register` → `/register/verify-code` → `/register/details`
- `/forgot-password` → `/verify-reset-code` → `/reset-password`

Authentication implementation, API contracts, token/session limitations, responsive rules, test matrix and sequence diagrams are documented in [`docs/authentication-implementation.md`](docs/authentication-implementation.md).

The authentication rubric review and outstanding backend test plan are in [`docs/authentication-rubric-checklist.md`](docs/authentication-rubric-checklist.md) and [`docs/authentication-backend-test-plan.md`](docs/authentication-backend-test-plan.md).

Additional architecture and handoff notes:
- [`docs/authentication-architecture.md`](docs/authentication-architecture.md)
- [`docs/auth-integration-api2.md`](docs/auth-integration-api2.md)
- [`docs/registration-implementation.md`](docs/registration-implementation.md)
- [`docs/auth-recovery-implementation.md`](docs/auth-recovery-implementation.md)
- [`docs/otp-countdown-handoff.md`](docs/otp-countdown-handoff.md)

The backend Swagger UI is available at `/api/docs/` when Django is running.
