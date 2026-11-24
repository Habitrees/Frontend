import { CalendarDays, Layers, CircleCheck } from 'lucide-react';
import { HabitSortDropdown } from './HabitSortDropdown';
import type { HabitSort, HabitStatusFilter } from '../utils/habitFilters';

interface HabitFiltersProps {
  sort: HabitSort;
  status: HabitStatusFilter;
  counts: { all: number; today: number; completed: number };
  onSortChange: (sort: HabitSort) => void;
  onStatusChange: (status: HabitStatusFilter) => void;
}

export function HabitFilters({ sort, status, counts, onSortChange, onStatusChange }: HabitFiltersProps) {
  const tabs = [
    { value: 'today', label: 'امروز', icon: CalendarDays },
    { value: 'all', label: 'همه', icon: Layers },
    { value: 'completed', label: 'تکمیل‌شده', icon: CircleCheck },
  ] as const;

  return <div className="habit-navigation">
    <div className="tabs" dir="rtl" role="group" aria-label="نمایش عادت‌ها">
      {tabs.map(({ value, label, icon: Icon }) => <button type="button" key={value}
        aria-pressed={value === status} className={value === status ? 'selected' : ''}
        onClick={() => onStatusChange(value)}>
        <Icon size={18} aria-hidden="true" />
        <span>{label}</span><span className="tab-count">{counts[value].toLocaleString('fa-IR')}</span>
      </button>)}
    </div>
    <div className="habit-sort-row"><HabitSortDropdown value={sort} onChange={onSortChange} /></div>
  </div>;
}
