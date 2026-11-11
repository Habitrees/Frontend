# OTP countdown and automatic submission

## Current implementation

Registration and Password Recovery share:
- `src/features/authentication/shared/components/OtpInput.tsx`
- `src/features/authentication/shared/components/OtpResendControls.tsx`
- `src/features/authentication/shared/hooks/useOtpCountdown.ts`

Each flow retains its own provider, API service and server challenge state.

## Timing rules

- `expires_in` is the server-provided OTP validity in seconds.
- `resend_after` is the server-provided resend cooldown in seconds.
- The hooks convert these values to absolute `Date.now()` deadlines.
- The UI derives the remaining seconds from those deadlines. Background-tab throttling therefore does not extend validity.
- The OTP input and submit button are disabled after expiry.
- The hook checks expiry again before sending the verification request; Django independently checks expiry and attempt limits.
- Resend is disabled until the server-provided cooldown ends. After successful resend, the old digits are cleared and new deadlines are used.
- A failed resend keeps the current challenge/timers and shows the mapped API error.

## Automatic submission

When the six-digit value becomes complete, `OtpInput` calls the current flow's `submitCode` handler. Complete paste/autofill also submits. Editing one digit in an already complete, failed code does not submit a mixed code immediately; the user can clear/re-enter or paste a complete replacement. The manual submit button remains as a fallback.

## API endpoints

- Registration: `/api/auth/register/send-otp/` and `/api/auth/register/verify-otp/`.
- Recovery: `/api/auth/password-reset/send-otp/` and `/api/auth/password-reset/verify-otp/`.

## Verification

Playwright tests cover server-derived expiry/cooldown, disabled states, resend behavior, wrong-code retry and automatic submission. Run:

```bash
npm ci
npm run build
npm run lint
npm run test:e2e
```

The browser tests must be run on a machine with the platform-specific Vite/Rolldown optional dependency and Chromium installed.
