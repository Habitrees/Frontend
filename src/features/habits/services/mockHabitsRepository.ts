import { createMockHabits } from "../data/mockHabits";
import type { Habit, RecordHabitInput, UpdateHabitInput } from "../types";
import type { HabitsRepository } from "./habitsRepository";

function cloneHabit(habit: Habit): Habit {
  return {
    ...habit,
    measurement: { ...habit.measurement },
    ownership: { ...habit.ownership },
    schedule: {
      ...habit.schedule,
      ...(habit.schedule.weekdays
        ? { weekdays: [...habit.schedule.weekdays] }
        : {}),
      ...(habit.schedule.monthDays
        ? { monthDays: [...habit.schedule.monthDays] }
        : {}),
    },
    today: { ...habit.today },
    stats: { ...habit.stats },
  };
}

/** In-memory demonstration only; no server rules for streaks or missed days. */
export class MockHabitsRepository implements HabitsRepository {
  private items: Habit[];

  constructor(
    now = new Date(),
    fixtures: readonly Habit[] = createMockHabits(now)
  ) {
    this.items = fixtures.map(cloneHabit);
  }

  async getHabits(signal?: AbortSignal): Promise<Habit[]> {
    if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
    return this.items.map(cloneHabit);
  }

  async recordHabit(habitId: string, input: RecordHabitInput): Promise<Habit> {
    const item = this.items.find((entry) => entry.id === habitId);
    if (!item) throw new Error("Habit not found");
    if (
      item.status !== "active" ||
      !item.today.canRecord ||
      item.today.date !== input.date
    ) {
      throw new Error("This habit is not available for today's check-in");
    }
    if (!["pending", "completed"].includes(input.status))
      throw new Error("Invalid check-in status");
    const before = item.today.status === "completed" ? 1 : 0;
    const after = input.status === "completed" ? 1 : 0;
    item.today = { ...item.today, status: input.status };
    // Demo-only counter, not an implementation of Django's progress or streak rules.
    item.stats.successfulOccurrences = Math.min(
      item.stats.plannedOccurrences,
      Math.max(0, item.stats.successfulOccurrences + after - before)
    );
    item.stats.completionPercent =
      item.stats.plannedOccurrences > 0
        ? Math.min(
            99,
            Math.round(
              (100 * item.stats.successfulOccurrences) /
                item.stats.plannedOccurrences
            )
          )
        : 0;
    // Terminal completion for the demo only. Real end-date and makeup policies belong to Django.
    if (
      item.stats.plannedOccurrences > 0 &&
      item.stats.successfulOccurrences === item.stats.plannedOccurrences
    ) {
      item.stats.completionPercent = 100;
      item.stats.plantStage = 5;
      item.status = "completed";
      item.today = {
        ...item.today,
        due: false,
        canRecord: false,
        nextDueDate: null,
        isMakeup: false,
      };
    }
    // Today's fixture represents a continuous run. Change only the demo's current streak;
    // strict/flexible recovery, missed occurrences and authoritative best streak belong to Django.
    item.stats.currentStreak = Math.max(
      0,
      item.stats.currentStreak + after - before
    );
    item.stats.bestStreak = Math.max(
      item.stats.bestStreak,
      item.stats.currentStreak
    );
    return cloneHabit(item);
  }

  async updateHabit(habitId: string, input: UpdateHabitInput): Promise<Habit> {
    const item = this.items.find((entry) => entry.id === habitId);
    if (!item) throw new Error("Habit not found");
    if (item.ownership.type === "group")
      throw new Error("Group challenge is read-only in this mock");
    const title = input.title.trim();
    const subtitle = input.subtitle.trim();
    if (title.length < 2 || title.length > 80 || subtitle.length > 120)
      throw new Error("Invalid habit details");
    item.title = title;
    item.subtitle = subtitle;
    return cloneHabit(item);
  }

  async deleteHabit(habitId: string): Promise<void> {
    const item = this.items.find((entry) => entry.id === habitId);
    if (!item) throw new Error("Habit not found");
    if (item.ownership.type === "group")
      throw new Error("Group challenge is read-only in this mock");
    this.items = this.items.filter((entry) => entry.id !== habitId);
  }
}

export const mockHabitsRepository = new MockHabitsRepository();
