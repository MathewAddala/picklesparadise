/**
 * outro.ts — Outro background video controller
 *
 * Automatically plays the full-bleed outro video when scrolled
 * into view, and pauses it when out of view.
 */

interface OutroState {
  video: HTMLVideoElement;
  content: HTMLElement;
  isPlaying: boolean;
}

let outroState: OutroState;

/** Setup IntersectionObserver for auto play/pause */
function setupPlayObserver(): void {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        outroState.video.play()
          .then(() => {
            outroState.isPlaying = true;
          })
          .catch(() => {
            // Autoplay might be blocked by browser policy until interaction
          });
      } else {
        outroState.video.pause();
        outroState.isPlaying = false;
      }
    },
    { threshold: 0.25 } // Trigger when 25% of the video is visible
  );
  
  observer.observe(outroState.video);
}

/** Setup preload observer — load full video when near viewport */
function setupPreloadObserver(): void {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        outroState.video.preload = 'auto';
        observer.disconnect();
      }
    },
    { rootMargin: '300px 0px' }
  );
  
  observer.observe(outroState.video);
}

/** Reveal text content on scroll */
function setupContentReveal(): void {
  outroState.content.classList.add('reveal');
  
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        outroState.content.classList.add('revealed');
        observer.disconnect();
      }
    },
    { threshold: 0.3 }
  );
  
  observer.observe(outroState.content);
}

/** Initialize the outro module */
export function initOutro(): void {
  const video = document.getElementById('outro-video') as HTMLVideoElement;
  const content = document.querySelector('.outro__content') as HTMLElement;
  const storyPanel = document.querySelector('.outro__story-panel') as HTMLElement;
  const discoverBtn = document.getElementById('discover-story-btn') as HTMLButtonElement;
  const closeBtn = document.getElementById('close-story-btn') as HTMLButtonElement;
  
  if (!video || !content) return;
  
  outroState = {
    video,
    content,
    isPlaying: false,
  };
  
  setupPreloadObserver();
  setupPlayObserver();
  setupContentReveal();

  if (discoverBtn && storyPanel) {
    discoverBtn.addEventListener('click', () => {
      content.classList.add('outro__content--hidden');
      storyPanel.classList.add('outro__story-panel--active');
    });
  }

  if (closeBtn && storyPanel) {
    closeBtn.addEventListener('click', () => {
      content.classList.remove('outro__content--hidden');
      storyPanel.classList.remove('outro__story-panel--active');
    });
  }
}
