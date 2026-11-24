import { expect, test } from '@playwright/test';

test('home redirects to My Habits', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/my-habits$/);
  await expect(page.getByRole('heading', { name: 'عادت‌های من', level: 1 })).toBeVisible();
});
