/** UI values only. The backend adapter must map these to the documented wire format. */
export interface LoginCredentials {
  mobile: string;
  password: string;
}

/** A UI preference, not an assumed API field or storage instruction. */
export interface LoginOptions {
  rememberMe: boolean;
}

/**
 * Opaque application-level result. This is NOT a backend response schema.
 * Replace unknown with the documented result when the API contract is available.
 * Only a backend adapter that has verified authentication may resolve this result.
 */
export interface AuthenticationResult {
  backendResult: unknown;
}

export interface AuthenticationService {
  login(credentials: LoginCredentials, options: LoginOptions): Promise<AuthenticationResult>;
}

/** Recovery application inputs/results only. These are NOT backend wire contracts. */
export interface RequestResetCodeInput { mobile: string; }
export interface VerifyResetCodeInput { code: string; }
export interface ResetPasswordInput { newPassword: string; }

/** Backend adapter owns the opaque challenge/grant format and serialization. */
export interface RecoveryChallenge { context: unknown; }
export interface RecoveryGrant { context: unknown; }

export interface PasswordRecoveryService {
  readonly simulated: boolean;
  validateNewPassword(value: string): true | string;
  requestCode(input: RequestResetCodeInput): Promise<RecoveryChallenge>;
  verifyCode(input: VerifyResetCodeInput, challenge: RecoveryChallenge): Promise<RecoveryGrant>;
  resetPassword(input: ResetPasswordInput, grant: RecoveryGrant): Promise<void>;
}
