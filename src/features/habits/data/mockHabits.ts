import type { Habit } from '../types';

/** Matches the five cards in the Figma Make source; mock, not real user data. */
export const MOCK_HABITS: Habit[] = [
  {
    id: 'water', title: 'نوشیدن آب', subtitle: '۸ لیوان در روز',
    polarity: 'positive', cadence: 'daily', streakMode: 'flexible',
    measurement: { type: 'count', target: 8, unit: 'لیوان' },
    today: { status: 'pending', value: 6 },
    stats: { completionPercent: 75, currentStreak: 12, bestStreak: 14, plantStage: 3 },
    status: 'active', icon: 'water',
    weekCompletions: [false, false, true, true, true, true, true], createdAt: '2026-11-22',
  },
  {
    id: 'study', title: 'مطالعه روزانه', subtitle: '۲۰ دقیقه در روز',
    polarity: 'positive', cadence: 'daily', streakMode: 'flexible',
    measurement: { type: 'duration', target: 20, unit: 'دقیقه' },
    today: { status: 'completed', value: 20 },
    stats: { completionPercent: 100, currentStreak: 12, bestStreak: 15, plantStage: 4 },
    status: 'completed', icon: 'study',
    weekCompletions: [true, true, true, true, true, true, true], createdAt: '2026-11-21',
  },
  {
    id: 'exercise', title: 'ورزش صبحگاهی', subtitle: '۳۰ دقیقه در روز',
    polarity: 'positive', cadence: 'daily', streakMode: 'strict',
    measurement: { type: 'duration', target: 30, unit: 'دقیقه' },
    today: { status: 'pending', value: 15 },
    stats: { completionPercent: 50, currentStreak: 7, bestStreak: 10, plantStage: 3 },
    status: 'active', icon: 'exercise',
    weekCompletions: [false, false, true, true, true, true, true], createdAt: '2026-11-20',
  },
  {
    id: 'mindfulness', title: 'ذهن‌آگاهی', subtitle: '۱۰ دقیقه در روز',
    polarity: 'positive', cadence: 'daily', streakMode: 'flexible',
    measurement: { type: 'duration', target: 10, unit: 'دقیقه' },
    today: { status: 'pending', value: 0 },
    stats: { completionPercent: 0, currentStreak: 5, bestStreak: 7, plantStage: 2 },
    status: 'active', icon: 'mindfulness',
    weekCompletions: [false, false, true, true, true, true, true], createdAt: '2026-11-19',
  },
  {
    id: 'sleep', title: 'خواب منظم', subtitle: 'پیش از ساعت ۲۳',
    polarity: 'positive', cadence: 'daily', streakMode: 'strict',
    measurement: { type: 'count', target: 7, unit: 'شب' },
    today: { status: 'pending', value: 5 },
    stats: { completionPercent: 71, currentStreak: 9, bestStreak: 11, plantStage: 4 },
    status: 'active', icon: 'sleep',
    weekCompletions: [false, false, true, true, true, true, true], createdAt: '2026-11-18',
  },
];
