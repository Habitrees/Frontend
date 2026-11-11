/** UI values; the service maps them to the API2 request/response contract. */
export interface RequestRegistrationCodeInput { mobile: string; }

export interface RegistrationChallenge {
  expiresIn: number;
  resendAfter: number;
}

export interface VerifyRegistrationCodeInput {
  mobile: string;
  code: string;
}

export interface VerifiedRegistration {
  registrationToken: string;
  expiresIn: number;
}

export interface CompleteRegistrationInput {
  registrationToken: string;
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

export type CompleteRegistrationFormInput = Omit<CompleteRegistrationInput, "registrationToken">;

export interface RegistrationUser {
  id: number;
  phone: string;
  username: string;
  fullName: string;
}

export interface RegistrationResult { user: RegistrationUser; }

export interface RegistrationService {
  readonly simulated: boolean;
  requestCode(input: RequestRegistrationCodeInput): Promise<RegistrationChallenge>;
  verifyCode(input: VerifyRegistrationCodeInput): Promise<VerifiedRegistration>;
  completeRegistration(input: CompleteRegistrationInput): Promise<RegistrationResult>;
}
