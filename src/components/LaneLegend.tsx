import { PROPHETS_LANE, PROPHETS_SPAN, TRADITION_COLOR } from '../data/prophets';
import { civilizations } from '../data/timelineData';
import { yearToU } from '../lib/timeScale';
import { useContent } from '../i18n/content';
import { ribbonCenterAt, ribbonWidthAt } from '../lib/ribbonGeometry';
import { useChronoStore } from '../store/useChronoStore';
import { MAP_LAYOUT } from './MapCanvas';

const SHORT_EN: Record<string, string> = {
  americas: 'Americas',
  europe: 'Europe',
  westAfrica: 'West Africa',
  nile: 'Nile',
  mesopotamia: 'Mesopotamia',
  persia: 'Persia & Islam',
  southAsia: 'South Asia',
  eastAsia: 'East Asia',
  global: 'Global',
};

interface LaneLegendProps {
  totalWidth: number;
  height: number;
  compact: boolean;
}

/** Sticky key at the left edge: follows each stream's lane as you travel through time. */
export function LaneLegend({ totalWidth, height, compact }: LaneLegendProps) {
  const c18 = useContent();
  const open = useChronoStore((s) => s.legendOpen);
  const viewStart = useChronoStore((s) => s.view.start);
  const focusCivId = useChronoStore((s) => s.focusCivId);
  const setFocusCiv = useChronoStore((s) => s.setFocusCiv);
  const showProphets = useChronoStore((s) => s.showProphets);
  const toggleProphets = useChronoStore((s) => s.toggleProphets);
  const width = compact ? 112 : 168;
  if (!open) return null;

  const { top, bottom } = MAP_LAYOUT.panorama;
  const areaH = height - top - bottom;
  const u = Math.min(1, viewStart + (width * 0.6) / Math.max(1, totalWidth));
  const prophetsAlive = u >= yearToU(PROPHETS_SPAN.start) - 0.01 && u <= yearToU(PROPHETS_SPAN.end) + 0.01;

  return (
    <div
      dir="ltr"
      className="pointer-events-none sticky left-0 top-0 z-20"
      style={{
        width,
        height,
        background:
          'linear-gradient(90deg, rgba(245,239,224,0.97) 0%, rgba(245,239,224,0.9) 55%, rgba(245,239,224,0) 100%)',
      }}
    >
      <p
        className="absolute left-2 font-display text-[9px] font-semibold uppercase tracking-engraved text-ink-soft"
        style={{ top: top + 2 }}
      >
        {c18.t('streams')}
      </p>
      <ul aria-label={c18.t('legendAria')} dir={c18.dir}>
        {civilizations.map((c) => {
          const y = top + (ribbonCenterAt(c.id, u) / 100) * areaH;
          const alive = ribbonWidthAt(c.id, u) > 0.35;
          const active = focusCivId === c.id;
          return (
            <li key={c.id} className="absolute left-1.5" style={{ top: y, transform: 'translateY(-50%)', transition: 'top 300ms ease' }}>
              <button
                type="button"
                data-no-drag
                aria-pressed={active}
                title={`${c18.civ(c).name} — ${c18.civ(c).originRegion}`}
                onClick={() => setFocusCiv(active ? null : c.id)}
                className={`pointer-events-auto flex items-center gap-1.5 rounded-sm px-1 py-0.5 text-left transition pointer-coarse:py-2 ${
                  active ? 'bg-ink text-vellum' : 'hover:bg-parchment/80'
                } ${alive || active ? 'opacity-100' : 'opacity-45'}`}
              >
                <span
                  className="h-3 w-3 shrink-0 rounded-full border border-ink/70"
                  style={{ background: c.color, boxShadow: 'inset 0 0 0 1.5px rgba(245,239,224,0.5)' }}
                />
                <span className={`font-garamond font-semibold leading-none smallcaps ${compact ? 'text-[11px]' : 'text-[13px]'}`}>
                  {compact ? (c18.isAr ? c18.civShort(c) : SHORT_EN[c.id]) : c18.civ(c).name}
                </span>
              </button>
            </li>
          );
        })}
        <li className="absolute left-1.5" style={{ top: top + (PROPHETS_LANE / 100) * areaH, transform: 'translateY(-50%)' }}>
          <button
            type="button"
            data-no-drag
            aria-pressed={showProphets}
            title={c18.t('prophetsLegendTitle')}
            onClick={toggleProphets}
            className={`pointer-events-auto flex items-center gap-1.5 rounded-sm px-1 py-0.5 text-left transition hover:bg-parchment/80 pointer-coarse:py-2 ${
              showProphets && prophetsAlive ? 'opacity-100' : 'opacity-45'
            }`}
          >
            <span className="flex h-3 w-3 shrink-0 items-center justify-center">
              <span className="block h-2 w-2 rotate-45 border border-ink/70" style={{ background: showProphets ? TRADITION_COLOR.both : 'transparent' }} />
            </span>
            <span className={`font-garamond font-semibold italic leading-none smallcaps ${compact ? 'text-[11px]' : 'text-[13px]'}`}>
              {c18.t('prophetsLegend')}
            </span>
          </button>
        </li>
      </ul>
    </div>
  );
}
