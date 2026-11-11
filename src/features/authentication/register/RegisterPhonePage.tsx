import { useId } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { PhoneNumberInput } from "../shared/components/PhoneNumberInput";
import { AuthSubmitButton } from "../shared/components/AuthSubmitButton";
import { validateIranianMobile } from "../shared/utils/phoneValidation";
import { RegistrationFeedback, RegistrationSimulationNotice } from "./components/RegistrationFeedback";
import { RegistrationLayout } from "./components/RegistrationLayout";
import { useRegistration } from "./hooks/useRegistration";
import type { RequestRegistrationCodeInput } from "./services/registration.types";

export default function RegisterPhonePage() {
  const mobileId = useId();
  const navigate = useNavigate();
  const registration = useRegistration();
  const form = useForm<RequestRegistrationCodeInput>({
    defaultValues: { mobile: "" },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const loading = registration.request.status === "loading";

  if (registration.stage.step === "code") return <Navigate to="/register/verify-code" replace />;
  if (registration.stage.step === "details") return <Navigate to="/register/details" replace />;

  const submit = form.handleSubmit(async ({ mobile }) => {
    if (await registration.requestCode(mobile)) navigate("/register/verify-code");
  });

  return (
    <RegistrationLayout title="ثبت‌نام | habitree" label="ثبت‌نام با شماره موبایل">
      <div className="w-full max-w-[440px]">
        <RegistrationSimulationNotice />
        <form
          className="flex w-full flex-col gap-9"
          noValidate
          onSubmit={submit}
          onChange={registration.clearError}
          aria-labelledby="register-phone-heading"
          aria-busy={loading}
        >
          <div className="text-right">
            <h1 id="register-phone-heading" className="text-login-heading-mobile font-extrabold text-login-text sm:text-login-heading">
              رشدت را شروع کن
            </h1>
            <p className="mt-2 text-body text-login-muted">اولین قدم برای روزهای سبزتر، همین‌جاست.</p>
          </div>

          <div className="flex flex-col gap-6">
            <PhoneNumberInput
              id={mobileId}
              label="شماره موبایل"
              placeholder="شماره موبایلت رو وارد کن"
              aria-required="true"
              maxLength={14}
              readOnly={loading}
              error={form.formState.errors.mobile?.message}
              {...form.register("mobile", { validate: validateIranianMobile })}
            />
            <AuthSubmitButton loading={loading} variant="brand">ارسال کد تأیید</AuthSubmitButton>
            <RegistrationFeedback />
            <p className="text-center text-label leading-relaxed text-login-muted">
              قبلاً عضو شدی؟{" "}
              <Link className="font-bold text-login-primary underline underline-offset-4 hover:text-brand-dark" to="/login">
                وارد شو
              </Link>
            </p>
          </div>
        </form>
      </div>
    </RegistrationLayout>
  );
}
