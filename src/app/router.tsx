import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../features/authentication/LoginPage";
import ForgotPasswordPage from "../features/authentication/ForgotPasswordPage";
import VerifyOtpPage from "../features/authentication/VerifyOtpPage";
import ResetPasswordPage from "../features/authentication/ResetPasswordPage";
import { PasswordRecoveryProvider } from "../features/authentication/components/PasswordRecoveryProvider";

export const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/login", element: <LoginPage /> },
  {
    element: <PasswordRecoveryProvider />,
    children: [
      { path: "/forgot-password", element: <ForgotPasswordPage /> },
      { path: "/verify-reset-code", element: <VerifyOtpPage /> },
      { path: "/reset-password", element: <ResetPasswordPage /> },
    ],
  },
]);
