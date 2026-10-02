import { civilizations } from '../data/civilizations';
import type { CivilizationStream, StreamSegment } from '../types/timeline';
import { uToYear, yearToU } from './timeScale';

/**
 * Ribbon geometry is computed once in normalised space (u ∈ [0,1], y in % of the ribbon
 * area) and projected to pixels on demand, so zooming only re-projects — never re-samples.
 */
export const SAMPLES = 2400;
const THREAD_WIDTH = 0.6; // pinched width during intermediate periods

export interface RibbonGeometry {
  stream: CivilizationStream;
  first: number; // first sample index with visible width
  last: number; // last sample index with visible width
  center: Float32Array;
  width: Float32Array;
}

function smooth(src: Float32Array, radius: number, passes: number): Float32Array {
  let a = src;
  for (let p = 0; p < passes; p++) {
    const out = new Float32Array(a.length);
    let sum = 0;
    let count = 0;
    for (let i = -radius; i < a.length + radius; i++) {
      const add = i + radius;
      const drop = i - radius - 1;
      if (add >= 0 && add < a.length) {
        sum += a[add];
        count++;
      }
      if (drop >= 0 && drop < a.length) {
        sum -= a[drop];
        count--;
      }
      if (i >= 0 && i < a.length) out[i] = sum / count;
    }
    a = out;
  }
  return a;
}

function buildRibbon(stream: CivilizationStream): RibbonGeometry {
  const segs = stream.streamSegments;
  const spanStart = Math.min(...segs.map((s) => s.startYear));
  const spanEnd = Math.max(...segs.map((s) => s.endYear));
  const rawW = new Float32Array(SAMPLES);
  const rawC = new Float32Array(SAMPLES);
  let heldCenter = segs[0].centerY ?? stream.laneY;

  for (let i = 0; i < SAMPLES; i++) {
    const year = uToYear(i / (SAMPLES - 1));
    let best: StreamSegment | null = null;
    for (const s of segs) {
      if (year >= s.startYear && year <= s.endYear && (!best || s.prominenceWidth > best.prominenceWidth)) best = s;
    }
    if (best) {
      rawW[i] = best.prominenceWidth;
      heldCenter = best.centerY ?? stream.laneY;
      rawC[i] = heldCenter;
    } else if (year > spanStart && year < spanEnd) {
      rawW[i] = THREAD_WIDTH;
      rawC[i] = stream.laneY;
    } else {
      rawW[i] = 0;
      rawC[i] = heldCenter;
    }
  }

  const width = smooth(rawW, 5, 2);
  const center = smooth(rawC, 22, 2);
  let first = 0;
  while (first < SAMPLES - 1 && width[first] < 0.05) first++;
  let last = SAMPLES - 1;
  while (last > first && width[last] < 0.05) last--;
  return { stream, first, last, center, width };
}

export const ribbons: RibbonGeometry[] = civilizations.map(buildRibbon);
const ribbonById = new Map(ribbons.map((r) => [r.stream.id, r]));

function sampleAt(arr: Float32Array, u: number): number {
  const f = Math.min(Math.max(u, 0), 1) * (SAMPLES - 1);
  const i = Math.floor(f);
  const t = f - i;
  return i >= SAMPLES - 1 ? arr[SAMPLES - 1] : arr[i] * (1 - t) + arr[i + 1] * t;
}

export function ribbonCenterAt(civId: string, u: number): number {
  const r = ribbonById.get(civId);
  return r ? sampleAt(r.center, u) : 50;
}

export function ribbonWidthAt(civId: string, u: number): number {
  const r = ribbonById.get(civId);
  return r ? sampleAt(r.width, u) : 0;
}

/** Vertical position (0–100%) of a civilization's ribbon centre at a given year. */
export function streamY(civId: string, year: number): number {
  return Math.round(ribbonCenterAt(civId, yearToU(year)) * 10) / 10;
}

export function segmentAt(civId: string, year: number): StreamSegment | null {
  const r = ribbonById.get(civId);
  if (!r) return null;
  let best: StreamSegment | null = null;
  for (const s of r.stream.streamSegments) {
    if (year >= s.startYear && year <= s.endYear && (!best || s.prominenceWidth > best.prominenceWidth)) best = s;
  }
  return best;
}

export interface Projection {
  totalWidth: number;
  top: number; // px offset of ribbon area
  height: number; // px height of ribbon area
}

/** Closed SVG path outlining a ribbon, projected to pixels. */
export function ribbonPath(r: RibbonGeometry, p: Projection): string {
  const step = p.totalWidth / (SAMPLES - 1);
  const stride = Math.max(1, Math.floor(1.6 / step));
  const k = p.height / 100;
  const upper: string[] = [];
  const lower: string[] = [];
  const push = (i: number) => {
    const x = (i * step).toFixed(1);
    const half = r.width[i] / 2;
    upper.push(`${x},${(p.top + (r.center[i] - half) * k).toFixed(1)}`);
    lower.push(`${x},${(p.top + (r.center[i] + half) * k).toFixed(1)}`);
  };
  for (let i = r.first; i <= r.last; i += stride) push(i);
  if ((r.last - r.first) % stride !== 0) push(r.last);
  return `M${upper.join('L')}L${lower.reverse().join('L')}Z`;
}
