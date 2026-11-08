# Habitree login implementation

The Login page remains available at `/login`; `/` continues to render the existing Habitree
homepage. Authentication journeys are separated by folder while shared UI is kept in one place.

## Current files

| File | Responsibility |
| --- | --- |
| `src/features/authentication/login/LoginPage.tsx` | Page composition, RTL form section, document title, completion notices. |
| `src/features/authentication/login/components/LoginForm.tsx` | Login form, remember preference, links to recovery and registration. |
| `src/features/authentication/login/hooks/useLogin.ts` | Typed validation/submission state and duplicate-submit guard. |
| `src/features/authentication/login/services/login.types.ts` | UI credentials/options and opaque authentication result. |
| `src/features/authentication/login/services/login.service.ts` | Injectable backend adapter boundary using the existing Axios client. |
| `src/features/authentication/shared/components/AuthLayout.tsx` | Shared authentication shell. |
| `src/features/authentication/shared/components/AuthHeader.tsx` | Brand and functional homepage links for Login and Registration. |
| `src/features/authentication/shared/components/BotanicalWelcome.tsx` | Botanical desktop panel and exact supplied artwork. |
| `src/features/authentication/shared/components/PasswordInput.tsx` | Reusable labelled password input and accessible visibility toggle. |
| `src/features/authentication/shared/components/PhoneNumberInput.tsx` | Reusable LTR telephone input. |
| `src/shared/components/Button.tsx` | Reusable typed button with safe default type and disabled styling. |
| `src/shared/components/Input.tsx` | Reusable typed labelled input, icon/action slots, and field errors. |
| `src/shared/utils/phone.ts` | Persian/Arabic numeral normalization. |
| `e2e/login.spec.ts` | Interaction, responsive, contrast, and required-field checks. |

## Shared authentication controls

Login now uses the same `PasswordInput` as Registration and Password Recovery, rather than
maintaining a separate show/hide implementation in its form. New-password rules are intentionally
not shown on Login because users are entering an existing password. The same six-digit `OtpInput`
is used in Registration and Recovery; their verification services and in-memory state remain
separate.

## Backend handoff

The login service intentionally performs no network requests and returns no simulated successful
login. A valid form currently produces an honest Persian "login is not active yet" error.

Supply a `LoginAdapter` to `createAuthenticationService` in
`src/features/authentication/login/services/login.service.ts` when documentation is available.
The existing Axios client is passed to the adapter and remains the sole source of API base URL
configuration. The adapter must implement the documented endpoint, serialize the UI credentials,
validate/map the response, and map backend errors to application errors. The opaque
`AuthenticationResult.backendResult` is not an invented wire response.

Still pending: endpoint and HTTP method, request/response schemas, error codes, rate limits,
backend-approved phone formats, session/token/cookie/CSRF policy, remember-me semantics,
post-login navigation, authenticated user state, and protected-route policy. No endpoint,
payload, or session behavior is guessed.

## Visual and responsive behavior

The existing Figma shell, semantic CSS tokens, Tailwind v4 setup, 440px form maximum, 54px input
and button heights, RTL layout, LTR phone/password entry, botanical panel, and responsive breakpoints
are retained. Below 1024px the botanical panel is hidden; mobile gutters and heading sizes use the
existing CSS tokens. Login's normal appearance is unchanged apart from sharing the password
control implementation.

## Verification

- Strict application TypeScript: `node node_modules/typescript/bin/tsc -p tsconfig.app.json --strict --noEmit`.
- Lint: `node node_modules/eslint/bin/eslint.js .`.
- Browser behavior is covered by `e2e/login.spec.ts`; run it with the repository Playwright setup
  after dependencies and the Vite native binding for the current operating system are installed.
- Real login and session behavior remain unverified until the backend contract and adapter exist.
