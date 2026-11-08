import { test, expect } from "@playwright/test";

const simulated = process.env.VITE_ENABLE_AUTH_REGISTRATION_MOCK === "true";

test("registration validates the phone and never claims an unconfigured SMS was sent", async ({ page }) => {
  test.skip(simulated, "This verifies the default-off registration adapter.");
  const apiRequests: string[] = [];
  page.on("request", (request) => {
    if (new URL(request.url()).pathname.startsWith("/api")) apiRequests.push(request.url());
  });

  await page.goto("/register");
  await expect(page.getByRole("heading", { name: "رشدت را شروع کن" })).toBeVisible();
  await page.getByRole("button", { name: "دریافت کد ورود پیامکی" }).click();
  await expect(page.getByRole("alert")).toHaveText("شماره موبایل را وارد کن.");

  const mobile = page.getByLabel("شماره موبایل", { exact: true });
  await mobile.fill("123");
  await page.getByRole("button", { name: "دریافت کد ورود پیامکی" }).click();
  await expect(page.getByRole("alert")).toContainText("شماره موبایل معتبر نیست");

  await mobile.fill("۰۹۱۲۳۴۵۶۷۸۹");
  await page.getByRole("button", { name: "دریافت کد ورود پیامکی" }).click();
  await expect(page.getByRole("alert")).toHaveText("ثبت‌نام هنوز به سرویس بک‌اند متصل نشده است؛ لطفاً بعداً دوباره تلاش کن.");
  await expect(page).toHaveURL(/\/register$/);
  expect(apiRequests).toEqual([]);
});

test("direct registration stage URLs cannot bypass phone or OTP verification", async ({ page }) => {
  for (const route of ["/register/verify-code", "/register/details"]) {
    await page.goto(route);
    await expect(page).toHaveURL(/\/register$/);
  }
});

test("registration form stays within the viewport at common breakpoints", async ({ page }) => {
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
      await page.getByRole("button", { name: "دریافت کد ورود پیامکی" }).click();
      await expect(page).toHaveURL(/\/register\/verify-code$/);
      await page.getByRole("textbox", { name: "رقم 1 کد پیامکی" }).fill("123456");
      await page.getByRole("button", { name: "تایید و ادامه" }).click();
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
    await page.getByRole("button", { name: "دریافت کد ورود پیامکی" }).click();
    await expect(page).toHaveURL(/\/register\/verify-code$/);

    const firstOtp = page.getByRole("textbox", { name: "رقم 1 کد پیامکی" });
    await firstOtp.fill("654321");
    await page.getByRole("button", { name: "تایید و ادامه" }).click();
    await expect(page.getByRole("alert")).toContainText("کد واردشده صحیح نیست");
    await firstOtp.fill("123456");
    await page.getByRole("button", { name: "تایید و ادامه" }).click();
    await expect(page).toHaveURL(/\/register\/details$/);

    await page.getByLabel("نام و نام خانوادگی", { exact: true }).fill("کاربر آزمایشی");
    await page.getByLabel("شناسه کاربری", { exact: true }).fill("habitree123");

    const password = page.getByLabel("رمز عبور", { exact: true });
    const requirements = page.getByRole("list", { name: "قوانین رمز عبور" });
    await expect(requirements.getByRole("listitem")).toHaveCount(3);
    await password.fill("habitree");
    await expect(requirements.getByRole("listitem").nth(0)).toHaveClass(/text-reassurance/);
    await expect(requirements.getByRole("listitem").nth(1)).toHaveClass(/text-reassurance/);
    await expect(requirements.getByRole("listitem").nth(2)).toHaveClass(/text-login-muted/);
    await expect(requirements.getByRole("listitem").nth(0)).toHaveCSS("color", "rgb(23, 107, 58)");
    await password.fill("habitree123");
    for (const requirement of await requirements.getByRole("listitem").all()) {
      await expect(requirement).toHaveClass(/text-reassurance/);
    }
    await page.getByLabel("تکرار رمز عبور", { exact: true }).fill("habitree123");
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: "ساخت حساب کاربری" }).click();
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole("status")).toHaveText("حالت آزمایشی تمام شد؛ حساب کاربری واقعی ساخته نشد.");
    expect(apiRequests).toEqual([]);
    expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }))).toEqual({ local: 0, session: 0 });
  });
});
