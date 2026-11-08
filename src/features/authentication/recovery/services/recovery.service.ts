import type { AxiosInstance } from "axios";
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

/** No endpoint, payload, response, or session behavior is assumed without the backend contract. */
export function createPasswordRecoveryService(adapter?: PasswordRecoveryAdapter): PasswordRecoveryService {
  async function resolveAdapter(): Promise<PasswordRecoveryAdapter> {
    if (adapter) return adapter;
    if (recoveryMockEnabled) return (await import("./recovery.mock")).developmentRecoveryAdapter;
    throw new PasswordRecoveryError("بازیابی رمز عبور هنوز فعال نشده؛ لطفاً کمی بعد دوباره تلاش کن.");
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
