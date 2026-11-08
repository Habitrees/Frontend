import { ArrowLeft, Sprout } from "lucide-react";
import { Link } from "react-router-dom";

interface AuthHeaderProps {
  variant?: "login" | "registration";
}

export function AuthHeader({ variant = "login" }: AuthHeaderProps) {
  const brandTextClass = variant === "registration" ? "text-brand" : "text-login-primary";
  const brandIconClass = variant === "registration" ? "bg-brand" : "bg-login-primary";

  return (
    <header className="flex w-full shrink-0 items-center justify-between gap-4" dir="ltr">
      <Link to="/" className="flex min-h-11 items-center gap-2 text-caption text-login-muted hover:text-brand-dark">
        <ArrowLeft size={16} aria-hidden="true" />
        <span dir="rtl">بازگشت به سایت</span>
      </Link>
      <Link to="/" aria-label="habitree، صفحه اصلی" className={`flex items-center gap-2.5 ${brandTextClass}`}>
        <span className="text-wordmark font-extrabold">habitree</span>
        <span className={`flex size-[42px] items-center justify-center rounded-[14px] text-on-primary ${brandIconClass}`}>
          <Sprout size={26} strokeWidth={1.6} aria-hidden="true" />
        </span>
      </Link>
    </header>
  );
}
