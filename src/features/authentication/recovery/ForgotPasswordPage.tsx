import { useId } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "../shared/components/AuthLayout";
import { PhoneNumberInput } from "../shared/components/PhoneNumberInput";
import { AuthSubmitButton } from "../shared/components/AuthSubmitButton";
import { RegistrationPrompt } from "../shared/components/RegistrationPrompt";
import { validateIranianMobile } from "../shared/utils/phoneValidation";
import { RecoveryFeedback, RecoverySimulationNotice } from "./components/RecoveryFeedback";
import { usePasswordRecovery } from "./hooks/usePasswordRecovery";
import type { RequestResetCodeInput } from "./services/recovery.types";

export default function ForgotPasswordPage() {
  const id = useId();
  const navigate = useNavigate();
  const recovery = usePasswordRecovery();
  const form = useForm<RequestResetCodeInput>({ defaultValues: { mobile: "" }, reValidateMode: "onChange" });
  const loading = recovery.request.status === "loading";
  const submit = form.handleSubmit(async ({ mobile }) => {
    if (await recovery.requestCode(mobile)) navigate("/verify-reset-code");
  });

  return (
    <AuthLayout title="بازیابی رمز عبور | habitree" label="بازیابی رمز عبور" recovery>
      <div className="w-full max-w-[440px]">
        <RecoverySimulationNotice />
        <form noValidate onSubmit={submit} onChange={recovery.clearError} aria-labelledby="recovery-heading" aria-busy={loading}>
          <h1 id="recovery-heading" className="mb-10 text-login-heading-mobile font-extrabold text-login-text sm:text-login-heading">بازیابی رمز عبور</h1>
          <PhoneNumberInput
            id={id}
            label="شماره موبایل"
            placeholder="شماره موبایلت رو وارد کن"
            aria-required="true"
            readOnly={loading}
            error={form.formState.errors.mobile?.message}
            {...form.register("mobile", { validate: validateIranianMobile })}
          />
          <div className="mt-8.5">
            <AuthSubmitButton loading={loading}>دریافت کد ورود پیامکی</AuthSubmitButton>
          </div>
          <RecoveryFeedback />
        </form>
        <div className="mt-10"><RegistrationPrompt /></div>
      </div>
    </AuthLayout>
  );
}
