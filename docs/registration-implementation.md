# Habitree registration flow

## Routes

- `/register`: mobile number and request SMS code.
- `/register/verify-code`: six-digit SMS verification.
- `/register/details`: name, username, password, confirmation, and terms acceptance.

The routes share `register/components/RegistrationProvider`; the mobile number, opaque challenge,
and opaque grant remain in memory only. Refreshing the page restarts the registration flow.
OTP codes and passwords are not put in URLs, navigation state, local/session storage, or logs.

## Folder ownership and shared UI

Registration pages, components, hooks, services, types, and validation live in
`src/features/authentication/register`. Shared authentication UI lives in
`src/features/authentication/shared`.

- `shared/components/AuthLayout`, `AuthHeader`, `BotanicalWelcome`, and `PrivacyFooter` are
  reused with Login.
- `shared/components/OtpInput` is also used by recovery; the input UI is shared while each flow
  keeps independent verification state and service calls.
- `shared/components/PhoneNumberInput`, `PasswordInput`, and `AuthSubmitButton` are reused.
- `PasswordRequirements` and `shared/utils/passwordPolicy.ts` provide the same live checklist
  and validation for registration and password reset.
- Existing global `src/shared/components/Input.tsx`, `Button.tsx`, and Axios configuration remain
  the primitive controls/client. No duplicate primitive was introduced.
- The exact registration floral PNG from the supplied Figma Make export remains at
  `src/assets/registration-botanical.png`.

## Backend integration status

No registration API contract was supplied. The registration service intentionally does not guess
endpoint paths, HTTP methods, request/response fields, OTP expiry, token behavior, or SMS policies.
With the default configuration, valid form submission reports that registration is not connected
rather than claiming that an SMS was sent or an account was created.

Implement `RegistrationAdapter` in
`src/features/authentication/register/services/registration.service.ts` once the backend contract
is available. The adapter receives the existing Axios client (which already uses
`VITE_API_BASE_URL`) and must implement:

1. `requestCode`: map the normalized mobile number to the documented request and return an opaque
   challenge.
2. `verifyCode`: map the OTP and challenge to the documented verification request and return an
   opaque grant only after backend verification.
3. `completeRegistration`: map mobile, name, username, password, the UI-level terms-accepted value,
   and the grant to the documented account-creation request and validate the documented response.

The backend must confirm whether terms acceptance is represented by a request field, whether the
account is immediately active, whether the user should be automatically signed in, and what
error/rate-limit/expiry behavior applies. Those details are not inferred by this UI.

## Explicit local preview mode

Set `VITE_ENABLE_AUTH_REGISTRATION_MOCK=true` only for local development before starting Vite.
The mock is guarded by both `import.meta.env.DEV` and the flag, is excluded from production
behavior, and is never enabled by default. It accepts `123456` as its demo OTP, makes no HTTP
request, sends no SMS, and does not create an account. The UI displays a notice while this mode
is enabled.

## Client-side validation

Client-side rules are provisional UI checks transcribed from the supplied design: Iranian mobile
format, six numeric OTP digits, username length/characters, password minimum length/letter/digit
requirements, password confirmation, and required terms acceptance. The live password checklist
and submit validation share the same utility. The backend remains authoritative and may require
different rules.
