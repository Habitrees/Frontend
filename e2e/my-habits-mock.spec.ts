import { expect, test } from '@playwright/test';
import { MockHabitsRepository } from '../src/features/habits/services/mockHabitsRepository';
import { createMockHabits, localDateKey } from '../src/features/habits/data/mockHabits';
import { filterAndSortHabits, remainingDays } from '../src/features/habits/utils/habitFilters';

const now = new Date(2026, 10, 24, 12);
const date = localDateKey(now);

test.describe('My Habits — mock business rules', () => {
  test('permits check-ins only for eligible occurrences on the correct local date', async () => {
    const repository = new MockHabitsRepository(now);
    const habits = await repository.getHabits();
    expect(habits.every(habit => habit.today.date === date)).toBe(true);
    for (const id of ['exercise', 'monthly-sleep']) {
      const habit = habits.find(item => item.id === id)!;
      expect(habit.today.due).toBe(false);
      expect(habit.today.status).toBe('pending');
      expect(habit.today.canRecord).toBe(false);
      expect(remainingDays(date, habit.today.nextDueDate!)).toBeGreaterThan(0);
    }
    for (const id of ['exercise', 'monthly-sleep', 'finished']) {
      await expect(repository.recordHabit(id, { date, status: 'completed' })).rejects.toThrow('not available');
    }
    await expect(repository.recordHabit('water', { date: '2020-01-01', status: 'completed' })).rejects.toThrow('not available');
  });

  test('counts a successful occurrence once and reverses progress on undo', async () => {
    const repository = new MockHabitsRepository(now);
    const original = (await repository.getHabits()).find(habit => habit.id === 'water')!;
    const completed = await repository.recordHabit('water', { date, status: 'completed' });
    expect(completed.stats.successfulOccurrences).toBe(original.stats.successfulOccurrences + 1);
    expect(completed.stats.currentStreak).toBe(original.stats.currentStreak + 1);
    const repeated = await repository.recordHabit('water', { date, status: 'completed' });
    expect(repeated.stats).toEqual(completed.stats);
    const undone = await repository.recordHabit('water', { date, status: 'pending' });
    expect(undone.today.status).toBe('pending');
    expect(undone.stats.successfulOccurrences).toBe(original.stats.successfulOccurrences);
    expect(undone.stats.completionPercent).toBe(original.stats.completionPercent);
    expect(undone.stats.currentStreak).toBe(original.stats.currentStreak);
  });

  test('finishes a habit when all planned occurrences are successful', async () => {
    const fixtures = createMockHabits(now);
    const water = fixtures.find(habit => habit.id === 'water')!;
    water.stats.successfulOccurrences = 39;
    water.stats.completionPercent = 98;
    const repository = new MockHabitsRepository(now, fixtures);
    const completed = await repository.recordHabit('water', { date, status: 'completed' });
    expect(completed.status).toBe('completed');
    expect(completed.stats.completionPercent).toBe(100);
    expect(completed.today.canRecord).toBe(false);
    expect(filterAndSortHabits(await repository.getHabits(), 'completed', 'newest').map(habit => habit.id)).toContain('water');
    await expect(repository.recordHabit('water', { date, status: 'pending' })).rejects.toThrow('not available');
  });

  test('enforces mock permissions and validation for habit mutations', async () => {
    const repository = new MockHabitsRepository(now);
    await expect(repository.updateHabit('study', { title: ' ', subtitle: '' })).rejects.toThrow('Invalid habit details');
    await expect(repository.updateHabit('group-study', { title: 'تغییر گروه', subtitle: '' })).rejects.toThrow('read-only');
    await expect(repository.deleteHabit('group-study')).rejects.toThrow('read-only');
    const updated = await repository.updateHabit('study', { title: 'مطالعه شبانه', subtitle: 'قبل از خواب' });
    expect(updated.title).toBe('مطالعه شبانه');
    expect((await repository.recordHabit('group-study', { date, status: 'completed' })).today.status).toBe('completed');
    await repository.deleteHabit('study');
    expect((await repository.getHabits()).map(habit => habit.id)).not.toContain('study');
  });
});
