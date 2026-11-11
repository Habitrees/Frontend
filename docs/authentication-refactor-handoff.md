# Authentication refactor handoff

This file records the current module organization after the authentication refactor. It is not the API contract source of truth; use [`authentication-implementation.md`](./authentication-implementation.md) for current behavior.

## Current organization

- Login, Registration and Recovery are separate journey features.
- Shared auth-only controls live under `src/features/authentication/shared`.
- App-wide primitives and Axios infrastructure remain under `src/shared`.
- One OTP input, countdown hook and resend control are shared by Registration and Recovery.
- Password input and password requirements are reused across Login, Registration and Recovery.

## Current integration

- Login is connected to `POST /api/auth/login/`.
- Registration uses the API2 send, verify and complete endpoints.
- Password Recovery uses the API2 send, verify and confirm endpoints.
- OTP entry auto-submits after six digits and both OTP flows use backend-derived expiry/resend deadlines.

## Known follow-up

The supplied backend does not yet expose a cookie-aware refresh/session-bootstrap and logout flow. Remember Me remains disabled. The backend archive supplied for this review also contains no meaningful `accounts` unit/API tests; see the test gaps in the canonical implementation document.
