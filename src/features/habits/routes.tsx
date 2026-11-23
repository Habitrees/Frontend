import type { RouteObject } from 'react-router-dom';
import { HabitsPage } from './HabitsPage';

/** Canonical URL for the My Habits screen. */
export const MY_HABITS_PATH = '/my-habits' as const;

/**
 * Insert into the existing authenticated route tree, never a replacement router.
 * The authentication guard and app layout must be supplied by the host app.
 * With the mock repository, this route is usable before the Django API exists.
 */
export const myHabitsRoute: RouteObject = {
  path: MY_HABITS_PATH,
  element: <HabitsPage />,
};
