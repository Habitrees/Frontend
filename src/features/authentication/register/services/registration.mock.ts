import type { RegistrationAdapter } from "./registration.service";
import { RegistrationError } from "./registration.service";

/** Explicit local-only flow. It never calls the API or creates a real account. */
export const developmentRegistrationAdapter: RegistrationAdapter = {
  async requestCode(client, input) {
    void client;
    return { context: { mobile: input.mobile } };
  },
  async verifyCode(client, input, challenge) {
    void client;
    if (input.code !== "123456") {
      throw new RegistrationError("کد واردشده صحیح نیست. در حالت آزمایشی از کد ۱۲۳۴۵۶ استفاده کن.");
    }
    return { context: challenge.context };
  },
  async completeRegistration(client, input, grant) {
    void client;
    void input;
    void grant;
    return { backendResult: { simulated: true } };
  },
};
