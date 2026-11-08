import { useState } from "react";
import type { FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { OtpInput } from "../shared/components/OtpInput";
import { AuthSubmitButton } from "../shared/components/AuthSubmitButton";
import { RegistrationFeedback, RegistrationSimulationNotice } from "./components/RegistrationFeedback";
import { RegistrationLayout } from "./components/RegistrationLayout";
import { useRegistration } from "./hooks/useRegistration";

export default function RegisterOtpPage() {
  const [digits, setDigits] = useState<string[]>(Array<string>(6).fill(""));
  const [codeError, setCodeError] = useState<string>();
  const registration = useRegistration();
  const navigate = useNavigate();
  const loading = registration.request.status === "loading";

  if (registration.stage.step === "phone") return <Navigate to="/register" replace />;
  if (registration.stage.step === "details") return <Navigate to="/register/details" replace />;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const code = digits.join("");
    if (!/^\d{6}$/.test(code)) {
      setCodeError("کد شش‌رقمی را کامل وارد کن.");
      return;
    }
    if (await registration.verifyCode(code)) {
      setDigits(Array<string>(6).fill(""));
      navigate("/register/details");
    }
  }

  return (
    <RegistrationLayout title="تأیید شماره موبایل | habitree" label="تأیید کد پیامکی">
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
          <h1 id="register-otp-heading" className="mb-10 text-login-heading-mobile font-extrabold text-login-text sm:text-login-heading">
            کد ورود پیامکی
          </h1>
          <OtpInput
            digits={digits}
            disabled={loading}
            error={codeError}
            onChange={(next) => {
              setDigits(next);
              setCodeError(undefined);
              registration.clearError();
            }}
          />
          <div className="mt-10">
            <AuthSubmitButton loading={loading} variant="brand">تایید و ادامه</AuthSubmitButton>
          </div>
          <RegistrationFeedback />
        </form>
      </div>
    </RegistrationLayout>
  );
}
