# Habitree authentication architecture

The authentication module is organized by user journey. Login, registration and password recovery own their pages, hooks, services and journey-specific components. UI and utilities reused by multiple authentication journeys live in `authentication/shared`.

```text
src/features/authentication/
├── login/
│   ├── LoginPage.tsx
│   ├── components/
│   ├── hooks/
│   └── services/
├── register/
│   ├── RegisterPhonePage.tsx
│   ├── RegisterOtpPage.tsx
│   ├── RegisterDetailsPage.tsx
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── utils/
├── recovery/
│   ├── ForgotPasswordPage.tsx
│   ├── VerifyOtpPage.tsx
│   ├── ResetPasswordPage.tsx
│   ├── components/
│   ├── hooks/
│   └── services/
└── shared/
    ├── components/
    ├── hooks/
    └── utils/
```

## Layer responsibilities

- **Pages:** compose a screen, connect forms to the relevant hook and navigate only after the expected API success.
- **Components:** reusable visual controls and layout.
- **Hooks/providers:** hold journey state in memory, prevent duplicate submissions, and coordinate stages.
- **Services:** map UI-level types to Django request/response schemas and translate backend errors.
- **App-wide shared:** `src/shared/api/axios.ts` owns the Axios client and Authorization header; `src/shared/utils/phone.ts` normalizes Persian/Arabic numerals.
- **Auth shared:** `OtpInput`, `OtpResendControls`, `useOtpCountdown`, `PasswordInput`, `PasswordRequirements`, `PhoneNumberInput` and `AuthLayout` are shared only by authentication journeys.

## Shared components

- `OtpInput` is shared by registration and recovery; each flow retains its own state and service.
- `OtpResendControls` and `useOtpCountdown` are shared by registration and recovery. Both use deadlines derived from backend `expires_in` and `resend_after` values.
- `PasswordInput` is shared by Login, registration and password reset.
- `PasswordRequirements` and `passwordPolicy.ts` are shared by registration and password reset.
- Login currently uses phone + password; it is not an OTP login flow.

## Current integration status

- Registration uses the three API2 endpoints: send OTP, verify OTP and complete registration.
- Login uses `POST /api/auth/login/`.
- Password recovery uses send OTP, verify OTP and confirm reset endpoints.
- The API details and current session limitations are maintained in [`authentication-implementation.md`](./authentication-implementation.md).

## Session boundary and known limitation

Django returns a short-lived access JWT in JSON and sets the refresh JWT in an HttpOnly cookie. The frontend keeps the access token in module memory only. It does not use LocalStorage or SessionStorage.

The supplied backend still uses stock SimpleJWT refresh/blacklist views that expect a refresh token in the JSON body. There is not yet a cookie-aware refresh/session-bootstrap or frontend logout flow. After a full reload, the access token is lost and the frontend cannot restore the session from the HttpOnly cookie. Remember Me is therefore intentionally disabled.

## Responsive layout

- At 1024px and wider, the authentication shell uses a two-column botanical panel/form layout.
- Below 1024px, the botanical panel is hidden and the form becomes a centered full-width column.
- Below 640px, mobile spacing is applied.
- The document supports a 320px minimum width; short desktop windows scroll rather than clipping form controls.

Responsive browser coverage is in `e2e/auth-responsive.spec.ts` and `e2e/login.spec.ts`.

See [`authentication-implementation.md`](./authentication-implementation.md) for API contracts, security, tests and sequence diagrams.
