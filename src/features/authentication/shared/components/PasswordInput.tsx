import { useState } from "react";
import type { ComponentProps } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { Input } from "../../../../shared/components/Input";

type PasswordInputProps = Omit<ComponentProps<typeof Input>, "type" | "icon" | "action">;

export function PasswordInput({ label, id, ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <Input
      {...props}
      id={id}
      label={label}
      type={visible ? "text" : "password"}
      dir="ltr"
      icon={<LockKeyhole size={20} strokeWidth={1.7} />}
      action={
        <button
          type="button"
          className="-m-3 flex size-11 shrink-0 items-center justify-center rounded-lg text-login-muted hover:text-brand-dark"
          aria-label={`${visible ? "پنهان کردن" : "نمایش"} ${label}`}
          aria-pressed={visible}
          aria-controls={id}
          onClick={() => setVisible((current) => !current)}
        >
          {visible ? <Eye size={19} aria-hidden="true" /> : <EyeOff size={19} aria-hidden="true" />}
        </button>
      }
    />
  );
}
