import confetti from 'canvas-confetti';

/** Decorative feedback only; a celebration failure must not affect a saved check-in. */
export async function celebrateHabitCompletion(): Promise<void> {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  try {
    const tokens = window.getComputedStyle(document.documentElement);
    const colors = ['--brand', '--sage', '--accent']
      .map((token) => tokens.getPropertyValue(token).trim())
      .filter((color) => /^#[\da-f]{6}$/i.test(color));

    // The current design tokens are hex colors, as required by canvas-confetti.
    if (colors.length === 0) return;

    await confetti({
      particleCount: 56,
      spread: 135,
      startVelocity: 24,
      gravity: 1.15,
      ticks: 90,
      scalar: 0.85,
      origin: { x: 0.5, y: 0.5 },
      colors,
      zIndex: 45,
      disableForReducedMotion: true,
    });
  } catch {
    // The optional animation can fail without interrupting the user's workflow.
  }
}
