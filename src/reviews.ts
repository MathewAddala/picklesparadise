/**
 * reviews.ts — Auto-playing testimonials slider
 */

export function initReviews(): void {
  const grid = document.querySelector('.reviews__grid') as HTMLElement | null;
  if (!grid) return;

  let autoPlayInterval: number | null = null;
  const slideDelay = 4000; // 4 seconds per slide for high readability
  let isInteracting = false;

  // Start autoplay
  function startAutoPlay(): void {
    if (autoPlayInterval) return;
    autoPlayInterval = window.setInterval(() => {
      if (isInteracting) return;

      const firstCard = grid!.firstElementChild as HTMLElement;
      if (!firstCard) return;

      const cardWidth = firstCard.offsetWidth;
      const gap = parseFloat(window.getComputedStyle(grid!).gap) || 0;
      const step = cardWidth + gap;

      if (step <= 0) return;

      const currentScroll = grid!.scrollLeft;
      const maxScroll = grid!.scrollWidth - grid!.clientWidth;

      // If we are at or near the end, loop back to the start smoothly
      if (currentScroll >= maxScroll - 10) {
        grid!.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Calculate the next target position aligned to card boundaries
        const nextTarget = Math.round((currentScroll + step) / step) * step;
        grid!.scrollTo({ left: Math.min(nextTarget, maxScroll), behavior: 'smooth' });
      }
    }, slideDelay);
  }

  // Stop autoplay
  function stopAutoPlay(): void {
    if (autoPlayInterval) {
      window.clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
  }

  // Event listeners to temporarily pause autoplay during manual interaction
  grid.addEventListener('mouseenter', () => {
    isInteracting = true;
    stopAutoPlay();
  });

  grid.addEventListener('mouseleave', () => {
    isInteracting = false;
    startAutoPlay();
  });

  grid.addEventListener('touchstart', () => {
    isInteracting = true;
    stopAutoPlay();
  }, { passive: true });

  grid.addEventListener('touchend', () => {
    // Resume autoplay after a small delay to let scroll settle
    setTimeout(() => {
      isInteracting = false;
      startAutoPlay();
    }, 1500);
  }, { passive: true });

  // Initial trigger
  startAutoPlay();
}
