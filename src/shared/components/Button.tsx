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
      className={`flex h-[54px] w-full items-center justify-center gap-2 rounded-xl px-4 text-body font-bold text-on-primary transition-[background-color,box-shadow,transform] duration-200 hover:shadow-[0_9px_20px_rgba(100,57,74,0.20)] active:translate-y-px disabled:cursor-wait disabled:opacity-70 disabled:hover:shadow-none disabled:active:translate-y-0 motion-reduce:transition-none ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
