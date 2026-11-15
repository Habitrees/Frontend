import { normalizePhone } from "../../../../shared/utils/phone";

export function validateIranianMobile(value: string): true | string {
  const mobile = normalizePhone(value);
  if (!mobile) return "شماره موبایل را وارد کن.";
  if (mobile.length !== 11) return "شماره موبایل معتبر نیست؛ شماره باید ۱۱ رقم باشد.";
  return /^09\d{9}$/.test(mobile) || "شماره موبایل باید با ۰۹ شروع شود؛ مثلاً ۰۹۱۲۳۴۵۶۷۸۹.";
}
