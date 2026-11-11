# Habitree Authentication — API2 integration

This is the integration handoff for the current frontend code. For the complete user journeys, security boundaries, responsive behavior, tests and sequence diagrams, see [`authentication-implementation.md`](./authentication-implementation.md).

## Connected endpoints

| Journey | Method + endpoint | Frontend request |
| --- | --- | --- |
| Register send | `POST /api/auth/register/send-otp/` | `{ phone }` |
| Register verify | `POST /api/auth/register/verify-otp/` | `{ phone, code }` |
| Register complete | `POST /api/auth/register/complete/` | `{ registration_token, username, full_name, password, confirm_password, timezone, locale, terms_accepted }` |
| Login | `POST /api/auth/login/` | `{ phone, password }` |
| Recovery send | `POST /api/auth/password-reset/send-otp/` | `{ phone }` |
| Recovery verify | `POST /api/auth/password-reset/verify-otp/` | `{ phone, code }` |
| Recovery confirm | `POST /api/auth/password-reset/confirm/` | `{ reset_token, new_password, confirm_password }` |

The frontend uses the shared Axios client with `withCredentials: true`. API base URL defaults to `/api`. Local Vite proxy target defaults to `http://127.0.0.1:8000`.

## Cookie and session status

Django returns an access JWT in JSON and sets the refresh JWT as an HttpOnly cookie. The frontend holds the access token in module memory only. It does not persist JWTs in browser storage.

The current backend refresh and blacklist URL patterns still use stock SimpleJWT views and expect the refresh token in a JSON body. A cookie-aware refresh endpoint, session bootstrap after reload, and logout flow remain outstanding. Remember Me is disabled because the Login API does not accept a session-duration preference.

## Local verification

From the Frontend root:

```powershell
Copy-Item .env.example .env.local
$env:VITE_ENABLE_AUTH_REGISTRATION_MOCK="false"
$env:VITE_ENABLE_AUTH_RECOVERY_MOCK="false"
npm ci
npm run dev
```

Keep mock flags false for real backend testing. Restart Vite after changing environment variables. See the canonical implementation document for exact API response fields, error handling and browser test scenarios.
