import { expect, test } from '@playwright/test';

/** Browser-level acceptance tests for the mock-only My Habits feature. */
test.describe('My Habits — mock user flows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/my-habits');
    await expect(page.getByRole('heading', { name: 'عادت‌های من', level: 1 })).toBeVisible();
  });

  test('opens the route and exposes an accessible list of habits', async ({ page }) => {
    await expect(page.locator('.habits-page main h1')).toHaveCount(1);
    await expect(page.getByTestId('habit-card')).toHaveCount(5);
    await expect(page.getByRole('searchbox', { name: 'جست‌وجوی عادت' })).toBeVisible();
    await expect(page.getByRole('group', { name: 'فیلتر وضعیت عادت‌ها' })).toBeVisible();
    // Feature scope: no unrequested sidebar or check-in form; actions start closed.
    await expect(page.locator('.habits-page .sidebar')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'ثبت عملکرد' })).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'ویرایش عادت' })).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'حذف عادت' })).toHaveCount(0);
  });

  test('searches, filters by status and shows an empty-result message', async ({ page }) => {
    const search = page.getByRole('searchbox', { name: 'جست‌وجوی عادت' });
    const cards = page.getByTestId('habit-card');
    await search.fill('ورزش');
    await expect(cards).toHaveCount(1);
    await expect(cards.first()).toContainText('ورزش صبحگاهی');

    await search.fill('');
    await page.getByRole('button', { name: /تکمیل‌شده/ }).click();
    await expect(cards).toHaveCount(1);
    await expect(cards.first()).toContainText('مطالعه روزانه');

    await page.getByRole('button', { name: /همه/ }).click();
    await search.fill('نام غیرموجود');
    await expect(cards).toHaveCount(0);
    await expect(page.getByRole('status').filter({ hasText: 'عادتی مطابق جست‌وجو' })).toBeVisible();
  });

  test('sorts mock habits and keeps pagination controls safe at the last page', async ({ page }) => {
    const sort = page.getByRole('button', { name: 'مرتب‌سازی قدیمی‌ترین' });
    await page.getByRole('button', { name: 'مرتب‌سازی جدیدترین' }).click();
    await expect(page.getByRole('listbox', { name: 'مرتب‌سازی' })).toBeVisible();
    await page.getByRole('option', { name: 'قدیمی‌ترین' }).click();
    await expect(sort).toBeVisible();
    await expect(page.getByTestId('habit-card').first()).toContainText('خواب منظم');
    await expect(page.getByRole('button', { name: 'بعدی' })).toBeDisabled();
    await expect(page.getByRole('button', { name: 'قبلی' })).toBeDisabled();
  });

  test('dismisses action menus and confirms or cancels mock deletion in an accessible modal', async ({ page }) => {
    const cards = page.getByTestId('habit-card');
    const study = cards.filter({ hasText: 'مطالعه روزانه' });
    const deleteAction = study.getByRole('button', { name: 'حذف عادت' });
    const openMenu = async () => {
      await study.getByRole('button', { name: 'عملیات مطالعه روزانه' }).first().click();
      await expect(deleteAction).toBeVisible();
      // Icon-only actions retain accessible names without extra visible captions.
      await expect(deleteAction).toHaveText('');
    };

    await openMenu();
    // Clicking anywhere outside the active trigger/popup must dismiss its actions.
    await page.getByRole('heading', { name: 'عادت‌های من', level: 1 }).click();
    await expect(deleteAction).toHaveCount(0);

    await openMenu();
    // Clicking the body of the same card also counts as outside the popup.
    await study.locator('.desktop-identity strong').click();
    await expect(deleteAction).toHaveCount(0);

    await openMenu();
    // Focusing a control outside via keyboard also dismisses the popup.
    await page.getByRole('searchbox', { name: 'جست‌وجوی عادت' }).focus();
    await expect(deleteAction).toHaveCount(0);

    await openMenu();
    await page.keyboard.press('Escape');
    await expect(deleteAction).toHaveCount(0);

    await openMenu();
    // Opening a different card's popup must close this card's popup.
    const other = cards.filter({ hasText: 'ورزش صبحگاهی' });
    await other.getByRole('button', { name: 'عملیات ورزش صبحگاهی' }).first().click();
    await expect(deleteAction).toHaveCount(0);
    await expect(other.getByRole('button', { name: 'حذف عادت' })).toBeVisible();
    await page.getByRole('heading', { name: 'عادت‌های من', level: 1 }).click();

    await openMenu();
    let browserDialogOpened = false;
    page.on('dialog', (dialog) => { browserDialogOpened = true; void dialog.dismiss(); });
    await deleteAction.click();
    const confirmation = page.getByRole('dialog', { name: 'حذف عادت' });
    await expect(confirmation).toBeVisible();
    await expect(confirmation).toContainText('مطالعه روزانه');
    await expect(cards).toHaveCount(5);
    await confirmation.getByRole('button', { name: 'انصراف' }).click();
    await expect(confirmation).toHaveCount(0);
    await expect(cards).toHaveCount(5);

    await openMenu();
    await deleteAction.click();
    await page.keyboard.press('Escape');
    await expect(confirmation).toHaveCount(0);
    await expect(cards).toHaveCount(5);

    await openMenu();
    await deleteAction.click();
    await confirmation.getByRole('button', { name: 'بله، حذف شود' }).click();
    await expect(confirmation).toHaveCount(0);
    await expect(cards).toHaveCount(4);
    expect(browserDialogOpened).toBe(false);
    await expect(cards.filter({ hasText: 'مطالعه روزانه' })).toHaveCount(0);
  });

  test('sort popup highlights only the hovered option, not both choices', async ({ page }) => {
    await page.getByRole('button', { name: 'مرتب‌سازی جدیدترین' }).click();
    const newest = page.getByRole('option', { name: 'جدیدترین' });
    const oldest = page.getByRole('option', { name: 'قدیمی‌ترین' });
    await expect(newest).toHaveAttribute('aria-selected', 'true');
    const unhighlighted = await newest.evaluate((element) => getComputedStyle(element).backgroundColor);
    await oldest.hover();
    const highlighted = await oldest.evaluate((element) => getComputedStyle(element).backgroundColor);
    await expect(newest).toHaveCSS('background-color', unhighlighted);
    expect(highlighted).not.toBe(unhighlighted);
    await newest.hover();
    await expect(oldest).toHaveCSS('background-color', unhighlighted);
    await expect(newest).toHaveCSS('background-color', highlighted);
  });

  test('styled sorting popup supports Escape and keyboard navigation', async ({ page }) => {
    const trigger = page.getByRole('button', { name: 'مرتب‌سازی جدیدترین' });
    await trigger.focus();
    await page.keyboard.press('ArrowDown');
    await expect(page.getByRole('listbox', { name: 'مرتب‌سازی' })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('listbox', { name: 'مرتب‌سازی' })).toHaveCount(0);
    await trigger.click();
    await page.getByRole('heading', { name: 'عادت‌های من', level: 1 }).click();
    await expect(page.getByRole('listbox', { name: 'مرتب‌سازی' })).toHaveCount(0);
  });

  test('opens icon-only edit, validates inputs and updates mock data', async ({ page }) => {
    const card = page.getByTestId('habit-card').filter({ hasText: 'مطالعه روزانه' });
    await card.getByRole('button', { name: 'عملیات مطالعه روزانه' }).first().click();
    const editAction = card.getByRole('button', { name: 'ویرایش عادت' });
    await expect(editAction).toBeVisible();
    await expect(editAction).toHaveText('');
    await editAction.click();
    const dialog = page.getByRole('dialog', { name: 'ویرایش عادت' });
    await expect(dialog).toBeVisible();
    const title = dialog.getByRole('textbox', { name: 'نام عادت' });
    await title.focus();
    await expect(title).toHaveCSS('outline-style', 'none');
    await title.fill('تغییر موقت');
    await dialog.getByRole('button', { name: 'انصراف' }).click();
    await expect(dialog).toHaveCount(0);
    await expect(page.getByTestId('habit-card').filter({ hasText: 'مطالعه روزانه' })).toHaveCount(1);
    await card.getByRole('button', { name: 'عملیات مطالعه روزانه' }).first().click();
    await card.getByRole('button', { name: 'ویرایش عادت' }).click();
    await expect(dialog).toBeVisible();
    await title.fill('x');
    await dialog.getByRole('button', { name: 'ذخیره تغییرات' }).click();
    await expect(dialog.getByRole('alert')).toContainText('حداقل ۲ حرف');
    await title.fill('مطالعه شبانه');
    await dialog.getByRole('textbox', { name: 'توضیح کوتاه' }).fill('مطالعه قبل از خواب');
    await dialog.getByRole('button', { name: 'ذخیره تغییرات' }).click();
    await expect(dialog).toHaveCount(0);
    await expect(page.getByTestId('habit-card').filter({ hasText: 'مطالعه شبانه' })).toContainText('مطالعه قبل از خواب');
  });

  test('renders the three original plant species with loaded images', async ({ page }) => {
    // Only the three user-supplied plant illustrations are essential visual assets.
    // Responsive overflow and layout are already checked in the viewport tests below.
    // Avoid asserting Vite-generated filename hashes or every decorative SVG icon.
    const representativePlants = [
      { habit: 'نوشیدن آب', species: 'bluebell' },
      { habit: 'مطالعه روزانه', species: 'lavender' },
      { habit: 'ورزش صبحگاهی', species: 'daisy' },
    ];

    for (const { habit, species } of representativePlants) {
      const image = page.getByTestId('habit-card')
        .filter({ hasText: habit })
        .locator('picture.plant img');
      await expect(image).toHaveCount(1);
      await image.scrollIntoViewIfNeeded();
      await expect.poll(async () => image.evaluate((element) => {
        const img = element as HTMLImageElement;
        return img.complete && img.naturalWidth > 0 && img.naturalHeight > 0;
      }), { message: `Plant image must load for ${habit}` }).toBe(true);
      await expect(image).toHaveAttribute('src', new RegExp(species, 'i'));
    }
  });

  for (const { label, width } of [
    { label: 'mobile', width: 390 },
    { label: 'tablet', width: 768 },
    { label: 'desktop', width: 1440 },
  ]) {
    test(`works at ${label} viewport without horizontal overflow`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await expect(page.getByTestId('habit-card')).toHaveCount(5);
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(scrollWidth).toBeLessThanOrEqual(width);
      await expect(page.getByRole('heading', { name: 'عادت‌های من', level: 1 })).toBeVisible();
    });
  }
});
