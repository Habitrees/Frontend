import { ShieldCheck } from "lucide-react";

export function PrivacyFooter() {
  return (
    <footer className="flex shrink-0 items-center justify-center gap-2 text-fine text-login-muted">
      <ShieldCheck size={15} className="shrink-0 text-reassurance" aria-hidden="true" />
      <p>با خیال راحت؛ اطلاعاتت پیش ما امنه</p>
    </footer>
  );
}
