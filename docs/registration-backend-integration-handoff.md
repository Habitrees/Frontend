# Registration backend integration handoff — API2

Registration is connected to the supplied Django API2 contract:

- `POST /api/auth/register/send-otp/`
- `POST /api/auth/register/verify-otp/`
- `POST /api/auth/register/complete/`

The OTP is verified by Django before the details form is submitted. The final request uses the short-lived `registration_token` and profile/password/terms fields. It does not resend the raw OTP or phone.

The OTP screen uses server-provided `expires_in` and `resend_after` values. The shared OTP input automatically submits after six digits; the resend button becomes active after the server cooldown. The hook and backend both enforce expiry.

For exact payloads, response shapes, security and tests, see:
- [`registration-implementation.md`](./registration-implementation.md)
- [`authentication-implementation.md`](./authentication-implementation.md)

## Local run

From the Frontend root:

```powershell
Copy-Item .env.example .env.local
npm ci
npm run dev
```

The Vite proxy defaults to `http://127.0.0.1:8000`. Set `VITE_API_PROXY_TARGET` to the host-reachable backend address if Docker publishes another port.

## Remaining backend/session work

Django currently sets an HttpOnly refresh cookie and returns an access token in JSON. The frontend keeps access in memory only. The cookie-aware refresh/session-bootstrap and logout contract is still required before sessions can be restored after a page reload. Do not enable Remember Me until that contract is agreed and implemented.
