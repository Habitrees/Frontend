import { useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { HabitSort } from '../utils/habitFilters';
import { decorativeAssets } from './habitAssets';

const SORT_OPTIONS: ReadonlyArray<{ value: HabitSort; label: string }> = [
  { value: 'newest', label: 'جدیدترین' },
  { value: 'oldest', label: 'قدیمی‌ترین' },
];

interface HabitSortDropdownProps {
  value: HabitSort;
  onChange: (value: HabitSort) => void;
}

/** A Figma-styled select-like control; no browser-native popup styling differences. */
export function HabitSortDropdown({ value, onChange }: HabitSortDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const menuId = useId();
  const selectedIndex = SORT_OPTIONS.findIndex((option) => option.value === value);

  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !containerRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, [open]);

  const select = (sort: HabitSort) => {
    onChange(sort);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => optionRefs.current[selectedIndex]?.focus());
    } else if (event.key === 'Escape' && open) {
      event.preventDefault();
      setOpen(false);
    }
  };

  const onOptionKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number;
    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
      return;
    }
    if (event.key === 'ArrowDown') next = (index + 1) % SORT_OPTIONS.length;
    else if (event.key === 'ArrowUp') next = (index - 1 + SORT_OPTIONS.length) % SORT_OPTIONS.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = SORT_OPTIONS.length - 1;
    else if (event.key === 'Tab') { setOpen(false); return; }
    else return;
    event.preventDefault();
    optionRefs.current[next]?.focus();
  };

  return (
    <div className="sort-control" dir="rtl" ref={containerRef}>
      <span id={`${menuId}-label`} className="sort-label">مرتب‌سازی</span>
      <button ref={triggerRef} type="button" className="sort-trigger"
        aria-labelledby={`${menuId}-label ${menuId}-value`}
        aria-haspopup="listbox" aria-expanded={open} aria-controls={menuId}
        onClick={() => setOpen((wasOpen) => !wasOpen)} onKeyDown={onTriggerKeyDown}>
        <span id={`${menuId}-value`}>{SORT_OPTIONS[selectedIndex]?.label}</span>
        <img className={open ? 'rotate' : ''} src={decorativeAssets.sortChevron} alt="" aria-hidden="true" />
      </button>
      {open && (
        <div id={menuId} className="sort-options" role="listbox" aria-labelledby={`${menuId}-label`}>
          {SORT_OPTIONS.map((option, index) => (
            <button key={option.value} type="button" role="option" aria-selected={option.value === value}
              ref={(node) => { optionRefs.current[index] = node; }}
              onKeyDown={(event) => onOptionKeyDown(event, index)}
              onClick={() => select(option.value)}>
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
