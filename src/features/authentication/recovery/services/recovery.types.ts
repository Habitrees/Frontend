/** UI-level recovery values; backend wire fields are mapped in recovery.service.ts. */
export interface RequestResetCodeInput {
  mobile: string;
}

export interface VerifyResetCodeInput {
  code: string;
}

export interface ResetPasswordInput {
  newPassword: string;
  confirmPassword: string;
}

/** OTP challenge details are kept in memory only for the current recovery flow. */
export interface RecoveryChallenge {
  mobile: string;
  expiresAt: number;
  resendAt: number;
  context?: unknown;
}

/** The short-lived reset token is kept in memory only and never placed in a URL or Web Storage. */
export interface RecoveryGrant {
  resetToken?: string;
  expiresAt?: number;
  context?: unknown;
}

export interface PasswordRecoveryService {
  readonly simulated: boolean;
  requestCode(input: RequestResetCodeInput): Promise<RecoveryChallenge>;
  verifyCode(input: VerifyResetCodeInput, challenge: RecoveryChallenge): Promise<RecoveryGrant>;
  resetPassword(input: ResetPasswordInput, grant: RecoveryGrant): Promise<void>;
}
