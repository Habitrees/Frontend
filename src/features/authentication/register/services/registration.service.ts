import type { AxiosInstance } from "axios";
import { api } from "../../../../shared/api/axios";
import type {
  CompleteRegistrationInput,
  RegistrationChallenge,
  RegistrationGrant,
  RegistrationResult,
  RegistrationService,
  RequestRegistrationCodeInput,
  VerifyRegistrationCodeInput,
} from "./registration.types";

export class RegistrationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RegistrationError";
  }
}

export class RegistrationNotConfiguredError extends RegistrationError {
  constructor() {
    super("ثبت‌نام هنوز به سرویس بک‌اند متصل نشده است؛ لطفاً بعداً دوباره تلاش کن.");
    this.name = "RegistrationNotConfiguredError";
  }
}

/**
 * The adapter is the only layer that knows endpoint paths, HTTP methods,
 * request/response schemas, OTP expiry, and backend error codes.
 * Add it only after the backend contract is supplied.
 */
export interface RegistrationAdapter {
  requestCode(client: AxiosInstance, input: RequestRegistrationCodeInput): Promise<RegistrationChallenge>;
  verifyCode(
    client: AxiosInstance,
    input: VerifyRegistrationCodeInput,
    challenge: RegistrationChallenge,
  ): Promise<RegistrationGrant>;
  completeRegistration(
    client: AxiosInstance,
    input: CompleteRegistrationInput,
    grant: RegistrationGrant,
  ): Promise<RegistrationResult>;
}

const registrationMockEnabled = import.meta.env.DEV
  && import.meta.env.VITE_ENABLE_AUTH_REGISTRATION_MOCK === "true";

/** No network request is made until a real adapter or the explicit local mock is configured. */
export function createRegistrationService(adapter?: RegistrationAdapter): RegistrationService {
  async function resolveAdapter(): Promise<RegistrationAdapter> {
    if (adapter) return adapter;
    if (registrationMockEnabled) {
      return (await import("./registration.mock")).developmentRegistrationAdapter;
    }
    throw new RegistrationNotConfiguredError();
  }

  return {
    simulated: !adapter && registrationMockEnabled,
    async requestCode(input) {
      return (await resolveAdapter()).requestCode(api, input);
    },
    async verifyCode(input, challenge) {
      return (await resolveAdapter()).verifyCode(api, input, challenge);
    },
    async completeRegistration(input, grant) {
      return (await resolveAdapter()).completeRegistration(api, input, grant);
    },
  };
}

export const registrationService = createRegistrationService();
