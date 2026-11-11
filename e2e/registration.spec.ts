import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

const simulated = process.env.VITE_ENABLE_AUTH_REGISTRATION_MOCK === "true";

async function completeDetails(page: Page) {
  await page.getByLabel("نام و نام خانوادگی", { exact: true }).fill("کاربر آزمایشی");
  await page.getByLabel("شناسه کاربری", { exact: true }).fill("habitree123");
  await page.getByLabel("رمز عبور", { exact: true }).fill("habitree123");
  await page.getByLabel("تکرار رمز عبور", { exact: true }).fill("habitree123");
  const termsCheckbox = page.getByRole("checkbox");
  await page.getByText("با قوانین habitree و حریم خصوصی موافقم.", { exact: true }).click();
  await expect(termsCheckbox).toBeChecked();
}

test("registration verifies OTP before details and sends only a registration token during completion", async ({ page }) => {
  test.skip(simulated, "Real API contract test does not apply to the local simulation.");
  const sendBodies: unknown[] = [];
  const verifyBodies: unknown[] = [];
  const completeBodies: Array<Record<string, unknown>> = [];

  await page.route("**/api/auth/register/send-otp/", async (route) => {
    sendBodies.push(route.request().postDataJSON());
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ detail: "sent", expires_in: 300, resend_after: 60 }) });
  });
  await page.route("**/api/auth/register/verify-otp/", async (route) => {
    verifyBodies.push(route.request().postDataJSON());
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ detail: "verified", registration_token: "signed-registration-proof", expires_in: 600 }) });
  });
  await page.route("**/api/auth/register/complete/", async (route) => {
    completeBodies.push(route.request().postDataJSON() as Record<string, unknown>);
    await route.fulfill({ status: 201, contentType: "application/json", body: JSON.stringify({
      detail: "ok", user: { id: 17, phone: "+989123456789", username: "habitree123", full_name: "کاربر آزمایشی" },
      access: "access-token-not-stored",
    }) });
  });

  await page.goto("/register");
  const phone = page.getByLabel("شماره موبایل", { exact: true });
  await page.getByRole("button", { name: "ارسال کد تأیید" }).click();
  await expect(page.getByRole("alert")).toHaveText("شماره موبایل را وارد کن.");
  await phone.fill("123");
  await page.getByRole("button", { name: "ارسال کد تأیید" }).click();
  await expect(page.getByRole("alert")).toContainText("شماره موبایل معتبر نیست");
  expect(sendBodies).toEqual([]);

  await phone.fill("۰۹۱۲۳۴۵۶۷۸۹");
  await page.getByRole("button", { name: "ارسال کد تأیید" }).click();
  await expect(page).toHaveURL(/\/register\/verify-code$/);
  expect(sendBodies).toEqual([{ phone: "09123456789" }]);
  expect(verifyBodies).toEqual([]);

  const otpInput = page.getByRole("textbox", { name: "رقم 1 کد پیامکی" });
  await otpInput.fill("123");
  expect(verifyBodies).toEqual([]);
  await otpInput.fill("072617");
  await expect(page).toHaveURL(/\/register\/details$/);
  expect(verifyBodies).toEqual([{ phone: "09123456789", code: "072617" }]);
  expect(completeBodies).toEqual([]);

  await completeDetails(page);
  await page.getByRole("button", { name: "ساخت حساب کاربری" }).click();
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole("status")).toHaveText("ثبت‌نام با موفقیت انجام شد؛ حالا وارد حساب کاربری‌ات شو.");
  expect(completeBodies).toHaveLength(1);
  expect(completeBodies[0]).toMatchObject({
    registration_token: "signed-registration-proof",
    username: "habitree123", full_name: "کاربر آزمایشی",
    password: "habitree123", confirm_password: "habitree123", locale: "fa-IR", terms_accepted: true,
  });
  expect(completeBodies[0]).not.toHaveProperty("code");
  expect(completeBodies[0]).not.toHaveProperty("phone");
  expect(String(completeBodies[0].timezone).length).toBeGreaterThan(0);
  expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }))).toEqual({ local: 0, session: 0 });
});

test("a registered phone is reported using the backend's 409 response", async ({ page }) => {
  test.skip(simulated, "The explicit local mock does not make API requests.");

  await page.route("**/api/auth/register/send-otp/", async (route) => {
    await route.fulfill({
      status: 409,
      contentType: "application/json",
      body: JSON.stringify({ detail: "Phone number already registered." }),
    });
  });

  await page.goto("/register");
  await page.getByLabel("شماره موبایل", { exact: true }).fill("09123456789");
  await page.getByRole("button", { name: "ارسال کد تأیید" }).click();

  await expect(page).toHaveURL(/\/register$/);
  await expect(page.getByRole("alert")).toContainText("این شماره موبایل قبلاً ثبت شده است");
});

test("wrong OTP never reaches details; retry succeeds only after server approval", async ({ page }) => {
  test.skip(simulated, "Real API contract test does not apply to the local simulation.");
  let otpAttempt = 0;
  const completed: unknown[] = [];
  await page.route("**/api/auth/register/send-otp/", async (route) => {
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ detail: "sent", expires_in: 300, resend_after: 60 }) });
  });
  await page.route("**/api/auth/register/verify-otp/", async (route) => {
    otpAttempt++;
    if (otpAttempt === 1) {
      await route.fulfill({ status: 400, contentType: "application/json", body: JSON.stringify({ detail: "Invalid OTP." }) });
      return;
    }
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ detail: "verified", registration_token: "verified-proof", expires_in: 600 }) });
  });
  await page.route("**/api/auth/register/complete/", async (route) => {
    completed.push(route.request().postDataJSON());
    await route.fulfill({ status: 201, contentType: "application/json", body: JSON.stringify({
      user: { id: 18, phone: "+989123456789", username: "habitree123", full_name: "کاربر آزمایشی" }, access: "short-access",
    }) });
  });
  await page.goto("/register");
  await page.getByLabel("شماره موبایل", { exact: true }).fill("09123456789");
  await page.getByRole("button", { name: "ارسال کد تأیید" }).click();
  await page.getByRole("textbox", { name: "رقم 1 کد پیامکی" }).fill("111111");
  await expect(page.getByRole("alert")).toContainText("کد تأیید اشتباه");
  expect(completed).toHaveLength(0);
  await page.getByRole("textbox", { name: "رقم 1 کد پیامکی" }).fill("072617");
  await expect(page).toHaveURL(/\/register\/details$/);
  await completeDetails(page);
  await page.getByRole("button", { name: "ساخت حساب کاربری" }).click();
  await expect(page).toHaveURL(/\/login$/);
  expect(otpAttempt).toBe(2);
  expect(completed).toHaveLength(1);
});

test("server rejects invalid registration token without creating an account", async ({ page }) => {
  test.skip(simulated, "Real API contract test does not apply to the local simulation.");
  await page.route("**/api/auth/register/send-otp/", async (route) => route.fulfill({
    status: 200, contentType: "application/json", body: JSON.stringify({ detail: "sent", expires_in: 300, resend_after: 60 }),
  }));
  await page.route("**/api/auth/register/verify-otp/", async (route) => route.fulfill({
    status: 200, contentType: "application/json", body: JSON.stringify({ registration_token: "expired", expires_in: 600 }),
  }));
  await page.route("**/api/auth/register/complete/", async (route) => route.fulfill({
    status: 400, contentType: "application/json", body: JSON.stringify({ detail: "توکن ثبت‌نام نامعتبر است یا منقضی شده است." }),
  }));
  await page.goto("/register");
  await page.getByLabel("شماره موبایل", { exact: true }).fill("09123456789");
  await page.getByRole("button", { name: "ارسال کد تأیید" }).click();
  await page.getByRole("textbox", { name: "رقم 1 کد پیامکی" }).fill("123456");
  await expect(page).toHaveURL(/\/register\/details$/);
  await completeDetails(page);
  await page.getByRole("button", { name: "ساخت حساب کاربری" }).click();
  await expect(page).toHaveURL(/\/register\/details$/);
  await expect(page.getByRole("alert")).toContainText("مهلت تکمیل ثبت‌نام");
  await page.getByRole("button", { name: "دریافت کد تأیید جدید" }).click();
  await expect(page).toHaveURL(/\/register$/);
});


test("registration OTP uses backend expiry and resend deadlines and blocks expired codes", async ({ page }) => {
  test.skip(simulated, "This API timing contract test does not apply to the local simulation.");
  await page.clock.install();

  let sendCount = 0;
  let verifyCount = 0;
  await page.route("**/api/auth/register/send-otp/", async (route) => {
    sendCount++;
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        detail: "sent",
        expires_in: sendCount === 1 ? 2 : 300,
        resend_after: sendCount === 1 ? 1 : 0,
      }),
    });
  });
  await page.route("**/api/auth/register/verify-otp/", async (route) => {
    verifyCount++;
    await route.fulfill({
      status: 400,
      contentType: "application/json",
      body: JSON.stringify({ detail: "Invalid OTP." }),
    });
  });

  await page.goto("/register");
  await page.getByLabel("شماره موبایل", { exact: true }).fill("09123456789");
  await page.getByRole("button", { name: "ارسال کد تأیید" }).click();
  await expect(page).toHaveURL(/\/register\/verify-code$/);

  const resend = page.getByRole("button", { name: /ارسال مجدد کد/ });
  await expect(resend).toBeDisabled();
  await expect(page.getByRole("timer")).toContainText("۰۰:۰۲");

  await page.clock.fastForward(1100);
  await expect(resend).toBeEnabled();
  await page.clock.fastForward(1000);
  await expect(page.getByRole("timer")).toContainText("زمان اعتبار کد تمام شد");
  await expect(page.getByRole("button", { name: "ادامه و تکمیل اطلاعات" })).toBeDisabled();
  await expect(page.getByRole("textbox", { name: "رقم 1 کد پیامکی" })).toHaveAttribute("readonly", "");
  expect(verifyCount).toBe(0);

  await resend.click();
  await expect.poll(() => sendCount).toBe(2);
  await expect(page.getByRole("timer")).toContainText("۰۵:۰۰");
  await expect(resend).toBeEnabled();
});

test("direct registration stage URLs cannot bypass phone or OTP collection", async ({ page }) => {
  for (const route of ["/register/verify-code", "/register/details"]) {
    await page.goto(route);
    await expect(page).toHaveURL(/\/register$/);
  }
});

test("registration form stays within the viewport at common breakpoints", async ({ page }) => {
  test.skip(simulated, "Layout test also runs in the mock suite below.");
  await page.route("**/api/auth/register/send-otp/", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ detail: "OTP sent", expires_in: 300, resend_after: 60 }),
    });
  });

  for (const viewport of [
    { width: 1440, height: 1000 },
    { width: 1024, height: 768 },
    { width: 768, height: 1024 },
    { width: 390, height: 844 },
    { width: 320, height: 568 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/register");
    const form = page.getByRole("form", { name: "رشدت را شروع کن" });
    const box = await form.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeLessThanOrEqual(440);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
});

test.describe("explicit local registration simulation", () => {
  test.skip(!simulated, "Set VITE_ENABLE_AUTH_REGISTRATION_MOCK=true only for local UI testing.");

  test("registration details fit standard desktop heights without page scrolling", async ({ page }) => {
    for (const viewport of [
      { width: 1440, height: 900 },
      { width: 1366, height: 768 },
      { width: 1024, height: 768 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto("/register");
      await page.getByLabel("شماره موبایل", { exact: true }).fill("09123456789");
      await page.getByRole("button", { name: "ارسال کد تأیید" }).click();
      await expect(page).toHaveURL(/\/register\/verify-code$/);
      await page.getByRole("textbox", { name: "رقم 1 کد پیامکی" }).fill("123456");
      await expect(page).toHaveURL(/\/register\/details$/);
      await page.evaluate(() => document.fonts.ready);
      const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
      expect(pageHeight).toBeLessThanOrEqual(viewport.height + 1);
      await expect(page.getByRole("heading", { name: "رشدت را شروع کن" })).toBeVisible();
    }
  });

  test("completes the three visual stages without sending SMS or creating a real account", async ({ page }) => {
    const apiRequests: string[] = [];
    page.on("request", (request) => {
      if (new URL(request.url()).pathname.startsWith("/api")) apiRequests.push(request.url());
    });

    await page.goto("/register");
    await expect(page.getByRole("note")).toContainText("پیامک واقعی ارسال نمی‌شود");
    await page.getByLabel("شماره موبایل", { exact: true }).fill("09123456789");
    await page.getByRole("button", { name: "ارسال کد تأیید" }).click();
    await expect(page).toHaveURL(/\/register\/verify-code$/);

    await page.getByRole("textbox", { name: "رقم 1 کد پیامکی" }).fill("123456");
    await expect(page).toHaveURL(/\/register\/details$/);

    await completeDetails(page);
    await page.getByRole("button", { name: "ساخت حساب کاربری" }).click();
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole("status")).toHaveText("حالت آزمایشی تمام شد؛ حساب کاربری واقعی ساخته نشد.");
    expect(apiRequests).toEqual([]);
    expect(await page.evaluate(() => ({
      local: localStorage.length,
      session: sessionStorage.length,
    }))).toEqual({ local: 0, session: 0 });
  });
});
