import { Input } from '../../../shared/components/Input';
import { HabitSortDropdown } from './HabitSortDropdown';
import type { HabitSort, HabitStatusFilter } from '../utils/habitFilters';

interface HabitFiltersProps {
  query: string;
  sort: HabitSort;
  status: HabitStatusFilter;
  counts: { all: number; active: number; completed: number };
  onQueryChange: (query: string) => void;
  onSortChange: (sort: HabitSort) => void;
  onStatusChange: (status: HabitStatusFilter) => void;
}

export function HabitFilters({ query, sort, status, counts, onQueryChange, onSortChange, onStatusChange }: HabitFiltersProps) {
  const tabs: { value: HabitStatusFilter; label: string; count: number }[] = [
    { value: 'completed', label: 'تکمیل‌شده', count: counts.completed },
    { value: 'active', label: 'فعال', count: counts.active },
    { value: 'all', label: 'همه', count: counts.all },
  ];

  return (
    <>
      <div className="filters" dir="ltr">
        <HabitSortDropdown value={sort} onChange={onSortChange} />
        <div className="search-control" dir="rtl">
          <Input id="habits-search" label="جست‌وجوی عادت" type="search"
            autoComplete="off" value={query} onChange={(e) => onQueryChange(e.target.value)}
            placeholder="نام عادت را بنویس…" />
        </div>
      </div>
      <div className="tabs" role="group" aria-label="فیلتر وضعیت عادت‌ها">
        {tabs.map(({ value, label, count }) => (
          <button key={value} type="button" aria-pressed={status === value}
            className={status === value ? 'selected' : ''}
            onClick={() => onStatusChange(value)}>
            {label} ({count.toLocaleString('fa-IR')})
          </button>
        ))}
      </div>
    </>
  );
}
