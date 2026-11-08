import { useRegistration } from "../hooks/useRegistration";

export function RegistrationFeedback() {
  const { request } = useRegistration();
  return request.status === "error"
    ? <p role="alert" className="mt-4 text-caption text-feedback-error">{request.message}</p>
    : null;
}

export function RegistrationSimulationNotice() {
  const { simulated } = useRegistration();
  if (!simulated) return null;

  return (
    <p className="registration-simulation-notice rounded-xl border border-input-border bg-background text-login-muted" role="note">
      حالت آزمایشی: پیامک واقعی ارسال نمی‌شود و حساب واقعی ساخته نمی‌شود. کد آزمایشی: <bdi dir="ltr">123456</bdi>
    </p>
  );
}
