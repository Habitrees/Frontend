/** UI-level values only; the backend adapter maps them to its documented wire contract. */
export interface LoginCredentials {
  mobile: string;
  password: string;
}

/** A UI preference, not an assumed API field or storage instruction. */
export interface LoginOptions {
  rememberMe: boolean;
}

/** Opaque result returned only after a real backend adapter confirms authentication. */
export interface AuthenticationResult {
  backendResult: unknown;
}

export interface AuthenticationService {
  login(credentials: LoginCredentials, options: LoginOptions): Promise<AuthenticationResult>;
}
