/**
 * hero.ts — Scroll-scrubbed canvas frame animation engine
 *
 * Preloads sequential frames, draws them to a <canvas> based on
 * scroll position. Performs background lazy loading to ensure
 * instant page display without any artificial loading blocks.
 */

const TOTAL_FRAMES = 160;
const FRAME_PATH_PREFIX = '/frames/frame_';
const FRAME_EXT = '.jpg';

interface HeroState {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  frames: (HTMLImageElement | null)[];
  loadedCount: number;
  currentFrame: number;
  scrollProgress: number;
  heroSection: HTMLElement;
  stickyWrap: HTMLElement;
  overlay: HTMLElement;
  scrollIndicator: HTMLElement;
  isReady: boolean;
  rafId: number | null;
  reducedMotion: boolean;
}

let state: HeroState;

/** Zero-pad a number to 3 digits */
function padIndex(n: number): string {
  return n.toString().padStart(3, '0');
}

/** Build frame URL from index */
function frameUrl(index: number): string {
  return `${FRAME_PATH_PREFIX}${padIndex(index)}${FRAME_EXT}`;
}

/** Preload a single frame */
function loadFrame(index: number): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      state.frames[index] = img;
      state.loadedCount++;
      
      // Paint first frame immediately on load for instant visual feedback
      if (index === 0 && !state.isReady) {
        state.isReady = true;
        drawFrame(0);
        startScrollListener();
      }
      resolve(img);
    };
    img.onerror = () => {
      console.warn(`Failed to load frame ${index}`);
      state.loadedCount++;
      reject(new Error(`Frame ${index} failed`));
    };
    img.src = frameUrl(index);
  });
}

/** Draw a specific frame index onto the canvas (or the nearest loaded frame) */
function drawFrame(index: number): void {
  // Fallback: If target frame isn't loaded yet, find the nearest loaded frame
  let frame = state.frames[index];
  if (!frame) {
    // Look backward first
    for (let i = index - 1; i >= 0; i--) {
      if (state.frames[i]) {
        frame = state.frames[i];
        break;
      }
    }
    // If none found backward, look forward
    if (!frame) {
      for (let i = index + 1; i < TOTAL_FRAMES; i++) {
        if (state.frames[i]) {
          frame = state.frames[i];
          break;
        }
      }
    }
  }

  if (!frame || !state.ctx) return;

  // Reset transform to 1:1 to draw directly onto the raw pixel buffer of the canvas
  state.ctx.setTransform(1, 0, 0, 1, 0, 0);
  state.ctx.clearRect(0, 0, state.canvas.width, state.canvas.height);
  
  const canvasAspect = state.canvas.width / state.canvas.height;
  const frameAspect = frame.naturalWidth / frame.naturalHeight;
  
  let drawWidth: number, drawHeight: number, drawX: number, drawY: number;
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    // Cover-fit for mobile with focal shift to the right to keep the jar in view (continuous look)
    if (frameAspect > canvasAspect) {
      drawHeight = state.canvas.height;
      drawWidth = drawHeight * frameAspect;
      // Shift crop to the right (0.65 multiplier brings the right-side jar into viewport)
      drawX = (state.canvas.width - drawWidth) * 0.65;
      drawY = 0;
    } else {
      drawWidth = state.canvas.width;
      drawHeight = drawWidth / frameAspect;
      drawX = 0;
      drawY = (state.canvas.height - drawHeight) / 2;
    }
  } else {
    // Cover-fit for desktop viewport (zero gaps)
    if (frameAspect > canvasAspect) {
      drawHeight = state.canvas.height;
      drawWidth = drawHeight * frameAspect;
      drawX = (state.canvas.width - drawWidth) / 2;
      drawY = 0;
    } else {
      drawWidth = state.canvas.width;
      drawHeight = drawWidth / frameAspect;
      drawX = 0;
      drawY = (state.canvas.height - drawHeight) / 2;
    }
  }
  
  state.ctx.drawImage(frame, drawX, drawY, drawWidth, drawHeight);
  
  // Restore DPR transform scale for other potential drawing operations
  const dpr = window.devicePixelRatio || 1;
  state.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

/** Resize canvas to match viewport with devicePixelRatio */
function resizeCanvas(): void {
  const dpr = window.devicePixelRatio || 1;
  const rect = state.stickyWrap.getBoundingClientRect();
  
  state.canvas.width = rect.width * dpr;
  state.canvas.height = rect.height * dpr;
  state.canvas.style.width = `${rect.width}px`;
  state.canvas.style.height = `${rect.height}px`;
  
  state.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  
  // Redraw current frame after resize
  drawFrame(state.currentFrame);
}

/** Clamp value between min and max */
function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

/** Calculate scroll progress and update canvas */
function onScroll(): void {
  if (state.rafId !== null) return;
  
  state.rafId = requestAnimationFrame(() => {
    state.rafId = null;
    
    const rect = state.heroSection.getBoundingClientRect();
    const sectionTop = -rect.top;
    const scrollRange = state.heroSection.offsetHeight - window.innerHeight;
    
    state.scrollProgress = clamp(sectionTop / scrollRange, 0, 1);
    
    // Calculate frame index — bidirectional scrub
    const frameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.floor(state.scrollProgress * TOTAL_FRAMES)
    );
    
    // Only redraw if frame changed
    if (frameIndex !== state.currentFrame) {
      state.currentFrame = frameIndex;
      drawFrame(frameIndex);
    }
    
    // Fade out overlay as user scrolls (fade between 0% and 15% progress)
    const overlayOpacity = 1 - clamp(state.scrollProgress / 0.15, 0, 1);
    state.overlay.style.opacity = String(overlayOpacity);
    
    // Fade out scroll indicator
    const indicatorOpacity = 1 - clamp(state.scrollProgress / 0.05, 0, 1);
    state.scrollIndicator.style.opacity = String(indicatorOpacity);
  });
}

/** Start listening to scroll events */
function startScrollListener(): void {
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', resizeCanvas);
  onScroll();
}

/** Initialize the hero module */
export function initHero(): void {
  const canvas = document.getElementById('hero-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('Canvas 2D context not available');
    return;
  }
  
  // Check for reduced motion preference
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  state = {
    canvas,
    ctx,
    frames: new Array(TOTAL_FRAMES).fill(null),
    loadedCount: 0,
    currentFrame: 0,
    scrollProgress: 0,
    heroSection: document.getElementById('scroll-wrapper')!,
    stickyWrap: document.querySelector('.hero__sticky')!,
    overlay: document.getElementById('hero-overlay')!,
    scrollIndicator: document.getElementById('scroll-indicator')!,
    isReady: false,
    rafId: null,
    reducedMotion,
  };
  
  // Size canvas
  resizeCanvas();
  
  if (reducedMotion) {
    handleReducedMotion();
    return;
  }
  
  // Boot and start streaming frames in the background immediately
  loadFramesInBackground();
}

/** Handle reduced motion: show static frame */
async function handleReducedMotion(): Promise<void> {
  const middleFrame = Math.floor(TOTAL_FRAMES / 2);
  try {
    await loadFrame(middleFrame);
    drawFrame(middleFrame);
  } catch {
    // Silently fail
  }
  state.isReady = true;
}

/** Load all frames asynchronously in the background. Index 0 is loaded first for instant paint */
async function loadFramesInBackground(): Promise<void> {
  // 1. Load the first frame immediately to draw the page instantly
  try {
    await loadFrame(0);
  } catch {
    // fallback
  }

  // 2. Load the rest of the frames in small batches in the background
  const BATCH_SIZE = 8;
  for (let start = 1; start < TOTAL_FRAMES; start += BATCH_SIZE) {
    const end = Math.min(start + BATCH_SIZE, TOTAL_FRAMES);
    const batch: Promise<HTMLImageElement>[] = [];
    for (let i = start; i < end; i++) {
      batch.push(loadFrame(i).catch(() => new Image()));
    }
    // Allow thread yielding between batches for smooth UI thread
    await Promise.all(batch);
    await new Promise(resolve => setTimeout(resolve, 30));
  }
}
