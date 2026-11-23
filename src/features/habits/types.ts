/** Domain-facing types. Final Django response mapping must be agreed with backend. */
export type HabitPolarity = 'positive' | 'negative';
export type HabitCadence = 'daily' | 'weekly' | 'monthly';
export type StreakMode = 'strict' | 'flexible';
export type TodayStatus = 'pending' | 'completed' | 'missed';
export type HabitListStatus = 'active' | 'completed';
export type HabitIcon = 'water' | 'study' | 'exercise' | 'mindfulness' | 'sleep';
export type HabitMeasurement =
  | { type: 'binary' }
  | { type: 'count' | 'duration'; target: number; unit: string };

export interface Habit {
  id: string;
  title: string;
  /** Short text shown under the title in the Figma card. */
  subtitle: string;
  polarity: HabitPolarity;
  cadence: HabitCadence;
  streakMode: StreakMode;
  measurement: HabitMeasurement;
  today: { status: TodayStatus; value: number | null };
  stats: {
    /** Render only: Django owns progress, streak and plant-stage calculations. */
    completionPercent: number;
    currentStreak: number;
    bestStreak: number;
    plantStage: 1 | 2 | 3 | 4 | 5;
  };
  status: HabitListStatus;
  icon: HabitIcon;
  /** In visual order, Friday → Saturday. One item per day. */
  weekCompletions: readonly boolean[];
  /** Stable sorting field, supplied by backend after API integration. */
  createdAt: string;
}

/** Fields editable in the mock UI; stats/streaks remain backend-owned. */
export interface UpdateHabitInput {
  title: string;
  subtitle: string;
}

export interface RecordHabitInput {
  date: string;
  value: number;
}
