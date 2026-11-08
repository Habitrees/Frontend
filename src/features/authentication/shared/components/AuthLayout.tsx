import type { ReactNode } from "react";
import { BotanicalWelcome } from "./BotanicalWelcome";
import type { BotanicalWelcomeProps } from "./BotanicalWelcome";
import { AuthHeader } from "./AuthHeader";
import { PrivacyFooter } from "./PrivacyFooter";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  label: string;
  recovery?: boolean;
  showPrivacyFooter?: boolean;
  welcome?: BotanicalWelcomeProps;
  headerVariant?: "login" | "registration";
}

export function AuthLayout({
  children,
  title,
  label,
  recovery = false,
  showPrivacyFooter = !recovery,
  welcome,
  headerVariant = "login",
}: AuthLayoutProps) {
  return (
    <main className="login-shell bg-background font-sans" dir="ltr">
      <title>{title}</title>
      <BotanicalWelcome {...welcome} />
      <section className="login-area" dir="rtl" aria-label={label}>
        <AuthHeader variant={headerVariant} />
        <div className={`login-form-slot${recovery ? " recovery-form-slot" : ""}`}>{children}</div>
        {showPrivacyFooter && <PrivacyFooter />}
      </section>
    </main>
  );
}
