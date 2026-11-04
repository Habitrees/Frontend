import { useId, useState } from "react";
import { Link } from "react-router-dom";
import { Check, Eye, EyeOff, LoaderCircle, LockKeyhole, UserRound } from "lucide-react";
import { Button } from "../../../shared/components/Button";
import { Input } from "../../../shared/components/Input";
import { normalizePhone } from "../../../shared/utils/phone";
import { useLogin } from "../hooks/useLogin";

export function LoginForm() {
  const mobileId = useId();
  const passwordId = useId();
  const feedbackId = useId();
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState("");
  const { form, state, rememberMe, setRememberMe, submit, clearFeedback } = useLogin();
  const loading = state.status === "loading";

  return (
    <form className="flex w-full max-w-[440px] flex-col gap-10" noValidate onSubmit={submit} onChange={() => { clearFeedback(); setNotice(""); }} aria-labelledby="login-heading" aria-busy={loading}>
      <div className="text-right">
        <h1 id="login-heading" className="text-login-heading-mobile sm:text-login-heading font-extrabold text-login-text">خوش اومدی، منتظرت بودیم !</h1>
        <p className="mt-2 text-body leading-relaxed text-login-muted">وارد شو؛ وقت رسیدگی به عادت‌های خوب توست.</p>
      </div>
      <div className="flex flex-col gap-5">
        <Input
          id={mobileId}
          label="شماره موبایل"
          type="tel"
          inputMode="tel"
          aria-required="true"
          autoComplete="username"
          placeholder="شماره موبایلت رو وارد کن"
          icon={<UserRound size={20} strokeWidth={1.7} />}
          error={form.formState.errors.mobile?.message}
          readOnly={loading}
          {...form.register("mobile", { validate: (value) => {
            const mobile = normalizePhone(value);
            if (!mobile) return "شماره موبایل را وارد کن.";
            return /^09\d{9}$/.test(mobile) || "شماره موبایل معتبر نیست؛ مثلاً ۰۹۱۲۳۴۵۶۷۸۹.";
          } })}
        />
        <Input
          id={passwordId}
          label="رمز عبور"
          type={showPassword ? "text" : "password"}
          aria-required="true"
          autoComplete="current-password"
          placeholder="رمز عبورت رو وارد کن"
          icon={<LockKeyhole size={20} strokeWidth={1.7} />}
          error={form.formState.errors.password?.message}
          readOnly={loading}
          {...form.register("password", { required: "رمز عبور را وارد کن." })}
          action={
            <button type="button" className="-m-3 flex size-11 shrink-0 items-center justify-center rounded-lg text-login-muted hover:text-brand-dark" aria-label={showPassword ? "پنهان کردن رمز عبور" : "نمایش رمز عبور"} aria-pressed={showPassword} aria-controls={passwordId} onClick={() => setShowPassword((visible) => !visible)}>
              {showPassword ? <Eye size={19} aria-hidden="true" /> : <EyeOff size={19} aria-hidden="true" />}
            </button>
          }
        />
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-caption">
          <label className="relative flex min-h-6 cursor-pointer items-center gap-2 text-login-muted">
            <input type="checkbox" name="rememberMe" className="peer sr-only" checked={rememberMe} disabled={loading} onChange={(event) => setRememberMe(event.target.checked)} />
            <span aria-hidden="true" className="flex size-[18px] shrink-0 items-center justify-center rounded-[5px] border border-input-border bg-input-surface text-on-primary peer-checked:border-login-primary peer-checked:bg-login-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-login-primary">
              {rememberMe && <Check size={13} strokeWidth={2.5} />}
            </span>
            مرا به خاطر بسپار
          </label>
          <Link className="min-h-6 font-semibold text-login-primary underline underline-offset-4 hover:text-brand-dark" to="/forgot-password">رمزت رو فراموش کردی؟</Link>
        </div>
        <Button type="submit" disabled={loading}>
          {loading && <LoaderCircle size={18} className="animate-spin motion-reduce:animate-none" aria-hidden="true" />}
          {loading ? "در حال ورود…" : "ورود به habitree"}
        </Button>
        {state.status === "error" && <p role="alert" className="text-center text-caption text-feedback-error">{state.message}</p>}
        {state.status === "success" && <p role="status" className="text-center text-caption text-reassurance">ورود انجام شد.</p>}
      </div>
      <div className="text-center text-label leading-relaxed text-login-muted">
        <p>هنوز به جمع ما اضافه نشدی؟{" "}<button type="button" className="min-h-6 font-bold text-brand-dark underline underline-offset-4" aria-describedby={notice ? feedbackId : undefined} onClick={() => setNotice("ثبت‌نام هنوز فعال نشده است.")}>ثبت‌نام کن</button></p>
        {notice && <p id={feedbackId} role="status" className="mt-3 text-caption">{notice}</p>}
      </div>
    </form>
  );
}
