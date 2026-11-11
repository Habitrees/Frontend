import { test, expect } from "@playwright/test";

test("login validates required fields and focuses the first invalid input", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("button", { name: "ورود به habitree", exact: true }).click();
  await expect(page.getByText("شماره موبایل را وارد کن.", { exact: true })).toBeVisible();
  await expect(page.getByText("رمز عبور را وارد کن.", { exact: true })).toBeVisible();
  await expect(page.getByLabel("شماره موبایل", { exact: true })).toBeFocused();
  await expect(page.getByLabel("شماره موبایل", { exact: true })).toHaveAttribute("aria-invalid", "true");
});

test("login normalizes phone, posts to Django and stores no JWT in web storage", async ({ page }) => {
  const loginBodies: unknown[] = [];
  await page.route("**/api/auth/login/", async (route) => {
    loginBodies.push(route.request().postDataJSON());
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({
      detail: "ok", user: { id: 17, phone: "+989123456789", username: "habitree123", full_name: "کاربر آزمایشی" },
      access: "mock-access-for-test-only",
    }) });
  });
  await page.goto("/login");
  const phone = page.getByLabel("شماره موبایل", { exact: true });
  await phone.fill("123");
  await page.getByLabel("رمز عبور", { exact: true }).fill("some-password");
  await page.getByRole("button", { name: "ورود به habitree", exact: true }).click();
  await expect(page.getByText(/شماره موبایل معتبر نیست/)).toBeVisible();
  expect(loginBodies).toEqual([]);

  await phone.fill("۰۹۱۲۳۴۵۶۷۸۹");
  await page.getByRole("button", { name: "ورود به habitree", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("ورود انجام شد.");
  expect(loginBodies).toEqual([{ phone: "09123456789", password: "some-password" }]);
  expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }))).toEqual({ local: 0, session: 0 });
});

test("login handles wrong credentials and rate limiting without false success", async ({ page }) => {
  let requests = 0;
  await page.route("**/api/auth/login/", async (route) => {
    requests++;
    await route.fulfill({
      status: requests === 1 ? 400 : 429, contentType: "application/json", body: JSON.stringify({ detail: "error" }),
    });
  });
  await page.goto("/login");
  await page.getByLabel("شماره موبایل", { exact: true }).fill("09123456789");
  await page.getByLabel("رمز عبور", { exact: true }).fill("incorrect-password");
  await page.getByRole("button", { name: "ورود به habitree", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("شماره موبایل یا رمز عبور صحیح نیست");
  await page.getByRole("button", { name: "ورود به habitree", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("تعداد تلاش‌های ورود");
  await expect(page.getByRole("status")).toHaveCount(0);
});

test("password visibility, remember preference, and registration notice are accessible", async ({ page }) => {
  await page.goto("/login");
  const password = page.getByLabel("رمز عبور", { exact: true });
  await password.fill("private-password");
  await expect(password).toHaveAttribute("type", "password");
  await page.getByRole("button", { name: "نمایش رمز عبور", exact: true }).click();
  await expect(password).toHaveAttribute("type", "text");
  await expect(page.getByRole("button", { name: "پنهان کردن رمز عبور", exact: true })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "پنهان کردن رمز عبور", exact: true }).click();
  await expect(password).toHaveAttribute("type", "password");
  const remember = page.getByRole("checkbox", { name: "مرا به خاطر بسپار (به‌زودی)" });
  await expect(remember).toBeDisabled();
  await expect(remember).not.toBeChecked();
  await page.getByRole("link", { name: "ثبت‌نام کن", exact: true }).click();
  await expect(page).toHaveURL(/\/register$/);
  expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }))).toEqual({ local: 0, session: 0 });
});

test("login links return to the preserved home route", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("link", { name: "بازگشت به سایت" }).click();
  await expect(page.getByRole("heading", { name: /باغچه من/ })).toBeVisible();
});

for (const viewport of [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "small-desktop", width: 1024, height: 768 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
  { name: "small-mobile", width: 320, height: 568 },
  { name: "landscape", width: 844, height: 390 },
]) {
  test(`login layout fits ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/login");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const form = page.getByRole("form", { name: "خوش اومدی، منتظرت بودیم !" });
    const formBox = await form.boundingBox();
    expect(formBox).not.toBeNull();
    expect(formBox!.width).toBeLessThanOrEqual(440);
    expect(formBox!.x).toBeGreaterThanOrEqual(20);
    expect(formBox!.x + formBox!.width).toBeLessThanOrEqual(viewport.width - 20);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    // The botanical panel yields its space to the form below the desktop breakpoint.
    const panel = page.locator(".botanical-panel");
    if (viewport.width >= 1024) {
      await expect(panel).toBeVisible();
      expect(await page.locator(".botanical-art").evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    } else {
      await expect(panel).toBeHidden();
    }
    await page.screenshot({ path: `test-results/login-${viewport.name}.png`, fullPage: true });
  });
}


test("login text tokens meet normal-text contrast and fields expose required semantics", async ({ page }) => {
  await page.goto("/login");
  await expect(page.getByLabel("شماره موبایل", { exact: true })).toHaveAttribute("aria-required", "true");
  await expect(page.getByLabel("رمز عبور", { exact: true })).toHaveAttribute("aria-required", "true");
  const ratios = await page.evaluate(() => {
    const styles = getComputedStyle(document.documentElement);
    function luminance(token: string): number {
      const rawHex = styles.getPropertyValue(token).trim().replace("#", "");
      const hex = rawHex.length === 3 ? [...rawHex].map((digit) => digit + digit).join("") : rawHex;
      const channels = [0, 2, 4].map((offset) => parseInt(hex.slice(offset, offset + 2), 16) / 255)
        .map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
      return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
    }
    return [
      ["--login-muted", "--background"],
      ["--input-placeholder", "--input-surface"],
      ["--botanical-copy", "--botanical-start"],
      ["--botanical-copy", "--botanical-end"],
      ["--on-primary", "--login-primary"],
    ].map(([foreground, background]) => {
      const a = luminance(foreground);
      const b = luminance(background);
      return { foreground, background, ratio: (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05) };
    });
  });
  for (const { foreground, background, ratio } of ratios) {
    expect(ratio, `${foreground} on ${background}`).toBeGreaterThanOrEqual(4.5);
  }
});
