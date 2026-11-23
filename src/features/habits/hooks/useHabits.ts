import { useCallback, useEffect, useRef, useState } from 'react';
import type { Habit, UpdateHabitInput } from '../types';
import type { HabitsRepository } from '../services/habitsRepository';

export function useHabits(repository: HabitsRepository) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const requestId = useRef(0);

  const fetchHabits = useCallback(async (id: number, signal?: AbortSignal) => {
    try {
      const result = await repository.getHabits(signal);
      if (id === requestId.current) {
        setHabits(result);
        setError(null);
      }
    } catch {
      if (id === requestId.current) setError('دریافت عادت‌ها با خطا مواجه شد.');
    } finally {
      if (id === requestId.current) setLoading(false);
    }
  }, [repository]);

  useEffect(() => {
    const controller = new AbortController();
    const id = ++requestId.current;
    void fetchHabits(id, controller.signal);
    return () => { controller.abort(); requestId.current += 1; };
  }, [fetchHabits]);

  const reload = useCallback(async () => {
    const id = ++requestId.current;
    setLoading(true);
    setError(null);
    await fetchHabits(id);
  }, [fetchHabits]);

  const remove = useCallback(async (habitId: string): Promise<boolean> => {
    setDeletingId(habitId);
    setError(null);
    try {
      await repository.deleteHabit(habitId);
      setHabits((previous) => previous.filter((habit) => habit.id !== habitId));
      return true;
    } catch {
      setError('حذف عادت انجام نشد. دوباره تلاش کنید.');
      return false;
    } finally {
      setDeletingId(null);
    }
  }, [repository]);

  const update = useCallback(async (habitId: string, input: UpdateHabitInput): Promise<boolean> => {
    setUpdatingId(habitId);
    setError(null);
    try {
      const updated = await repository.updateHabit(habitId, input);
      setHabits((previous) => previous.map((habit) => habit.id === habitId ? updated : habit));
      return true;
    } catch {
      setError('ویرایش عادت انجام نشد. دوباره تلاش کنید.');
      return false;
    } finally {
      setUpdatingId(null);
    }
  }, [repository]);

  return { habits, loading, error, deletingId, updatingId, reload, remove, update };
}
