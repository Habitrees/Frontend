import { useId } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { AtSign, ArrowLeft, Check, UserRound } from "lucide-react";
import { Input } from "../../../shared/components/Input";
import { PasswordInput } from "../shared/components/PasswordInput";
import { AuthSubmitButton } from "../shared/components/AuthSubmitButton";
import { PasswordRequirements } from "../shared/components/PasswordRequirements";
import { RegistrationFeedback, RegistrationSimulationNotice } from "./components/RegistrationFeedback";
import { RegistrationLayout } from "./components/RegistrationLayout";
import { useRegistration } from "./hooks/useRegistration";
import {
  validateRegistrationName,
  validateRegistrationPassword,
  validateRegistrationUsername,
} from "./utils/registrationValidation";

interface RegistrationFields {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export default function RegisterDetailsPage() {
  const fullNameId = useId();
  const usernameId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();
  const registration = useRegistration();
  const navigate = useNavigate();
  const loading = registration.request.status === "loading";
  const form = useForm<RegistrationFields>({
    defaultValues: {
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const passwordValue = useWatch({ control: form.control, name: "password" });

  if (registration.stage.step === "phone") return <Navigate to="/register" replace />;
  if (registration.stage.step === "code") return <Navigate to="/register/verify-code" replace />;

  const submit = form.handleSubmit(async ({ fullName, username, password, confirmPassword, acceptTerms }) => {
    if (await registration.completeRegistration({
      fullName: fullName.trim(),
      username: username.trim(),
      password,
      confirmPassword,
      termsAccepted: acceptTerms,
    })) {
      form.reset();
      navigate("/login", {
        replace: true,
        state: {
          registrationNotice: registration.simulated
            ? "حالت آزمایشی تمام شد؛ حساب کاربری واقعی ساخته نشد."
            : "ثبت‌نام با موفقیت انجام شد؛ حالا وارد حساب کاربری‌ات شو.",
        },
      });
    }
  });

  return (
    <RegistrationLayout
      title="تکمیل ثبت‌نام | habitree"
      label="تکمیل اطلاعات حساب کاربری"
      showPrivacyFooter
    >
      <div className="w-full max-w-[440px]">
        <RegistrationSimulationNotice />
        <form
          className="register-details-form flex w-full flex-col gap-[clamp(0.6rem,1.3vh,0.9rem)]"
          noValidate
          onSubmit={submit}
          onChange={registration.clearError}
          aria-labelledby="register-details-heading"
          aria-busy={loading}
        >
          <div className="text-right">
            <h1 id="register-details-heading" className="text-login-heading-mobile font-extrabold text-login-text sm:text-login-heading">
              رشدت را شروع کن
            </h1>
            <p className="mt-1 text-body text-login-muted">اولین قدم برای روزهای سبزتر، همین‌جاست.</p>
            <button
              type="button"
              className="mt-1 text-caption font-semibold text-login-primary underline underline-offset-4 hover:text-brand-dark"
              onClick={() => {
                if (registration.editCode()) navigate("/register");
              }}
            >
              دریافت کد تأیید جدید
            </button>
          </div>

          <div className="register-details-fields flex flex-col gap-[clamp(0.5rem,1.05vh,0.8rem)]">
            <Input
              id={fullNameId}
              label="نام و نام خانوادگی"
              placeholder="دوست داری چی صدات کنیم؟"
              autoComplete="name"
              icon={<UserRound size={19} strokeWidth={1.7} />}
              aria-required="true"
              readOnly={loading}
              error={form.formState.errors.fullName?.message}
              {...form.register("fullName", { validate: validateRegistrationName })}
            />

            <div>
              <Input
                id={usernameId}
                label="شناسه کاربری"
                placeholder="شناسه کاربری رو برای خودت بنویس"
                autoComplete="username"
                dir="ltr"
                maxLength={30}
                spellCheck={false}
                aria-describedby={`${usernameId}-hint`}
                icon={<AtSign size={19} strokeWidth={1.7} />}
                aria-required="true"
                readOnly={loading}
                error={form.formState.errors.username?.message}
                {...form.register("username", { validate: validateRegistrationUsername })}
              />
              <p id={`${usernameId}-hint`} className="mt-1 text-fine text-login-muted">شناسه کاربری شامل حروف انگلیسی و اعداد است</p>
            </div>

            <div>
              <PasswordInput
                id={passwordId}
                label="رمز عبور"
                placeholder="یک رمز عبور امن انتخاب کن"
                autoComplete="new-password"
                aria-required="true"
                aria-describedby={`${passwordId}-requirements`}
                readOnly={loading}
                error={form.formState.errors.password?.message}
                {...form.register("password", {
                  validate: validateRegistrationPassword,
                  deps: ["confirmPassword"],
                })}
              />
              <PasswordRequirements id={`${passwordId}-requirements`} password={passwordValue ?? ""} />
            </div>

            <PasswordInput
              id={confirmPasswordId}
              label="تکرار رمز عبور"
              placeholder="رمز عبورت رو مجدد وارد کن"
              autoComplete="new-password"
              aria-required="true"
              readOnly={loading}
              error={form.formState.errors.confirmPassword?.message}
              {...form.register("confirmPassword", {
                validate: (value) => !value
                  ? "تکرار رمز عبور را وارد کن."
                  : value === form.getValues("password") || "رمزهای عبور یکسان نیستند.",
              })}
            />
          </div>

          <div>
            <label className="flex min-h-7 cursor-pointer items-center gap-2 text-caption text-login-muted">
              <input
                type="checkbox"
                className="peer sr-only"
                disabled={loading}
                aria-invalid={Boolean(form.formState.errors.acceptTerms)}
                {...form.register("acceptTerms", {
                  validate: (accepted) => accepted || "برای ساخت حساب، پذیرش قوانین ضروری است.",
                })}
              />
              <span aria-hidden="true" className="flex size-[18px] shrink-0 items-center justify-center rounded-[5px] border border-input-border bg-input-surface text-on-primary peer-checked:border-login-primary peer-checked:bg-login-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-login-primary">
                <Check size={13} strokeWidth={2.5} />
              </span>
              <span>با قوانین habitree و حریم خصوصی موافقم.</span>
            </label>
            {form.formState.errors.acceptTerms?.message && (
              <p role="alert" className="mt-1 text-caption text-feedback-error">
                {form.formState.errors.acceptTerms.message}
              </p>
            )}
          </div>

          <AuthSubmitButton loading={loading} variant="brand" className="register-submit-button">
            ساخت حساب کاربری
            <ArrowLeft size={17} aria-hidden="true" />
          </AuthSubmitButton>
          <RegistrationFeedback />
        </form>
      </div>
    </RegistrationLayout>
  );
}
