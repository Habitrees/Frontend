import { useEffect, useMemo, useState } from 'react';
import { Button } from '../../shared/components/Button';
import { decorativeAssets } from './components/habitAssets';
import { HabitCard } from './components/HabitCard';
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
import './habits.css';

export interface HabitsPageProps {
  repository?: HabitsRepository;
  /** Host application should navigate to the create-habit page when available. */
  onCreateHabit?: () => void;
  /** Host application should navigate to edit-habit page when available. */
  onEditHabit?: (habit: Habit) => void;
}

export function HabitsPage({
  repository = mockHabitsRepository, onCreateHabit, onEditHabit,
}: HabitsPageProps) {
  const { habits, loading, error, deletingId, updatingId, reload, remove, update } = useHabits(repository);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<HabitSort>('newest');
  const [status, setStatus] = useState<HabitStatusFilter>('all');
  const [page, setPage] = useState(1);
  const [menuId, setMenuId] = useState<string | null>(null);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [deletingHabit, setDeletingHabit] = useState<Habit | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  // Close on outside pointer interaction or keyboard focus, not only on Escape.
  // The trigger and popup carry the same data marker so clicking either stays inside.
  useEffect(() => {
    if (menuId === null) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuId(null);
    };
    const handleOutsideInteraction = (event: PointerEvent | FocusEvent) => {
      const target = event.target;
      // SVG descendants, icons and buttons in the same popup are inside.
      // Any other area (including another card) dismisses this popup.
      if (target instanceof Element &&
          target.closest('[data-habit-menu-surface]')?.getAttribute('data-habit-menu-surface') === menuId) return;
      setMenuId(null);
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('pointerdown', handleOutsideInteraction);
    document.addEventListener('focusin', handleOutsideInteraction);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('pointerdown', handleOutsideInteraction);
      document.removeEventListener('focusin', handleOutsideInteraction);
    };
  }, [menuId]);

  const counts = useMemo(() => ({
    all: habits.length,
    active: habits.filter((habit) => habit.status === 'active').length,
    completed: habits.filter((habit) => habit.status === 'completed').length,
  }), [habits]);
  const filtered = useMemo(() => filterAndSortHabits(habits, query, status, sort), [habits, query, status, sort]);
  const maxPage = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const effectivePage = Math.min(page, maxPage);
  const visibleHabits = paginateHabits(filtered, effectivePage);
  const from = filtered.length === 0 ? 0 : (effectivePage - 1) * PAGE_SIZE + 1;
  const to = Math.min(effectivePage * PAGE_SIZE, filtered.length);
  const resetPage = () => { setPage(1); setMenuId(null); };

  const handleConfirmDelete = async () => {
    if (!deletingHabit) return;
    const deleted = await remove(deletingHabit.id);
    if (deleted) setDeletingHabit(null);
  };

  const handleSaveEdit = async (input: UpdateHabitInput): Promise<boolean> => {
    if (!editingHabit) return false;
    return update(editingHabit.id, input);
  };

  return (
    <div className="habits-page font-sans" dir="ltr">
      <div className="application">
        <HabitsHeader />
        <main className="page-content">
          <section className="intro" aria-labelledby="my-habits-title">
            <Button className="new-habit" variant="brand" type="button" onClick={() => {
              if (onCreateHabit) onCreateHabit();
              else setNotice('صفحه افزودن عادت هنوز به این مسیر متصل نشده است.');
            }}>
              <img src={decorativeAssets.newHabitArrow} alt="" aria-hidden="true" />
              <span className="desktop-button-label">عادت جدید</span>
              <span className="mobile-button-label">افزودن عادت جدید</span>
            </Button>
            <div className="intro-copy" dir="rtl">
              <h1 id="my-habits-title">عادت‌های من</h1>
              <p>هر عادت، یک فرصت تازه برای رشد توست.</p>
            </div>
          </section>

          <HabitFilters query={query} sort={sort} status={status} counts={counts}
            onQueryChange={(value) => { setQuery(value); resetPage(); }}
            onSortChange={(value) => { setSort(value); resetPage(); }}
            onStatusChange={(value) => { setStatus(value); resetPage(); }} />

          {(notice || error) && (
            <div role={error ? 'alert' : 'status'} className="page-notice">
              <p>{error || notice}</p>
              {error && <button type="button" onClick={() => { void reload(); }}>تلاش دوباره</button>}
              {notice && <button type="button" onClick={() => setNotice(null)}>بستن</button>}
            </div>
          )}

          {loading ? (
            <p className="page-state" role="status">در حال دریافت عادت‌ها…</p>
          ) : (
            <>
              <section className="habit-list" aria-label="فهرست عادت‌ها">
                {visibleHabits.map((habit) => (
                  <HabitCard key={habit.id} habit={habit}
                    menuOpen={menuId === habit.id}
                    busy={deletingId === habit.id || updatingId === habit.id}
                    onToggleMenu={() => setMenuId((previous) => previous === habit.id ? null : habit.id)}
                    onCloseMenu={() => setMenuId(null)}
                    onEdit={() => {
                      setMenuId(null);
                      if (onEditHabit) onEditHabit(habit);
                      else setEditingHabit(habit);
                    }}
                    onDelete={() => { setMenuId(null); setDeletingHabit(habit); }} />
                ))}
                {visibleHabits.length === 0 && (
                  <p className="page-state" role="status">{habits.length ? 'عادتی مطابق جست‌وجو یا فیلتر پیدا نشد.' : 'هنوز عادتی ثبت نکرده‌ای.'}</p>
                )}
              </section>
              <footer className="list-footer" aria-label="صفحه‌بندی عادت‌ها">
                <button type="button" disabled={effectivePage >= maxPage} onClick={() => { setPage((p) => Math.min(maxPage, p + 1)); setMenuId(null); }}>بعدی</button>
                <button type="button" disabled={effectivePage <= 1} onClick={() => { setPage((p) => Math.max(1, p - 1)); setMenuId(null); }}>قبلی</button>
                <span aria-live="polite" dir="rtl">نمایش {to.toLocaleString('fa-IR')} عادت از {filtered.length.toLocaleString('fa-IR')} عادت{from > 1 ? ` (از ${from.toLocaleString('fa-IR')})` : ''}</span>
              </footer>
            </>
          )}
          {deletingHabit && (
            <DeleteHabitDialog key={deletingHabit.id} habit={deletingHabit}
              busy={deletingId === deletingHabit.id} error={error}
              onConfirm={handleConfirmDelete} onDismiss={() => setDeletingHabit(null)} />
          )}
          {editingHabit && (
            <EditHabitDialog key={editingHabit.id} habit={editingHabit}
              onSave={handleSaveEdit} onDismiss={() => setEditingHabit(null)} />
          )}
        </main>
        <HabitsMobileNavigation />
      </div>
    </div>
  );
}
