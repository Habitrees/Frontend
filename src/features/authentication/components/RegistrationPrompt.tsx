import { useId, useState } from "react";

export function RegistrationPrompt() {
  const [notice, setNotice] = useState(false);
  const id = useId();
  return (
    <div className="text-center text-label leading-relaxed text-login-muted">
      <p>هنوز به جمع ما اضافه نشدی؟{" "}<button type="button" className="min-h-6 font-bold text-brand-dark underline underline-offset-4" aria-describedby={notice ? id : undefined} onClick={() => setNotice(true)}>ثبت‌نام کن</button></p>
      {notice && <p id={id} role="status" className="mt-3 text-caption">ثبت‌نام هنوز فعال نشده است.</p>}
    </div>
  );
}
