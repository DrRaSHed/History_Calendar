import { useEffect } from 'react';
import {
  animate,
  AnimatePresence,
  motion,
  type MotionValue,
  useMotionValue,
  usePresence,
  useReducedMotion,
  useTransform,
} from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { civilizations, foldPanels, timelineEvents } from '../data/timelineData';
import { useElementSize } from '../hooks/useElementSize';
import { useContent } from '../i18n/content';
import { sfx } from '../lib/sound';
import { useChronoStore } from '../store/useChronoStore';
import type { FoldPanel } from '../types/timeline';
import { MapCanvas } from './MapCanvas';
import { CornerBrackets } from './Ornaments';
import { PanoramaStage } from './PanoramaStage';

const THETA = 24; // crease angle in degrees
const RAD = (THETA * Math.PI) / 180;

/** Switches between the 4-leaf folded atlas and the flat panoramic canvas. */
export function AccordionFoldContainer() {
  const mode = useChronoStore((s) => s.mode);
  return (
    <AnimatePresence mode="wait" initial={false}>
      {mode === 'fold' ? (
        <FoldedChart key="fold" />
      ) : (
        <motion.div
          key="panorama"
          className="absolute inset-0"
          initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0.4 }}
          animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
          exit={{ opacity: 0, scale: 0.985 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <PanoramaStage />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FoldedChart() {
  const [setEl, size] = useElementSize<HTMLDivElement>();
  const c = useContent();
  const { t } = c;
  const progress = useMotionValue(0);
  const [isPresent, safeToRemove] = usePresence();
  const reduced = useReducedMotion();

  // Fold up on arrival; flatten out before leaving so the panorama "unrolls" from it.
  useEffect(() => {
    if (isPresent) {
      const c = animate(progress, 1, { duration: reduced ? 0 : 1.2, delay: reduced ? 0 : 0.15, ease: [0.65, 0, 0.35, 1] });
      return () => c.stop();
    }
    const c = animate(progress, 0, { duration: reduced ? 0 : 0.5, ease: [0.4, 0, 0.2, 1] });
    c.then(() => safeToRemove?.());
    return () => c.stop();
  }, [isPresent, progress, reduced, safeToRemove]);

  const vertical = size.width > 0 && size.width < 720;
  const cos = Math.cos(RAD);
  // On short screens (phones, landscape) the title block would crowd the leaves out, so it gives way to the hint line.
  const showCap = size.height === 0 || size.height >= 520;
  const capH = showCap ? (vertical ? 92 : 128) : 30;
  const availW = Math.max(0, size.width - (vertical ? 28 : 72));
  const availH = Math.max(0, size.height - capH - 28);
  let leafW: number;
  let leafH: number;
  if (vertical) {
    leafH = Math.min(availH / (1 + 3 * cos), 210);
    leafW = Math.min(availW, 560);
  } else {
    leafW = Math.min(availW / (1 + 3 * cos), showCap ? availH / 1.3 : Infinity, 430);
    leafH = Math.min(availH, leafW * 1.42);
  }

  const unfold = (i: number) => {
    sfx.fold();
    useChronoStore.getState().unfoldTo(i / 4);
  };

  return (
    <div ref={setEl} dir="ltr" className="absolute inset-0 flex flex-col items-center justify-center gap-3 overflow-hidden px-3">
      {showCap && (
        <motion.header
          dir={c.dir}
          className="text-center"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="font-mono text-[10px] uppercase tracking-engraved text-sepia">{t('foldKicker')}</p>
          <h2 className="font-display text-lg font-semibold tracking-[0.14em] text-ink sm:text-2xl">{t('foldTitle')}</h2>
          {!vertical && (
            <p className="font-garamond text-[15px] italic text-ink-soft">
              {t('foldSub')}
            </p>
          )}
        </motion.header>
      )}

      {leafW > 0 && leafH > 0 && (
        <div className="relative" style={{ perspective: 2400, perspectiveOrigin: '50% 35%' }}>
          <div className={vertical ? 'flex flex-col' : 'flex'} style={{ transformStyle: 'preserve-3d' }}>
            {foldPanels.map((p, i) => (
              <Leaf key={p.id} panel={p} index={i} progress={progress} w={leafW} h={leafH} vertical={vertical} onOpen={() => unfold(i)} />
            ))}
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-6 left-[6%] right-[6%] h-8 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(46,42,38,0.28),transparent_70%)] blur-sm"
          />
        </div>
      )}

      <motion.div
        dir={c.dir}
        className="flex max-w-3xl flex-wrap items-center justify-center gap-x-3 gap-y-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <span className="flex items-center gap-1 font-garamond text-[14px] italic text-ink">
          {t('foldClick')} <ArrowRight size={13} aria-hidden="true" className="rtl:rotate-180" />
        </span>
        {!vertical &&
          showCap &&
          civilizations.map((civ) => (
            <span key={civ.id} className="flex items-center gap-1 font-garamond text-[12.5px] text-ink-soft smallcaps">
              <span className="h-2.5 w-2.5 rounded-full border border-ink/60" style={{ background: civ.color }} />
              {c.civ(civ).name}
            </span>
          ))}
      </motion.div>
    </div>
  );
}

interface LeafProps {
  panel: FoldPanel;
  index: number;
  progress: MotionValue<number>;
  w: number;
  h: number;
  vertical: boolean;
  onOpen: () => void;
}

function Leaf({ panel: basePanel, index, progress, w, h, vertical, onOpen }: LeafProps) {
  const c = useContent();
  const { t } = c;
  const panel = c.panel(basePanel);
  const sign = index % 2 === 0 ? 1 : -1;
  const rotate = useTransform(progress, (p) => p * THETA * sign);
  const overlap = useTransform(progress, (p) => (index === 0 ? 0 : -(vertical ? h : w) * (1 - Math.cos(p * RAD))));
  const lift = useMotionValue(0);
  const [setMapEl, map] = useElementSize<HTMLDivElement>();
  const count = timelineEvents.filter((e) => e.year >= basePanel.startYear && e.year < basePanel.endYear).length;
  const showMap = h >= (vertical ? 100 : 190); // short leaves keep to title + counts

  const raise = (v: number) => animate(lift, v, { type: 'spring', stiffness: 260, damping: 22 });
  const shade =
    sign > 0
      ? `linear-gradient(${vertical ? 180 : 90}deg, rgba(255,250,240,0.12), rgba(60,40,20,0.2))`
      : `linear-gradient(${vertical ? 180 : 90}deg, rgba(60,40,20,0.3), rgba(60,40,20,0.08))`;

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      onHoverStart={() => raise(28)}
      onHoverEnd={() => raise(0)}
      onFocus={() => raise(28)}
      onBlur={() => raise(0)}
      aria-label={t('leafAria', { numeral: panel.numeral, title: panel.title, range: panel.rangeLabel, n: count })}
      className="group paper engraved relative flex shrink-0 cursor-pointer flex-col overflow-hidden text-left"
      style={{
        width: w,
        height: h,
        z: lift,
        ...(vertical ? { rotateX: rotate, marginTop: overlap } : { rotateY: rotate, marginLeft: overlap }),
        transformStyle: 'preserve-3d',
      }}
    >
      <div dir={c.dir} className={`flex h-full flex-col ${vertical ? 'px-3 py-2' : 'p-3.5'}`}>
        <div className="flex items-baseline justify-between gap-2">
          <span className={`font-display font-bold leading-none text-ink ${vertical ? 'text-lg' : 'text-3xl'}`}>{panel.numeral}</span>
          {vertical && <span className="flex-1 truncate font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">{panel.title}</span>}
          <span className="font-mono text-[9.5px] uppercase tracking-wider text-sepia">{c.ld(panel.rangeLabel)}</span>
        </div>
        {!vertical && (
          <>
            <h3 className="mt-1 font-display text-[12.5px] font-semibold uppercase leading-snug tracking-[0.14em] text-ink">{panel.title}</h3>
            <hr className="rule-double mt-1.5" />
          </>
        )}
        <div
          ref={setMapEl}
          dir="ltr"
          className={`relative flex-1 overflow-hidden ${showMap ? 'border border-ink/40 bg-vellum/60' : ''} ${vertical ? 'my-1' : 'my-2'}`}
        >
          {showMap && map.width > 0 && map.height >= 36 && (
            <div className="absolute top-0" style={{ left: -index * map.width }}>
              <MapCanvas totalWidth={map.width * 4} height={map.height} variant="leaf" />
            </div>
          )}
        </div>
        {!vertical && showMap && <p className="font-garamond text-[14px] italic leading-snug text-ink-soft">{panel.subtitle}</p>}
        <div className="mt-1 flex items-center justify-between gap-2 font-mono text-[9.5px] uppercase tracking-wider text-sepia">
          <span className="truncate">{t('leafEvents', { n: count })}</span>
          <span className="flex shrink-0 items-center gap-1 text-crimson opacity-60 transition group-hover:opacity-100 group-focus-visible:opacity-100">
            {t('leafUnfold')} <ArrowRight size={11} aria-hidden="true" className="rtl:rotate-180" />
          </span>
        </div>
      </div>
      {!vertical && <CornerBrackets size={16} inset={4} className="text-ink/70" />}
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: shade, opacity: progress }} />
    </motion.button>
  );
}
