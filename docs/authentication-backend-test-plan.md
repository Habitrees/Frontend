# Backend authentication test plan — required follow-up

**Status:** plan only. These tests are not present in the supplied backend archive. `accounts/tests.py` is currently an empty Django test skeleton.

The Master Metrics sheet requires meaningful backend unit tests, API/integration tests for a substantial portion of endpoints, success/failure coverage, external-service mocking and a coverage report. The following cases should be added under the backend test suite and run without the frontend.

## Registration

- Send OTP: valid phone, malformed phone, already registered phone (`409`), resend cooldown (`429`), SMS provider failure (`502`).
- Verify OTP: correct code returns a short-lived registration token; wrong code, expired code, already-used code, max-attempt lockout and already-registered phone.
- Complete: valid token creates exactly one user and consumes the challenge; invalid/expired/reused token; duplicate username/phone; mismatched password confirmation; invalid terms acceptance; weak/common/similar password; transaction rollback on integrity failure.
- Verify password is stored as a Django password hash (Argon2 is configured first), never plaintext.

## Login and session

- Valid credentials return user + short-lived access token and set the refresh cookie.
- Wrong password/phone, inactive user and unverified phone are rejected without revealing which field was wrong.
- Login throttle returns `429`.
- Assert refresh cookie name, HttpOnly, Secure in production settings, SameSite, Path and Max-Age.
- Add tests for cookie-aware refresh/session bootstrap and logout once those endpoints are implemented. The current stock SimpleJWT views do not consume the HttpOnly cookie.

## Password recovery

- Send OTP for eligible, ineligible and unknown phone numbers; public response must remain generic to prevent account enumeration.
- SMS provider failure must not leak account existence; verify challenge invalidation behavior.
- Resend cooldown and request throttle.
- Verify correct, wrong, expired, already-used OTP and max-attempt behavior.
- Confirm reset with valid, invalid, expired and reused reset token; mismatched confirmation; Django password validator rejection.
- Successful reset updates the password hash, consumes the challenge and blacklists outstanding refresh tokens.
- Assert old credentials fail and new credentials succeed after reset.

## External services and reporting

- Mock the SMS provider; tests must not send real SMS.
- Use an isolated test database.
- Cover success and failure status codes, including `200`, `201`, `400`, `401`, `403`, `404`, `409`, `429`, `500`/`502` where applicable.
- Provide a single test command, pass/fail output and a coverage report. The Master Metrics target is at least 70% coverage for business logic and at least 15 meaningful unit tests; API tests should cover at least 70% of endpoints.
