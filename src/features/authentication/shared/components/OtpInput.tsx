import { useEffect, useId, useRef } from "react";
import { normalizePhone } from "../../../../shared/utils/phone";

interface OtpInputProps {
  digits: string[];
  onChange: (digits: string[]) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
}

export function OtpInput({
  digits,
  onChange,
  label = "کد ورود پیامک شده را وارد کنید",
  error,
  disabled = false,
}: OtpInputProps) {
  const inputs = useRef<Array<HTMLInputElement | null>>([]);
  const errorId = useId();

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (error) inputs.current[Math.max(0, digits.findIndex((digit) => !digit))]?.focus();
  }, [error, digits]);

  function focus(index: number) {
    inputs.current[index]?.focus();
  }

  function write(index: number, raw: string) {
    if (disabled) return;
    const normalized = normalizePhone(raw);
    if (!/^\d{0,6}$/.test(normalized)) return;

    const start = normalized.length === 6 ? 0 : index;
    const next = normalized.length === 6 ? Array<string>(6).fill("") : [...digits];
    if (!normalized) next[index] = "";
    for (let offset = 0; offset < normalized.length && start + offset < 6; offset++) {
      next[start + offset] = normalized[offset];
    }

    onChange(next);
    if (normalized) focus(Math.min(start + normalized.length, 5));
  }

  return (
    <fieldset className="min-w-0" aria-describedby={error ? errorId : undefined}>
      <legend className="w-full text-right text-label font-semibold text-login-text">{label}</legend>
      <div className="otp-row mt-10" dir="ltr">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(element) => { inputs.current[index] = element; }}
            className={`h-[54px] w-full min-w-0 rounded-xl border bg-input-surface text-center text-body text-login-text outline-none focus:border-login-primary focus:ring-2 focus:ring-login-primary/20 ${error ? "border-feedback-error" : "border-input-border"}`}
            aria-label={`رقم ${index + 1} کد پیامکی`}
            aria-required="true"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            type="text"
            inputMode="numeric"
            dir="ltr"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            name={`otp-${index + 1}`}
            maxLength={6}
            value={digit}
            readOnly={disabled}
            onFocus={(event) => event.currentTarget.select()}
            onChange={(event) => write(index, event.target.value)}
            onPaste={(event) => {
              event.preventDefault();
              write(index, event.clipboardData.getData("text"));
            }}
            onKeyDown={(event) => {
              if (disabled) return;
              if (event.key === "Backspace") {
                event.preventDefault();
                const target = digit || index === 0 ? index : index - 1;
                onChange(digits.map((current, position) => position === target ? "" : current));
                focus(target);
              } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                event.preventDefault();
                focus(Math.max(0, Math.min(5, index + (event.key === "ArrowLeft" ? -1 : 1))));
              } else if (event.key === "Home" || event.key === "End") {
                event.preventDefault();
                focus(event.key === "Home" ? 0 : 5);
              }
            }}
          />
        ))}
      </div>
      {error && <p id={errorId} role="alert" className="mt-2 text-caption text-feedback-error">{error}</p>}
    </fieldset>
  );
}
