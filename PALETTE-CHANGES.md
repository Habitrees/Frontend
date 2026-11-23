# راهنمای رنگ‌بندی جدید Habitree

## محدوده نسخه فعلی

این پروژه ۸ مسیر دارد: صفحه اصلی `/`، ورود `/login`، ثبت‌نام `/register`، کد ثبت‌نام `/register/verify-code`، اطلاعات حساب `/register/details`، درخواست بازیابی `/forgot-password`، کد بازیابی `/verify-reset-code` و تعیین رمز جدید `/reset-password`.

**نکته:** داشبورد مدیریت عادت هنوز در سورس این نسخه وجود ندارد؛ به همین دلیل هیچ داشبورد فرضی اضافه نشده است.

## رنگ‌ها از کجا مدیریت می‌شوند؟

در فایل `src/index.css` این متغیرها تعریف شدند:

| متغیر | رنگ | کاربرد |
| --- | --- | --- |
| `--sage` | `#71977B` | آیکون فیلدها، عناصر گیاهی، نشانه‌های رشد |
| `--sage-dark` | `#2F6B55` | آیکون برگ لوگو، Hover لینک‌ها، پیام موفقیت، تیک قوانین |
| `--sage-soft` | `#EAF2E9` | پس‌زمینه اعلان‌های آزمایشی |
| `--sage-border` | `#B5CEBA` | حاشیه سبز ملایم در Hover فرم و OTP |
| `--login-primary` | زرشکی قبلی | دکمه‌های اصلی و Focus فیلدها |
| `--background` | کرم قبلی | پس‌زمینه صفحات |
| `--feedback-error` | قرمز قبلی | پیام و حالت خطا |

## کدام کدها چه قسمت‌هایی از همه صفحه‌ها را رنگی می‌کنند؟

- `src/shared/components/Input.tsx` — آیکون سبز و Hover حاشیه سبز در تمام فیلدهای ورود، ثبت‌نام و بازیابی. در حالت خطا قرمز اولویت دارد.
- `src/features/authentication/shared/components/OtpInput.tsx` — Hover سبز و حاشیه سبز رقم‌های پرشده در هر دو صفحه OTP.
- `src/features/authentication/shared/components/AuthHeader.tsx` — آیکون گیاهی سبز لوگو و Hover سبز «بازگشت به سایت»؛ در تمام صفحه‌های احراز هویت قابل دیدن است.
- `src/features/authentication/shared/components/BotanicalWelcome.tsx` و `src/index.css` — نقاط تزئینی سبز و ترکیب خیلی ظریف سبز در گرادیان پنل کنار فرم در صفحه‌های دسکتاپ.
- `src/features/authentication/shared/components/PasswordInput.tsx` — Hover سبز آیکون نمایش رمز.
- `src/features/authentication/shared/components/OtpResendControls.tsx` — Hover سبز لینک ارسال مجدد کد.
- `src/features/authentication/shared/components/PasswordRequirements.tsx` و توکن `--reassurance` — سبز برای شرط‌های رمز عبور تأییدشده.
- `src/shared/components/Button.tsx` — سایه Hover ملایم‌تر؛ رنگ دکمه اصلی زرشکی باقی مانده است.
- `src/features/authentication/register/RegisterDetailsPage.tsx` — تیک سبز پذیرش قوانین و Hover لینک دریافت کد جدید.
- `src/features/authentication/login/components/LoginForm.tsx`، `src/features/authentication/register/RegisterPhonePage.tsx` و `src/features/authentication/shared/components/RegistrationPrompt.tsx` — Hover سبز لینک‌های فرعی.
- `src/features/authentication/register/components/RegistrationFeedback.tsx` و `src/features/authentication/recovery/components/RecoveryFeedback.tsx` — اعلان آزمایشی با پس‌زمینه سبز روشن.
- `src/App.tsx` — حاشیه و خط تزئینی سبز در صفحه اصلی، که فعلاً صفحه‌ای اولیه است.

در این مرحله فقط رنگ و ظاهر تغییر کرده‌اند؛ API، اعتبارسنجی، تایمر OTP، Autofill، مسیرها و منطق فرم‌ها تغییر نکرده‌اند. حذف «با خیال راحت» در نسخه قبلی حفظ شده است.
