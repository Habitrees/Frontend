import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "login" | "brand";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  login: "bg-login-primary shadow-login-button hover:bg-brand-dark",
  brand: "bg-brand shadow-registration-button hover:bg-brand-dark",
};

export function Button({
  className = "",
  children,
  type = "button",
  variant = "login",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`flex h-[54px] w-full items-center justify-center gap-2 rounded-xl px-4 text-body font-bold text-on-primary transition-colors disabled:cursor-wait disabled:opacity-70 motion-reduce:transition-none ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
