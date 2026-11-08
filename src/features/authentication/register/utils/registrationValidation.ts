import { validatePassword } from "../../shared/utils/passwordPolicy";

export function validateRegistrationName(value: string): true | string {
  return value.trim().length > 0 || "نام و نام خانوادگی را وارد کن.";
}

export function validateRegistrationUsername(value: string): true | string {
  const username = value.trim();
  if (!username) return "شناسه کاربری را وارد کن.";
  if (username.length < 3) return "شناسه کاربری باید حداقل ۳ کاراکتر باشد.";
  return /^[A-Za-z0-9]+$/.test(username)
    || "شناسه کاربری فقط می‌تواند شامل حروف انگلیسی و اعداد باشد.";
}

/** Shared provisional policy; the backend remains authoritative once its contract is available. */
export function validateRegistrationPassword(value: string): true | string {
  return validatePassword(value);
}
