import { usePasswordRecovery } from "../hooks/usePasswordRecovery";

export function RecoveryFeedback() {
  const { request } = usePasswordRecovery();
  return request.status === "error"
    ? <p role="alert" className="mt-4 text-caption text-feedback-error">{request.message}</p>
    : null;
}

export function RecoverySimulationNotice() {
  const { simulated } = usePasswordRecovery();
  return simulated ? (
    <p className="recovery-simulation-notice rounded-xl border border-input-border bg-background p-3 text-caption text-login-muted" role="note">
      حالت آزمایشی: پیامکی ارسال نمی‌شود و رمز واقعی تغییر نمی‌کند. کد آزمایشی: <bdi dir="ltr">123456</bdi>
    </p>
  ) : null;
}
