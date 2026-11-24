import type { Habit, HabitCadence } from '../types';

type Draft = Omit<Habit, 'today'> & {
  initialStatus?: Habit['today']['status'];
};

/** Local calendar date (not UTC date): mock scheduling follows the visitor's day. */
export function localDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** Used ONLY for mock dates. The real server supplies due / nextDueDate. */
function scheduledOn(date: Date, cadence: HabitCadence, weekdays?: readonly number[], monthDays?: readonly number[]): boolean {
  if (cadence === 'daily') return true;
  if (cadence === 'weekly') return Boolean(weekdays?.includes(date.getDay()));
  return Boolean(monthDays?.includes(date.getDate()));
}

function nextScheduledDate(now: Date, draft: Draft): string | null {
  if (draft.status === 'completed') return null;
  for (let distance = 0; distance <= 370; distance += 1) {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + distance);
    if (scheduledOn(date, draft.cadence, draft.schedule.weekdays, draft.schedule.monthDays)) return localDateKey(date);
  }
  return null;
}

/** Every view gets a reproducible fixture, including weekly/monthly off-days. */
export function createMockHabits(now = new Date()): Habit[] {
  const weekday = now.getDay();
  const nextWeekday = (weekday + 2) % 7;
  const tomorrowMonthDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3).getDate();
  const fixtures: Draft[] = [
    {
      id: 'water', title: 'نوشیدن آب', subtitle: '۸ لیوان آب در روز',
      polarity: 'positive', cadence: 'daily', streakMode: 'flexible',
      measurement: { type: 'count', target: 8, unit: 'لیوان' },
      ownership: { type: 'personal' }, schedule: {},
      stats: { successfulOccurrences: 20, plannedOccurrences: 40, completionPercent: 50, currentStreak: 5, bestStreak: 10, plantStage: 3 },
      status: 'active', icon: 'water', createdAt: '2026-11-22',
    },
    {
      id: 'study', title: 'مطالعهٔ روزانه', subtitle: '۲۰ دقیقه مطالعه در روز',
      polarity: 'positive', cadence: 'daily', streakMode: 'flexible',
      measurement: { type: 'duration', target: 20, unit: 'دقیقه' },
      ownership: { type: 'personal' }, schedule: {}, initialStatus: 'completed',
      stats: { successfulOccurrences: 16, plannedOccurrences: 40, completionPercent: 40, currentStreak: 6, bestStreak: 8, plantStage: 3 },
      status: 'active', icon: 'study', createdAt: '2026-11-21',
    },
    {
      id: 'exercise', title: 'ورزش صبحگاهی', subtitle: '۳۰ دقیقه ورزش، هفته‌ای یک‌بار',
      polarity: 'positive', cadence: 'weekly', streakMode: 'strict',
      measurement: { type: 'duration', target: 30, unit: 'دقیقه' },
      ownership: { type: 'personal' }, schedule: { weekdays: [nextWeekday] },
      stats: { successfulOccurrences: 4, plannedOccurrences: 12, completionPercent: 33, currentStreak: 2, bestStreak: 3, plantStage: 2 },
      status: 'active', icon: 'exercise', createdAt: '2026-11-20',
    },
    {
      id: 'social', title: 'کمتر استفاده‌کردن از شبکه‌های اجتماعی', subtitle: 'امروز وارد شبکهٔ اجتماعی نشوم',
      polarity: 'negative', cadence: 'daily', streakMode: 'flexible',
      measurement: { type: 'binary' },
      ownership: { type: 'personal' }, schedule: {},
      stats: { successfulOccurrences: 9, plannedOccurrences: 30, completionPercent: 30, currentStreak: 3, bestStreak: 5, plantStage: 2 },
      status: 'active', icon: 'mindfulness', createdAt: '2026-11-19',
    },
    {
      id: 'group-study', title: 'چالش مطالعهٔ دوستان', subtitle: '۳۰ دقیقه مطالعه با گروه',
      polarity: 'positive', cadence: 'weekly', streakMode: 'strict',
      measurement: { type: 'duration', target: 30, unit: 'دقیقه' },
      ownership: { type: 'group', groupId: 'demo-friends', groupName: 'گروه دوستان' },
      schedule: { weekdays: [weekday] },
      stats: { successfulOccurrences: 3, plannedOccurrences: 10, completionPercent: 30, currentStreak: 2, bestStreak: 3, plantStage: 2 },
      status: 'active', icon: 'study', createdAt: '2026-11-18',
    },
    {
      id: 'monthly-sleep', title: 'مرور خواب ماهانه', subtitle: 'بررسی نظم خواب در یک روز از ماه',
      polarity: 'positive', cadence: 'monthly', streakMode: 'strict',
      measurement: { type: 'binary' }, ownership: { type: 'personal' },
      schedule: { monthDays: [tomorrowMonthDay] },
      stats: { successfulOccurrences: 1, plannedOccurrences: 6, completionPercent: 17, currentStreak: 1, bestStreak: 1, plantStage: 1 },
      status: 'active', icon: 'sleep', createdAt: '2026-11-17',
    },
    {
      id: 'finished', title: 'چالش مراقبه', subtitle: '۱۰ دقیقه مراقبه در روز؛ دورهٔ پایان‌یافته',
      polarity: 'positive', cadence: 'daily', streakMode: 'strict',
      measurement: { type: 'duration', target: 10, unit: 'دقیقه' },
      ownership: { type: 'personal' }, schedule: {},
      stats: { successfulOccurrences: 30, plannedOccurrences: 30, completionPercent: 100, currentStreak: 30, bestStreak: 30, plantStage: 5 },
      status: 'completed', icon: 'mindfulness', createdAt: '2026-11-16',
    },
  ];
  return fixtures.map((draft) => {
    const { initialStatus, ...habit } = draft;
    const due = habit.status === 'active' && scheduledOn(now, habit.cadence, habit.schedule.weekdays, habit.schedule.monthDays);
    return {
      ...habit,
      today: {
        date: localDateKey(now), due, canRecord: due,
        status: due ? (initialStatus ?? 'pending') : 'pending',
        nextDueDate: nextScheduledDate(now, draft),
        isMakeup: false,
      },
    };
  });
}

