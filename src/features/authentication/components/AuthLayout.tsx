import type { ReactNode } from "react";
import { BotanicalWelcome } from "./BotanicalWelcome";
import { LoginHeader } from "./LoginHeader";
import { PrivacyFooter } from "./PrivacyFooter";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  label: string;
  recovery?: boolean;
}

export function AuthLayout({ children, title, label, recovery = false }: AuthLayoutProps) {
  return (
    <main className="login-shell bg-background font-sans" dir="ltr">
      <title>{title}</title>
      <BotanicalWelcome />
      <section className="login-area" dir="rtl" aria-label={label}>
        <LoginHeader />
        <div className={`login-form-slot${recovery ? " recovery-form-slot" : ""}`}>{children}</div>
        {!recovery && <PrivacyFooter />}
      </section>
    </main>
  );
}
