import { MOCK_HABITS } from '../data/mockHabits';
import type { Habit, RecordHabitInput, UpdateHabitInput } from '../types';
import type { HabitsRepository } from './habitsRepository';

function cloneHabit(habit: Habit): Habit {
  return {
    ...habit,
    measurement: { ...habit.measurement },
    today: { ...habit.today },
    stats: { ...habit.stats },
    weekCompletions: [...habit.weekCompletions],
  };
}

/** In-memory adapter. Page reload resets fixtures; never computes streak/plant rules. */
export class MockHabitsRepository implements HabitsRepository {
  private items = MOCK_HABITS.map(cloneHabit);

  async getHabits(signal?: AbortSignal): Promise<Habit[]> {
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
    return this.items.map(cloneHabit);
  }

  async recordHabit(habitId: string, input: RecordHabitInput): Promise<Habit> {
    const item = this.items.find((entry) => entry.id === habitId);
    if (!item) throw new Error('Habit not found');
    if (!Number.isFinite(input.value) || input.value < 0) throw new Error('Invalid habit value');
    if (item.measurement.type === 'count' && !Number.isInteger(input.value)) {
      throw new Error('Count must be an integer');
    }
    if (item.measurement.type === 'binary' && input.value !== 0 && input.value !== 1) {
      throw new Error('Binary value must be 0 or 1');
    }
    // Only change the submitted value. Backend will calculate the authoritative stats.
    item.today = { ...item.today, value: input.value };
    return cloneHabit(item);
  }

  async updateHabit(habitId: string, input: UpdateHabitInput): Promise<Habit> {
    const item = this.items.find((entry) => entry.id === habitId);
    if (!item) throw new Error('Habit not found');
    const title = input.title.trim();
    const subtitle = input.subtitle.trim();
    if (title.length < 2 || title.length > 80 || subtitle.length > 120) {
      throw new Error('Invalid habit details');
    }
    item.title = title;
    item.subtitle = subtitle;
    // Deliberately do not calculate streak, progress or plant stage here.
    return cloneHabit(item);
  }

  async deleteHabit(habitId: string): Promise<void> {
    if (!this.items.some((entry) => entry.id === habitId)) throw new Error('Habit not found');
    this.items = this.items.filter((entry) => entry.id !== habitId);
  }
}

export const mockHabitsRepository = new MockHabitsRepository();
