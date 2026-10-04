import { memo, useMemo } from 'react';
import { timelineEvents } from '../data/timelineData';
import { CREASES_U, uToYear, yearToU } from '../lib/timeScale';
import type { Importance } from '../types/timeline';
import { CivilizationRibbons, RibbonTooltip, type MarkerFootprint } from './CivilizationRibbons';
import { EventMarker } from './EventMarker';
import { ProphetsMarkers, ProphetsThread } from './ProphetsLine';
import { AxisOverlay, AxisUnderlay } from './TimeAxis';

export type MapVariant = 'panorama' | 'leaf';

export const MAP_LAYOUT: Record<MapVariant, { top: number; bottom: number }> = {
  panorama: { top: 80, bottom: 34 },
  leaf: { top: 22, bottom: 6 },
};

const BASE_SIZE: Record<Importance, number> = { monumental: 60, major: 50, regional: 42 };

function badgeSize(importance: Importance, panelPx: number, variant: MapVariant): number {
  if (variant === 'leaf') return Math.round(BASE_SIZE[importance] * Math.min(0.62, Math.max(0.42, panelPx / 700)));
  return Math.round(BASE_SIZE[importance] * Math.min(1, Math.max(0.72, panelPx / 1100)));
}

interface MapCanvasProps {
  totalWidth: number;
  height: number;
  variant: MapVariant;
}

/** One rendering of the whole chart at a given pixel scale: axis, ribbons and event medallions. */
export const MapCanvas = memo(function MapCanvas({ totalWidth: W, height: H, variant }: MapCanvasProps) {
  const { top, bottom } = MAP_LAYOUT[variant];
  const areaH = Math.max(40, H - top - bottom);
  const panelPx = W / 4;
  const interactive = variant === 'panorama';

  const markers = useMemo(
    () =>
      timelineEvents.map((event) => {
        const size = badgeSize(event.importance, panelPx, variant);
        let x = yearToU(event.year) * W;
        // Keep medallions off the fold creases so they never split across two leaves.
        for (const c of CREASES_U) {
          const cx = c * W;
          const min = size / 2 + 5;
          if (Math.abs(x - cx) < min) x = cx + (event.year >= uToYear(c) ? min : -min);
        }
        return { event, x, y: top + (event.streamYPosition / 100) * areaH, size };
      }),
    [W, areaH, top, panelPx, variant],
  );

  const footprints = useMemo<MarkerFootprint[]>(
    () => markers.map((m) => ({ civId: m.event.civilizationId, x: m.x, r: m.size / 2 })),
    [markers],
  );

  const showLabels = interactive && panelPx >= 700;

  return (
    <div className="absolute left-0 top-0" style={{ width: W, height: H }}>
      <svg width={W} height={H} className="absolute left-0 top-0 block" role="presentation">
        <AxisUnderlay totalWidth={W} height={H} top={top} bottom={bottom} variant={variant} />
        <CivilizationRibbons
          totalWidth={W}
          top={top}
          height={areaH}
          showLabels={variant === 'panorama' || panelPx > 500}
          interactive={interactive}
          markers={footprints}
        />
        <ProphetsThread totalWidth={W} top={top} height={areaH} dots={!interactive} />
        <AxisOverlay totalWidth={W} height={H} top={top} bottom={bottom} variant={variant} />
      </svg>
      {interactive && <RibbonTooltip />}
      {interactive && <ProphetsMarkers totalWidth={W} top={top} height={areaH} />}
      {markers.map((m) => (
        <EventMarker
          key={m.event.id}
          event={m.event}
          x={m.x}
          y={m.y}
          size={m.size}
          interactive={interactive}
          showLabel={showLabels}
          labelSide={m.event.streamYPosition > 78 ? 'above' : 'below'}
        />
      ))}
    </div>
  );
});
