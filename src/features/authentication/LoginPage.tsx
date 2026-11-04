import { useLocation } from "react-router-dom";
import { AuthLayout } from "./components/AuthLayout";
import { LoginForm } from "./components/LoginForm";

export default function LoginPage() {
  const { state } = useLocation();
  const notice = typeof state === "object" && state !== null && "recoveryNotice" in state
    && typeof state.recoveryNotice === "string" ? state.recoveryNotice : null;

  return (
    <AuthLayout title="ورود به habitree" label="ورود به حساب کاربری">
      {notice ? (
        <div className="flex w-full flex-col items-center gap-6">
          <p className="max-w-[440px] text-center text-caption text-login-muted" role="status">{notice}</p>
          <LoginForm />
        </div>
      ) : <LoginForm />}
    </AuthLayout>
  );
}
