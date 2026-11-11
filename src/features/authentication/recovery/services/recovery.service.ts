import axios, { type AxiosInstance } from "axios";
import { api } from "../../../../shared/api/axios";
import type {
  PasswordRecoveryService,
  RecoveryChallenge,
  RecoveryGrant,
  RequestResetCodeInput,
  ResetPasswordInput,
  VerifyResetCodeInput,
} from "./recovery.types";

export const recoveryMockEnabled = import.meta.env.DEV
  && import.meta.env.VITE_ENABLE_AUTH_RECOVERY_MOCK === "true";

export class PasswordRecoveryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PasswordRecoveryError";
  }
}

export interface PasswordRecoveryAdapter {
  requestCode(client: AxiosInstance, input: RequestResetCodeInput): Promise<RecoveryChallenge>;
  verifyCode(
    client: AxiosInstance,
    input: VerifyResetCodeInput,
    challenge: RecoveryChallenge,
  ): Promise<RecoveryGrant>;
  resetPassword(client: AxiosInstance, input: ResetPasswordInput, grant: RecoveryGrant): Promise<void>;
}

interface SendResetOtpResponse {
  detail: string;
  expires_in: number;
  resend_after: number;
}

interface VerifyResetOtpResponse {
  detail: string;
  reset_token: string;
  expires_in: number;
}

interface ConfirmResetResponse {
  detail: string;
}

type RecoveryOperation = "send" | "verify" | "confirm";

function serverDetail(data: unknown): string | undefined {
  if (!data || typeof data !== "object") return undefined;
  const body = data as Record<string, unknown>;
  if (typeof body.detail === "string" && body.detail.trim()) return body.detail;
  return undefined;
}

/** Map API failures to user-facing messages without logging sensitive request data. */
function toRecoveryError(error: unknown, operation: RecoveryOperation): PasswordRecoveryError {
  if (error instanceof PasswordRecoveryError) return error;
  if (!axios.isAxiosError(error)) {
    return new PasswordRecoveryError("درخواست انجام نشد. لطفاً دوباره تلاش کن.");
  }

  const status = error.response?.status;
  const data = error.response?.data;

  if (!error.response) {
    return new PasswordRecoveryError("ارتباط با بک‌اند برقرار نشد. اتصال سرور یا تنظیمات API را بررسی کن.");
  }
  if (status === 404) {
    return new PasswordRecoveryError("سرویس بازیابی رمز عبور پیدا نشد. آدرس API را بررسی کن.");
  }
  if (status === 429) {
    if (operation === "send") return new PasswordRecoveryError("برای درخواست کد جدید باید کمی صبر کنی.");
    if (operation === "verify") return new PasswordRecoveryError("تعداد تلاش‌های تأیید کد بیش از حد مجاز است. کمی بعد دوباره تلاش کن.");
    return new PasswordRecoveryError("تعداد درخواست‌های تغییر رمز بیش از حد مجاز است. کمی بعد دوباره تلاش کن.");
  }
  if (status === 400) {
    if (operation === "send") return new PasswordRecoveryError("شماره موبایل معتبر نیست.");
    if (operation === "verify") {
      return new PasswordRecoveryError(serverDetail(data) ?? "کد تأیید اشتباه یا منقضی شده است. دوباره بررسی کن.");
    }
    if (data && typeof data === "object" && "new_password" in data) {
      return new PasswordRecoveryError("رمز جدید مورد تأیید بک‌اند نیست؛ قوانین رمز عبور را بررسی کن.");
    }
    return new PasswordRecoveryError(serverDetail(data) ?? "لینک تغییر رمز نامعتبر یا منقضی شده است. فرایند بازیابی را دوباره شروع کن.");
  }

  return new PasswordRecoveryError("خطایی در سرور رخ داد. لطفاً دوباره تلاش کن.");
}

const backendPasswordRecoveryAdapter: PasswordRecoveryAdapter = {
  async requestCode(client, input) {
    try {
      const { data } = await client.post<SendResetOtpResponse>(
        "/auth/password-reset/send-otp/",
        { phone: input.mobile },
      );
      if (
        !data
        || typeof data.expires_in !== "number"
        || typeof data.resend_after !== "number"
      ) {
        throw new PasswordRecoveryError("پاسخ ارسال کد از بک‌اند معتبر نیست.");
      }

      const now = Date.now();
      return {
        mobile: input.mobile,
        expiresAt: now + Math.max(0, data.expires_in) * 1000,
        resendAt: now + Math.max(0, data.resend_after) * 1000,
      };
    } catch (error) {
      throw toRecoveryError(error, "send");
    }
  },

  async verifyCode(client, input, challenge) {
    try {
      const { data } = await client.post<VerifyResetOtpResponse>(
        "/auth/password-reset/verify-otp/",
        { phone: challenge.mobile, code: input.code },
      );
      if (
        !data
        || typeof data.reset_token !== "string"
        || !data.reset_token
        || typeof data.expires_in !== "number"
      ) {
        throw new PasswordRecoveryError("پاسخ تأیید کد از بک‌اند معتبر نیست.");
      }

      return {
        resetToken: data.reset_token,
        expiresAt: Date.now() + Math.max(0, data.expires_in) * 1000,
      };
    } catch (error) {
      throw toRecoveryError(error, "verify");
    }
  },

  async resetPassword(client, input, grant) {
    if (!grant.resetToken || (grant.expiresAt !== undefined && Date.now() >= grant.expiresAt)) {
      throw new PasswordRecoveryError("مهلت تغییر رمز تمام شده است. فرایند بازیابی را دوباره شروع کن.");
    }

    try {
      await client.post<ConfirmResetResponse>(
        "/auth/password-reset/confirm/",
        {
          reset_token: grant.resetToken,
          new_password: input.newPassword,
          confirm_password: input.confirmPassword,
        },
      );
    } catch (error) {
      throw toRecoveryError(error, "confirm");
    }
  },
};

/** Real Django API is the default. The mock is opt-in for local development only. */
export function createPasswordRecoveryService(adapter?: PasswordRecoveryAdapter): PasswordRecoveryService {
  async function resolveAdapter(): Promise<PasswordRecoveryAdapter> {
    if (adapter) return adapter;
    if (recoveryMockEnabled) return (await import("./recovery.mock")).developmentRecoveryAdapter;
    return backendPasswordRecoveryAdapter;
  }

  return {
    simulated: !adapter && recoveryMockEnabled,
    async requestCode(input) {
      return (await resolveAdapter()).requestCode(api, input);
    },
    async verifyCode(input, challenge) {
      return (await resolveAdapter()).verifyCode(api, input, challenge);
    },
    async resetPassword(input, grant) {
      return (await resolveAdapter()).resetPassword(api, input, grant);
    },
  };
}

export const passwordRecoveryService = createPasswordRecoveryService();
