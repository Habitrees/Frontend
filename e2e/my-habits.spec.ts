import { expect, test, type Page } from '@playwright/test';

const cards = (page: Page) => page.getByTestId('habit-card');
const card = (page: Page, title: string) => page.getByRole('article', { name: title, exact: true });
const tab = (page: Page, name: RegExp) => page.getByRole('group', { name: 'نمایش عادت‌ها' }).getByRole('button', { name });
const checkIn = (page: Page, title: string) => card(page, title).getByRole('button', { name: /ثبت انجام امروز/ });
const waterTitle = 'نوشیدن آب';

async function openAction(page: Page, title: string, action: 'ویرایش' | 'حذف') {
  const habit = card(page, title);
  await habit.getByRole('button', { name: `عملیات ${title}` }).click();
  await habit.getByRole('button', { name: `${action} ${title}` }).click();
}

test.describe('My Habits — user flows', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.clock.setFixedTime(new Date(2026, 10, 24, 12));
    await page.goto('/my-habits');
    await expect(page.getByRole('heading', { name: 'عادت‌های من', level: 1 })).toBeVisible();
    await expect(card(page, waterTitle)).toBeVisible();
  });

  test('shows due habits, upcoming habits and completed periods', async ({ page }) => {
    await expect(tab(page, /^امروز/)).toHaveAttribute('aria-pressed', 'true');
    await expect(card(page, 'چالش مطالعهٔ دوستان')).toBeVisible();
    await expect(card(page, 'ورزش صبحگاهی')).toHaveCount(0);
    await expect(card(page, 'چالش مراقبه')).toHaveCount(0);

    await tab(page, /^همه/).click();
    const exercise = card(page, 'ورزش صبحگاهی');
    await expect(exercise).toContainText('نوبت بعد');
    await expect(exercise).toContainText('موعد نرسیده');
    await expect(checkIn(page, 'ورزش صبحگاهی')).toHaveCount(0);
    await page.getByRole('button', { name: 'بعدی', exact: true }).click();
    await expect(card(page, 'چالش مراقبه')).toBeVisible();
    await expect(page.getByRole('button', { name: 'بعدی', exact: true })).toBeDisabled();
    await page.getByRole('button', { name: 'قبلی', exact: true }).click();
    await expect(exercise).toBeVisible();

    await tab(page, /^تکمیل‌شده/).click();
    await expect(card(page, 'چالش مراقبه')).toContainText('دوره تکمیل شد');
    await expect(card(page, 'مطالعهٔ روزانه')).toHaveCount(0);
    await expect(cards(page)).toHaveCount(1);
  });

  test('records completion, updates progress, reorders and supports undo', async ({ page }) => {
    const habit = card(page, waterTitle);
    const button = checkIn(page, waterTitle);
    const progress = habit.getByRole('progressbar');
    await expect(button).toHaveAttribute('aria-pressed', 'false');
    await expect(progress).toHaveAttribute('aria-valuenow', '50');
    await button.click();
    await expect(button).toHaveAttribute('aria-pressed', 'true');
    await expect(progress).toHaveAttribute('aria-valuenow', '53');
    const pending = ['کمتر استفاده‌کردن از شبکه‌های اجتماعی', 'چالش مطالعهٔ دوستان'];
    await expect.poll(async () => {
      const order = await cards(page).evaluateAll(elements => elements.map(element => element.getAttribute('aria-label')));
      return pending.every(title => order.indexOf(title) >= 0 && order.indexOf(title) < order.indexOf(waterTitle));
    }).toBe(true);
    await button.click();
    await expect(button).toHaveAttribute('aria-pressed', 'false');
    await expect(progress).toHaveAttribute('aria-valuenow', '50');
    await expect(cards(page).first()).toHaveAttribute('aria-label', waterTitle);
  });

  test('sorts habits by creation date while keeping completed check-ins last', async ({ page }) => {
    const trigger = page.getByRole('button', { name: 'مرتب‌سازی جدیدترین' });
    await trigger.focus();
    await page.keyboard.press('ArrowDown');
    await expect(page.getByRole('listbox', { name: 'مرتب‌سازی' })).toBeVisible();
    await page.getByRole('option', { name: 'قدیمی‌ترین' }).click();
    await expect(cards(page).first()).toHaveAttribute('aria-label', 'چالش مطالعهٔ دوستان');
    await expect(cards(page).last()).toHaveAttribute('aria-label', 'مطالعهٔ روزانه');
  });

  test('validates personal habit edits and saves valid changes', async ({ page }) => {
    await openAction(page, waterTitle, 'ویرایش');
    const dialog = page.getByRole('dialog', { name: 'ویرایش عادت' });
    const name = dialog.getByRole('textbox', { name: 'نام عادت' });
    await name.fill('x');
    await dialog.getByRole('button', { name: 'ذخیره تغییرات' }).click();
    await expect(dialog.getByRole('alert')).toContainText('حداقل ۲ حرف');
    await dialog.getByRole('button', { name: 'انصراف' }).click();
    await expect(card(page, waterTitle)).toBeVisible();
    await openAction(page, waterTitle, 'ویرایش');
    await name.fill('آب کافی');
    await dialog.getByRole('textbox', { name: 'توضیح کوتاه' }).fill('۸ لیوان در روز');
    await dialog.getByRole('button', { name: 'ذخیره تغییرات' }).click();
    await expect(dialog).toHaveCount(0);
    await expect(card(page, 'آب کافی')).toContainText('۸ لیوان در روز');
    await expect(card(page, waterTitle)).toHaveCount(0);
  });

  test('deletes a personal habit only after confirmation', async ({ page }) => {
    await openAction(page, waterTitle, 'حذف');
    const dialog = page.getByRole('dialog', { name: 'حذف عادت' });
    await expect(dialog).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(card(page, waterTitle)).toBeVisible();
    await openAction(page, waterTitle, 'حذف');
    await dialog.getByRole('button', { name: 'بله، حذف شود' }).click();
    await expect(card(page, waterTitle)).toHaveCount(0);
    await tab(page, /^همه/).click();
    await expect(card(page, waterTitle)).toHaveCount(0);
  });

  test('group members can record their own progress without managing the shared challenge', async ({ page }) => {
    const title = 'چالش مطالعهٔ دوستان';
    const habit = card(page, title);
    await habit.getByRole('button', { name: `عملیات ${title}` }).click();
    await expect(habit).toContainText('مدیریت چالش گروهی از بخش گروه‌ها');
    await expect(habit.getByRole('button', { name: /ویرایش|حذف/ })).toHaveCount(0);
    await page.keyboard.press('Escape');
    await checkIn(page, title).click();
    await expect(checkIn(page, title)).toHaveAttribute('aria-pressed', 'true');
    await expect(habit.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '40');
  });

  test('renders user-supplied HTML as text', async ({ page }) => {
    await openAction(page, waterTitle, 'ویرایش');
    const dialog = page.getByRole('dialog', { name: 'ویرایش عادت' });
    const payload = '<img src=x onerror=alert(1)>';
    await dialog.getByRole('textbox', { name: 'نام عادت' }).fill(payload);
    await dialog.getByRole('button', { name: 'ذخیره تغییرات' }).click();
    await expect(card(page, payload).getByRole('heading', { name: payload, exact: true })).toBeVisible();
    await expect(card(page, payload).locator('[onerror]')).toHaveCount(0);
  });

  test('allows the daily check-in flow on a small phone', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(card(page, waterTitle)).toBeVisible();
    await checkIn(page, waterTitle).click();
    await expect(checkIn(page, waterTitle)).toHaveAttribute('aria-pressed', 'true');
    await tab(page, /^همه/).click();
    await expect(card(page, 'ورزش صبحگاهی')).toBeVisible();
  });
});
