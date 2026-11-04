import { createContext, useContext, useRef, useState } from "react";
import { normalizePhone } from "../../../shared/utils/phone";
import { passwordRecoveryService, PasswordRecoveryError } from "../services/auth.service";
import type { PasswordRecoveryService, RecoveryChallenge, RecoveryGrant } from "../services/auth.types";

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
      setRequest({ status: "error", message: error instanceof PasswordRecoveryError
        ? error.message : "درخواست انجام نشد. لطفاً دوباره تلاش کن." });
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

  async function verifyCode(code: string) {
    if (stage.step !== "code") return false;
    return run(async () => {
      const grant = await service.verifyCode({ code }, stage.challenge);
      setStage({ step: "password", grant });
    });
  }

  async function resetPassword(newPassword: string) {
    if (stage.step !== "password") return false;
    return run(async () => {
      await service.resetPassword({ newPassword }, stage.grant);
    });
  }

  function clearError() {
    if (!submitting.current) setRequest({ status: "idle" });
  }

  return { stage, request, simulated: service.simulated, validateNewPassword: service.validateNewPassword, requestCode, verifyCode, resetPassword, clearError };
}

type RecoveryController = ReturnType<typeof useRecoveryController>;
export const PasswordRecoveryContext = createContext<RecoveryController | null>(null);

export function usePasswordRecovery() {
  const recovery = useContext(PasswordRecoveryContext);
  if (!recovery) throw new Error("Password recovery pages require PasswordRecoveryProvider.");
  return recovery;
}
