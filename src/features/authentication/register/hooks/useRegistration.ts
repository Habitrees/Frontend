import { createContext, useContext, useRef, useState } from "react";
import { normalizePhone } from "../../../../shared/utils/phone";
import { registrationService, RegistrationError } from "../services/registration.service";
import type { CompleteRegistrationFormInput, RegistrationService } from "../services/registration.types";

type RegistrationStage =
  | { step: "phone" }
  | { step: "code"; mobile: string; expiresAt: number; resendAt: number }
  | { step: "details"; mobile: string; registrationToken: string; expiresAt: number };

type RegistrationRequestState =
  | { status: "idle" | "loading" }
  | { status: "error"; message: string };

export function useRegistrationController(service: RegistrationService = registrationService) {
  const [stage, setStage] = useState<RegistrationStage>({ step: "phone" });
  const [request, setRequest] = useState<RegistrationRequestState>({ status: "idle" });
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
        message: error instanceof RegistrationError ? error.message : "درخواست انجام نشد. لطفاً دوباره تلاش کن.",
      });
      return false;
    } finally { submitting.current = false; }
  }

  async function requestCode(mobile: string) {
    if (stage.step !== "phone") return false;
    const normalizedMobile = normalizePhone(mobile);
    return run(async () => {
      const challenge = await service.requestCode({ mobile: normalizedMobile });
      const now = Date.now();
      setStage({
        step: "code",
        mobile: normalizedMobile,
        expiresAt: now + Math.max(0, challenge.expiresIn) * 1000,
        resendAt: now + Math.max(0, challenge.resendAfter) * 1000,
      });
    });
  }

  async function resendCode(): Promise<boolean> {
    if (stage.step !== "code") return false;
    const currentStage = stage;
    if (Date.now() < currentStage.resendAt) return false;
    return run(async () => {
      const challenge = await service.requestCode({ mobile: currentStage.mobile });
      const now = Date.now();
      setStage({
        step: "code",
        mobile: currentStage.mobile,
        expiresAt: now + Math.max(0, challenge.expiresIn) * 1000,
        resendAt: now + Math.max(0, challenge.resendAfter) * 1000,
      });
    });
  }

  async function continueWithCode(code: string): Promise<boolean> {
    if (stage.step !== "code") return false;
    const currentStage = stage;
    if (Date.now() >= currentStage.expiresAt) {
      setRequest({ status: "error", message: "مهلت اعتبار کد تمام شده است؛ لطفاً کد جدید درخواست کن." });
      return false;
    }
    return run(async () => {
      const verified = await service.verifyCode({ mobile: currentStage.mobile, code });
      setStage({
        step: "details",
        mobile: currentStage.mobile,
        registrationToken: verified.registrationToken,
        expiresAt: Date.now() + verified.expiresIn * 1000,
      });
    });
  }

  // Backend marks a verified OTP as used: returning to that OTP is not safe.
  // Restart the phone stage if the user wants a new code.
  function editCode(): boolean {
    if (stage.step !== "details" || submitting.current) return false;
    setStage({ step: "phone" });
    setRequest({ status: "idle" });
    return true;
  }

  async function completeRegistration(input: CompleteRegistrationFormInput) {
    const currentStage = stage;
    if (currentStage.step !== "details") return false;
    if (Date.now() >= currentStage.expiresAt) {
      setRequest({ status: "error", message: "مهلت تکمیل ثبت‌نام تمام شده است. برای دریافت کد جدید از ابتدا شروع کن." });
      return false;
    }
    return run(async () => {
      await service.completeRegistration({ ...input, registrationToken: currentStage.registrationToken });
      setStage({ step: "phone" });
    });
  }

  function clearError() {
    if (!submitting.current) setRequest({ status: "idle" });
  }

  return {
    stage, request, simulated: service.simulated, requestCode, resendCode, continueWithCode,
    editCode, completeRegistration, clearError,
  };
}

type RegistrationController = ReturnType<typeof useRegistrationController>;
export const RegistrationContext = createContext<RegistrationController | null>(null);
export function useRegistration() {
  const registration = useContext(RegistrationContext);
  if (!registration) throw new Error("Registration pages require RegistrationProvider.");
  return registration;
}
