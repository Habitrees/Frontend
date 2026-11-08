import { createContext, useContext, useRef, useState } from "react";
import { normalizePhone } from "../../../../shared/utils/phone";
import { registrationService, RegistrationError } from "../services/registration.service";
import type {
  CompleteRegistrationInput,
  RegistrationChallenge,
  RegistrationGrant,
  RegistrationService,
} from "../services/registration.types";

type RegistrationStage =
  | { step: "phone" }
  | { step: "code"; mobile: string; challenge: RegistrationChallenge }
  | { step: "details"; mobile: string; grant: RegistrationGrant };

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
        message: error instanceof RegistrationError
          ? error.message
          : "درخواست انجام نشد. لطفاً دوباره تلاش کن.",
      });
      return false;
    } finally {
      submitting.current = false;
    }
  }

  async function requestCode(mobile: string) {
    if (stage.step !== "phone") return false;
    const normalizedMobile = normalizePhone(mobile);
    return run(async () => {
      const challenge = await service.requestCode({ mobile: normalizedMobile });
      setStage({ step: "code", mobile: normalizedMobile, challenge });
    });
  }

  async function verifyCode(code: string) {
    if (stage.step !== "code") return false;
    return run(async () => {
      const grant = await service.verifyCode({ code }, stage.challenge);
      setStage({ step: "details", mobile: stage.mobile, grant });
    });
  }

  async function completeRegistration(input: Omit<CompleteRegistrationInput, "mobile">) {
    if (stage.step !== "details") return false;
    return run(async () => {
      await service.completeRegistration({ ...input, mobile: stage.mobile }, stage.grant);
      setStage({ step: "phone" });
    });
  }

  function clearError() {
    if (!submitting.current) setRequest({ status: "idle" });
  }

  return {
    stage,
    request,
    simulated: service.simulated,
    requestCode,
    verifyCode,
    completeRegistration,
    clearError,
  };
}

type RegistrationController = ReturnType<typeof useRegistrationController>;
export const RegistrationContext = createContext<RegistrationController | null>(null);

export function useRegistration() {
  const registration = useContext(RegistrationContext);
  if (!registration) throw new Error("Registration pages require RegistrationProvider.");
  return registration;
}
