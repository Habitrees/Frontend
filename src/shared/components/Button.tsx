import type { ButtonHTMLAttributes } from "react";

export function Button({ className = "", children, type = "button", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={`flex h-[54px] w-full items-center justify-center gap-2 rounded-xl bg-login-primary px-4 text-body font-bold text-on-primary shadow-login-button transition-colors hover:bg-brand-dark disabled:cursor-wait disabled:opacity-70 motion-reduce:transition-none ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
