import { Link } from "react-router-dom";

export function RegistrationPrompt() {
  return (
    <div className="text-center text-label leading-relaxed text-login-muted">
      <p>هنوز به جمع ما اضافه نشدی؟{" "}
        <Link className="min-h-6 font-bold text-brand-dark underline underline-offset-4" to="/register">
          ثبت‌نام کن
        </Link>
      </p>
    </div>
  );
}
