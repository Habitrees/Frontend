import { useId } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthLayout } from "./components/AuthLayout";
import { PasswordInput } from "./components/PasswordInput";
import { RecoveryFeedback, RecoverySimulationNotice } from "./components/RecoveryFeedback";
import { RecoverySubmitButton } from "./components/RecoverySubmitButton";
import { usePasswordRecovery } from "./hooks/usePasswordRecovery";

interface ResetPasswordFields { newPassword: string; confirmPassword: string; }

export default function ResetPasswordPage() {
  const passwordId = useId();
  const confirmId = useId();
  const recovery = usePasswordRecovery();
  const navigate = useNavigate();
  const form = useForm<ResetPasswordFields>({ defaultValues: { newPassword: "", confirmPassword: "" }, reValidateMode: "onChange" });
  const loading = recovery.request.status === "loading";

  if (recovery.stage.step !== "password") {
    return <Navigate to={recovery.stage.step === "code" ? "/verify-reset-code" : "/forgot-password"} replace />;
  }

  const submit = form.handleSubmit(async ({ newPassword }) => {
    if (await recovery.resetPassword(newPassword)) {
      form.reset();
      navigate("/login", { replace: true, state: { recoveryNotice: recovery.simulated
        ? "آزمایش بازیابی تمام شد؛ هیچ رمز واقعی تغییر نکرده است."
        : "رمز عبور تغییر کرد؛ با رمز جدید وارد شو." } });
    }
  });

  return (
    <AuthLayout title="رمز عبور جدید | habitree" label="تنظیم رمز عبور جدید" recovery>
      <div className="w-full max-w-[440px]">
        <RecoverySimulationNotice />
        <form noValidate onSubmit={submit} onChange={recovery.clearError} aria-labelledby="reset-heading" aria-busy={loading}>
          <h1 id="reset-heading" className="mb-7 text-login-heading-mobile font-extrabold text-login-text sm:text-login-heading">بازیابی رمز عبور</h1>
          <PasswordInput id={passwordId} label="رمز عبور جدید" placeholder="یک رمز عبور امن انتخاب کن" autoComplete="new-password"
            aria-required="true" readOnly={loading} error={form.formState.errors.newPassword?.message}
            {...form.register("newPassword", { validate: recovery.validateNewPassword, deps: ["confirmPassword"] })} />
          <div className="mt-9">
            <PasswordInput id={confirmId} label="تکرار رمز عبور جدید" placeholder="رمز عبورت رو مجدد وارد کن" autoComplete="new-password"
              aria-required="true" readOnly={loading} error={form.formState.errors.confirmPassword?.message}
              {...form.register("confirmPassword", { validate: (value) => !value ? "تکرار رمز عبور جدید را وارد کن."
                : value === form.getValues("newPassword") || "رمزهای عبور یکسان نیستند." })} />
          </div>
          <div className="mt-9"><RecoverySubmitButton loading={loading}>ورود به habitree</RecoverySubmitButton></div>
          <RecoveryFeedback />
        </form>
      </div>
    </AuthLayout>
  );
}
