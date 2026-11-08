import type { AxiosInstance } from "axios";
import { api } from "../../../../shared/api/axios";
import type {
  AuthenticationResult,
  AuthenticationService,
  LoginCredentials,
  LoginOptions,
} from "./login.types";

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
 * Add the real adapter after the backend contract is supplied. The existing Axios
 * instance and base URL are reused; no endpoint or session policy is assumed here.
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
