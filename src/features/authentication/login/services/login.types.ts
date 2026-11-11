export interface LoginCredentials { mobile: string; password: string; }

/** UI-only preference; the backend does not yet expose session duration controls. */
export interface LoginOptions { rememberMe: boolean; }

export interface AuthenticatedUser {
  id: number;
  phone: string;
  username: string;
  fullName: string;
}
export interface AuthenticationResult { user: AuthenticatedUser; }
export interface AuthenticationService {
  login(credentials: LoginCredentials, options: LoginOptions): Promise<AuthenticationResult>;
}
