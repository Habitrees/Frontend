import type { Habit, RecordHabitInput, UpdateHabitInput } from '../types';

/** The page knows this contract, not Axios, network URLs, or local fixtures. */
export interface HabitsRepository {
  getHabits(signal?: AbortSignal): Promise<Habit[]>;
  recordHabit(habitId: string, input: RecordHabitInput): Promise<Habit>;
  updateHabit(habitId: string, input: UpdateHabitInput): Promise<Habit>;
  deleteHabit(habitId: string): Promise<void>;
}
