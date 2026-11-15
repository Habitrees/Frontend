import { useState } from "react";
import type { ChangeEvent, ComponentProps, FormEvent } from "react";
import { UserRound } from "lucide-react";
import { Input } from "../../../../shared/components/Input";
import { normalizePhone } from "../../../../shared/utils/phone";

type PhoneNumberInputProps = Omit<ComponentProps<typeof Input>, "type" | "icon" | "inputMode" | "hint">;

const MOBILE_LENGTH = 11;

function digitsOnly(value: string) {
  // Also accept Persian/Arabic digits; keep a maximum of 11 ASCII digits.
  return normalizePhone(value).replace(/\D/g, "").slice(0, MOBILE_LENGTH);
}

export function PhoneNumberInput({
  autoComplete = "tel",
  onChange,
  onInput,
  onBeforeInput,
  ...props
}: PhoneNumberInputProps) {
  const [digitCount, setDigitCount] = useState(() =>
    digitsOnly(String(props.value ?? props.defaultValue ?? "")).length,
  );

  function sanitizeInput(input: HTMLInputElement) {
    const cleaned = digitsOnly(input.value);
    if (input.value !== cleaned) input.value = cleaned;
    setDigitCount(cleaned.length);
  }

  function handleInput(event: FormEvent<HTMLInputElement>) {
    sanitizeInput(event.currentTarget);
    onInput?.(event);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    sanitizeInput(event.currentTarget);
    // React Hook Form's register("mobile") receives the sanitized value.
    onChange?.(event);
  }

  function handleBeforeInput(event: FormEvent<HTMLInputElement>) {
    const nativeEvent = event.nativeEvent as InputEvent;
    // Block non-numeric keystrokes before they enter the field; onInput also
    // cleans pasted, dropped, autofilled or IME-composed text as a fallback.
    if (!nativeEvent.isComposing && nativeEvent.data && /[^0-9۰-۹٠-٩]/.test(nativeEvent.data)) {
      event.preventDefault();
    }
    onBeforeInput?.(event);
  }

  return (
    <Input
      {...props}
      type="tel"
      dir="ltr"
      inputMode="numeric"
      pattern="[0-9]*"
      maxLength={MOBILE_LENGTH}
      autoComplete={autoComplete}
      icon={<UserRound size={20} strokeWidth={1.7} />}
      onBeforeInput={handleBeforeInput}
      onInput={handleInput}
      onChange={handleChange}
      hint={digitCount > 0 && digitCount < MOBILE_LENGTH
        ? `شماره موبایل باید ۱۱ رقم باشد (الان ${digitCount.toLocaleString("fa-IR")} رقم).`
        : undefined}
    />
  );
}
