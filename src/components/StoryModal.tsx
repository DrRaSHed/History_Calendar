import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { civilizationById, eventById, foldPanels, timelineEvents } from '../data/timelineData';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useContent } from '../i18n/content';
import { sfx } from '../lib/sound';
import { panelIndexAt, yearToU } from '../lib/timeScale';
import { useChronoStore } from '../store/useChronoStore';
import type { HistoricalEvent } from '../types/timeline';
import { CornerBrackets } from './Ornaments';
import { StoryDossier } from './StoryDossier';
import { StoryPlayer } from './StoryPlayer';
import { WoodcutBadge } from './WoodcutBadge';

/** Immersive story reader for the active event. */
export function StoryModal() {
  const id = useChronoStore((s) => s.activeEventId);
  const event = id ? eventById[id] : null;
  return <AnimatePresence>{event && <StoryDialog key="story" event={event} />}</AnimatePresence>;
}

function StoryDialog({ event: baseEvent }: { event: HistoricalEvent }) {
  const c = useContent();
  const { t } = c;
  const event = c.event(baseEvent);
  const ref = useRef<HTMLDivElement>(null);
  const close = useChronoStore((s) => s.closeEvent);
  useFocusTrap(ref, close);

  const idx = timelineEvents.findIndex((e) => e.id === event.id);
  const prev = timelineEvents[idx - 1];
  const next = timelineEvents[idx + 1];
  const baseCiv = civilizationById[event.civilizationId];
  const civ = c.civ(baseCiv);
  const basePanel = foldPanels[panelIndexAt(yearToU(event.year))];
  const panel = c.panel(basePanel);

  const goToEvent = (e?: HistoricalEvent) => {
    if (!e) return;
    const s = useChronoStore.getState();
    s.openEvent(e.id);
    if (s.mode === 'panorama') s.navigateTo(yearToU(e.year), { align: 'center' });
    s.pulseEvent(e.id);
    sfx.flick();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!e.shiftKey) return;
      if (e.key === 'ArrowRight' && next) {
        e.preventDefault();
        goToEvent(next);
      } else if (e.key === 'ArrowLeft' && prev) {
        e.preventDefault();
        goToEvent(prev);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-stretch justify-center roomy:p-4 lg:roomy:p-7"
      dir={c.dir}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="absolute inset-0 bg-[rgba(30,24,18,0.58)] backdrop-blur-[2px]" onClick={close} aria-hidden="true" />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="story-title"
        aria-describedby="story-snippet"
        tabIndex={-1}
        className="paper relative flex w-full max-w-[1320px] flex-col overflow-hidden shadow-[0_24px_60px_rgba(20,14,8,0.45)] outline-none roomy:border roomy:border-ink"
        initial={{ y: 28, scale: 0.975, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 18, scale: 0.98, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <CornerBrackets size={20} inset={4} className="hidden text-ink/70 roomy:block" />
        <header className="flex items-start gap-3 border-b-[3px] border-double border-ink/70 px-4 py-3 sm:gap-4 sm:px-7 roomy:py-4">
          <div className="hidden shrink-0 roomy:block">
            <WoodcutBadge iconType={event.iconType} color={civ.color} importance={event.importance} size={64} />
          </div>
          <div className="min-w-0 flex-1">
            <AnimatePresence mode="wait">
              <motion.div key={event.id} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25 }}>
                <p className="flex flex-wrap items-center gap-x-2 font-mono text-[10px] uppercase tracking-[0.16em] text-sepia">
                  <span>{t('panelWord', { numeral: panel.numeral })}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full" style={{ background: civ.color }} />
                    {civ.name}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{event.yearLabel}</span>
                </p>
                <h2 id="story-title" className="mt-0.5 font-display text-[18px] font-semibold leading-tight text-ink roomy:text-[28px]">
                  {event.title}
                </h2>
                <p id="story-snippet" className="mt-0.5 hidden font-garamond text-[15px] italic leading-snug text-ink-soft roomy:block roomy:text-[16px]">
                  {event.shortSnippet}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex shrink-0 items-center">
            <button
              type="button"
              onClick={() => goToEvent(prev)}
              disabled={!prev}
              title={prev ? t('prevTitle', { title: c.event(prev).title }) : undefined}
              aria-label={prev ? t('prevEvent', { title: c.event(prev).title }) : t('noPrev')}
              className="grid h-8 w-8 place-items-center border border-ink/70 bg-vellum text-ink hover:bg-parchment disabled:opacity-30 sm:h-9 sm:w-9"
            >
              <ChevronLeft size={17} aria-hidden="true" className="rtl:rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => goToEvent(next)}
              disabled={!next}
              title={next ? t('nextTitle', { title: c.event(next).title }) : undefined}
              aria-label={next ? t('nextEvent', { title: c.event(next).title }) : t('noNext')}
              className="-ml-px grid h-8 w-8 place-items-center border border-ink/70 bg-vellum text-ink hover:bg-parchment disabled:opacity-30 sm:h-9 sm:w-9"
            >
              <ChevronRight size={17} aria-hidden="true" className="rtl:rotate-180" />
            </button>
            <button
              type="button"
              onClick={close}
              aria-label={t('closeStory')}
              className="ms-2 grid h-8 w-8 place-items-center border border-ink bg-ink text-vellum hover:bg-crimson sm:h-9 sm:w-9"
            >
              <X size={17} aria-hidden="true" />
            </button>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto lg:grid lg:grid-cols-[1.18fr_1fr] lg:overflow-hidden">
          <StoryPlayer key={`player-${event.id}`} event={baseEvent} civ={baseCiv} />
          <StoryDossier key={`dossier-${event.id}`} event={baseEvent} civ={baseCiv} panel={basePanel} />
        </div>
      </motion.div>
    </motion.div>
  );
}
