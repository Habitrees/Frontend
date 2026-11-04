import { useState } from "react";
import type { FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthLayout } from "./components/AuthLayout";
import { OtpInput } from "./components/OtpInput";
import { RecoveryFeedback, RecoverySimulationNotice } from "./components/RecoveryFeedback";
import { RecoverySubmitButton } from "./components/RecoverySubmitButton";
import { usePasswordRecovery } from "./hooks/usePasswordRecovery";

export default function VerifyOtpPage() {
  const [digits, setDigits] = useState<string[]>(Array<string>(6).fill(""));
  const [error, setError] = useState<string>();
  const recovery = usePasswordRecovery();
  const navigate = useNavigate();
  const loading = recovery.request.status === "loading";

  if (recovery.stage.step === "phone") return <Navigate to="/forgot-password" replace />;
  if (recovery.stage.step === "password") return <Navigate to="/reset-password" replace />;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const code = digits.join("");
    if (!/^\d{6}$/.test(code)) { setError("کد شش‌رقمی را کامل وارد کن."); return; }
    if (await recovery.verifyCode(code)) {
      setDigits(Array<string>(6).fill(""));
      navigate("/reset-password", { replace: true });
    }
  }

  return (
    <AuthLayout title="کد ورود پیامکی | habitree" label="تأیید کد پیامکی" recovery>
      <div className="w-full max-w-[440px]">
        <RecoverySimulationNotice />
        <form noValidate onSubmit={submit} aria-labelledby="otp-heading" aria-busy={loading}>
          <h1 id="otp-heading" className="mb-10 text-login-heading-mobile font-extrabold text-login-text sm:text-login-heading">کد ورود پیامکی</h1>
          <OtpInput digits={digits} disabled={loading} error={error} onChange={(next) => { setDigits(next); setError(undefined); recovery.clearError(); }} />
          <div className="mt-10"><RecoverySubmitButton loading={loading}>تایید و ادامه</RecoverySubmitButton></div>
          <RecoveryFeedback />
        </form>
      </div>
    </AuthLayout>
  );
}
