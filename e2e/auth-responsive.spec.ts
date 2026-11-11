import { test, expect } from "@playwright/test";

const registrationMock = process.env.VITE_ENABLE_AUTH_REGISTRATION_MOCK === "true";
const recoveryMock = process.env.VITE_ENABLE_AUTH_RECOVERY_MOCK === "true";

const viewports = [
  { name: "small-mobile", width: 320, height: 568 },
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "small-desktop", width: 1024, height: 768 },
  { name: "desktop", width: 1440, height: 900 },
];

test("Login, Registration and Password Recovery remain usable without horizontal overflow", async ({ page }) => {
  test.skip(registrationMock || recoveryMock, "Responsive API-flow checks run with both real adapters and intercepted network responses.");

  await page.route("**/api/auth/register/send-otp/", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ detail: "sent", expires_in: 300, resend_after: 0 }),
    });
  });
  await page.route("**/api/auth/register/verify-otp/", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ detail: "verified", registration_token: "responsive-test-token", expires_in: 600 }),
    });
  });
  await page.route("**/api/auth/password-reset/send-otp/", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ detail: "ok", expires_in: 300, resend_after: 0 }),
    });
  });
  await page.route("**/api/auth/password-reset/verify-otp/", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ detail: "verified", reset_token: "responsive-reset-token", expires_in: 300 }),
    });
  });

  async function assertLayout(label: string) {
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const hasNoHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    );
    expect(hasNoHorizontalOverflow, `${label} should not overflow horizontally`).toBe(true);
    const panel = page.locator(".botanical-panel");
    if (page.viewportSize()!.width >= 1024) {
      await expect(panel).toBeVisible();
    } else {
      await expect(panel).toBeHidden();
    }
  }

  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    await page.goto("/login");
    await assertLayout(`Login at ${viewport.name}`);

    await page.goto("/register");
    await assertLayout(`Registration phone at ${viewport.name}`);
    await page.getByLabel("شماره موبایل", { exact: true }).fill("09123456789");
    await page.getByRole("button", { name: "ارسال کد تأیید" }).click();
    await expect(page).toHaveURL(/\/register\/verify-code$/);
    await assertLayout(`Registration OTP at ${viewport.name}`);
    await page.getByRole("textbox", { name: "رقم 1 کد پیامکی" }).fill("123456");
    await expect(page).toHaveURL(/\/register\/details$/);
    await assertLayout(`Registration details at ${viewport.name}`);

    await page.goto("/forgot-password");
    await assertLayout(`Recovery phone at ${viewport.name}`);
    await page.getByLabel("شماره موبایل", { exact: true }).fill("09123456789");
    await page.getByRole("button", { name: "دریافت کد ورود پیامکی", exact: true }).click();
    await expect(page).toHaveURL(/\/verify-reset-code$/);
    await assertLayout(`Recovery OTP at ${viewport.name}`);
    await page.getByRole("textbox", { name: "رقم 1 کد پیامکی" }).fill("123456");
    await expect(page).toHaveURL(/\/reset-password$/);
    await assertLayout(`Reset password at ${viewport.name}`);
  }
});
