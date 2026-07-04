"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll } from "framer-motion";

// ==========================================
// CONFIGURABLE FRAME CONSTANTS
// ==========================================
const FRAMES_DIR = "/Animation"; 
const FRAME_COUNT = 120; 
const FILENAME_PATTERN = (index: number) => {
  // Configured filename structure: e.g. "00001.webp", "00002.webp"
  return String(index).padStart(5, "0") + ".webp";
};
const DEBUG_MODE = false; // Set to false to prevent console I/O overhead in hot paths
const OVERLAY_STYLE = {
  background: "linear-gradient(rgba(255, 248, 242, 0.05), rgba(255, 248, 242, 0.15))"
};

export default function PickleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  const [isReady, setIsReady] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

  // Monitor scroll progress of the entire window
  const { scrollYProgress } = useScroll();

  // Draw frame on canvas with contain fit and devicePixelRatio adjustments
  const drawFrameOnCanvas = useCallback((
    canvas: HTMLCanvasElement, 
    ctx: CanvasRenderingContext2D, 
    img: HTMLImageElement
  ) => {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, rect.width, rect.height);

    const scale = Math.max(
      rect.width / img.width,
      rect.height / img.height
    );
    const drawWidth = img.width * scale;
    const drawHeight = img.height * scale;
    const drawX = (rect.width - drawWidth) / 2;
    const drawY = (rect.height - drawHeight) / 2;

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  }, []);

  // 1. Preload frames sequentially using a concurrent pool with Promise.allSettled
  useEffect(() => {
    let active = true;

    const preloadAllImages = async () => {
      const loadedImages: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null);

      // Concurrency worker pool limit
      const concurrency = 4;
      const indices = Array.from({ length: FRAME_COUNT }, (_, i) => i + 1);

      const poolWorker = async () => {
        while (indices.length > 0 && active) {
          const index = indices.shift()!;
          const filename = FILENAME_PATTERN(index);
          const url = `${FRAMES_DIR}/${filename}`;

          try {
            const img = await new Promise<HTMLImageElement>((resolve, reject) => {
              const image = new Image();

              image.onload = () => {
                resolve(image);
              };

              image.onerror = () => {
                const fullUrl = `${window.location.origin}${url}`;
                console.error(`Failed to load:\n${url}\nFull URL: ${fullUrl}`);
                reject(new Error(`Failed to load ${filename}`));
              };

              image.src = url;
            });

            loadedImages[index - 1] = img;
          } catch {
            loadedImages[index - 1] = null; // Mark slot as failed
          }

          // Throttle requests with a 30ms gap to prevent local server I/O congestion in dev mode
          await new Promise((resolve) => setTimeout(resolve, 30));
        }
      };

      // Spawning initial parallel pool workers
      const workers = Array.from({ length: concurrency }, () => poolWorker());
      await Promise.allSettled(workers);

      if (!active) return;

      // Count successful loads
      const successfulCount = loadedImages.filter(img => img !== null).length;
      if (successfulCount === 0) {
        console.error("Unable to load animation sequence. All frames failed to load.");
        setLoadError(true);
        setIsReady(true); // Continue layout rendering
        return;
      }

      imagesRef.current = loadedImages;

      // Render the first frame successfully before declaring ready
      const firstFrameIndex = loadedImages.findIndex(img => img !== null);
      if (firstFrameIndex !== -1) {
        setCurrentFrameIndex(firstFrameIndex);
        
        requestAnimationFrame(() => {
          const canvas = canvasRef.current;
          if (canvas) {
            const ctx = canvas.getContext("2d");
            const firstImg = loadedImages[firstFrameIndex];
            if (ctx && firstImg) {
              drawFrameOnCanvas(canvas, ctx, firstImg);
              setIsReady(true); // Preloader fades out, layout floats up
            }
          }
        });
      }
    };

    preloadAllImages();

    return () => {
      active = false;
    };
  }, [drawFrameOnCanvas]);

  // 2. Dispatch a window resize event to force canvas aspect ratio fits
  useEffect(() => {
    if (isReady && !loadError) {
      const timer = setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isReady, loadError]);

  // 3. Map window scroll progress (0 to 1) to frame index (0 to 239)
  useEffect(() => {
    if (!isReady || loadError) return;

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.floor(latest * FRAME_COUNT))
      );
      setCurrentFrameIndex(frameIndex);
    });

    return () => unsubscribe();
  }, [isReady, loadError, scrollYProgress]);

  // 4. Draw frames using requestAnimationFrame to ensure high-performance rendering
  useEffect(() => {
    if (!isReady || loadError) return;

    const drawFrame = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Find closest successfully loaded frame
      let img = imagesRef.current[currentFrameIndex];
      if (!img) {
        for (let i = currentFrameIndex - 1; i >= 0; i--) {
          if (imagesRef.current[i]) {
            img = imagesRef.current[i];
            break;
          }
        }
      }
      if (!img) {
        for (let i = currentFrameIndex + 1; i < FRAME_COUNT; i++) {
          if (imagesRef.current[i]) {
            img = imagesRef.current[i];
            break;
          }
        }
      }

      if (img) {
        drawFrameOnCanvas(canvas, ctx, img);
        if (DEBUG_MODE) {
          console.log(`Rendering frame: ${currentFrameIndex}`);
        }
      }
    };

    const animFrameId = requestAnimationFrame(drawFrame);
    return () => cancelAnimationFrame(animFrameId);
  }, [currentFrameIndex, isReady, loadError, drawFrameOnCanvas]);

  // 5. Redraw frames on window resize events
  useEffect(() => {
    if (!isReady || loadError) return;

    const handleResize = () => {
      requestAnimationFrame(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let img = imagesRef.current[currentFrameIndex];
        if (!img) {
          for (let i = currentFrameIndex - 1; i >= 0; i--) {
            if (imagesRef.current[i]) {
              img = imagesRef.current[i];
              break;
            }
          }
        }
        if (!img) {
          for (let i = currentFrameIndex + 1; i < FRAME_COUNT; i++) {
            if (imagesRef.current[i]) {
              img = imagesRef.current[i];
              break;
            }
          }
        }
        if (img) {
          drawFrameOnCanvas(canvas, ctx, img);
        }
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentFrameIndex, isReady, loadError, drawFrameOnCanvas]);

  return (
    <>

      {/* B. Center Fallback View (if no frame renders) */}
      {loadError && (
        <div className="fixed inset-0 z-0 flex items-center justify-center bg-[#FAF4EC] px-4 text-center">
          <div className="space-y-4 max-w-md bg-white/80 backdrop-blur-md border border-beige/40 p-8 rounded-2xl shadow-lg">
            <p className="font-serif text-lg font-bold text-text-dark">
              Unable to load animation sequence.
            </p>
            <p className="text-xs text-text-light leading-relaxed">
              We are displaying the collection floating over a traditional background layout.
            </p>
          </div>
        </div>
      )}

      {/* C. Global Fullscreen Fixed Canvas Background (z-index 0) */}
      {!loadError && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 w-screen h-screen object-cover pointer-events-none select-none z-0"
        />
      )}

      {/* D. Subtle transparent gradient overlay (z-index 1) */}
      <div
        className="fixed inset-0 pointer-events-none z-10"
        style={OVERLAY_STYLE}
      />
    </>
  );
}
