/** Application-level registration inputs. These are not backend wire contracts. */
export interface RequestRegistrationCodeInput {
  mobile: string;
}

export interface VerifyRegistrationCodeInput {
  code: string;
}

export interface CompleteRegistrationInput {
  mobile: string;
  fullName: string;
  username: string;
  password: string;
  termsAccepted: boolean;
}

/** Opaque challenge/grant values are owned and interpreted by the backend adapter. */
export interface RegistrationChallenge {
  context: unknown;
}

export interface RegistrationGrant {
  context: unknown;
}

/** Opaque application result; replace only after the backend response is documented. */
export interface RegistrationResult {
  backendResult: unknown;
}

export interface RegistrationService {
  readonly simulated: boolean;
  requestCode(input: RequestRegistrationCodeInput): Promise<RegistrationChallenge>;
  verifyCode(input: VerifyRegistrationCodeInput, challenge: RegistrationChallenge): Promise<RegistrationGrant>;
  completeRegistration(input: CompleteRegistrationInput, grant: RegistrationGrant): Promise<RegistrationResult>;
}
