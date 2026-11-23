import { useEffect, useRef } from 'react';
import { Button } from '../../../shared/components/Button';
import type { Habit } from '../types';

interface DeleteHabitDialogProps {
  habit: Habit;
  busy: boolean;
  error?: string | null;
  onConfirm: () => Promise<void>;
  onDismiss: () => void;
}

/** Explicit confirmation before deleting a mock habit; the repository stays the source of truth. */
export function DeleteHabitDialog({ habit, busy, error, onConfirm, onDismiss }: DeleteHabitDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => { if (dialog?.open) dialog.close(); };
  }, []);

  return (
    <dialog ref={dialogRef} className="habit-delete-dialog" dir="rtl"
      aria-labelledby="delete-habit-title" aria-describedby="delete-habit-description"
      onCancel={(event) => { event.preventDefault(); if (!busy) onDismiss(); }}>
      <h2 id="delete-habit-title">حذف عادت</h2>
      <p id="delete-habit-description">آیا مطمئن هستید که می‌خواهید عادت «{habit.title}» را حذف کنید؟</p>
      {error && <p className="delete-error" role="alert">{error}</p>}
      <div className="delete-actions">
        <Button variant="brand" className="delete-cancel" type="button" onClick={onDismiss} disabled={busy}>
          انصراف
        </Button>
        <Button variant="brand" type="button" onClick={() => { void onConfirm(); }} disabled={busy}>
          {busy ? 'در حال حذف…' : 'بله، حذف شود'}
        </Button>
      </div>
    </dialog>
  );
}
