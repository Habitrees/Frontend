import { useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';
import type { Habit, UpdateHabitInput } from '../types';

const editSchema = z.object({
  title: z.string().trim().min(2, 'نام عادت باید حداقل ۲ حرف داشته باشد.').max(80, 'نام عادت طولانی است.'),
  subtitle: z.string().trim().max(120, 'توضیح عادت طولانی است.'),
});

interface EditHabitDialogProps {
  habit: Habit;
  onSave: (values: UpdateHabitInput) => Promise<boolean>;
  onDismiss: () => void;
}

/** Mock edit dialog; shown only after an action click, not part of the page layout. */
export function EditHabitDialog({ habit, onSave, onDismiss }: EditHabitDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UpdateHabitInput>({
    resolver: zodResolver(editSchema),
    defaultValues: { title: habit.title, subtitle: habit.subtitle },
  });

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => { if (dialog?.open) dialog.close(); };
  }, []);

  const submit = handleSubmit(async (values) => {
    setSaveError(null);
    const saved = await onSave(values);
    if (saved) onDismiss();
    else setSaveError('ذخیره تغییرات انجام نشد. دوباره تلاش کنید.');
  });

  return (
    <dialog ref={dialogRef} className="habit-edit-dialog" dir="rtl"
      aria-labelledby="edit-habit-title" aria-describedby="edit-habit-description"
      onCancel={(event) => { event.preventDefault(); onDismiss(); }}>
      <h2 id="edit-habit-title">ویرایش عادت</h2>
      <p id="edit-habit-description">تغییرات فعلاً فقط در داده‌های آزمایشی ذخیره می‌شوند.</p>
      <form noValidate onSubmit={(event) => { void submit(event); }}>
        <Input id="edit-habit-name" label="نام عادت" maxLength={80}
          error={errors.title?.message} {...register('title')} />
        <Input id="edit-habit-subtitle" label="توضیح کوتاه" maxLength={120}
          error={errors.subtitle?.message} {...register('subtitle')} />
        {saveError && <p role="alert" className="edit-error">{saveError}</p>}
        <div className="edit-actions">
          <Button type="button" variant="brand" className="edit-cancel" onClick={onDismiss} disabled={isSubmitting}>انصراف</Button>
          <Button type="submit" variant="brand" disabled={isSubmitting}>ذخیره تغییرات</Button>
        </div>
      </form>
    </dialog>
  );
}
