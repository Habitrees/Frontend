import type { InputHTMLAttributes, ReactNode } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  icon?: ReactNode;
  action?: ReactNode;
  error?: string;
  hint?: string;
};

export function Input({ id, label, icon, action, error, hint, className = "", ...props }: InputProps) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const alignment = props.dir === "ltr" ? "text-left placeholder:text-right" : "text-right";
  const inputFrameStyle = error
    ? "border-feedback-error focus-within:border-feedback-error focus-within:ring-2 focus-within:ring-feedback-error/15"
    : "border-input-border hover:border-sage-border focus-within:border-login-primary focus-within:ring-2 focus-within:ring-login-primary/20";
  const describedBy = [props["aria-describedby"], error ? errorId : hint ? hintId : undefined].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex w-full flex-col gap-2">
      <label className="text-label font-semibold text-login-text" htmlFor={id}>{label}</label>
      <div className={`flex h-[54px] items-center gap-3 rounded-xl border bg-input-surface px-4 transition-[border-color,box-shadow] duration-200 ${inputFrameStyle}`}>
        {icon && <span className="shrink-0 text-sage" aria-hidden="true">{icon}</span>}
        <input
          {...props}
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={`habitree-auth-input min-w-0 flex-1 bg-transparent text-label text-login-text outline-none placeholder:text-input-placeholder ${alignment} ${className}`}
        />
        {action}
      </div>
      {error ? (
        <p id={errorId} className="text-caption text-feedback-error" role="alert">{error}</p>
      ) : hint ? (
        <p id={hintId} className="text-caption text-login-muted">{hint}</p>
      ) : null}
    </div>
  );
}
