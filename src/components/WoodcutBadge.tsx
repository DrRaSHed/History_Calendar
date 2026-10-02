import type { Importance } from '../types/timeline';
import { Vignette } from './Vignettes';

interface WoodcutBadgeProps {
  iconType: string;
  color: string;
  importance: Importance;
  size: number;
}

const INK = '#2E2A26';
const VELLUM = '#F5EFE0';
const R_ART = 40; // radius of the picture window

/**
 * Lithograph medallion: a cartoon vignette in a circular window, ringed in the stream's pigment.
 * Monumental events get a scalloped rosette edge, major events a second hairline ring.
 */
export function WoodcutBadge({ iconType, color, importance, size }: WoodcutBadgeProps) {
  return (
    <span className="relative block" style={{ width: size, height: size }}>
      <svg viewBox="-50 -50 100 100" width={size} height={size} className="block overflow-visible" aria-hidden="true">
        {importance === 'monumental' && (
          <g fill={INK}>
            {Array.from({ length: 20 }, (_, i) => (
              <path key={i} d="M-3.2 -44 L0 -50 L3.2 -44Z" transform={`rotate(${i * 18})`} />
            ))}
          </g>
        )}
        <circle r="44.5" fill={VELLUM} stroke={INK} strokeWidth="1.8" />
        {importance !== 'regional' && <circle r="47.4" fill="none" stroke={INK} strokeWidth="0.8" strokeOpacity="0.7" />}
        <circle r="42" fill={color} stroke={INK} strokeWidth="1.4" />
        <circle r="42" fill="url(#cf-hatch-dark)" />
        <g clipPath="url(#cf-badge-clip)">
          <g transform={`translate(${-R_ART} ${-R_ART}) scale(${(R_ART * 2) / 100})`}>
            <Vignette type={iconType} />
          </g>
        </g>
        <circle r={R_ART} fill="none" stroke={INK} strokeWidth="2" />
      </svg>
    </span>
  );
}
