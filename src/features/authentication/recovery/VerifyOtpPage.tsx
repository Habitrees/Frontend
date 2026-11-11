import { useState } from "react";
import type { FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthLayout } from "../shared/components/AuthLayout";
import { OtpInput } from "../shared/components/OtpInput";
import { AuthSubmitButton } from "../shared/components/AuthSubmitButton";
import { OtpResendControls } from "../shared/components/OtpResendControls";
import { useOtpCountdown } from "../shared/hooks/useOtpCountdown";
import { RecoveryFeedback, RecoverySimulationNotice } from "./components/RecoveryFeedback";
import { usePasswordRecovery } from "./hooks/usePasswordRecovery";

export default function VerifyOtpPage() {
  const [digits, setDigits] = useState<string[]>(Array<string>(6).fill(""));
  const [error, setError] = useState<string>();
  const recovery = usePasswordRecovery();
  const navigate = useNavigate();
  const challenge = recovery.stage.step === "code" ? recovery.stage.challenge : null;
  const { secondsLeft, resendSecondsLeft } = useOtpCountdown(
    challenge?.expiresAt,
    challenge?.resendAt,
  );
  const loading = recovery.request.status === "loading";
  const expired = secondsLeft === 0;

  if (recovery.stage.step === "phone") return <Navigate to="/forgot-password" replace />;
  if (recovery.stage.step === "password") return <Navigate to="/reset-password" replace />;

  async function submitCode(code: string) {
    if (!/^\d{6}$/.test(code)) {
      setError("کد شش‌رقمی را کامل وارد کن.");
      return;
    }
    setError(undefined);
    if (await recovery.verifyCode(code)) {
      setDigits(Array<string>(6).fill(""));
      navigate("/reset-password", { replace: true });
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await submitCode(digits.join(""));
  }

  async function resendCode() {
    if (await recovery.resendCode()) {
      setDigits(Array<string>(6).fill(""));
      setError(undefined);
    }
  }

  return (
    <AuthLayout title="کد بازیابی رمز عبور | habitree" label="تأیید کد بازیابی رمز عبور" recovery>
      <div className="w-full max-w-[440px]">
        <RecoverySimulationNotice />
        <form noValidate onSubmit={submit} aria-labelledby="otp-heading" aria-busy={loading}>
          <h1 id="otp-heading" className="mb-10 text-login-heading-mobile font-extrabold text-login-text sm:text-login-heading">کد بازیابی رمز عبور</h1>
          <OtpInput
            digits={digits}
            disabled={loading || expired}
            error={error}
            onComplete={(code) => { void submitCode(code); }}
            onChange={(next) => {
              setDigits(next);
              setError(undefined);
              recovery.clearError();
            }}
          />
          <div className="mt-10">
            <AuthSubmitButton loading={loading} disabled={expired}>تأیید و ادامه</AuthSubmitButton>
          </div>
          {challenge && (
            <OtpResendControls
              secondsLeft={secondsLeft}
              resendSecondsLeft={resendSecondsLeft}
              loading={loading}
              onResend={() => { void resendCode(); }}
            />
          )}
          <RecoveryFeedback />
        </form>
      </div>
    </AuthLayout>
  );
}
