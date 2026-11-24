import { useCallback, useEffect, useRef, useState } from 'react';
import type { Habit, RecordHabitInput, UpdateHabitInput } from '../types';
import type { HabitsRepository } from '../services/habitsRepository';

/** Presentation state only. Business calculations belong to the repository / Django. */
export function useHabits(repository: HabitsRepository) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [recordingId, setRecordingId] = useState<string | null>(null);
  const requestId = useRef(0);

  const fetchHabits = useCallback(async (id: number, signal?: AbortSignal) => {
    try {
      const result = await repository.getHabits(signal);
      if (id === requestId.current) { setHabits(result); setError(null); }
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

  const record = useCallback(async (habitId: string, input: RecordHabitInput): Promise<boolean> => {
    setRecordingId(habitId);
    setError(null);
    try {
      const updated = await repository.recordHabit(habitId, input);
      setHabits((items) => items.map((item) => item.id === habitId ? updated : item));
      return true;
    } catch {
      setError('ثبت عملکرد انجام نشد. دوباره تلاش کن.');
      return false;
    } finally {
      setRecordingId(null);
    }
  }, [repository]);

  const remove = useCallback(async (habitId: string): Promise<boolean> => {
    setDeletingId(habitId);
    setError(null);
    try {
      await repository.deleteHabit(habitId);
      setHabits((items) => items.filter((item) => item.id !== habitId));
      return true;
    } catch {
      setError('حذف عادت انجام نشد. دوباره تلاش کن.');
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
      setHabits((items) => items.map((item) => item.id === habitId ? updated : item));
      return true;
    } catch {
      setError('ویرایش عادت انجام نشد. دوباره تلاش کن.');
      return false;
    } finally {
      setUpdatingId(null);
    }
  }, [repository]);

  return { habits, loading, error, deletingId, updatingId, recordingId, reload, record, remove, update };
}
