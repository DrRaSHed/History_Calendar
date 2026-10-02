/**
 * Piecewise-linear time scale. The map is normalised to u ∈ [0, 1]; each fold panel owns
 * exactly a quarter of it, so years-per-inch changes at every crease — as on a folding chart.
 * Panel I additionally compresses the deep past (before 3500 BCE) into its first 16%.
 */
import { arDigits, type Lang } from '../i18n/lang';

export const MAP_START = -12000;
export const MAP_END = 2030;
export const DEEP_PAST_BREAK = -3500;

const BREAKS: ReadonlyArray<readonly [year: number, u: number]> = [
  [MAP_START, 0],
  [DEEP_PAST_BREAK, 0.04],
  [-500, 0.25],
  [1000, 0.5],
  [1914, 0.75],
  [MAP_END, 1],
];

export const CREASES_U = [0.25, 0.5, 0.75];

export function yearToU(year: number): number {
  if (year <= MAP_START) return 0;
  if (year >= MAP_END) return 1;
  for (let i = 1; i < BREAKS.length; i++) {
    const [y1, u1] = BREAKS[i];
    if (year <= y1) {
      const [y0, u0] = BREAKS[i - 1];
      return u0 + ((year - y0) / (y1 - y0)) * (u1 - u0);
    }
  }
  return 1;
}

export function uToYear(u: number): number {
  if (u <= 0) return MAP_START;
  if (u >= 1) return MAP_END;
  for (let i = 1; i < BREAKS.length; i++) {
    const [y1, u1] = BREAKS[i];
    if (u <= u1) {
      const [y0, u0] = BREAKS[i - 1];
      return y0 + ((u - u0) / (u1 - u0)) * (y1 - y0);
    }
  }
  return MAP_END;
}

/** Index (0–3) of the fold panel containing u. */
export function panelIndexAt(u: number): number {
  return Math.min(3, Math.max(0, Math.floor(u * 4)));
}

export function formatYear(year: number, opts: { circa?: boolean; lang?: Lang } = {}): string {
  const ar = opts.lang === 'ar';
  const y = Math.round(year);
  if (y === 0) return ar ? 'ق.م | م' : 'BCE | CE';
  const abs = Math.abs(y);
  const num = abs >= 10000 ? abs.toLocaleString('en-US') : String(abs);
  if (ar) return arDigits(`${opts.circa ? 'حوالي ' : ''}${num} ${y < 0 ? 'ق.م' : 'م'}`);
  return `${opts.circa ? 'c. ' : ''}${num} ${y < 0 ? 'BCE' : 'CE'}`;
}

/** Compact label for axis ticks, e.g. "2500 BCE", "1600", "1 CE". */
export function formatTick(year: number, lang: Lang = 'en'): string {
  const ar = lang === 'ar';
  let s: string;
  if (year === 0) s = ar ? 'ق.م | م' : 'BCE | CE';
  else if (year < 0) {
    const abs = -year;
    s = `${abs >= 10000 ? abs.toLocaleString('en-US') : abs} ${ar ? 'ق.م' : 'BCE'}`;
  } else s = year < 1500 ? `${year} ${ar ? 'م' : 'CE'}` : String(year);
  return ar ? arDigits(s) : s;
}

const NICE_STEPS = [1, 2, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000, 2000, 2500, 5000];

export interface Tick {
  year: number;
  u: number;
  major: boolean;
  breakpoint: boolean;
}

/** Ticks for a map rendered `totalWidth` px wide, adapting density per scale segment. */
export function buildTicks(totalWidth: number, minLabelPx = 84): Tick[] {
  const ticks: Tick[] = [];
  for (let i = 1; i < BREAKS.length; i++) {
    const [y0, u0] = BREAKS[i - 1];
    const [y1, u1] = BREAKS[i];
    const pxPerYear = ((u1 - u0) * totalWidth) / (y1 - y0);
    const major = NICE_STEPS.find((s) => s * pxPerYear >= minLabelPx) ?? 5000;
    const minorCandidates = [major / 5, major / 4, major / 2].filter((s) => Number.isInteger(s));
    const minor = minorCandidates.find((s) => s * pxPerYear >= 10) ?? major;
    const guardYears = 46 / pxPerYear;
    const first = Math.ceil(y0 / minor) * minor;
    for (let y = first; y < y1; y += minor) {
      if (y - y0 < guardYears || y1 - y < guardYears) continue;
      ticks.push({ year: y, u: yearToU(y), major: y % major === 0, breakpoint: false });
    }
  }
  for (const [y, u] of BREAKS) {
    if (y === MAP_START || y === MAP_END) continue;
    ticks.push({ year: y, u, major: true, breakpoint: true });
  }
  return ticks.sort((a, b) => a.u - b.u);
}
