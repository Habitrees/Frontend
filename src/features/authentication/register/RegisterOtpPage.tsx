import { useState } from "react";
import type { FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { OtpInput } from "../shared/components/OtpInput";
import { OtpResendControls } from "../shared/components/OtpResendControls";
import { useOtpCountdown } from "../shared/hooks/useOtpCountdown";
import { AuthSubmitButton } from "../shared/components/AuthSubmitButton";
import { RegistrationFeedback, RegistrationSimulationNotice } from "./components/RegistrationFeedback";
import { RegistrationLayout } from "./components/RegistrationLayout";
import { useRegistration } from "./hooks/useRegistration";

export default function RegisterOtpPage() {
  const registration = useRegistration();
  const [digits, setDigits] = useState<string[]>(Array<string>(6).fill(""));
  const [codeError, setCodeError] = useState<string>();
  const navigate = useNavigate();
  const loading = registration.request.status === "loading";
  const codeStage = registration.stage.step === "code" ? registration.stage : null;
  const { secondsLeft, resendSecondsLeft } = useOtpCountdown(
    codeStage?.expiresAt,
    codeStage?.resendAt,
  );
  const expired = secondsLeft === 0;

  if (registration.stage.step === "phone") return <Navigate to="/register" replace />;
  if (registration.stage.step === "details") return <Navigate to="/register/details" replace />;

  async function submitCode(code: string) {
    if (!/^\d{6}$/.test(code)) {
      setCodeError("کد شش‌رقمی را کامل وارد کن.");
      return;
    }
    if (expired) {
      setCodeError("مهلت اعتبار کد تمام شده است؛ لطفاً کد جدید درخواست کن.");
      return;
    }
    setCodeError(undefined);
    if (await registration.continueWithCode(code)) navigate("/register/details");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await submitCode(digits.join(""));
  }

  async function resendCode() {
    if (await registration.resendCode()) {
      setDigits(Array<string>(6).fill(""));
      setCodeError(undefined);
    }
  }

  return (
    <RegistrationLayout title="تأیید شماره موبایل | habitree" label="کد تأیید ثبت‌نام">
      <div className="w-full max-w-[440px]">
        <RegistrationSimulationNotice />
        <form
          className="flex w-full flex-col"
          noValidate
          onSubmit={submit}
          onChange={registration.clearError}
          aria-labelledby="register-otp-heading"
          aria-busy={loading}
        >
          <h1 id="register-otp-heading" className="mb-3 text-login-heading-mobile font-extrabold text-login-text sm:text-login-heading">
            کد تأیید پیامکی
          </h1>
          <p className="mb-8 text-body text-login-muted">
            کدی را که برای شماره موبایلت فرستادیم وارد کن.
          </p>
          <OtpInput
            digits={digits}
            disabled={loading || expired}
            error={codeError}
            label="کد شش‌رقمی"
            onComplete={(code) => { void submitCode(code); }}
            onChange={(next) => {
              setDigits(next);
              setCodeError(undefined);
              registration.clearError();
            }}
          />
          <div className="mt-10">
            <AuthSubmitButton loading={loading} disabled={expired} variant="brand">
              ادامه و تکمیل اطلاعات
            </AuthSubmitButton>
          </div>
          {codeStage && (
            <OtpResendControls
              secondsLeft={secondsLeft}
              resendSecondsLeft={resendSecondsLeft}
              loading={loading}
              onResend={() => { void resendCode(); }}
            />
          )}
          <RegistrationFeedback />
        </form>
      </div>
    </RegistrationLayout>
  );
}
