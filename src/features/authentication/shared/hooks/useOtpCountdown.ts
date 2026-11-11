import { useEffect, useState } from "react";

/** Uses absolute deadlines so background-tab throttling cannot freeze the timer. */
export function useOtpCountdown(expiresAt?: number | null, resendAt?: number | null) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(interval);
  }, []);

  function remaining(deadline: number | null | undefined): number | null {
    return deadline == null ? null : Math.max(0, Math.ceil((deadline - now) / 1000));
  }

  return { secondsLeft: remaining(expiresAt), resendSecondsLeft: remaining(resendAt) };
}
