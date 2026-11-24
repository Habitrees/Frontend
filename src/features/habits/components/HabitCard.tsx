import { CalendarDays, Check, Flame } from 'lucide-react';
import { motion } from 'motion/react';
import { useRef } from 'react';
import type { Habit } from '../types';
import type { HabitStatusFilter } from '../utils/habitFilters';
import { remainingDays } from '../utils/habitFilters';
import { decorativeAssets, habitAssets } from './habitAssets';

const fa = (value: number) => value.toLocaleString('fa-IR');

interface HabitCardProps {
  habit: Habit;
  view: HabitStatusFilter;
  menuOpen: boolean;
  busy: boolean;
  moving: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onToggleComplete: () => void;
  recordDisabled: boolean;
}

/** Not due today: show the next occurrence in All rather than a misleading unchecked action. */
function UpcomingLabel({ habit }: { habit: Habit }) {
  if (habit.status !== 'active' || habit.today.due) return null;
  if (!habit.today.nextDueDate) return <span className="habit-upcoming">نوبت بعدی هنوز مشخص نیست</span>;

  const days = remainingDays(habit.today.date, habit.today.nextDueDate);
  const [year, month, day] = habit.today.nextDueDate.split('-').map(Number);
  const formatted = new Intl.DateTimeFormat('fa-IR', { weekday: 'long', day: 'numeric', month: 'long' })
    .format(new Date(year, month - 1, day));

  return <span className="habit-upcoming"><CalendarDays size={13} aria-hidden="true" />نوبت بعد: {formatted} · {fa(days)} روز دیگر</span>;
}

function HabitMenu({ habit, onEdit, onDelete }: Pick<HabitCardProps, 'habit' | 'onEdit' | 'onDelete'>) {
  return <div className="habit-menu-panel" data-habit-menu-surface={habit.id}
    role="group" aria-label={`عملیات ${habit.title}`}>
    <button type="button" onClick={onEdit} aria-label={`ویرایش ${habit.title}`} title="ویرایش">
      <img src={decorativeAssets.edit} alt="" />
      <span>ویرایش عادت</span>
    </button>
    <button type="button" onClick={onDelete} aria-label={`حذف ${habit.title}`} title="حذف">
      <img src={decorativeAssets.trash} alt="" />
      <span>حذف عادت</span>
    </button>
  </div>;
}

/** Focused daily check-in: main action sits directly after the identity in RTL. */
export function HabitCard({
  habit, view, menuOpen, busy, moving, onToggleMenu, onCloseMenu, onEdit, onDelete, onToggleComplete, recordDisabled,
}: HabitCardProps) {
  const menuTrigger = useRef<HTMLButtonElement>(null);
  const asset = habitAssets[habit.icon];
  const completedToday = habit.today.status === 'completed';
  const canRecord = habit.status === 'active' && habit.today.canRecord;
  const percent = Math.max(0, Math.min(100, habit.stats.completionPercent));

  return (
    <motion.article
      layout="position"
      transition={{ layout: { type: 'spring', stiffness: 340, damping: 36, mass: 0.85 } }}
      className={`habit-card${busy ? ' is-busy' : ''}${completedToday && canRecord ? ' is-checked' : ''}${moving ? ' is-moving' : ''}`}
      data-testid="habit-card" dir="rtl" aria-label={habit.title} aria-busy={busy}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) onCloseMenu(); }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && menuOpen) { onCloseMenu(); menuTrigger.current?.focus(); }
      }}
    >
      <div className="habit-identity">
        <img className="habit-plant" src={asset.plant}
          alt={`${asset.plantName}، گیاه ${habit.title}`} loading="lazy" />
        <div className="habit-identity-copy">
          <h3>{habit.title}</h3>
          <span className="habit-description">{habit.subtitle}</span>
          <span className={`habit-scope${habit.ownership.type === 'group' ? ' is-group' : ''}`}>
            {habit.ownership.type === 'group' ? `گروهی · ${habit.ownership.groupName}` : 'عادت شخصی'}
          </span>
          {view === 'all' && <UpcomingLabel habit={habit} />}
        </div>
      </div>

      <div className="habit-check-area">
        {canRecord ? (
          <button type="button" className={`habit-check${completedToday ? ' checked' : ''}`}
            aria-pressed={completedToday}
            aria-label={`${completedToday ? 'لغو ثبت انجام امروز' : 'ثبت انجام امروز'} برای ${habit.title}`}
            disabled={busy || recordDisabled} onClick={onToggleComplete}>
            <span className="habit-check-circle" aria-hidden="true">
              {completedToday && <Check size={14} strokeWidth={3} />}
            </span>
            <span>{completedToday ? 'انجام شد' : 'انجام امروز'}</span>
          </button>
        ) : <span className="habit-check-unavailable">
          {habit.status === 'completed' ? 'دوره تکمیل شد' : habit.today.due ? 'ثبت در دسترس نیست' : 'موعد نرسیده'}
        </span>}
      </div>

      <div className="habit-progress" dir="rtl">
        <div className="habit-progress-label"><strong>{fa(percent)}٪</strong></div>
        <div className="habit-progress-track" role="progressbar" aria-label={`پیشرفت کل ${habit.title}`}
          aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}>
          <span style={{ width: `${percent}%` }} />
        </div>
        <div className="habit-progress-details">
          <span>{fa(habit.stats.successfulOccurrences)} از {fa(habit.stats.plannedOccurrences)} نوبت</span>
        </div>
      </div>

      <div className="habit-streak" aria-label={`${fa(habit.stats.currentStreak)} ${habit.cadence === 'daily' ? 'روز' : 'نوبت'} پیوسته`} title="تعداد نوبت‌های موفق پیوسته">
        <Flame size={19} aria-hidden="true" />
        <span>{fa(habit.stats.currentStreak)} {habit.cadence === 'daily' ? 'روز' : 'نوبت'}</span>
      </div>

      <div className="habit-actions" data-habit-menu-surface={habit.id}>
        <button ref={menuTrigger} className="habit-menu-trigger" type="button" onClick={onToggleMenu}
          aria-label={`عملیات ${habit.title}`} aria-expanded={menuOpen}>
          <img src={decorativeAssets.menu} alt="" />
        </button>
        {menuOpen && (habit.ownership.type === 'personal'
          ? <HabitMenu habit={habit} onEdit={onEdit} onDelete={onDelete} />
          : <div className="habit-menu-panel" role="group" aria-label={`عملیات ${habit.title}`}>
              <p className="habit-menu-message">مدیریت چالش گروهی از بخش گروه‌ها انجام می‌شود.</p>
            </div>)}
      </div>
    </motion.article>
  );
}
