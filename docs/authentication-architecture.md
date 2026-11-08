# Habitree authentication architecture

Authentication is organized by user journey. Login, registration, and password recovery each
own their pages, components, hooks, and services. Only UI and utilities reused by more than one
authentication journey live in `authentication/shared`.

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
    └── utils/
```

There are intentionally no root-level `components`, `hooks`, `services`, `utils`, or page files
inside `features/authentication`. Each page has one canonical location directly inside its
journey folder; feature-specific supporting code lives in that journey's subfolders.

## Project-wide shared vs authentication shared

- `src/shared` contains app-wide primitives and infrastructure such as `Button`, `Input`,
  the Axios client, and phone digit normalization.
- `src/features/authentication/shared` contains UI and utilities reused only by authentication
  journeys, such as `OtpInput`, `PasswordInput`, `PasswordRequirements`, `AuthLayout`, and
  phone/password validation helpers.

These two `shared` folders have different responsibilities and are not duplicate copies.

## Shared controls

- `OtpInput` is the single six-digit input used by registration and password recovery. Login
  currently uses mobile number plus password and does not have an OTP step. Each flow retains its
  own challenge state and service.
- `PasswordInput` is reused by Login, registration, and password reset. It owns its show/hide
  control; new-password rules are shown only for registration and password reset.
- `PasswordRequirements` updates three checks while typing: minimum eight characters, at least
  one English letter, and at least one digit. A satisfied requirement uses the success-green token
  defined in `src/index.css`; its text and icon inherit the same color.
- The checklist and submit validation both use `shared/utils/passwordPolicy.ts`.
- Phone validation is shared by Login, registration, and recovery. Digit normalization remains in
  the app-level `src/shared/utils/phone.ts` utility.

## Responsive layout

The desktop layout keeps the two-column Figma composition at widths of 1024px and above. The
botanical illustration scales with viewport height rather than using a fixed 440px image height.
At tablet and mobile widths the botanical side panel is hidden and the form becomes a centered,
full-width column. Desktop layouts target common viewports such as 1366×768 and 1440×900 without
page scrolling. Short desktop windows (below 721px high), tablet, and mobile layouts retain natural
vertical scrolling rather than clipping form controls.

Colors, typography, and semantic feedback colors are defined as CSS variables in `src/index.css`
and exposed to Tailwind through `@theme inline`. The project uses Tailwind CSS v4.

## Environment files

Vite reads `.env.local` from the Frontend project root, alongside `package.json`; it does not read
`src/.env.local`. Keep local environment values out of source control and do not overwrite the
developer's `.env.local` when applying the auth update.

## Backend status

No backend API contract was supplied. The existing Axios instance is reused, but no endpoint,
HTTP method, payload schema, response schema, token/session behavior, or SMS policy is guessed.
The service adapters must be implemented from the backend's documented contract. Development
mocks are explicitly opt-in and never send SMS, create accounts, authenticate users, or change
real passwords.

The password checklist currently represents the same provisional client-side policy in both
registration and password reset. The backend remains authoritative; if its documented policy
differs, update the shared policy and its tests together.
