import { test, expect } from "@playwright/test";

test("Habitree home page loads", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /باغچه من/ })).toBeVisible();
});
