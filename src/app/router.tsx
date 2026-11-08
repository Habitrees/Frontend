import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../features/authentication/login/LoginPage";
import ForgotPasswordPage from "../features/authentication/recovery/ForgotPasswordPage";
import VerifyOtpPage from "../features/authentication/recovery/VerifyOtpPage";
import ResetPasswordPage from "../features/authentication/recovery/ResetPasswordPage";
import RegisterPhonePage from "../features/authentication/register/RegisterPhonePage";
import RegisterOtpPage from "../features/authentication/register/RegisterOtpPage";
import RegisterDetailsPage from "../features/authentication/register/RegisterDetailsPage";
import { RegistrationProvider } from "../features/authentication/register/components/RegistrationProvider";
import { PasswordRecoveryProvider } from "../features/authentication/recovery/components/PasswordRecoveryProvider";

export const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/login", element: <LoginPage /> },
  {
    element: <RegistrationProvider />,
    children: [
      { path: "/register", element: <RegisterPhonePage /> },
      { path: "/register/verify-code", element: <RegisterOtpPage /> },
      { path: "/register/details", element: <RegisterDetailsPage /> },
    ],
  },
  {
    element: <PasswordRecoveryProvider />,
    children: [
      { path: "/forgot-password", element: <ForgotPasswordPage /> },
      { path: "/verify-reset-code", element: <VerifyOtpPage /> },
      { path: "/reset-password", element: <ResetPasswordPage /> },
    ],
  },
]);
