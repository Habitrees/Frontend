import axios, { type AxiosInstance } from "axios";
import { api, setAccessToken } from "../../../../shared/api/axios";
import type { AuthenticationResult, AuthenticationService, LoginCredentials, LoginOptions } from "./login.types";

export class LoginError extends Error {
  constructor(message: string) { super(message); this.name = "LoginError"; }
}

interface LoginSuccessResponse {
  detail: string;
  user: { id: number; phone: string; username: string; full_name: string };
  access: string;
}

export type LoginAdapter = (
  client: AxiosInstance, credentials: LoginCredentials, options: LoginOptions,
) => Promise<AuthenticationResult>;

function toLoginError(error: unknown): LoginError {
  if (error instanceof LoginError) return error;
  if (!axios.isAxiosError(error)) return new LoginError("ورود انجام نشد. لطفاً دوباره تلاش کن.");
  if (!error.response) return new LoginError("اتصال با بک‌اند برقرار نشد. سرور یا تنظیمات API را بررسی کن.");
  if (error.response.status === 400 || error.response.status === 401) {
    return new LoginError("شماره موبایل یا رمز عبور صحیح نیست.");
  }
  if (error.response.status === 429) return new LoginError("تعداد تلاش‌های ورود بیش از حد مجاز است. کمی بعد دوباره تلاش کن.");
  if (error.response.status === 403) return new LoginError("اجازه ورود به این حساب وجود ندارد.");
  if (error.response.status === 404) return new LoginError("مسیر API ورود پیدا نشد؛ تنظیمات سرور را بررسی کن.");
  return new LoginError("ورود انجام نشد. لطفاً دوباره تلاش کن.");
}

const backendLoginAdapter: LoginAdapter = async (client, credentials, options) => {
  // "Remember me" must not store JWTs in LocalStorage/SessionStorage.
  // Cookie lifetime is currently owned by Django, not by this UI preference.
  void options;
  // A new login attempt must not silently reuse an old in-memory account.
  setAccessToken(null);
  try {
    const { data } = await client.post<LoginSuccessResponse>("/auth/login/", {
      phone: credentials.mobile,
      password: credentials.password,
    });
    const user = data?.user;
    if (!user || typeof user.id !== "number" || typeof user.phone !== "string"
        || typeof user.username !== "string" || typeof user.full_name !== "string"
        || typeof data.access !== "string" || !data.access) {
      throw new LoginError("پاسخ ورود از بک‌اند معتبر نیست.");
    }
    // Access token is held only in module memory and automatically added to API requests.
    // Refresh token is set by Django through Set-Cookie and is not readable from JS.
    setAccessToken(data.access);
    return { user: { id: user.id, phone: user.phone, username: user.username, fullName: user.full_name } };
  } catch (error) { throw toLoginError(error); }
};

export function createAuthenticationService(adapter: LoginAdapter = backendLoginAdapter): AuthenticationService {
  return { login(credentials, options) { return adapter(api, credentials, options); } };
}
export const authenticationService = createAuthenticationService();
