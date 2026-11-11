# Habitree Login implementation

## Route and API

- Route: `/login`
- Request: `POST /api/auth/login/`
- Request body: `{ "phone": "...", "password": "..." }`
- Success: HTTP 200 with `detail`, `user` and `access`; Django also sets the refresh token cookie.
- Frontend errors: invalid credentials (`400`/`401`), forbidden (`403`), missing route (`404`), rate limit (`429`) and network/server failures.

The form normalizes Persian/Arabic digits in the phone number and validates required fields before calling the API. Django remains authoritative for authentication and verified/active account checks.

## Token handling

- The access token is held in module memory and attached to protected Axios requests as `Authorization: Bearer ...`.
- The refresh token is set by Django as an HttpOnly cookie; JavaScript does not read it.
- The frontend does not store tokens or passwords in LocalStorage, SessionStorage, URLs or logs.

## Remember Me and session restoration

The checkbox is intentionally disabled. The current `LoginSerializer` accepts only `phone` and `password`; the backend does not implement a `remember_me` duration choice.

The supplied `token/refresh/` and `token/blacklist/` routes are stock SimpleJWT views and expect a refresh token in the JSON body. They do not read the HttpOnly cookie. There is no frontend cookie-aware refresh/session bootstrap or logout flow. Therefore the access token is lost on a full reload and persistent session restoration is not complete.

Do not enable Remember Me until the backend contract and cookie-aware refresh/logout flow are implemented.

## Tests

`e2e/login.spec.ts` covers required-field validation, phone normalization, success/error/rate-limit handling, password visibility, navigation, accessibility semantics, responsive breakpoints and contrast tokens. `e2e/auth-responsive.spec.ts` also checks Login at the shared auth breakpoints.

See [`authentication-implementation.md`](./authentication-implementation.md) for the complete auth module contract and known limitations.
