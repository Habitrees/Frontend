import { Navigate, createBrowserRouter } from 'react-router-dom';
import { myHabitsRoute } from '../features/habits/routes';

/** Mock entry point: the separate dashboard was retired in favor of My Habits.
 * The authenticated parent layout / guard will be provided when auth branches merge.
 */
export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/my-habits" replace /> },
  myHabitsRoute,
]);
