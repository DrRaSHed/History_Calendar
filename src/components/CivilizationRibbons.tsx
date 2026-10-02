import { memo, useMemo } from 'react';
import { create } from 'zustand';
import { civilizationById, PRESENT_YEAR } from '../data/timelineData';
import { ribbonCenterAt, ribbonPath, ribbons, ribbonWidthAt, segmentAt } from '../lib/ribbonGeometry';
import { useContent } from '../i18n/content';
import { arCivs } from '../data/ar/meta';
import type { Lang } from '../i18n/lang';
import { formatYear, uToYear, yearToU } from '../lib/timeScale';
import { useChronoStore } from '../store/useChronoStore';
import type { StreamSegment } from '../types/timeline';

export interface MarkerFootprint {
  civId: string;
  x: number;
  r: number;
}

interface RibbonHover {
  civId: string;
  segment: StreamSegment | null;
  year: number;
  x: number;
  y: number;
}

/** Hover state lives outside React render of the (heavy) ribbon SVG. */
export const useRibbonHover = create<{ hover: RibbonHover | null; setHover: (h: RibbonHover | null) => void }>((set) => ({
  hover: null,
  setHover: (hover) => set({ hover }),
}));

interface RibbonLabel {
  key: string;
  x: number;
  y: number;
  text: string;
  size: number;
  stroke: string;
}

function computeLabels(W: number, top: number, height: number, markers: MarkerFootprint[], lang: Lang): RibbonLabel[] {
  const out: RibbonLabel[] = [];
  const thicknessPx = (civId: string, x: number) => (ribbonWidthAt(civId, x / W) / 100) * height;

  for (const r of ribbons) {
    const id = r.stream.id;
    const own = markers.filter((m) => m.civId === id);
    const clear = (cx: number, half: number) => own.every((m) => Math.abs(m.x - cx) >= half + m.r + 6);

    r.stream.streamSegments.forEach((seg, si) => {
      if (!seg.label) return;
      const x0 = yearToU(seg.startYear) * W;
      const x1 = yearToU(Math.min(seg.endYear, PRESENT_YEAR)) * W;
      const segPx = x1 - x0;
      if (segPx < 60) return;
      const text = lang === 'ar' ? (arCivs[id]?.segments[si]?.[0] ?? seg.label) : seg.label.toUpperCase();
      const glyphW = lang === 'ar' ? 0.58 : 0.8;
      const repeats = Math.max(1, Math.floor(segPx / 1300));
      const slot = segPx / repeats;

      for (let k = 0; k < repeats; k++) {
        const lo = x0 + slot * k;
        const hi = lo + slot;
        let cx = lo + slot / 2;
        const thick = thicknessPx(id, cx);
        if (thick < 10) continue;
        const size = Math.min(12.5, Math.max(8, thick * 0.46));
        const half = (text.length * size * glyphW + 6) / 2;
        if (half * 2 > slot - 16) continue;

        if (!clear(cx, half)) {
          const candidates = own
            .flatMap((m) => [m.x + m.r + 8 + half, m.x - m.r - 8 - half])
            .filter((c) => c - half >= lo + 6 && c + half <= hi - 6 && clear(c, half))
            .sort((a, b) => Math.abs(a - cx) - Math.abs(b - cx));
          if (!candidates.length) continue;
          cx = candidates[0];
        }
        const minThick = Math.min(thicknessPx(id, cx - half), thicknessPx(id, cx), thicknessPx(id, cx + half));
        if (minThick < size * 1.25) continue;

        out.push({
          key: `${id}-${si}-${k}`,
          x: cx,
          y: top + (ribbonCenterAt(id, cx / W) / 100) * height,
          text,
          size,
          stroke: r.stream.secondaryColor,
        });
      }
    });
  }
  return out;
}

interface CivilizationRibbonsProps {
  totalWidth: number;
  top: number;
  height: number;
  showLabels: boolean;
  interactive: boolean;
  markers: MarkerFootprint[];
}

/** The parallel pigment streams — Adams' visual grammar of rising, merging and fading powers. */
export const CivilizationRibbons = memo(function CivilizationRibbons({
  totalWidth,
  top,
  height,
  showLabels,
  interactive,
  markers,
}: CivilizationRibbonsProps) {
  const focusCivId = useChronoStore((s) => s.focusCivId);
  const { lang } = useContent();
  const paths = useMemo(
    () => ribbons.map((r) => ({ r, d: ribbonPath(r, { totalWidth, top, height }) })),
    [totalWidth, top, height],
  );
  const labels = useMemo(
    () => (showLabels ? computeLabels(totalWidth, top, height, markers, lang) : []),
    [showLabels, totalWidth, top, height, markers, lang],
  );

  const handleMove = (civId: string) => (e: React.PointerEvent<SVGPathElement>) => {
    const svg = e.currentTarget.ownerSVGElement;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const year = uToYear(x / totalWidth);
    useRibbonHover.getState().setHover({ civId, segment: segmentAt(civId, year), year, x, y: e.clientY - rect.top });
  };
  const clearHover = () => useRibbonHover.getState().setHover(null);

  return (
    <g>
      {paths.map(({ r, d }) => {
        const dim = focusCivId !== null && focusCivId !== r.stream.id;
        return (
          <g key={r.stream.id} opacity={dim ? 0.16 : 1} style={{ transition: 'opacity 350ms ease' }}>
            <path
              d={d}
              fill={r.stream.color}
              fillOpacity={0.9}
              stroke={r.stream.secondaryColor}
              strokeWidth={0.9}
              strokeLinejoin="round"
              onPointerMove={interactive ? handleMove(r.stream.id) : undefined}
              onPointerLeave={interactive ? clearHover : undefined}
              style={interactive ? { cursor: 'help' } : undefined}
            />
            <path d={d} fill="url(#cf-hatch)" pointerEvents="none" />
          </g>
        );
      })}
      <g pointerEvents="none" style={{ fontFamily: 'var(--font-display)' }} fontWeight={600} textAnchor="middle" dominantBaseline="central">
        {labels.map((l) => {
          const civ = l.key.split('-')[0];
          const dim = focusCivId !== null && focusCivId !== civ;
          return (
            <text
              key={l.key}
              x={l.x}
              y={l.y}
              fontSize={l.size}
              letterSpacing="0.12em"
              fill="#FBF5E6"
              stroke={l.stroke}
              strokeWidth={2.2}
              paintOrder="stroke"
              opacity={dim ? 0.2 : 0.95}
            >
              {l.text}
            </text>
          );
        })}
      </g>
    </g>
  );
});

/** Floating description of the era under the pointer. */
export function RibbonTooltip() {
  const hover = useRibbonHover((s) => s.hover);
  const c = useContent();
  if (!hover) return null;
  const civ = c.civ(civilizationById[hover.civId]);
  const seg = hover.segment;
  const text = seg ? c.segment(civilizationById[hover.civId], seg) : null;
  const range = seg
    ? `${formatYear(seg.startYear, { lang: c.lang })} – ${seg.endYear >= PRESENT_YEAR ? c.t('present') : formatYear(seg.endYear, { lang: c.lang })}`
    : c.t('around', { year: formatYear(hover.year, { lang: c.lang }) });
  return (
    <div
      dir={c.dir}
      className="pointer-events-none absolute z-30 w-64 rounded-sm border border-ink/70 bg-vellum/97 p-3 shadow-[0_6px_18px_rgba(46,42,38,0.25)]"
      style={{ left: hover.x + 16, top: hover.y + 16 }}
      role="tooltip"
    >
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full border border-ink/60" style={{ background: civ.color }} />
        <span className="font-garamond text-[13px] smallcaps text-ink-soft">{civ.name}</span>
      </div>
      <p className="mt-1 font-display text-[13px] font-semibold tracking-wide text-ink">{text?.label ?? c.t('intermediate')}</p>
      <p className="font-mono text-[10px] text-sepia" dir="ltr">
        {range}
      </p>
      <p className="mt-1.5 font-serif text-[12px] leading-snug text-ink/85">{text?.description ?? c.t('intermediateDesc')}</p>
    </div>
  );
}
