# Habitree password recovery implementation

## Routes and flow

`/login` -> `/forgot-password` -> `/verify-reset-code` -> `/reset-password` -> `/login`.
The three recovery routes share `recovery/components/PasswordRecoveryProvider`. A challenge must
precede verification and a grant must precede reset; direct links and page reloads restart the
flow at the phone page. This is frontend flow control, not a replacement for backend authorization.

## Folder ownership and shared UI

Recovery pages, components, hooks, and services live in
`src/features/authentication/recovery`. Shared authentication UI lives in
`src/features/authentication/shared`.

- `AuthLayout`, `AuthHeader`, `BotanicalWelcome`, and `PrivacyFooter` provide the shared shell.
- `OtpInput` is the same reusable six-digit control used by registration; each flow still has
  separate verification state and service methods.
- `PhoneNumberInput`, `PasswordInput`, and `AuthSubmitButton` are shared controls.
- `PasswordRequirements` and `passwordPolicy.ts` are shared with registration, so both new
  password forms show the same live checks and use the same validation function.
- The existing `/login`, homepage `/`, and registration routes are preserved.

## Backend integration

No backend endpoint or wire response contract was supplied. The service uses the existing Axios
client and has an adapter boundary, but it does not guess paths, methods, payloads, token behavior,
OTP expiry/rate limiting, or session policy. Implement a `PasswordRecoveryAdapter` in
`src/features/authentication/recovery/services/recovery.service.ts` after the backend contract is
available. The adapter must implement the documented request-code, verify-code, and reset-password
operations and validate/map backend responses and errors.

The shared password rules are currently a provisional UI baseline: at least eight characters,
one English letter, and one digit. The backend remains authoritative. Update the shared policy,
registration, reset-password validation, and tests together if the backend specifies different
requirements.

## Explicit development simulation

The recovery mock is enabled only when both `import.meta.env.DEV` and
`VITE_ENABLE_AUTH_RECOVERY_MOCK === "true"`. It is disabled by default, sends no SMS, does not
change a real password, and does not authenticate a user. It accepts the explicitly advertised
local test code `123456` and keeps opaque challenge/grant values in memory only.

## Security and state

Passwords and OTP codes are held only in component/submission memory. They are not put into URLs,
navigation state, local/session storage, or logs. Navigation state contains only a user-facing
completion notice. The local mock deliberately discards the submitted password.

Real SMS delivery, backend OTP verification, real password changes, password policy, rate limits,
expiry, and session behavior remain pending backend documentation and integration tests.
