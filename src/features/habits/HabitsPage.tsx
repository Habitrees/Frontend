import { useEffect, useMemo, useRef, useState } from 'react';
import { Plus, Sprout } from 'lucide-react';
import { MotionConfig } from 'motion/react';
import { Button } from '../../shared/components/Button';
import { localDateKey } from './data/mockHabits';
import { HabitCard } from './components/HabitCard';
import { HabitCompletionFeedback, type CompletionFeedback } from './components/HabitCompletionFeedback';
import { EditHabitDialog } from './components/EditHabitDialog';
import { DeleteHabitDialog } from './components/DeleteHabitDialog';
import { HabitFilters } from './components/HabitFilters';
import { HabitsHeader, HabitsMobileNavigation } from './components/HabitsHeader';
import { useHabits } from './hooks/useHabits';
import type { Habit, UpdateHabitInput } from './types';
import type { HabitsRepository } from './services/habitsRepository';
import { mockHabitsRepository } from './services/mockHabitsRepository';
import { filterAndSortHabits, paginateHabits, PAGE_SIZE } from './utils/habitFilters';
import type { HabitSort, HabitStatusFilter } from './utils/habitFilters';
import { celebrateHabitCompletion } from './utils/celebrateHabitCompletion';
import './habits.css';

export interface HabitsPageProps {
  repository?: HabitsRepository;
  /** The parent application will provide real navigation once creation flow is merged. */
  onCreateHabit?: () => void;
  onEditHabit?: (habit: Habit) => void;
}

/** Replaces the former dashboard as the primary daily check-in screen. */
export function HabitsPage({
  repository = mockHabitsRepository, onCreateHabit, onEditHabit,
}: HabitsPageProps) {
  const { habits, loading, error, deletingId, updatingId, recordingId, reload, record, remove, update } = useHabits(repository);
  const [sort, setSort] = useState<HabitSort>('newest');
  const [status, setStatus] = useState<HabitStatusFilter>('today');
  const [page, setPage] = useState(1);
  const [menuId, setMenuId] = useState<string | null>(null);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [deletingHabit, setDeletingHabit] = useState<Habit | null>(null);
  const [recordFeedback, setRecordFeedback] = useState<CompletionFeedback | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const dialogTriggerRef = useRef<HTMLElement | null>(null);

  const restoreDialogFocus = () => {
    requestAnimationFrame(() => {
      const trigger = dialogTriggerRef.current;
      if (trigger?.isConnected) trigger.focus();
      else headingRef.current?.focus();
    });
  };
  const rememberDialogTrigger = (habit: Habit) => {
    const card = Array.from(document.querySelectorAll<HTMLElement>('[data-habit-menu-surface]'))
      .find((surface) => surface.dataset.habitMenuSurface === habit.id);
    dialogTriggerRef.current = card?.querySelector<HTMLElement>('.habit-menu-trigger') ?? null;
  };

  useEffect(() => {
    if (!menuId) return;
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuId(null); };
    const outside = (event: PointerEvent | FocusEvent) => {
      const target = event.target;
      if (target instanceof Element &&
        target.closest('[data-habit-menu-surface]')?.getAttribute('data-habit-menu-surface') === menuId) return;
      setMenuId(null);
    };
    document.addEventListener('keydown', escape);
    document.addEventListener('pointerdown', outside);
    document.addEventListener('focusin', outside);
    return () => {
      document.removeEventListener('keydown', escape);
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('focusin', outside);
    };
  }, [menuId]);

  useEffect(() => {
    if (!recordFeedback) return;
    const timeout = window.setTimeout(() => setRecordFeedback(null), 1700);
    return () => window.clearTimeout(timeout);
  }, [recordFeedback]);

  const counts = useMemo(() => ({
    all: habits.length,
    today: habits.filter((item) => item.status === 'active' && item.today.due).length,
    completed: habits.filter((item) => item.status === 'completed').length,
  }), [habits]);
  const doneToday = habits.filter((item) => item.status === 'active' && item.today.due && item.today.status === 'completed').length;
  const filtered = useMemo(() => filterAndSortHabits(habits, status, sort), [habits, status, sort]);
  const maxPage = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, maxPage);
  const displayed = paginateHabits(filtered, currentPage);
  const from = filtered.length ? (currentPage - 1) * PAGE_SIZE + 1 : 0;
  const to = Math.min(currentPage * PAGE_SIZE, filtered.length);
  const changeFilter = () => { setPage(1); setMenuId(null); setRecordFeedback(null); };

  const confirmDelete = async () => {
    if (!deletingHabit) return;
    if (await remove(deletingHabit.id)) { setDeletingHabit(null); restoreDialogFocus(); }
  };

  const saveEdit = async (input: UpdateHabitInput): Promise<boolean> =>
    editingHabit ? update(editingHabit.id, input) : false;

  const toggleCompletion = async (habit: Habit) => {
    if (recordingId || !habit.today.canRecord || habit.status === 'completed') return;
    const completed = habit.today.status !== 'completed';
    setRecordFeedback(null);
    if (await record(habit.id, {
      date: habit.today.date,
      status: completed ? 'completed' : 'pending',
    })) {
      const allDone = completed && habit.today.due && counts.today > 0 && doneToday + 1 === counts.today;
      setRecordFeedback({
        habitId: habit.id,
        completed,
        title: allDone ? 'آفرین! همهٔ عادت‌های امروزت انجام شد' : 'آفرین، یک قدم دیگه!',
        message: completed
          ? `انجام ${habit.title} ثبت شد.`
          : `ثبت انجام ${habit.title} لغو شد.`,
      });
      if (completed) void celebrateHabitCompletion();
    }
  };

  return <MotionConfig reducedMotion="user">
  <div className="habits-page font-sans" dir="rtl">
    <div className="application">
      <HabitsHeader />
      <main className="page-content">
        <section className="welcome-panel" aria-label="خوشامدگویی">
          <div>
            <p className="welcome-headline"><Sprout size={23} aria-hidden="true" />سلام، روزت سبز!</p>
            <p>هر عادت کوچک، تو را یک قدم به رشد نزدیک‌تر می‌کند.</p>
          </div>
          <svg className="welcome-botanical" viewBox="0 0 160 108" aria-hidden="true" focusable="false">
            <path d="M13 102C48 78 65 38 133 13" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            <g fill="currentColor" opacity=".82">
              <path d="M40 77C17 74 19 53 24 43C37 49 47 61 40 77Z" />
              <path d="M49 69C67 48 87 58 97 61C82 74 66 77 49 69Z" />
              <path d="M66 48C48 40 53 20 62 10C73 20 78 34 66 48Z" />
              <path d="M78 40C99 20 116 26 128 29C115 42 95 48 78 40Z" />
              <path d="M105 25C110 7 130 2 147 6C138 22 122 30 105 25Z" />
              <path d="M24 91C10 86 5 74 7 65C23 69 31 79 24 91Z" />
            </g>
          </svg>
          <time dateTime={localDateKey(new Date())}>
            {new Intl.DateTimeFormat('fa-IR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())}
          </time>
        </section>

        <section className="intro" aria-labelledby="my-habits-title">
          <div className="intro-copy">
            <h1 ref={headingRef} tabIndex={-1} id="my-habits-title">عادت‌های من</h1>
            <p>بررسی و انجام سریع عادت‌های امروز، تنها با یک کلیک.</p>
          </div>
          <Button className="new-habit" variant="brand" type="button" onClick={() => {
            if (onCreateHabit) onCreateHabit();
            else setNotice('ساخت عادت جدید بعد از اتصال جریان ساخت عادت فعال می‌شود.');
          }}>
            <Plus size={19} aria-hidden="true" /> عادت جدید
          </Button>
        </section>

        <HabitFilters sort={sort} status={status} counts={counts}
          onSortChange={(value) => { setSort(value); changeFilter(); }}
          onStatusChange={(value) => { setStatus(value); changeFilter(); }} />

        <HabitCompletionFeedback feedback={recordFeedback} />
        {(notice || error) && <div role={error ? 'alert' : 'status'} className="page-notice">
          <p>{error || notice}</p>
          {error && <Button variant="brand" type="button" onClick={() => { void reload(); }}>تلاش دوباره</Button>}
          {notice && <button type="button" onClick={() => setNotice(null)}>بستن</button>}
        </div>}

        {loading ? <p className="page-state" role="status">در حال دریافت عادت‌ها…</p> : <>
          <section className="habit-list-section" aria-labelledby="habits-list-title">
            <h2 id="habits-list-title" className="sr-only">{status === 'today' ? 'عادت‌های امروز' : status === 'completed' ? 'دوره‌های تکمیل‌شده' : 'همهٔ عادت‌ها'}</h2>
            <div className="habit-list">
            {displayed.map((habit) => <HabitCard key={habit.id} habit={habit} view={status}
              menuOpen={menuId === habit.id}
              moving={recordFeedback?.habitId === habit.id && recordFeedback.completed}
              busy={recordingId === habit.id || deletingId === habit.id || updatingId === habit.id}
              onToggleMenu={() => setMenuId((previous) => previous === habit.id ? null : habit.id)}
              onCloseMenu={() => setMenuId(null)}
              recordDisabled={recordingId !== null}
              onToggleComplete={() => { void toggleCompletion(habit); }}
              onEdit={() => {
                setMenuId(null);
                if (onEditHabit) onEditHabit(habit);
                else { rememberDialogTrigger(habit); setEditingHabit(habit); }
              }}
              onDelete={() => { rememberDialogTrigger(habit); setMenuId(null); setDeletingHabit(habit); }} />)}
            {!displayed.length && <p className="page-state" role="status">
              {status === 'today' && !counts.today
                ? 'برای امروز عادتی برنامه‌ریزی نشده؛ از تب «همه» می‌تونی نوبت‌های بعدی رو ببینی.'
                : status === 'completed' && !counts.completed
                  ? 'هنوز چالش تکمیل‌شده‌ای نداری.'
                  : 'عادتی برای این بخش وجود ندارد.'}
            </p>}
            </div>
          </section>
          {maxPage > 1 && <nav className="list-footer" aria-label="صفحه‌بندی عادت‌ها">
            <Button variant="brand" type="button" disabled={currentPage <= 1}
              onClick={() => { setPage((previous) => Math.max(1, previous - 1)); setMenuId(null); }}>قبلی</Button>
            <span aria-live="polite">نمایش {from.toLocaleString('fa-IR')} تا {to.toLocaleString('fa-IR')} از {filtered.length.toLocaleString('fa-IR')}</span>
            <Button variant="brand" type="button" disabled={currentPage >= maxPage}
              onClick={() => { setPage((previous) => Math.min(maxPage, previous + 1)); setMenuId(null); }}>بعدی</Button>
          </nav>}
        </>}

        {deletingHabit && <DeleteHabitDialog key={deletingHabit.id} habit={deletingHabit}
          busy={deletingId === deletingHabit.id} error={error}
          onConfirm={confirmDelete} onDismiss={() => { setDeletingHabit(null); restoreDialogFocus(); }} />}
        {editingHabit && <EditHabitDialog key={editingHabit.id} habit={editingHabit}
          onSave={saveEdit} onDismiss={() => { setEditingHabit(null); restoreDialogFocus(); }} />}
      </main>
      <HabitsMobileNavigation />
    </div>
  </div>
  </MotionConfig>;
}
