/** Display contract for Habitree's personal and shared challenges.
 * Django remains authoritative for scheduling, completion, streaks and plant stages.
 */
export type HabitPolarity = 'positive' | 'negative';
export type HabitCadence = 'daily' | 'weekly' | 'monthly';
export type StreakMode = 'strict' | 'flexible';
export type TodayStatus = 'pending' | 'completed' | 'failed';
export type HabitListStatus = 'active' | 'completed';
export type HabitIcon = 'water' | 'study' | 'exercise' | 'mindfulness' | 'sleep';
export type HabitMeasurement =
  | { type: 'binary' }
  | { type: 'count' | 'duration'; target: number; unit: string };

export type HabitOwnership =
  | { type: 'personal' }
  | { type: 'group'; groupId: string; groupName: string };

export interface Habit {
  id: string;
  title: string;
  subtitle: string;
  polarity: HabitPolarity;
  cadence: HabitCadence;
  streakMode: StreakMode;
  measurement: HabitMeasurement;
  ownership: HabitOwnership;
  /** A plan describes when a habit recurs. Mock-only fixtures generate due fields from it. */
  schedule: { weekdays?: readonly number[]; monthDays?: readonly number[] };
  today: {
    date: string;
    due: boolean;
    canRecord: boolean;
    /** 'pending' is NOT the same as explicit failure. */
    status: TodayStatus;
    nextDueDate: string | null;
    isMakeup: boolean;
  };
  stats: {
    successfulOccurrences: number;
    plannedOccurrences: number;
    completionPercent: number;
    currentStreak: number;
    bestStreak: number;
    plantStage: 1 | 2 | 3 | 4 | 5;
  };
  status: HabitListStatus;
  icon: HabitIcon;
  createdAt: string;
}

export interface UpdateHabitInput { title: string; subtitle: string }

/** Binary success/pending; no notes or partial amounts in the MVP. */
export interface RecordHabitInput {
  date: string;
  status: 'completed' | 'pending';
}
