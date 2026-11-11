# Habitree Password Recovery implementation

## Routes and flow

`/login` → `/forgot-password` → `/verify-reset-code` → `/reset-password` → `/login`.

The recovery provider keeps the phone, OTP challenge and reset token in memory. Direct access to a later stage or a full page reload restarts the recovery journey at `/forgot-password`.

## Backend API2 contract

1. `POST /api/auth/password-reset/send-otp/` with `{ phone }` returns HTTP 200 with `detail`, `expires_in` and `resend_after`.
2. `POST /api/auth/password-reset/verify-otp/` with `{ phone, code }` returns HTTP 200 with `reset_token` and `expires_in`.
3. `POST /api/auth/password-reset/confirm/` with `{ reset_token, new_password, confirm_password }` returns HTTP 200 on success.

The send endpoint intentionally returns a generic response to avoid revealing whether a phone number belongs to an account. A 200 response does not guarantee that an SMS was delivered.

## OTP behavior

- The shared `OtpInput` automatically submits when six digits are entered or pasted.
- `useOtpCountdown` and `OtpResendControls` use the backend-provided expiry and resend deadlines.
- The input and submit button are disabled after expiry.
- Resend calls the real send-OTP endpoint and clears the previous digits after success.
- Django remains authoritative for OTP validity, attempt count, one-time use and throttling.

## Reset token and password

The `reset_token` is held in provider memory only. It is not put into URLs, navigation state, LocalStorage, SessionStorage or logs. The new password and confirmation are sent using the API2 field names. On successful reset, Django consumes the challenge and blacklists outstanding refresh tokens; the frontend returns the user to Login.

## Tests

`e2e/recovery.spec.ts` covers send/verify/confirm payloads, wrong-code handling and retry, resend, expiry/cooldown, route-stage guards and rate-limit mapping. `e2e/auth-responsive.spec.ts` checks recovery screens at mobile, tablet and desktop widths.

See [`authentication-implementation.md`](./authentication-implementation.md) for full API contracts and known session limitations.
