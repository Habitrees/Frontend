import axios, { type AxiosInstance } from "axios";
import { api } from "../../../../shared/api/axios";
import type {
  CompleteRegistrationInput, RegistrationChallenge, RegistrationResult,
  RegistrationService, RegistrationUser, RequestRegistrationCodeInput,
  VerifiedRegistration, VerifyRegistrationCodeInput,
} from "./registration.types";

export class RegistrationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RegistrationError";
  }
}

export interface RegistrationAdapter {
  requestCode(client: AxiosInstance, input: RequestRegistrationCodeInput): Promise<RegistrationChallenge>;
  verifyCode(client: AxiosInstance, input: VerifyRegistrationCodeInput): Promise<VerifiedRegistration>;
  completeRegistration(client: AxiosInstance, input: CompleteRegistrationInput): Promise<RegistrationResult>;
}

interface SendOtpResponse {
  detail: string;
  expires_in: number;
  resend_after: number;
}
interface VerifyOtpResponse {
  detail: string;
  registration_token: string;
  expires_in: number;
}
interface RegisterSuccessResponse {
  detail: string;
  user: { id: number; phone: string; username: string; full_name: string };
  access: string;
}

type Operation = "send" | "verify" | "complete";

/** Never log server responses: validation payloads can contain sensitive fields. */
function toRegistrationError(error: unknown, operation: Operation): RegistrationError {
  if (error instanceof RegistrationError) return error;
  if (!axios.isAxiosError(error)) return new RegistrationError("درخواست انجام نشد. لطفاً دوباره تلاش کن.");
  const status = error.response?.status;
  if (!error.response) return new RegistrationError("ارتباط با بک‌اند برقرار نشد. اتصال سرور یا تنظیمات API را بررسی کن.");
  if (status === 401 || status === 403) return new RegistrationError("دسترسی به سرویس ثبت‌نام مجاز نیست. لطفاً با پشتیبانی تماس بگیر.");
  if (status === 404) return new RegistrationError("سرویس ثبت‌نام پیدا نشد. آدرس API را بررسی کن.");
  if (status === 429) return new RegistrationError(
    operation === "send" ? "برای ارسال مجدد کد باید کمی صبر کنی." : "تعداد تلاش‌ها بیش از حد مجاز است؛ کمی بعد دوباره تلاش کن.",
  );
  if (status === 502 && operation === "send") return new RegistrationError("سرویس پیامک در دسترس نیست. کمی بعد دوباره تلاش کن.");
  if (status === 409) return new RegistrationError(
    operation === "complete" ? "این شماره موبایل یا شناسه کاربری قبلاً ثبت شده است." : "این شماره موبایل قبلاً ثبت شده است؛ وارد حساب کاربری‌ات شو.",
  );
  if (status === 400) {
    if (operation === "send") return new RegistrationError("شماره موبایل معتبر نیست.");
    if (operation === "verify") return new RegistrationError("کد تأیید اشتباه، منقضی یا قبلاً استفاده شده است. دوباره بررسی کن.");
    const body = error.response?.data;
    if (body && typeof body === "object") {
      if ("registration_token" in body ||
          ("detail" in body && typeof body.detail === "string" && /توکن ثبت‌نام|مهلت تکمیل ثبت‌نام|درخواست ثبت‌نام/.test(body.detail))) {
        return new RegistrationError("مهلت تکمیل ثبت‌نام تمام شده یا تأیید معتبر نیست. برای دریافت کد جدید از ابتدا شروع کن.");
      }
      if ("username" in body) return new RegistrationError("شناسه کاربری معتبر نیست یا قبلاً انتخاب شده است.");
      if ("confirm_password" in body) return new RegistrationError("تکرار رمز عبور با رمز انتخابی یکسان نیست.");
      if ("password" in body) return new RegistrationError("رمز انتخابی مورد تأیید بک‌اند نیست؛ رمز قوی‌تری انتخاب کن.");
    }
    return new RegistrationError("اطلاعات ثبت‌نام پذیرفته نشد. موارد واردشده را بررسی کن.");
  }
  return new RegistrationError("خطایی در سرور رخ داد. لطفاً دوباره تلاش کن.");
}

function getBrowserTimeZone(): string {
  try { return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"; }
  catch { return "UTC"; }
}

function mapRegistrationUser(response: RegisterSuccessResponse): RegistrationUser {
  const { user } = response;
  if (!user || typeof user.id !== "number" || typeof user.phone !== "string"
      || typeof user.username !== "string" || typeof user.full_name !== "string") {
    throw new RegistrationError("پاسخ ثبت‌نام از سرور معتبر نیست. لطفاً با پشتیبانی تماس بگیر.");
  }
  return { id: user.id, phone: user.phone, username: user.username, fullName: user.full_name };
}

const backendRegistrationAdapter: RegistrationAdapter = {
  async requestCode(client, input) {
    try {
      const { data } = await client.post<SendOtpResponse>("/auth/register/send-otp/", { phone: input.mobile });
      if (!data || !Number.isFinite(data.expires_in) || !Number.isFinite(data.resend_after)) {
        throw new RegistrationError("پاسخ زمان‌بندی کد از بک‌اند معتبر نیست.");
      }
      return { expiresIn: data.expires_in, resendAfter: data.resend_after };
    } catch (error) { throw toRegistrationError(error, "send"); }
  },
  async verifyCode(client, input) {
    try {
      const { data } = await client.post<VerifyOtpResponse>("/auth/register/verify-otp/", {
        phone: input.mobile, code: input.code,
      });
      if (!data || typeof data.registration_token !== "string" || !data.registration_token
          || typeof data.expires_in !== "number") {
        throw new RegistrationError("پاسخ تأیید کد از سرور معتبر نیست.");
      }
      return { registrationToken: data.registration_token, expiresIn: data.expires_in };
    } catch (error) { throw toRegistrationError(error, "verify"); }
  },
  async completeRegistration(client, input) {
    try {
      const { data } = await client.post<RegisterSuccessResponse>("/auth/register/complete/", {
        registration_token: input.registrationToken,
        username: input.username,
        full_name: input.fullName,
        password: input.password,
        confirm_password: input.confirmPassword,
        timezone: getBrowserTimeZone(),
        locale: "fa-IR",
        terms_accepted: input.termsAccepted,
      });
      // Backend sets the HttpOnly refresh cookie. JSON access token is intentionally
      // not retained here because the current UI redirects the user to Login.
      return { user: mapRegistrationUser(data) };
    } catch (error) { throw toRegistrationError(error, "complete"); }
  },
};

const registrationMockEnabled = import.meta.env.DEV
  && import.meta.env.VITE_ENABLE_AUTH_REGISTRATION_MOCK === "true";

export function createRegistrationService(adapter?: RegistrationAdapter): RegistrationService {
  async function resolveAdapter(): Promise<RegistrationAdapter> {
    if (adapter) return adapter;
    if (registrationMockEnabled) return (await import("./registration.mock")).developmentRegistrationAdapter;
    return backendRegistrationAdapter;
  }
  return {
    simulated: !adapter && registrationMockEnabled,
    async requestCode(input) { return (await resolveAdapter()).requestCode(api, input); },
    async verifyCode(input) { return (await resolveAdapter()).verifyCode(api, input); },
    async completeRegistration(input) { return (await resolveAdapter()).completeRegistration(api, input); },
  };
}
export const registrationService = createRegistrationService();
