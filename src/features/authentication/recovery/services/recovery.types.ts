/** UI-level recovery values; these are not backend wire schemas. */
export interface RequestResetCodeInput {
  mobile: string;
}

export interface VerifyResetCodeInput {
  code: string;
}

export interface ResetPasswordInput {
  newPassword: string;
}

/** Opaque challenge/grant values are owned and interpreted by the backend adapter. */
export interface RecoveryChallenge {
  context: unknown;
}

export interface RecoveryGrant {
  context: unknown;
}

export interface PasswordRecoveryService {
  readonly simulated: boolean;
  requestCode(input: RequestResetCodeInput): Promise<RecoveryChallenge>;
  verifyCode(input: VerifyResetCodeInput, challenge: RecoveryChallenge): Promise<RecoveryGrant>;
  resetPassword(input: ResetPasswordInput, grant: RecoveryGrant): Promise<void>;
}
