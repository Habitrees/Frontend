import { useId } from "react";
import { Link } from "react-router-dom";
import { PhoneNumberInput } from "../../shared/components/PhoneNumberInput";
import { PasswordInput } from "../../shared/components/PasswordInput";
import { AuthSubmitButton } from "../../shared/components/AuthSubmitButton";
import { RegistrationPrompt } from "../../shared/components/RegistrationPrompt";
import { validateIranianMobile } from "../../shared/utils/phoneValidation";
import { useLogin } from "../hooks/useLogin";

export function LoginForm() {
  const mobileId = useId();
  const passwordId = useId();
  const { form, state, submit, clearFeedback } = useLogin();
  const loading = state.status === "loading";

  return (
    <form className="flex w-full max-w-[440px] flex-col gap-10" noValidate onSubmit={submit} onChange={clearFeedback} aria-labelledby="login-heading" aria-busy={loading}>
      <div className="text-right">
        <h1 id="login-heading" className="text-login-heading-mobile font-extrabold text-login-text sm:text-login-heading">خوش اومدی، منتظرت بودیم !</h1>
        <p className="mt-2 text-body leading-relaxed text-login-muted">وارد شو؛ وقت رسیدگی به عادت‌های خوب توست.</p>
      </div>
      <div className="flex flex-col gap-5">
        <PhoneNumberInput
          id={mobileId}
          label="شماره موبایل"
          placeholder="شماره موبایلت رو وارد کن"
          autoComplete="username"
          aria-required="true"
          error={form.formState.errors.mobile?.message}
          readOnly={loading}
          {...form.register("mobile", { validate: validateIranianMobile })}
        />
        <PasswordInput
          id={passwordId}
          label="رمز عبور"
          autoComplete="current-password"
          placeholder="رمز عبورت رو وارد کن"
          aria-required="true"
          error={form.formState.errors.password?.message}
          readOnly={loading}
          {...form.register("password", { required: "رمز عبور را وارد کن." })}
        />
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-caption">
          <label className="relative flex min-h-6 cursor-not-allowed items-center gap-2 text-login-muted" title="مدت اعتبار ورود در حال حاضر توسط سرور تعیین می‌شود.">
            <input type="checkbox" name="rememberMe" className="peer sr-only" defaultChecked={false} disabled />
            <span aria-hidden="true" className="flex size-[18px] shrink-0 items-center justify-center rounded-[5px] border border-input-border bg-input-surface text-on-primary peer-checked:border-login-primary peer-checked:bg-login-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-login-primary" />
            مرا به خاطر بسپار (به‌زودی)
          </label>
          <Link className="min-h-6 font-semibold text-login-primary underline underline-offset-4 hover:text-brand-dark" to="/forgot-password">رمزت رو فراموش کردی؟</Link>
        </div>
        <AuthSubmitButton loading={loading} loadingLabel="در حال ورود…">ورود به habitree</AuthSubmitButton>
        {state.status === "error" && <p role="alert" className="text-center text-caption text-feedback-error">{state.message}</p>}
        {state.status === "success" && <p role="status" className="text-center text-caption text-reassurance">ورود انجام شد.</p>}
      </div>
      <RegistrationPrompt />
    </form>
  );
}
