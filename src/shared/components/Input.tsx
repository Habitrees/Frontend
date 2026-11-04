import type { InputHTMLAttributes, ReactNode } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  icon?: ReactNode;
  action?: ReactNode;
  error?: string;
};

export function Input({ id, label, icon, action, error, className = "", ...props }: InputProps) {
  const errorId = `${id}-error`;
  const alignment = props.dir === "ltr" ? "text-left placeholder:text-right" : "text-right";
  const describedBy = [props["aria-describedby"], error ? errorId : undefined].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex w-full flex-col gap-2">
      <label className="text-label font-semibold text-login-text" htmlFor={id}>{label}</label>
      <div className={`flex h-[54px] items-center gap-3 rounded-xl border bg-input-surface px-4 transition-colors focus-within:border-login-primary focus-within:ring-2 focus-within:ring-login-primary/20 ${error ? "border-feedback-error" : "border-input-border"}`}>
        {icon && <span className="shrink-0 text-muted" aria-hidden="true">{icon}</span>}
        <input
          {...props}
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={`min-w-0 flex-1 bg-transparent text-label text-login-text outline-none placeholder:text-input-placeholder ${alignment} ${className}`}
        />
        {action}
      </div>
      {error && <p id={errorId} className="text-caption text-feedback-error" role="alert">{error}</p>}
    </div>
  );
}
