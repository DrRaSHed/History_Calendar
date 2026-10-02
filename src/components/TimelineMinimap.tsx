import { useMemo, useRef } from 'react';
import { civilizationById, foldPanels, PRESENT_YEAR, timelineEvents } from '../data/timelineData';
import { useElementSize } from '../hooks/useElementSize';
import { useContent } from '../i18n/content';
import { ribbonPath, ribbons } from '../lib/ribbonGeometry';
import { formatYear, uToYear, yearToU } from '../lib/timeScale';
import { useChronoStore } from '../store/useChronoStore';

const TRACK_H = 40;

/** Proportional overview of the whole chart with a draggable viewing window. */
export function TimelineMinimap() {
  const [setEl, size] = useElementSize<HTMLDivElement>();
  const c = useContent();
  const { t, lang } = c;
  const mode = useChronoStore((s) => s.mode);
  const view = useChronoStore((s) => s.view);
  const W = size.width;
  const dragRef = useRef<{ startX: number; startU: number; id: number } | null>(null);

  const paths = useMemo(
    () => (W > 0 ? ribbons.map((r) => ({ r, d: ribbonPath(r, { totalWidth: W, top: 2, height: TRACK_H - 4 }) })) : []),
    [W],
  );

  const span = view.end - view.start;
  const center = (view.start + view.end) / 2;

  const goTo = (u: number, instant: boolean) => {
    const s = useChronoStore.getState();
    const clamped = Math.min(1, Math.max(0, u));
    if (s.mode === 'fold') {
      s.setMode('panorama');
      s.navigateTo(clamped, { align: 'center', instant: true });
    } else {
      s.navigateTo(clamped, { align: 'center', instant });
    }
  };

  const uAt = (clientX: number, el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    return (clientX - rect.left) / rect.width;
  };

  const onTrackPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const track = e.currentTarget;
    const u = uAt(e.clientX, track);
    const insideWindow = mode === 'panorama' && u >= view.start && u <= view.end;
    if (!insideWindow) goTo(u, false);
    if (mode === 'panorama') {
      track.setPointerCapture(e.pointerId);
      dragRef.current = { startX: e.clientX, startU: insideWindow ? center : u, id: e.pointerId };
    }
  };

  const onTrackPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d || W === 0) return;
    const du = (e.clientX - d.startX) / W;
    if (Math.abs(e.clientX - d.startX) > 2) goTo(d.startU + du, true);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    dragRef.current = null;
    if (d && e.currentTarget.hasPointerCapture(d.id)) e.currentTarget.releasePointerCapture(d.id);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 0.25 : Math.max(0.01, span / 3);
    let u: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') u = center + step;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') u = center - step;
    if (e.key === 'Home') u = 0;
    if (e.key === 'End') u = 1;
    if (e.key === 'PageDown') u = center + 0.25;
    if (e.key === 'PageUp') u = center - 0.25;
    if (u !== null) {
      e.preventDefault();
      e.stopPropagation();
      goTo(u, false);
    }
  };

  const panelBoundaries = [0, 0.25, 0.5, 0.75];

  return (
    <footer dir="ltr" className="paper-deep relative z-10 border-t-[3px] border-double border-ink/80 px-3 pb-2 pt-1 sm:px-5">
      <div className="mb-1 grid grid-cols-4 gap-1">
        {foldPanels.map((basePanel, i) => {
          const p = c.panel(basePanel);
          const active = mode === 'panorama' && center >= i * 0.25 && center < (i + 1) * 0.25;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => goTo(i * 0.25 + 0.125, false)}
              dir={c.dir}
              className={`-my-1.5 truncate py-1.5 text-left font-display text-[9.5px] font-semibold uppercase tracking-[0.14em] transition sm:text-[10.5px] ${
                active ? 'text-crimson' : 'text-ink-soft hover:text-ink'
              }`}
              title={`${p.title} · ${p.rangeLabel}`}
            >
              {p.numeral} <span className="hidden md:inline">· {p.title}</span>
            </button>
          );
        })}
      </div>

      <div
        ref={setEl}
        role="slider"
        tabIndex={0}
        aria-label={t('minimapAria')}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(center * 100)}
        aria-valuetext={mode === 'panorama' ? t('minimapValue', { year: formatYear(uToYear(center), { lang }) }) : t('minimapFolded')}
        className="relative cursor-pointer touch-none select-none border border-ink/70 bg-vellum/70"
        style={{ height: TRACK_H }}
        onPointerDown={onTrackPointerDown}
        onPointerMove={onTrackPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
      >
        {W > 0 && (
          <svg width={W} height={TRACK_H} className="absolute inset-0 block" aria-hidden="true">
            {paths.map(({ r, d }) => (
              <path key={r.stream.id} d={d} fill={r.stream.color} fillOpacity={0.85} />
            ))}
            {panelBoundaries.slice(1).map((u) => (
              <line key={u} x1={u * W} x2={u * W} y1={0} y2={TRACK_H} stroke="#2E2A26" strokeWidth={1} strokeDasharray="2 2" />
            ))}
            {timelineEvents.map((e) => (
              <circle
                key={e.id}
                cx={yearToU(e.year) * W}
                cy={2 + (e.streamYPosition / 100) * (TRACK_H - 4)}
                r={e.importance === 'monumental' ? 3 : 2.3}
                fill="#F5EFE0"
                stroke={civilizationById[e.civilizationId].secondaryColor}
                strokeWidth={1.2}
              />
            ))}
            <line x1={yearToU(PRESENT_YEAR) * W} x2={yearToU(PRESENT_YEAR) * W} y1={0} y2={TRACK_H} stroke="#A8863A" strokeWidth={1.2} />
          </svg>
        )}
        {mode === 'panorama' && W > 0 && (
          <div
            className="pointer-events-none absolute inset-y-[-3px] border-2 border-gold bg-[rgba(168,134,58,0.14)] shadow-[0_0_0_1px_rgba(46,42,38,0.6)]"
            style={{ left: view.start * W, width: Math.max(6, span * W) }}
          />
        )}
      </div>

      <div className="relative mt-0.5 h-3 font-mono text-[9px] text-sepia max-[359px]:text-[8px]">
        {panelBoundaries.map((u, i) => (
          <span key={u} className="absolute" style={{ left: `${u * 100}%`, transform: i === 0 ? undefined : 'translateX(-50%)' }}>
            {formatYear(foldPanels[i].startYear, { lang })}
          </span>
        ))}
        <span className="absolute right-0">{t('today')}</span>
      </div>
    </footer>
  );
}
