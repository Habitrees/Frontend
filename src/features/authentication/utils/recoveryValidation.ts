import { normalizePhone } from "../../../shared/utils/phone";

export function validateRecoveryPhone(value: string): true | string {
  const phone = normalizePhone(value);
  if (!phone) return "شماره موبایل را وارد کن.";
  return /^09\d{9}$/.test(phone) || "شماره موبایل معتبر نیست؛ مثلاً ۰۹۱۲۳۴۵۶۷۸۹.";
}

/** Provisional UI baseline, not a claim about the unavailable backend's password policy. */
export const recoveryPasswordMinLength = 8;

export function validateNewPassword(value: string): true | string {
  if (!value.trim()) return "رمز عبور جدید را وارد کن.";
  return Array.from(value).length >= recoveryPasswordMinLength || "رمز عبور جدید باید حداقل ۸ نویسه باشد.";
}
