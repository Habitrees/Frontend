# Habitree Registration implementation — API2

## Routes

1. `/register` — collect phone and request an OTP.
2. `/register/verify-code` — collect six digits; the shared OTP control auto-submits when complete.
3. `/register/details` — collect full name, username, password, confirmation and terms acceptance.

The registration provider keeps the phone and short-lived registration proof in memory. Direct later-stage URLs or a full reload restart the flow at `/register`.

## Backend API

| Step | Request | Body | Success |
| --- | --- | --- | --- |
| Send code | `POST /api/auth/register/send-otp/` | `{ phone }` | `200`: `expires_in`, `resend_after` |
| Verify code | `POST /api/auth/register/verify-otp/` | `{ phone, code }` | `200`: `registration_token`, `expires_in` |
| Complete | `POST /api/auth/register/complete/` | `{ registration_token, username, full_name, password, confirm_password, timezone, locale, terms_accepted }` | `201`: `user`, `access` + HttpOnly refresh cookie |

The OTP is verified by Django before the account is created. The details request uses the short-lived `registration_token`; it does not send the raw OTP or phone again.

## OTP behavior

- `expires_in` controls the visible validity countdown.
- `resend_after` controls when the resend button becomes enabled.
- Both values are converted to absolute deadlines in `useRegistration`.
- `OtpInput` auto-submits after the sixth digit or a complete paste/autofill.
- The manual submit button remains available as a fallback.
- Expired codes are disabled in the UI and blocked by the hook; Django independently enforces expiry and attempt limits.
- Resend calls the same send-OTP endpoint, clears the old digits after success and uses the new server deadlines.

## Validation and errors

The frontend validates phone format, six numeric OTP digits, name, username, password, confirmation and terms for usability. Django remains authoritative. The service maps documented `400`, `409`, `429`, `502` and network/server errors to Persian messages.

The frontend password checklist currently requires at least eight characters, one English letter and one digit. Django also applies user-attribute similarity, minimum-length, common-password and numeric-password validators. The server remains authoritative.

## Security

Registration token, OTP and password stay in React memory/form state only. The access JWT returned by completion is intentionally not persisted; Django sets the HttpOnly refresh cookie and the user is routed to Login.

See [`authentication-implementation.md`](./authentication-implementation.md) for the full API contract, cookie/session limitation and test matrix.
