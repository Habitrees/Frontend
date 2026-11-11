interface OtpResendControlsProps {
  secondsLeft: number | null;
  resendSecondsLeft: number | null;
  loading: boolean;
  onResend: () => void;
}

function formatTimer(seconds: number): string {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const remainder = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${remainder}`.replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);
}

/** Keep the controls inside the existing OTP form, using its design tokens. */
export function OtpResendControls({ secondsLeft, resendSecondsLeft, loading, onResend }: OtpResendControlsProps) {
  if (secondsLeft === null || resendSecondsLeft === null) return null;
  return (
    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-label">
      <p role="timer" className={secondsLeft === 0 ? "font-semibold text-feedback-error" : "text-login-muted"}>
        {secondsLeft === 0 ? "زمان اعتبار کد تمام شد" : `زمان باقی‌مانده: ${formatTimer(secondsLeft)}`}
      </p>
      <button
        type="button"
        disabled={loading || resendSecondsLeft > 0}
        onClick={onResend}
        className="font-semibold text-login-primary underline underline-offset-4 hover:text-brand-dark disabled:cursor-not-allowed disabled:text-login-muted disabled:no-underline"
      >
        {resendSecondsLeft > 0 ? `ارسال مجدد کد (${formatTimer(resendSecondsLeft)})` : "ارسال مجدد کد"}
      </button>
    </div>
  );
}
