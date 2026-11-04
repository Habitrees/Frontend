import type { AxiosInstance } from "axios";
import { api } from "../../../shared/api/axios";
import { validateNewPassword } from "../utils/recoveryValidation";
import type {
  AuthenticationResult, AuthenticationService, LoginCredentials, LoginOptions,
  PasswordRecoveryService, RecoveryChallenge, RecoveryGrant,
  RequestResetCodeInput, ResetPasswordInput, VerifyResetCodeInput,
} from "./auth.types";

export type LoginAdapter = (
  client: AxiosInstance,
  credentials: LoginCredentials,
  options: LoginOptions,
) => Promise<AuthenticationResult>;

export class AuthenticationNotConfiguredError extends Error {
  constructor() {
    super("Authentication requires the backend API contract.");
    this.name = "AuthenticationNotConfiguredError";
  }
}

/**
 * BACKEND TODO: supply an adapter using the documented endpoint, request mapping,
 * response validation, error mapping, and session policy. Reuses the existing api
 * client / VITE_API_BASE_URL. No requests or persistence occur until configured.
 */
export function createAuthenticationService(adapter?: LoginAdapter): AuthenticationService {
  return {
    async login(credentials, options) {
      if (!adapter) throw new AuthenticationNotConfiguredError();
      return adapter(api, credentials, options);
    },
  };
}

export const authenticationService = createAuthenticationService();

// This two-part gate is compiled out of production, even when the flag is set.
export const recoveryMockEnabled = import.meta.env.DEV
  && import.meta.env.VITE_ENABLE_AUTH_RECOVERY_MOCK === "true";

export class PasswordRecoveryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PasswordRecoveryError";
  }
}

export interface PasswordRecoveryAdapter {
  /** Override the provisional UI baseline with the documented backend password rules. */
  validateNewPassword?: (value: string) => true | string;
  requestCode(client: AxiosInstance, input: RequestResetCodeInput): Promise<RecoveryChallenge>;
  verifyCode(client: AxiosInstance, input: VerifyResetCodeInput, challenge: RecoveryChallenge): Promise<RecoveryGrant>;
  resetPassword(client: AxiosInstance, input: ResetPasswordInput, grant: RecoveryGrant): Promise<void>;
}

/** BACKEND TODO: inject the real adapter here; no endpoint/schema/session policy is assumed. */
export function createPasswordRecoveryService(adapter?: PasswordRecoveryAdapter): PasswordRecoveryService {
  async function resolveAdapter(): Promise<PasswordRecoveryAdapter> {
    if (adapter) return adapter;
    if (recoveryMockEnabled) return (await import("./auth-recovery.mock")).developmentRecoveryAdapter;
    throw new PasswordRecoveryError("بازیابی رمز عبور هنوز فعال نشده؛ لطفاً کمی بعد دوباره تلاش کن.");
  }

  return {
    simulated: !adapter && recoveryMockEnabled,
    validateNewPassword: adapter?.validateNewPassword ?? validateNewPassword,
    async requestCode(input) { return (await resolveAdapter()).requestCode(api, input); },
    async verifyCode(input, challenge) { return (await resolveAdapter()).verifyCode(api, input, challenge); },
    async resetPassword(input, grant) { return (await resolveAdapter()).resetPassword(api, input, grant); },
  };
}

export const passwordRecoveryService = createPasswordRecoveryService();
