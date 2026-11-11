import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { useForm } from "react-hook-form";
import { normalizePhone } from "../../../../shared/utils/phone";
import { authenticationService, LoginError } from "../services/login.service";
import type { AuthenticationResult, AuthenticationService, LoginCredentials } from "../services/login.types";

type LoginState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; result: AuthenticationResult };

export function useLogin(service: AuthenticationService = authenticationService) {
  const form = useForm<LoginCredentials>({
    defaultValues: { mobile: "", password: "" },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const [state, setState] = useState<LoginState>({ status: "idle" });
  const submitting = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    await form.handleSubmit(async (values) => {
      if (submitting.current) return;
      submitting.current = true;
      setState({ status: "loading" });
      try {
        const result = await service.login(
          { ...values, mobile: normalizePhone(values.mobile) },
          { rememberMe: false },
        );
        setState({ status: "success", result });
      } catch (error: unknown) {
        setState({
          status: "error",
          message: error instanceof LoginError
            ? error.message
            : "ورود انجام نشد. لطفاً دوباره تلاش کن.",
        });
      } finally {
        submitting.current = false;
      }
    })(event);
  }

  function clearFeedback() {
    if (state.status !== "loading") setState({ status: "idle" });
  }

  return { form, state, submit, clearFeedback };
}
