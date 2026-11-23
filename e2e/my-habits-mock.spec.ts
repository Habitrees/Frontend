import { expect, test } from '@playwright/test';
import { MockHabitsRepository } from '../src/features/habits/services/mockHabitsRepository';
import { MOCK_HABITS } from '../src/features/habits/data/mockHabits';
import { filterAndSortHabits, paginateHabits } from '../src/features/habits/utils/habitFilters';

/** Pure mock contract tests; no backend, network, or browser required. */
test.describe('My Habits — mock repository and list logic', () => {
  test('isolates returned objects from mutable repository state', async () => {
    const repository = new MockHabitsRepository();
    const original = await repository.getHabits();
    original[0].title = 'تغییر خارج از مخزن';
    original[0].weekCompletions[0] = !original[0].weekCompletions[0];
    const again = await repository.getHabits();
    expect(again[0].title).toBe(MOCK_HABITS[0].title);
    expect(again[0].weekCompletions).toEqual(MOCK_HABITS[0].weekCompletions);
  });

  test('deletes only the selected habit and rejects a missing ID', async () => {
    const repository = new MockHabitsRepository();
    await repository.deleteHabit('study');
    expect((await repository.getHabits()).map(({ id }) => id)).not.toContain('study');
    await expect(repository.deleteHabit('unknown')).rejects.toThrow('Habit not found');
  });

  test('edits mock details without mutating backend-owned statistics', async () => {
    const repository = new MockHabitsRepository();
    const original = (await repository.getHabits()).find((habit) => habit.id === 'study');
    expect(original).toBeDefined();
    const saved = await repository.updateHabit('study', {
      title: ' مطالعه شبانه ', subtitle: '  قبل از خواب ',
    });
    expect(saved.title).toBe('مطالعه شبانه');
    expect(saved.subtitle).toBe('قبل از خواب');
    expect(saved.stats).toEqual(original!.stats);
    const next = (await repository.getHabits()).find((habit) => habit.id === 'study');
    expect(next?.title).toBe('مطالعه شبانه');
    await expect(repository.updateHabit('invalid', { title: 'تست', subtitle: '' })).rejects.toThrow('Habit not found');
    await expect(repository.updateHabit('study', { title: ' ', subtitle: '' })).rejects.toThrow('Invalid habit details');
  });

  test('filters, sorts and paginates without mutating original fixtures', () => {
    const originalOrder = MOCK_HABITS.map(({ id }) => id);
    const matched = filterAndSortHabits(MOCK_HABITS, 'ورزش', 'active', 'newest');
    expect(matched.map(({ id }) => id)).toEqual(['exercise']);
    expect(paginateHabits([1, 2, 3, 4, 5, 6], 2, 5)).toEqual([6]);
    expect(MOCK_HABITS.map(({ id }) => id)).toEqual(originalOrder);
  });
});
