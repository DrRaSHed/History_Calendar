import { memo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { civilizationById } from '../data/timelineData';
import { useContent } from '../i18n/content';
import { sfx } from '../lib/sound';
import { yearToU } from '../lib/timeScale';
import { useChronoStore } from '../store/useChronoStore';
import type { HistoricalEvent, Importance } from '../types/timeline';
import { WoodcutBadge } from './WoodcutBadge';

const IMPORTANCE_PIPS: Record<Importance, number> = { monumental: 3, major: 2, regional: 1 };

interface EventMarkerProps {
  event: HistoricalEvent;
  x: number;
  y: number;
  size: number;
  showLabel: boolean;
  labelSide: 'above' | 'below';
  interactive: boolean;
}

/** A lithograph medallion pinned to its stream, with hover card and story launcher. */
export const EventMarker = memo(function EventMarker({ event: baseEvent, x, y, size, showLabel, labelSide, interactive }: EventMarkerProps) {
  const [hover, setHover] = useState(false);
  const pulse = useChronoStore((s) => (s.pulse?.id === baseEvent.id ? s.pulse.seq : 0));
  const dimmed = useChronoStore((s) => s.focusCivId !== null && s.focusCivId !== baseEvent.civilizationId);
  const c = useContent();
  const event = c.event(baseEvent);
  const civ = c.civ(civilizationById[event.civilizationId]);
  const importanceLabel = c.t(`imp_${event.importance}` as const);

  if (!interactive) {
    return (
      <div className="pointer-events-none absolute" style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }} aria-hidden="true">
        <WoodcutBadge iconType={event.iconType} color={civ.color} importance={event.importance} size={size} />
      </div>
    );
  }

  const open = () => {
    const s = useChronoStore.getState();
    s.navigateTo(yearToU(event.year), { align: 'center' });
    s.openEvent(event.id);
    sfx.chime();
  };
  const cardBelow = labelSide === 'above';

  return (
    <div
      className="absolute"
      data-no-drag
      style={{
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        zIndex: hover ? 40 : event.importance === 'monumental' ? 12 : 10,
        opacity: dimmed ? 0.3 : 1,
        transition: 'opacity 350ms ease',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {pulse > 0 && (
        <motion.span
          key={pulse}
          className="pointer-events-none absolute left-1/2 top-1/2 rounded-full border-2 border-gold"
          style={{ width: size, height: size, x: '-50%', y: '-50%' }}
          initial={{ scale: 1, opacity: 0.9 }}
          animate={{ scale: 2.6, opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeOut', repeat: 1 }}
        />
      )}
      <motion.button
        type="button"
        data-event-id={event.id}
        onClick={open}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        aria-label={c.t('markerAria', { title: event.title, year: event.yearLabel, importance: importanceLabel, civ: civ.name })}
        className="relative block rounded-full drop-shadow-[0_2px_2px_rgba(46,42,38,0.35)]"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      >
        <WoodcutBadge iconType={event.iconType} color={civ.color} importance={event.importance} size={size} />
      </motion.button>

      {showLabel && (
        <div
          dir={c.dir}
          className={`pointer-events-none absolute left-1/2 w-[148px] -translate-x-1/2 border border-ink/60 bg-vellum/92 px-1.5 py-0.5 text-center shadow-sm ${
            labelSide === 'below' ? 'top-full mt-1' : 'bottom-full mb-1'
          }`}
          aria-hidden="true"
        >
          <span className="line-clamp-2 font-display text-[10px] font-semibold leading-tight tracking-wide text-ink">{event.title}</span>
          <span className="block font-mono text-[9px] text-sepia">{event.yearLabel}</span>
        </div>
      )}

      <AnimatePresence>
        {hover && (
          <motion.div
            initial={{ opacity: 0, y: cardBelow ? -6 : 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: cardBelow ? -4 : 4, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className={`pointer-events-none absolute left-1/2 z-50 w-[268px] -translate-x-1/2 ${cardBelow ? 'top-full mt-3' : 'bottom-full mb-3'}`}
            role="tooltip"
            dir={c.dir}
          >
            <div className="paper relative border border-ink p-3 shadow-[0_10px_28px_rgba(46,42,38,0.32)] outline outline-1 outline-offset-2 outline-ink/40">
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full border border-ink/60" style={{ background: civ.color }} />
                  <span className="font-garamond text-[13px] smallcaps text-ink-soft">{civ.name}</span>
                </span>
                <span className="font-mono text-[10px] text-sepia">{event.yearLabel}</span>
              </div>
              <h3 className="mt-1 font-display text-[14px] font-semibold leading-snug text-ink">{event.title}</h3>
              <p className="mt-1 font-serif text-[12.5px] leading-snug text-ink/85">{event.shortSnippet}</p>
              <div className="mt-2 flex items-center justify-between border-t border-ink/20 pt-1.5">
                <span className="flex items-center gap-1 font-mono text-[9.5px] uppercase tracking-wider text-ink-soft">
                  {Array.from({ length: 3 }, (_, i) => (
                    <span key={i} className={`inline-block h-1.5 w-1.5 rotate-45 ${i < IMPORTANCE_PIPS[event.importance] ? 'bg-gold' : 'border border-ink/30'}`} />
                  ))}
                  <span className="ms-1">{importanceLabel}</span>
                </span>
                <span className="flex items-center gap-1 font-garamond text-[13px] italic text-crimson">
                  {c.t('readStory')} <ArrowRight size={12} aria-hidden="true" className="rtl:rotate-180" />
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
