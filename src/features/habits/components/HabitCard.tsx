import type { Habit } from '../types';
import { decorativeAssets, habitAssets } from './habitAssets';

const WEEK_DAYS = ['ج', 'پ', 'چ', 'س', 'د', 'ی', 'ش'] as const;
const WEEK_DAY_NAMES = ['جمعه', 'پنجشنبه', 'چهارشنبه', 'سه‌شنبه', 'دوشنبه', 'یکشنبه', 'شنبه'] as const;
const fa = (n: number) => n.toLocaleString('fa-IR');

interface HabitCardProps {
  habit: Habit;
  /** Only the original action icons are rendered; the host handles their behavior. */
  menuOpen: boolean;
  busy: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

function Week({ habit }: { habit: Habit }) {
  return (
    <div className="weekly" dir="rtl">
      <span>انجام این هفته</span>
      <div className="week" dir="ltr" role="group" aria-label={`عملکرد هفتگی ${habit.title}`}>
        {WEEK_DAYS.map((day, index) => {
          const done = habit.weekCompletions[index] ?? false;
          return (
            <div className="day" key={WEEK_DAY_NAMES[index]}>
              <span aria-hidden="true">{day}</span>
              <i className={done ? 'checked' : ''} role="img"
                aria-label={`${WEEK_DAY_NAMES[index]}: ${done ? 'انجام شده' : 'انجام نشده'}`}>
                {done && <img src={decorativeAssets.check} alt="" />}
              </i>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function HabitProgress({ habit }: { habit: Habit }) {
  const { measurement, today, stats } = habit;
  const completed = today.value ?? 0;
  const label = measurement.type === 'binary'
    ? today.status === 'completed' ? 'انجام شده' : 'هنوز ثبت نشده'
    : `${fa(completed)} از ${fa(measurement.target)} ${measurement.unit}`;
  const percent = Math.min(100, Math.max(0, stats.completionPercent));

  return (
    <div className="progress" dir="rtl">
      <span>{label}</span>
      <div className="progress-track" role="progressbar" aria-label={`پیشرفت ${habit.title}`}
        aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}>
        <i style={{ width: `${percent}%` }} />
      </div>
      <small>{habit.today.status === 'completed' ? 'هدف امروز کامل شد' : 'ادامه بده؛ هر قدم ارزشمنده'}</small>
    </div>
  );
}

function HabitActions({ habit, onEdit, onDelete }: Pick<HabitCardProps, 'habit' | 'onEdit' | 'onDelete'>) {
  return (
    <div className="menu-panel" data-habit-menu-surface={habit.id} role="group" aria-label={`عملیات ${habit.title}`} dir="rtl">
      <button type="button" onClick={onEdit} aria-label="ویرایش عادت">
        <img src={decorativeAssets.edit} alt="" aria-hidden="true" />
      </button>
      <button type="button" className="delete" onClick={onDelete} aria-label="حذف عادت">
        <img src={decorativeAssets.trash} alt="" aria-hidden="true" />
      </button>
    </div>
  );
}

export function HabitCard({ habit, menuOpen, busy, onToggleMenu, onCloseMenu, onEdit, onDelete }: HabitCardProps) {
  const assets = habitAssets[habit.icon];

  return (
    <article data-testid="habit-card" aria-label={habit.title}
      className={`habit-card${menuOpen ? ' menu-open' : ''}${busy ? ' is-busy' : ''}`}
      aria-busy={busy}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) onCloseMenu(); }}
      onKeyDown={(event) => { if (event.key === 'Escape') onCloseMenu(); }}>
      <div className="desktop-menu">
        <button type="button" className="ellipsis" data-habit-menu-surface={habit.id} onClick={onToggleMenu}
          aria-label={`عملیات ${habit.title}`} aria-expanded={menuOpen}>
          <img src={decorativeAssets.menu} alt="" />
        </button>
        {menuOpen && <HabitActions habit={habit} onEdit={onEdit} onDelete={onDelete} />}
      </div>

      <div className="responsive-heading">
        <button type="button" className="ellipsis" data-habit-menu-surface={habit.id} onClick={onToggleMenu}
          aria-label={`عملیات ${habit.title}`} aria-expanded={menuOpen}>
          <img src={decorativeAssets.menu} alt="" />
        </button>
        <div className="habit-name" dir="rtl">
          <strong>{habit.title}</strong>
          <span>{habit.subtitle}</span>
        </div>
        <div className={`habit-symbol${habit.icon === 'water' ? ' water' : ''}`} aria-hidden="true">
          <img src={assets.iconResponsive} alt="" />
        </div>
        {menuOpen && (
          <div className="responsive-menu-panel">
            <HabitActions habit={habit} onEdit={onEdit} onDelete={onDelete} />
          </div>
        )}
      </div>

      <picture className="plant">
        <img src={assets.plant} alt={`${assets.plantName}، گیاه مرتبط با ${habit.title}`} loading="lazy" decoding="async" />
      </picture>

      <div className="desktop-streak" dir="rtl">
        <img src={decorativeAssets.flame} alt="" aria-hidden="true" />
        <strong>{fa(habit.stats.currentStreak)} روز</strong>
      </div>
      <Week habit={habit} />
      <HabitProgress habit={habit} />

      <div className="desktop-identity" dir="rtl">
        <div><strong>{habit.title}</strong><span>{habit.subtitle}</span></div>
        <img src={assets.iconDesktop} alt="" aria-hidden="true" />
      </div>

      <div className="responsive-streak" dir="rtl">
        <strong>{fa(habit.stats.currentStreak)} روز پیوسته</strong>
        <span>زنجیره فعلی</span>
      </div>
    </article>
  );
}
