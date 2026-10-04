import { memo, useMemo, useState } from 'react';
import { prophets, PROPHETS_LANE, PROPHETS_SPAN, TRADITION_COLOR, type Prophet, type Tradition } from '../data/prophets';
import { useContent } from '../i18n/content';
import type { UiKey } from '../i18n/ui';
import { yearToU } from '../lib/timeScale';
import { useChronoStore } from '../store/useChronoStore';

const TRAD_KEY: Record<Tradition, UiKey> = { both: 'tradBoth', jewish: 'tradJewish', islam: 'tradIslam' };
const HALO = '0 0 3px #F5EFE0, 0 0 3px #F5EFE0, 0 0 2px #F5EFE0';

interface Geometry {
  totalWidth: number;
  top: number;
  height: number;
}

/** The thread itself (SVG). Folded leaves also get tiny dots; the panorama draws interactive markers in HTML. */
export function ProphetsThread({ totalWidth: W, top, height, dots }: Geometry & { dots: boolean }) {
  const show = useChronoStore((s) => s.showProphets);
  if (!show) return null;
  const y = top + (PROPHETS_LANE / 100) * height;
  return (
    <g aria-hidden="true">
      <line
        x1={yearToU(PROPHETS_SPAN.start) * W}
        x2={yearToU(PROPHETS_SPAN.end) * W}
        y1={y}
        y2={y}
        stroke="#8C6E2A"
        strokeWidth={dots ? 1 : 1.6}
        strokeDasharray={dots ? '1 2' : '1 3.5'}
        strokeLinecap="round"
      />
      {dots && prophets.map((p) => <circle key={p.id} cx={yearToU(p.year) * W} cy={y} r={1.7} fill={TRADITION_COLOR[p.tradition]} />)}
    </g>
  );
}

type Row = 'above' | 'below';
const majorFirst = (a: Prophet, b: Prophet) => Number(!!b.major) - Number(!!a.major) || a.year - b.year;

/**
 * Label placement on two rows (above / below the thread), major figures first; labels that would collide
 * are left to the hover card. Markers come back minor-first so major ones paint (and hit-test) on top.
 */
function layout(W: number, ar: boolean) {
  const rows: Record<Row, [number, number][]> = { above: [], below: [] };
  const rowOf = new Map<string, Row | null>();
  for (const p of [...prophets].sort(majorFirst)) {
    const x = yearToU(p.year) * W;
    const half = (p.name[ar ? 1 : 0].length * (ar ? 5.4 : 5.9) + 8) / 2;
    const row = (['above', 'below'] as const).find((r) => rows[r].every(([l, rr]) => x + half + 6 < l || x - half > rr + 6)) ?? null;
    if (row) rows[row].push([x - half, x + half]);
    rowOf.set(p.id, row);
  }
  return [...prophets].sort((a, b) => -majorFirst(a, b)).map((p) => ({ p, x: yearToU(p.year) * W, row: rowOf.get(p.id) ?? null }));
}

/** Interactive markers for the panorama: diamond per prophet, coloured by tradition, with a details card. */
export const ProphetsMarkers = memo(function ProphetsMarkers({ totalWidth: W, top, height }: Geometry) {
  const c = useContent();
  const show = useChronoStore((s) => s.showProphets);
  const [active, setActive] = useState<string | null>(null);
  const placed = useMemo(() => layout(W, c.isAr), [W, c.isAr]);
  if (!show) return null;
  const y = top + (PROPHETS_LANE / 100) * height;
  const i = c.isAr ? 1 : 0;

  return (
    <ul aria-label={c.t('prophetsAria')} className="absolute left-0 top-0 m-0 list-none p-0" style={{ width: W }}>
      {placed.map(({ p, x, row }) => (
        <li key={p.id} className="absolute" style={{ left: x, top: y }}>
          <button
            type="button"
            data-no-drag
            aria-label={`${p.name[i]} — ${p.when[i]}`}
            aria-expanded={active === p.id}
            onMouseEnter={() => setActive(p.id)}
            onMouseLeave={() => setActive((a) => (a === p.id ? null : a))}
            onFocus={() => setActive(p.id)}
            onBlur={() => setActive((a) => (a === p.id ? null : a))}
            onClick={() => setActive((a) => (a === p.id ? null : p.id))}
            className="absolute grid h-5 w-5 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-crimson pointer-coarse:h-8 pointer-coarse:w-8"
          >
            <span
              className="block h-[9px] w-[9px] rotate-45 border border-ink/80"
              style={{ background: TRADITION_COLOR[p.tradition], boxShadow: '0 0 0 1.5px #F5EFE0' }}
            />
          </button>
          {row && (
            <span
              aria-hidden="true"
              lang={c.isAr ? 'ar' : 'en'}
              className="pointer-events-none absolute whitespace-nowrap font-garamond text-[11px] font-semibold leading-none text-ink"
              style={{ transform: `translate(-50%, ${row === 'above' ? '-170%' : '75%'})`, textShadow: HALO }}
            >
              {p.name[i]}
            </span>
          )}
          {active === p.id && <ProphetCard p={p} />}
        </li>
      ))}
    </ul>
  );
});

function ProphetCard({ p }: { p: Prophet }) {
  const c = useContent();
  const i = c.isAr ? 1 : 0;
  const other = c.isAr ? 0 : 1;
  return (
    <div
      role="tooltip"
      dir={c.dir}
      className="paper engraved pointer-events-none absolute bottom-3 left-0 z-40 w-64 -translate-x-1/2 p-3 text-start shadow-lg"
    >
      <p className="flex items-baseline justify-between gap-2">
        <span className="font-display text-[14px] font-semibold text-ink">{p.name[i]}</span>
        <span lang={c.isAr ? 'en' : 'ar'} dir={c.isAr ? 'ltr' : 'rtl'} className="font-serif text-[13px] text-ink-soft">
          {p.name[other]}
        </span>
      </p>
      <p className="mt-1 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-sepia">
        <span className="h-2 w-2 shrink-0 rotate-45 border border-ink/60" style={{ background: TRADITION_COLOR[p.tradition] }} />
        {c.t(TRAD_KEY[p.tradition])}
      </p>
      <p className="mt-1.5 font-garamond text-[14px] leading-snug text-ink">{p.when[i]}</p>
      {p.note && <p className="mt-1 font-garamond text-[13.5px] italic leading-snug text-ink-soft">{p.note[i]}</p>}
      <p className="mt-2 border-t border-ink/20 pt-1.5 font-garamond text-[12px] italic leading-snug text-sepia">{c.t('prophetsCaveat')}</p>
    </div>
  );
}
