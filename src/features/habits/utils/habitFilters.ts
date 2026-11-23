import type { Habit, HabitListStatus } from '../types';

export type HabitStatusFilter = 'all' | HabitListStatus;
export type HabitSort = 'newest' | 'oldest';

export function filterAndSortHabits(
  habits: readonly Habit[],
  query: string,
  status: HabitStatusFilter,
  sort: HabitSort,
): Habit[] {
  const normalized = query.trim().toLocaleLowerCase('fa-IR');
  return habits
    .filter((habit) =>
      (status === 'all' || habit.status === status) &&
      (!normalized || habit.title.toLocaleLowerCase('fa-IR').includes(normalized)),
    )
    .sort((a, b) => sort === 'newest'
      ? b.createdAt.localeCompare(a.createdAt)
      : a.createdAt.localeCompare(b.createdAt));
}

export const PAGE_SIZE = 5;

export function paginateHabits<T>(items: readonly T[], page: number, size = PAGE_SIZE): T[] {
  return items.slice((page - 1) * size, page * size);
}
