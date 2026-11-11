import type { RegistrationAdapter } from "./registration.service";
import { RegistrationError } from "./registration.service";

/** Explicit development-only simulation; no SMS or account creation. */
export const developmentRegistrationAdapter: RegistrationAdapter = {
  async requestCode(client, input) {
    void client; void input;
    return { expiresIn: 300, resendAfter: 60 };
  },
  async verifyCode(client, input) {
    void client;
    if (input.code !== "123456") {
      throw new RegistrationError("کد واردشده صحیح نیست. در حالت آزمایشی از کد ۱۲۳۴۵۶ استفاده کن.");
    }
    return { registrationToken: "local-preview-only", expiresIn: 300 };
  },
  async completeRegistration(client, input) {
    void client;
    return {
      user: {
        id: 0, phone: "09123456789", username: input.username, fullName: input.fullName,
      },
    };
  },
};
