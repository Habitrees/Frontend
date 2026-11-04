/** Development-only simulation. Never sends SMS, changes a password, or authenticates a user. */
import { PasswordRecoveryError } from "./auth.service";
import type { PasswordRecoveryAdapter } from "./auth.service";
import type { RecoveryChallenge, RecoveryGrant } from "./auth.types";

const challenges = new WeakSet<object>();
const grants = new WeakSet<object>();

async function simulateLatency() {
  // Defense in depth: direct imports cannot bypass the service's explicit development gate.
  if (!import.meta.env.DEV || import.meta.env.VITE_ENABLE_AUTH_RECOVERY_MOCK !== "true") {
    throw new PasswordRecoveryError("حالت آزمایشی فعال نیست.");
  }
  await new Promise<void>((resolve) => window.setTimeout(resolve, 250));
}

function recognized(context: unknown, values: WeakSet<object>): context is object {
  return typeof context === "object" && context !== null && values.has(context);
}

export const developmentRecoveryAdapter: PasswordRecoveryAdapter = {
  async requestCode() {
    await simulateLatency();
    const context = {};
    const challenge: RecoveryChallenge = { context };
    challenges.add(context);
    return challenge;
  },
  async verifyCode(_client, input, challenge) {
    await simulateLatency();
    if (!recognized(challenge.context, challenges)) throw new PasswordRecoveryError("درخواست آزمایشی منقضی شده؛ دوباره شروع کن.");
    if (input.code !== "123456") throw new PasswordRecoveryError("کد آزمایشی درست نیست؛ کد ۱۲۳۴۵۶ را وارد کن.");
    challenges.delete(challenge.context);
    const context = {};
    const grant: RecoveryGrant = { context };
    grants.add(context);
    return grant;
  },
  async resetPassword(_client, _input, grant) {
    await simulateLatency();
    if (!recognized(grant.context, grants)) throw new PasswordRecoveryError("تأیید آزمایشی منقضی شده؛ دوباره شروع کن.");
    grants.delete(grant.context);
    // Deliberately discard the password. Nothing is changed, logged, or persisted.
  },
};
