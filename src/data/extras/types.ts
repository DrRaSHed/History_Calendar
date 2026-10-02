import type { Bi } from '../../i18n/ui';

export type { Bi };

export interface ExtraStat {
  /** Headline figure (unit included). */
  v: Bi;
  /** What the figure measures. */
  l: Bi;
}

export interface CompareItem {
  l: Bi;
  n: number;
  /** Highlight this bar (the subject of the event). */
  hi?: boolean;
}

export interface Extras {
  place: Bi;
  /** [latitude, longitude] in degrees; null when the event has no single location. */
  coords: [lat: number, lon: number] | null;
  body?: 'earth' | 'moon';
  stats: ExtraStat[];
  compare?: { title: Bi; unit: Bi; note?: Bi; items: CompareItem[] };
  steps: { y: Bi; l: Bi }[];
  facts: Bi[];
  legacy: Bi;
}
