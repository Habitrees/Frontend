# My Habits

## Overview

My Habits is the daily workspace for personal habits and group challenges. The page is available at `/my-habits` and currently uses an in-memory repository. It is designed for Persian (RTL) interfaces and adapts to mobile, tablet and desktop screens.

## Functionality

| Feature | Behavior |
| --- | --- |
| Today | Shows active habits scheduled for the current day, including personal and group check-ins. |
| All | Shows all habits, including upcoming occurrences and completed periods. |
| Completed | Shows finished habit periods, rather than habits that have only been checked off today. |
| Daily check-in | Records a successful occurrence with one action. An active habit's check-in can be undone. Successful check-ins are sorted after pending habits. |
| Progress | Displays successful occurrences relative to planned occurrences, along with the current streak. |
| Upcoming occurrences | Displays the next scheduled date for habits that are not due today. |
| Sorting and pagination | Supports newest/oldest ordering within completion groups and five habits per page. |
| Habit management | Personal habits can be edited or deleted. Editing validates input; deletion requires confirmation. Group members can record their own progress but cannot edit or delete the shared challenge here. |

Goals may be duration-based, count-based or binary. Recording an occurrence is binary for all goal types. An unrecorded occurrence is pending, not an explicit failure. Completion feedback uses Motion and canvas-confetti with reduced-motion support.

## Implementation

The feature is located in `src/features/habits/`.

| File or directory | Responsibility |
| --- | --- |
| `HabitsPage.tsx` | Page composition, filters, pagination, dialogs and completion feedback. Accepts an optional repository and create/edit callbacks through `HabitsPageProps`. |
| `components/` | Habit cards, filter and sort controls, dialogs and feedback. Forms use shared Button/Input components, React Hook Form and Zod. |
| `hooks/useHabits.ts` | Loads habits and manages asynchronous recording, editing and deletion, including loading and error states. |
| `types.ts` | Typed habit, ownership, measurement, schedule, progress and occurrence models. |
| `data/mockHabits.ts` | Demo habits and local calendar-date helpers. |
| `services/` | Repository interface, in-memory implementation and Axios-based HTTP adapter. |
| `utils/habitFilters.ts` | Filtering, sorting, pagination and date calculations. |
| `utils/celebrateHabitCompletion.ts` | Completion animation. |
| `habits.css`, `assets/` | Responsive styles using shared tokens in `src/index.css`, plant illustrations and icons. |

### Repository interface

| Method | Purpose |
| --- | --- |
| `getHabits(signal?)` | Fetch habit records. |
| `recordHabit(id, { date, status })` | Record completion or return an eligible occurrence to pending. |
| `updateHabit(id, { title, subtitle })` | Update a personal habit's title and short description. |
| `deleteHabit(id)` | Delete a personal habit after confirmation in the UI. |

The page depends on `HabitsRepository`, rather than on a specific API. `MockHabitsRepository` supplies demo data; `HttpHabitsRepository` accepts an Axios instance and endpoint configuration. The HTTP adapter is not enabled by default. Edit validation requires a trimmed title of 2–80 characters and a subtitle of at most 120 characters.

## Current limitations and integration

- Mock data resets on reload. Dates are based on the device's local calendar; refreshing is needed to update the mock schedule after midnight.
- Completing the last planned occurrence closes the mock period. Undo is available for active habits, not for a finished period. Streak counters are illustrative; strict/flexible recovery, missed occurrences, authoritative best streak and growth stages require server-side rules.
- The create-habit flow, authentication guard, real group permissions and garden integration are not connected to this route yet. The current route is a demo and must not expose real user records without authentication.
- To enable the API adapter, agree on endpoints, DTO mapping, authentication, authorization, scheduling/time-zone behavior and error responses with the backend. Django must enforce eligibility, ownership, validation and authoritative progress calculations.

## Testing

```bash
npm ci
npx playwright install chromium
npm run lint
npm run build
npm run test:e2e
```

| Test file | Coverage |
| --- | --- |
| `e2e/home.spec.ts` | Entry route to My Habits. |
| `e2e/my-habits.spec.ts` | Browser user flows: filtering, upcoming occurrences, pagination, sorting, check-in and undo, editing and validation, confirmed deletion, group access, safe text rendering and mobile check-in. |
| `e2e/my-habits-mock.spec.ts` | Repository rules: eligible dates, idempotent completion, undo, period completion, validation and group mutation restrictions. |

The browser tests use fixed demo dates and reduced motion for reproducible results. They do not require Django or an external API. Playwright generates an HTML report and retains failure artifacts. Repository-rule tests run in the Playwright runner without using a browser page; they are not end-to-end API tests. Full execution results are available from the local test run or frontend CI.
