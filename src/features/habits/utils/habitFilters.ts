import type { Habit } from '../types';

export type HabitStatusFilter = 'today' | 'all' | 'completed';
export type HabitSort = 'newest' | 'oldest';

export function filterAndSortHabits(
  habits: readonly Habit[], status: HabitStatusFilter, sort: HabitSort,
): Habit[] {
  return habits.filter((habit) => {
    const matchesTab = status === 'all' || (status === 'completed'
      ? habit.status === 'completed'
      : habit.status === 'active' && habit.today.due);
    return matchesTab;
  }).sort((left, right) => {
    // Completed check-ins move after the remaining habits; retain the chosen date order within each group.
    const rank = (habit: Habit) => Number(habit.status === 'completed' || habit.today.status === 'completed');
    const completionOrder = rank(left) - rank(right);
    if (completionOrder !== 0) return completionOrder;
    return sort === 'newest'
      ? right.createdAt.localeCompare(left.createdAt)
      : left.createdAt.localeCompare(right.createdAt);
  });
}

export const PAGE_SIZE = 5;

export function paginateHabits<T>(items: readonly T[], page: number, size = PAGE_SIZE): T[] {
  return items.slice((page - 1) * size, page * size);
}

export function remainingDays(today: string, future: string): number {
  const toUtc = (key: string) => {
    const [y, m, d] = key.split('-').map(Number);
    return Date.UTC(y, m - 1, d);
  };
  return Math.max(0, Math.round((toUtc(future) - toUtc(today)) / 86_400_000));
}
