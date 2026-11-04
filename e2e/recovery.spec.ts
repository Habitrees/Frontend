import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

const simulated = process.env.VITE_ENABLE_AUTH_RECOVERY_MOCK === "true"
  && process.env.RECOVERY_TEST_MODE !== "production";

async function requestCode(page: Page) {
  await page.goto("/forgot-password");
  await page.getByLabel("شماره موبایل", { exact: true }).fill("۰۹۱۲۳۴۵۶۷۸۹");
  await page.getByRole("button", { name: "دریافت کد ورود پیامکی", exact: true }).click();
  await expect(page).toHaveURL(/\/verify-reset-code$/);
}

async function enterCode(page: Page, code = "123456") {
  await page.getByRole("textbox", { name: "رقم 1 کد پیامکی", exact: true }).fill(code);
  await page.getByRole("button", { name: "تایید و ادامه", exact: true }).click();
  await expect(page).toHaveURL(/\/reset-password$/);
}

test("forgot link connects Login 1 to recovery; phone validates and registration remains", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("link", { name: "رمزت رو فراموش کردی؟", exact: true }).click();
  await expect(page).toHaveURL(/\/forgot-password$/);
  await page.getByRole("button", { name: "دریافت کد ورود پیامکی", exact: true }).click();
  const mobile = page.getByLabel("شماره موبایل", { exact: true });
  await expect(mobile).toBeFocused();
  await expect(page.getByRole("alert")).toHaveText("شماره موبایل را وارد کن.");
  await mobile.fill("123");
  await page.getByRole("button", { name: "دریافت کد ورود پیامکی", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("شماره موبایل معتبر نیست");
  await page.getByRole("button", { name: "ثبت‌نام کن", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("ثبت‌نام هنوز فعال نشده است.");
});

test("refresh and direct links cannot bypass recovery stages", async ({ page }) => {
  for (const route of ["/verify-reset-code", "/reset-password"]) {
    await page.goto(route);
    await expect(page).toHaveURL(/\/forgot-password$/);
  }
});

test("without an enabled development adapter no SMS is simulated or requested", async ({ page }) => {
  test.skip(simulated, "This verifies the default-off and production gates.");
  const requests: string[] = [];
  page.on("request", (request) => { if (new URL(request.url()).pathname.startsWith("/api")) requests.push(request.url()); });
  await page.goto("/forgot-password");
  await expect(page.getByRole("note")).toHaveCount(0);
  await page.getByLabel("شماره موبایل", { exact: true }).fill("09123456789");
  await page.getByRole("button", { name: "دریافت کد ورود پیامکی", exact: true }).click();
  await expect(page.getByRole("alert")).toHaveText("بازیابی رمز عبور هنوز فعال نشده؛ لطفاً کمی بعد دوباره تلاش کن.");
  await expect(page).toHaveURL(/\/forgot-password$/);
  expect(requests).toEqual([]);
  await page.screenshot({ path: "test-results/recovery-disabled.png", fullPage: true });
});

test.describe("explicit development simulation", () => {
  test.skip(!simulated, "Set VITE_ENABLE_AUTH_RECOVERY_MOCK=true in development to test the simulation.");

  test("complete flow, loading, invalid code, password validation and no persistence", async ({ page }) => {
    const requests: string[] = [];
    const errors: string[] = [];
    page.on("request", (request) => { if (new URL(request.url()).pathname.startsWith("/api")) requests.push(request.url()); });
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/forgot-password");
    await expect(page.getByRole("note")).toContainText("پیامکی ارسال نمی‌شود");
    await page.getByLabel("شماره موبایل", { exact: true }).fill("٠٩١٢٣٤٥٦٧٨٩");
    await page.getByRole("button", { name: "دریافت کد ورود پیامکی", exact: true }).click();
    await expect(page.getByRole("button", { name: "در حال بررسی…", exact: true })).toBeDisabled();
    await expect(page).toHaveURL(/\/verify-reset-code$/);
    await expect(page.getByRole("textbox", { name: "رقم 1 کد پیامکی", exact: true })).toBeFocused();
    await page.getByRole("button", { name: "تایید و ادامه", exact: true }).click();
    await expect(page.getByRole("alert")).toHaveText("کد شش‌رقمی را کامل وارد کن.");
    const first = page.getByRole("textbox", { name: "رقم 1 کد پیامکی", exact: true });
    await first.fill("654321");
    await page.getByRole("button", { name: "تایید و ادامه", exact: true }).click();
    await expect(page.getByRole("alert")).toHaveText("کد آزمایشی درست نیست؛ کد ۱۲۳۴۵۶ را وارد کن.");
    await enterCode(page, "۱۲۳۴۵۶");
    const password = page.getByLabel("رمز عبور جدید", { exact: true });
    const confirmation = page.getByLabel("تکرار رمز عبور جدید", { exact: true });
    await page.getByRole("button", { name: "ورود به habitree", exact: true }).click();
    await expect(page.getByText("رمز عبور جدید را وارد کن.", { exact: true })).toBeVisible();
    await expect(password).toBeFocused();
    await password.fill("short");
    await confirmation.fill("different-password");
    await page.getByRole("button", { name: "ورود به habitree", exact: true }).click();
    await expect(page.getByText("رمز عبور جدید باید حداقل ۸ نویسه باشد.", { exact: true })).toBeVisible();
    await expect(page.getByText("رمزهای عبور یکسان نیستند.", { exact: true })).toBeVisible();
    await password.fill("new-example-password");
    await page.getByRole("button", { name: "نمایش رمز عبور جدید", exact: true }).click();
    await expect(password).toHaveAttribute("type", "text");
    await expect(confirmation).toHaveAttribute("type", "password");
    await page.getByRole("button", { name: "نمایش تکرار رمز عبور جدید", exact: true }).click();
    await expect(confirmation).toHaveAttribute("type", "text");
    await page.getByRole("button", { name: "پنهان کردن رمز عبور جدید", exact: true }).click();
    await expect(password).toHaveAttribute("type", "password");
    await confirmation.fill("new-example-password");
    await page.getByRole("button", { name: "ورود به habitree", exact: true }).click();
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole("status")).toHaveText("آزمایش بازیابی تمام شد؛ هیچ رمز واقعی تغییر نکرده است.");
    await expect(page.getByLabel("رمز عبور", { exact: true })).toHaveValue("");
    expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }))).toEqual({ local: 0, session: 0 });
    expect(requests).toEqual([]);
    expect(errors).toEqual([]);
  });

  test("OTP focus, backspace, arrows, Persian paste, and completion", async ({ page }) => {
    await requestCode(page);
    const inputs = page.getByRole("textbox");
    await inputs.nth(0).press("1");
    await expect(inputs.nth(1)).toBeFocused();
    await inputs.nth(1).press("2");
    await expect(inputs.nth(2)).toBeFocused();
    await inputs.nth(2).press("Backspace");
    await expect(inputs.nth(1)).toBeFocused();
    await expect(inputs.nth(1)).toHaveValue("");
    await inputs.nth(1).press("ArrowLeft");
    await expect(inputs.nth(0)).toBeFocused();
    await inputs.nth(0).press("ArrowRight");
    await expect(inputs.nth(1)).toBeFocused();
    await inputs.nth(1).press("End");
    await expect(inputs.nth(5)).toBeFocused();
    await inputs.nth(5).press("Home");
    await expect(inputs.nth(0)).toBeFocused();
    // Exercise the actual paste handler with clipboard text (including localized numerals).
    await inputs.nth(2).evaluate((input) => {
      const clipboard = new DataTransfer();
      clipboard.setData("text", "۱۲۳۴۵۶");
      input.dispatchEvent(new ClipboardEvent("paste", { bubbles: true, clipboardData: clipboard }));
    });
    for (let index = 0; index < 6; index++) await expect(inputs.nth(index)).toHaveValue(String(index + 1));
    await expect(inputs.nth(5)).toBeFocused();
    await page.getByRole("button", { name: "تایید و ادامه", exact: true }).click();
    await expect(page).toHaveURL(/\/reset-password$/);
  });

  test("refresh discards the challenge and verification grant", async ({ page }) => {
    await requestCode(page);
    await page.reload();
    await expect(page).toHaveURL(/\/forgot-password$/);
    await requestCode(page);
    await enterCode(page);
    await page.reload();
    await expect(page).toHaveURL(/\/forgot-password$/);
  });

  for (const viewport of [
    { name: "desktop", width: 1440, height: 1000 },
    { name: "laptop", width: 1280, height: 800 },
    { name: "tablet", width: 768, height: 1024 },
    { name: "mobile", width: 390, height: 844 },
    { name: "small-mobile", width: 360, height: 740 },
  ]) {
    test(`all authentication pages fit ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      async function checkAndCapture(name: string) {
        await page.evaluate(() => document.fonts.ready);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        const form = page.getByRole("form");
        await expect(form).toBeVisible();
        const box = await form.boundingBox();
        expect(box!.width).toBeLessThanOrEqual(440);
        expect(box!.x).toBeGreaterThanOrEqual(20);
        expect(box!.x + box!.width).toBeLessThanOrEqual(viewport.width - 20);
        expect(await form.evaluate((element) => getComputedStyle(element).direction)).toBe("rtl");
        if (viewport.width >= 1024) await expect(page.locator(".botanical-panel")).toBeVisible();
        else await expect(page.locator(".botanical-panel")).toBeHidden();
        await page.screenshot({ path: `test-results/${name}-${viewport.name}.png`, fullPage: true });
      }
      await page.goto("/login");
      await checkAndCapture("auth-login");
      await page.getByRole("link", { name: "رمزت رو فراموش کردی؟", exact: true }).click();
      await checkAndCapture("auth-forgot");
      await page.getByLabel("شماره موبایل", { exact: true }).fill("09123456789");
      await page.getByRole("button", { name: "دریافت کد ورود پیامکی", exact: true }).click();
      await expect(page).toHaveURL(/\/verify-reset-code$/);
      await checkAndCapture("auth-otp");
      const otpBoxes = await page.getByRole("textbox").all();
      for (const input of otpBoxes) {
        const box = await input.boundingBox();
        expect(box!.width).toBeGreaterThanOrEqual(40);
        expect(box!.height).toBe(54);
      }
      await enterCode(page);
      await checkAndCapture("auth-reset");
    });
  }
});
