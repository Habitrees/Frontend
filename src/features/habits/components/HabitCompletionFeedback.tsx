import { Check } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

export interface CompletionFeedback {
  habitId: string;
  completed: boolean;
  title: string;
  message: string;
}

/** Non-modal, decorative celebration; announce the saved result separately. */
export function HabitCompletionFeedback({ feedback }: { feedback: CompletionFeedback | null }) {
  const reduceMotion = useReducedMotion();

  return <>
    <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
      {feedback ? (feedback.completed ? `${feedback.title} ${feedback.message}` : feedback.message) : ''}
    </p>
    <div className="habit-celebration-layer" aria-hidden="true">
      <AnimatePresence>
        {feedback?.completed && <motion.div
          key={feedback.habitId}
          className="habit-celebration-toast"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.94, y: 6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.16, ease: 'easeOut' }}>
          <span className="habit-celebration-icon"><Check size={22} strokeWidth={2.8} /></span>
          <div className="habit-celebration-copy">
            <strong>{feedback.title}</strong>
            <span>{feedback.message}</span>
          </div>
        </motion.div>}
      </AnimatePresence>
    </div>
  </>;
}
