import { memo, useMemo } from 'react';
import { foldPanels, PRESENT_YEAR } from '../data/timelineData';
import { useContent } from '../i18n/content';
import { buildTicks, CREASES_U, DEEP_PAST_BREAK, formatTick, yearToU } from '../lib/timeScale';

interface AxisProps {
  totalWidth: number;
  height: number;
  top: number;
  bottom: number;
  variant: 'panorama' | 'leaf';
}

const INK = '#2E2A26';
const SEPIA = '#7A5C3E';
const GOLD = '#A8863A';
const DISPLAY = { fontFamily: 'var(--font-display)' } as const;
const MONO = { fontFamily: 'var(--font-mono)' } as const;
const GARAMOND = { fontFamily: 'var(--font-garamond)' } as const;

/** Beneath the ribbons: deep-past stipple, century grid and fold creases. */
export const AxisUnderlay = memo(function AxisUnderlay({ totalWidth: W, height: H, top, bottom, variant }: AxisProps) {
  const ticks = useMemo(() => buildTicks(W, variant === 'panorama' ? 84 : 64), [W, variant]);
  const xBreak = yearToU(DEEP_PAST_BREAK) * W;
  const areaBottom = H - bottom;
  return (
    <g pointerEvents="none">
      <rect x={0} y={top} width={xBreak} height={areaBottom - top} fill="url(#cf-stipple)" />
      {ticks
        .filter((t) => t.major)
        .map((t) => (
          <line
            key={t.year}
            x1={t.u * W}
            x2={t.u * W}
            y1={top}
            y2={areaBottom}
            stroke={INK}
            strokeOpacity={t.breakpoint ? 0.16 : 0.07}
            strokeWidth={t.breakpoint ? 1 : 0.75}
          />
        ))}
      {variant === 'panorama' &&
        CREASES_U.map((u) => <rect key={u} x={u * W - 18} y={0} width={36} height={H} fill="url(#cf-crease)" />)}
    </g>
  );
});

/** Above the ribbons: engraved rules, panel banners, tick labels, scale break and the present. */
export const AxisOverlay = memo(function AxisOverlay({ totalWidth: W, height: H, top, bottom, variant }: AxisProps) {
  const c = useContent();
  const { lang, t, ld } = c;
  const ticks = useMemo(() => buildTicks(W, variant === 'panorama' ? 84 : 64), [W, variant]);
  const xBreak = yearToU(DEEP_PAST_BREAK) * W;
  const xNow = yearToU(PRESENT_YEAR) * W;
  const areaBottom = H - bottom;
  const panorama = variant === 'panorama';
  const panelW = W / 4;
  const labelY = panorama ? top - 16 : top - 9;
  const fontSize = panorama ? 10 : 8.5;

  const bannerText = (panelIdx: number, widthPx: number): string => {
    const p = c.panel(foldPanels[panelIdx]);
    const word = t('panelBanner', { numeral: p.numeral });
    const full = ld(`${word}  ·  ${p.title}  ·  ${p.rangeLabel}`);
    const mid = ld(`${p.numeral}  ·  ${p.title}`);
    const per = lang === 'ar' ? 6.4 : 8.1;
    const est = (s: string) => s.length * per;
    const upper = (s: string) => (lang === 'ar' ? s : s.toUpperCase());
    if (est(full) + 60 < widthPx) return upper(full);
    if (est(mid) + 30 < widthPx) return upper(mid);
    return p.numeral;
  };

  return (
    <g pointerEvents="none">
      {/* Future fog: the stream continues beyond the present. */}
      <rect x={xNow} y={top} width={Math.max(0, W - xNow)} height={areaBottom - top} fill="url(#cf-future)" />
      <line x1={xNow} x2={xNow} y1={top} y2={areaBottom} stroke={GOLD} strokeWidth={1.2} strokeDasharray="3 3" />
      {panorama && (
        <text x={xNow - 5} y={top + 13} textAnchor="end" style={DISPLAY} fontSize={9} fontWeight={700} letterSpacing="0.14em" fill={GOLD}>
          {t('todayLabel', { year: PRESENT_YEAR })}
        </text>
      )}

      {/* Panel banners (panorama only), repeated along very wide panels. */}
      {panorama &&
        foldPanels.map((p, i) => {
          const x0 = i * panelW;
          const reps = Math.max(1, Math.ceil(panelW / 1500));
          const slot = panelW / reps;
          const text = bannerText(i, slot);
          return (
            <g key={p.id}>
              <rect x={x0 + 6} y={6} width={panelW - 12} height={24} fill="url(#cf-band)" />
              <line x1={x0 + 6} x2={x0 + panelW - 6} y1={6} y2={6} stroke={INK} strokeWidth={1} />
              <line x1={x0 + 6} x2={x0 + panelW - 6} y1={30} y2={30} stroke={INK} strokeWidth={1} />
              <line x1={x0 + 6} x2={x0 + panelW - 6} y1={33} y2={33} stroke={INK} strokeWidth={0.5} strokeOpacity={0.6} />
              {Array.from({ length: reps }, (_, k) => (
                <text
                  key={k}
                  x={x0 + slot * (k + 0.5)}
                  y={18.5}
                  textAnchor="middle"
                  dominantBaseline="central"
                  style={DISPLAY}
                  fontSize={11}
                  fontWeight={600}
                  letterSpacing="0.16em"
                  fill={INK}
                >
                  {text}
                </text>
              ))}
            </g>
          );
        })}

      {/* Engraved double rules framing the ribbon field. */}
      <line x1={0} x2={W} y1={top - 1} y2={top - 1} stroke={INK} strokeWidth={1.2} />
      {panorama && <line x1={0} x2={W} y1={top - 4} y2={top - 4} stroke={INK} strokeWidth={0.5} />}
      <line x1={0} x2={W} y1={areaBottom + 1} y2={areaBottom + 1} stroke={INK} strokeWidth={1.2} />
      {panorama && <line x1={0} x2={W} y1={areaBottom + 4} y2={areaBottom + 4} stroke={INK} strokeWidth={0.5} />}

      {ticks.map((tick) => {
        const x = tick.u * W;
        const len = tick.major ? (panorama ? 8 : 5) : 3;
        const label = formatTick(tick.year, lang);
        return (
          <g key={`t${tick.year}`}>
            <line x1={x} x2={x} y1={top - 4 - len} y2={top - 4} stroke={INK} strokeWidth={tick.breakpoint ? 1.4 : 0.8} />
            {panorama && <line x1={x} x2={x} y1={areaBottom + 4} y2={areaBottom + 4 + len} stroke={INK} strokeWidth={tick.breakpoint ? 1.4 : 0.8} />}
            {tick.major && (
              <>
                <text x={x} y={labelY} textAnchor="middle" style={MONO} fontSize={fontSize} fontWeight={tick.breakpoint ? 600 : 400} fill={tick.breakpoint ? INK : SEPIA}>
                  {label}
                </text>
                {panorama && (
                  <text x={x} y={areaBottom + 24} textAnchor="middle" style={MONO} fontSize={fontSize} fontWeight={tick.breakpoint ? 600 : 400} fill={tick.breakpoint ? INK : SEPIA}>
                    {label}
                  </text>
                )}
              </>
            )}
          </g>
        );
      })}

      {/* Scale break: the deep past is compressed. */}
      <g stroke={INK} strokeWidth={1}>
        <rect x={xBreak - 4} y={top - 9} width={8} height={10} fill="#F5EFE0" stroke="none" />
        <line x1={xBreak - 5} y1={top + 1} x2={xBreak - 1} y2={top - 10} />
        <line x1={xBreak + 1} y1={top + 1} x2={xBreak + 5} y2={top - 10} />
      </g>
      <line x1={xBreak} x2={xBreak} y1={top} y2={areaBottom} stroke={SEPIA} strokeOpacity={0.45} strokeDasharray="2 4" />
      {panorama && xBreak > 60 && (
        <text
          x={xBreak - 7}
          y={areaBottom - 10}
          transform={`rotate(-90 ${xBreak - 7} ${areaBottom - 10})`}
          style={GARAMOND}
          fontStyle="italic"
          fontSize={13}
          fill={SEPIA}
        >
          {t('deepPast')}
        </text>
      )}
    </g>
  );
});
