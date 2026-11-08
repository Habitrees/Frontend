import { normalizePhone } from "../../../../shared/utils/phone";

export function validateIranianMobile(value: string): true | string {
  const mobile = normalizePhone(value);
  if (!mobile) return "شماره موبایل را وارد کن.";
  return /^09\d{9}$/.test(mobile) || "شماره موبایل معتبر نیست؛ مثلاً ۰۹۱۲۳۴۵۶۷۸۹.";
}
