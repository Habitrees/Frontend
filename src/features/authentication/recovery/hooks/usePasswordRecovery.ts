import { createContext, useContext, useRef, useState } from "react";
import { normalizePhone } from "../../../../shared/utils/phone";
import { passwordRecoveryService, PasswordRecoveryError } from "../services/recovery.service";
import type { PasswordRecoveryService, RecoveryChallenge, RecoveryGrant } from "../services/recovery.types";

type RecoveryStage =
  | { step: "phone" }
  | { step: "code"; challenge: RecoveryChallenge }
  | { step: "password"; grant: RecoveryGrant };

type RecoveryRequestState = { status: "idle" | "loading" } | { status: "error"; message: string };

export function useRecoveryController(service: PasswordRecoveryService = passwordRecoveryService) {
  const [stage, setStage] = useState<RecoveryStage>({ step: "phone" });
  const [request, setRequest] = useState<RecoveryRequestState>({ status: "idle" });
  const submitting = useRef(false);

  async function run(action: () => Promise<void>): Promise<boolean> {
    if (submitting.current) return false;
    submitting.current = true;
    setRequest({ status: "loading" });
    try {
      await action();
      setRequest({ status: "idle" });
      return true;
    } catch (error: unknown) {
      setRequest({
        status: "error",
        message: error instanceof PasswordRecoveryError
          ? error.message
          : "درخواست انجام نشد. لطفاً دوباره تلاش کن.",
      });
      return false;
    } finally {
      submitting.current = false;
    }
  }

  async function requestCode(mobile: string) {
    return run(async () => {
      const challenge = await service.requestCode({ mobile: normalizePhone(mobile) });
      setStage({ step: "code", challenge });
    });
  }

  async function resendCode(): Promise<boolean> {
    if (stage.step !== "code") return false;
    const currentChallenge = stage.challenge;
    if (Date.now() < currentChallenge.resendAt) return false;

    return run(async () => {
      const challenge = await service.requestCode({ mobile: currentChallenge.mobile });
      setStage({ step: "code", challenge });
    });
  }

  async function verifyCode(code: string) {
    if (stage.step !== "code") return false;
    const currentChallenge = stage.challenge;
    if (Date.now() >= currentChallenge.expiresAt) {
      setRequest({ status: "error", message: "مهلت اعتبار کد تمام شده است؛ لطفاً کد جدید درخواست کن." });
      return false;
    }
    return run(async () => {
      const grant = await service.verifyCode({ code }, currentChallenge);
      setStage({ step: "password", grant });
    });
  }

  async function resetPassword(newPassword: string, confirmPassword: string) {
    if (stage.step !== "password") return false;
    const currentGrant = stage.grant;
    if (currentGrant.expiresAt !== undefined && Date.now() >= currentGrant.expiresAt) {
      setRequest({ status: "error", message: "مهلت تغییر رمز تمام شده است؛ فرایند بازیابی را دوباره شروع کن." });
      return false;
    }
    return run(async () => {
      await service.resetPassword({ newPassword, confirmPassword }, currentGrant);
      // Keep the verified stage until the page navigates to Login.
      // Resetting it here races with ResetPasswordPage's route transition
      // and redirects the user back to /forgot-password.
    });
  }

  function clearError() {
    if (!submitting.current) setRequest({ status: "idle" });
  }

  return {
    stage, request, simulated: service.simulated, requestCode, resendCode,
    verifyCode, resetPassword, clearError,
  };
}

type RecoveryController = ReturnType<typeof useRecoveryController>;
export const PasswordRecoveryContext = createContext<RecoveryController | null>(null);

export function usePasswordRecovery() {
  const recovery = useContext(PasswordRecoveryContext);
  if (!recovery) throw new Error("Password recovery pages require PasswordRecoveryProvider.");
  return recovery;
}
