import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { animate, AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MousePointerClick } from 'lucide-react';
import { useElementSize } from '../hooks/useElementSize';
import { useContent } from '../i18n/content';
import { useChronoStore } from '../store/useChronoStore';
import { LaneLegend } from './LaneLegend';
import { MAP_LAYOUT, MapCanvas } from './MapCanvas';

const MIN_HEIGHT = 440;
const HINT_KEY = 'chronosfold:hint-seen';

function readHintSeen(): boolean {
  try {
    return sessionStorage.getItem(HINT_KEY) === '1';
  } catch {
    return false;
  }
}

/** The unfolded panorama: a continuous, pannable river of time. */
export function PanoramaStage() {
  const [setScrollEl, viewport, scrollEl] = useElementSize<HTMLDivElement>();
  const c = useContent();
  const { t } = c;
  const coarse = typeof matchMedia === 'function' && matchMedia('(pointer: coarse)').matches;
  const contentRef = useRef<HTMLDivElement>(null);
  const zoom = useChronoStore((s) => s.zoom);
  const nav = useChronoStore((s) => s.nav);
  const legendOpen = useChronoStore((s) => s.legendOpen);
  const reduced = useReducedMotion();
  const [dragging, setDragging] = useState(false);
  const [showHint, setShowHint] = useState(() => !readHintSeen());

  const W = Math.max(1, Math.round(viewport.width * zoom * 4));
  const H = Math.max(viewport.height, MIN_HEIGHT);
  const compact = viewport.width < 640;

  const lastScroll = useRef(0);
  const prevW = useRef(0);
  const consumedNav = useRef(0);
  const anim = useRef<{ stop: () => void } | null>(null);
  const inertiaRaf = useRef(0);
  const scrollRaf = useRef(0);

  const stopMotion = useCallback(() => {
    anim.current?.stop();
    anim.current = null;
    cancelAnimationFrame(inertiaRaf.current);
  }, []);

  const report = useCallback(() => {
    if (!scrollEl || W <= 1) return;
    lastScroll.current = scrollEl.scrollLeft;
    const start = scrollEl.scrollLeft / W;
    const end = (scrollEl.scrollLeft + scrollEl.clientWidth) / W;
    useChronoStore.getState().setView(Math.max(0, start), Math.min(1, end));
  }, [scrollEl, W]);

  // Keep the anchored instant in place while zooming or resizing.
  useLayoutEffect(() => {
    if (!scrollEl || viewport.width === 0) return;
    if (prevW.current && prevW.current !== W) {
      const anchorPx = useChronoStore.getState().zoomAnchor * viewport.width;
      const u = (lastScroll.current + anchorPx) / prevW.current;
      stopMotion();
      scrollEl.scrollLeft = u * W - anchorPx;
    }
    prevW.current = W;
    report();
  }, [W, scrollEl, viewport.width, report, stopMotion]);

  // Navigation requests from the minimap, header, keyboard and story reader.
  useLayoutEffect(() => {
    if (!scrollEl || !nav || viewport.width === 0 || nav.seq === consumedNav.current) return;
    consumedNav.current = nav.seq;
    const max = W - scrollEl.clientWidth;
    const offset = legendOpen ? (compact ? 100 : 150) : 24;
    const raw = nav.align === 'center' ? nav.u * W - scrollEl.clientWidth / 2 : nav.u * W - offset;
    const target = Math.min(max, Math.max(0, raw));
    stopMotion();
    if (nav.instant || reduced) {
      scrollEl.scrollLeft = target;
      report();
      return;
    }
    anim.current = animate(scrollEl.scrollLeft, target, {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        scrollEl.scrollLeft = v;
      },
    });
  }, [nav, scrollEl, viewport.width, W, legendOpen, compact, reduced, report, stopMotion]);

  // Wheel: vertical wheel pans through time; ctrl/⌘ + wheel (or pinch) zooms at the cursor.
  useEffect(() => {
    if (!scrollEl) return;
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const rect = scrollEl.getBoundingClientRect();
        const s = useChronoStore.getState();
        s.setZoom(s.zoom * Math.exp(-e.deltaY * 0.0022), (e.clientX - rect.left) / rect.width);
        return;
      }
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && !e.shiftKey) {
        e.preventDefault();
        stopMotion();
        scrollEl.scrollLeft += e.deltaY * (e.deltaMode === 1 ? 36 : 1);
      }
    };
    scrollEl.addEventListener('wheel', onWheel, { passive: false });
    return () => scrollEl.removeEventListener('wheel', onWheel);
  }, [scrollEl, stopMotion]);

  useEffect(() => () => stopMotion(), [stopMotion]);

  useEffect(() => {
    if (!showHint) return;
    const t = window.setTimeout(() => {
      setShowHint(false);
      try {
        sessionStorage.setItem(HINT_KEY, '1');
      } catch {
        /* storage unavailable */
      }
    }, 6000);
    return () => window.clearTimeout(t);
  }, [showHint]);

  const onScroll = () => {
    cancelAnimationFrame(scrollRaf.current);
    scrollRaf.current = requestAnimationFrame(report);
  };

  // Mouse drag-to-pan with a little inertia; touch uses native scrolling.
  const drag = useRef<{ x: number; scroll: number; moved: boolean; id: number; lastX: number; lastT: number; v: number } | null>(null);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!scrollEl || e.pointerType === 'touch' || e.button !== 0) return;
    if ((e.target as HTMLElement).closest('button, a, [data-no-drag]')) return;
    stopMotion();
    drag.current = { x: e.clientX, scroll: scrollEl.scrollLeft, moved: false, id: e.pointerId, lastX: e.clientX, lastT: performance.now(), v: 0 };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || !scrollEl) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 4) {
      d.moved = true;
      scrollEl.setPointerCapture(d.id);
      setDragging(true);
    }
    if (!d.moved) return;
    scrollEl.scrollLeft = d.scroll - dx;
    const now = performance.now();
    const dt = now - d.lastT;
    if (dt > 0) d.v = 0.75 * ((e.clientX - d.lastX) / dt) + 0.25 * d.v;
    d.lastX = e.clientX;
    d.lastT = now;
  };

  const centreAt = (clientX: number) => {
    const rect = contentRef.current?.getBoundingClientRect();
    if (!rect) return;
    useChronoStore.getState().navigateTo((clientX - rect.left) / W, { align: 'center' });
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    drag.current = null;
    if (!d || !scrollEl) return;
    if (d.moved) {
      setDragging(false);
      if (scrollEl.hasPointerCapture(d.id)) scrollEl.releasePointerCapture(d.id);
      let v = -d.v * 16;
      if (reduced || Math.abs(v) < 2) return;
      const step = () => {
        v *= 0.93;
        scrollEl.scrollLeft += v;
        if (Math.abs(v) > 0.4) inertiaRaf.current = requestAnimationFrame(step);
      };
      inertiaRaf.current = requestAnimationFrame(step);
    } else if ((e.target as HTMLElement).closest('[data-axis-zone]')) {
      centreAt(e.clientX);
    }
  };

  const { top, bottom } = MAP_LAYOUT.panorama;

  return (
    <div className="absolute inset-0">
      <div
        ref={setScrollEl}
        dir="ltr"
        className={`panorama-scroll absolute inset-0 overflow-x-auto overflow-y-auto ${dragging ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDoubleClick={(e) => {
          if (!(e.target as HTMLElement).closest('button, [data-no-drag]')) centreAt(e.clientX);
        }}
        tabIndex={0}
        role="region"
        aria-roledescription="timeline"
        aria-label={t('panoramaAria')}
      >
        {viewport.width > 0 && (
          <div ref={contentRef} className="relative" style={{ width: W, height: H }}>
            <LaneLegend totalWidth={W} height={H} compact={compact} />
            <MapCanvas totalWidth={W} height={H} variant="panorama" />
            <div
              data-axis-zone
              className="absolute left-0 cursor-pointer"
              style={{ top: 34, height: top - 34, width: W }}
              title={t('axisClick')}
            />
            <div
              data-axis-zone
              className="absolute left-0 cursor-pointer"
              style={{ top: H - bottom, height: bottom, width: W }}
              title={t('axisClick')}
            />
          </div>
        )}
      </div>

      {/* Paper edge shading. */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[rgba(90,65,40,0.14)] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-[rgba(90,65,40,0.12)] to-transparent" />

      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            dir={c.dir}
            className="pointer-events-none absolute bottom-12 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 border border-ink/70 bg-vellum/95 px-3 py-1.5 font-garamond text-[14px] italic text-ink shadow-md"
          >
            <MousePointerClick size={15} aria-hidden="true" />
            {t(coarse ? 'hintPanTouch' : 'hintPan')}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
