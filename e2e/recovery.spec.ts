import { test, expect } from "@playwright/test";

test("password recovery sends OTP, rejects a wrong code, verifies a correct code and changes password", async ({ page }) => {
  test.skip(process.env.VITE_ENABLE_AUTH_RECOVERY_MOCK === "true", "Real API contract test does not apply to the local simulation.");
  const sendBodies: unknown[] = [];
  const verifyBodies: unknown[] = [];
  const confirmBodies: unknown[] = [];

  await page.route("**/api/auth/password-reset/send-otp/", async (route) => {
    sendBodies.push(route.request().postDataJSON());
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        detail: "اگر حسابی با این شماره وجود داشته باشد، کد ارسال می‌شود.",
        expires_in: 300,
        resend_after: 0,
      }),
    });
  });

  await page.route("**/api/auth/password-reset/verify-otp/", async (route) => {
    const body = route.request().postDataJSON();
    verifyBodies.push(body);
    if (body.code !== "123456") {
      await route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({ detail: "کد واردشده صحیح نیست." }),
      });
      return;
    }
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ detail: "verified", reset_token: "test-reset-token", expires_in: 300 }),
    });
  });

  await page.route("**/api/auth/password-reset/confirm/", async (route) => {
    confirmBodies.push(route.request().postDataJSON());
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ detail: "رمز عبور با موفقیت تغییر کرد." }),
    });
  });

  await page.goto("/login");
  await page.getByRole("link", { name: "رمزت رو فراموش کردی؟", exact: true }).click();
  await expect(page).toHaveURL(/\/forgot-password$/);
  await page.getByLabel("شماره موبایل", { exact: true }).fill("۰۹۱۲۳۴۵۶۷۸۹");
  await page.getByRole("button", { name: "دریافت کد ورود پیامکی", exact: true }).click();

  await expect(page).toHaveURL(/\/verify-reset-code$/);
  expect(sendBodies).toEqual([{ phone: "09123456789" }]);
  await expect(page.getByRole("button", { name: "ارسال مجدد کد", exact: true })).toBeEnabled();

  const firstDigit = page.getByRole("textbox", { name: "رقم 1 کد پیامکی", exact: true });
  await firstDigit.fill("654321");
  await expect(page.getByRole("alert")).toHaveText("کد واردشده صحیح نیست.");
  await expect(page).toHaveURL(/\/verify-reset-code$/);

  await firstDigit.fill("1");
  expect(verifyBodies).toHaveLength(1);

  await firstDigit.fill("123456");
  await expect(page).toHaveURL(/\/reset-password$/);
  expect(verifyBodies).toEqual([
    { phone: "09123456789", code: "654321" },
    { phone: "09123456789", code: "123456" },
  ]);

  await page.getByLabel("رمز عبور جدید", { exact: true }).fill("HabitreePass123");
  await page.getByLabel("تکرار رمز عبور جدید", { exact: true }).fill("HabitreePass123");
  await page.getByRole("button", { name: "ورود به habitree", exact: true }).click();

  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole("status")).toHaveText("رمز عبور تغییر کرد؛ با رمز جدید وارد شو.");
  expect(confirmBodies).toEqual([{
    reset_token: "test-reset-token",
    new_password: "HabitreePass123",
    confirm_password: "HabitreePass123",
  }]);
  expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }))).toEqual({ local: 0, session: 0 });
});

test("password recovery resend button repeats the real send-OTP request and clears old digits", async ({ page }) => {
  test.skip(process.env.VITE_ENABLE_AUTH_RECOVERY_MOCK === "true", "Real API contract test does not apply to the local simulation.");
  let sendCount = 0;
  await page.route("**/api/auth/password-reset/verify-otp/", async (route) => {
    await route.fulfill({
      status: 400,
      contentType: "application/json",
      body: JSON.stringify({ detail: "کد واردشده صحیح نیست." }),
    });
  });
  await page.route("**/api/auth/password-reset/send-otp/", async (route) => {
    sendCount++;
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ detail: "ok", expires_in: 300, resend_after: 0 }),
    });
  });

  await page.goto("/forgot-password");
  await page.getByLabel("شماره موبایل", { exact: true }).fill("09123456789");
  await page.getByRole("button", { name: "دریافت کد ورود پیامکی", exact: true }).click();
  await expect(page).toHaveURL(/\/verify-reset-code$/);

  const firstDigit = page.getByRole("textbox", { name: "رقم 1 کد پیامکی", exact: true });
  await firstDigit.fill("111111");
  await expect(page.getByRole("alert")).toHaveText("کد واردشده صحیح نیست.");
  await page.getByRole("button", { name: "ارسال مجدد کد", exact: true }).click();

  await expect.poll(() => sendCount).toBe(2);
  await expect(firstDigit).toHaveValue("");
});


test("recovery OTP uses backend expiry and resend deadlines and blocks expired codes", async ({ page }) => {
  test.skip(process.env.VITE_ENABLE_AUTH_RECOVERY_MOCK === "true", "Real API timing test does not apply to the local simulation.");
  await page.clock.install();
  let sendCount = 0;
  let verifyCount = 0;

  await page.route("**/api/auth/password-reset/send-otp/", async (route) => {
    sendCount++;
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        detail: "ok",
        expires_in: sendCount === 1 ? 2 : 300,
        resend_after: sendCount === 1 ? 1 : 0,
      }),
    });
  });
  await page.route("**/api/auth/password-reset/verify-otp/", async (route) => {
    verifyCount++;
    await route.fulfill({
      status: 400,
      contentType: "application/json",
      body: JSON.stringify({ detail: "کد واردشده صحیح نیست." }),
    });
  });

  await page.goto("/forgot-password");
  await page.getByLabel("شماره موبایل", { exact: true }).fill("09123456789");
  await page.getByRole("button", { name: "دریافت کد ورود پیامکی", exact: true }).click();
  await expect(page).toHaveURL(/\/verify-reset-code$/);

  const resend = page.getByRole("button", { name: /ارسال مجدد کد/ });
  await expect(resend).toBeDisabled();
  await page.clock.fastForward(1100);
  await expect(resend).toBeEnabled();
  await page.clock.fastForward(1000);
  await expect(page.getByRole("timer")).toContainText("زمان اعتبار کد تمام شد");
  await expect(page.getByRole("button", { name: "تأیید و ادامه", exact: true })).toBeDisabled();
  await expect(page.getByRole("textbox", { name: "رقم 1 کد پیامکی" })).toHaveAttribute("readonly", "");
  expect(verifyCount).toBe(0);

  await resend.click();
  await expect.poll(() => sendCount).toBe(2);
  await expect(page.getByRole("timer")).toContainText("۰۵:۰۰");
});

test("recovery routes cannot bypass phone, OTP verification or reset-token stages", async ({ page }) => {
  await page.goto("/verify-reset-code");
  await expect(page).toHaveURL(/\/forgot-password$/);

  await page.goto("/reset-password");
  await expect(page).toHaveURL(/\/forgot-password$/);
});

test("password recovery maps backend rate-limit errors to a useful message", async ({ page }) => {
  test.skip(process.env.VITE_ENABLE_AUTH_RECOVERY_MOCK === "true", "Real API error mapping test does not apply to the local simulation.");
  await page.route("**/api/auth/password-reset/send-otp/", async (route) => {
    await route.fulfill({
      status: 429,
      contentType: "application/json",
      body: JSON.stringify({ detail: "rate limited" }),
    });
  });

  await page.goto("/forgot-password");
  await page.getByLabel("شماره موبایل", { exact: true }).fill("09123456789");
  await page.getByRole("button", { name: "دریافت کد ورود پیامکی", exact: true }).click();
  await expect(page.getByRole("alert")).toHaveText("برای درخواست کد جدید باید کمی صبر کنی.");
  await expect(page).toHaveURL(/\/forgot-password$/);
});
