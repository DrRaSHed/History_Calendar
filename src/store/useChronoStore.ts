import { create } from 'zustand';

export type ViewMode = 'panorama' | 'fold';

export const ZOOM_MIN = 0.25;
export const ZOOM_MAX = 5;
/** Zoom = width of one fold panel as a multiple of the viewport width. */
export const ZOOM_PRESETS = [
  { id: 'millennial', label: 'Millennia', hint: 'Whole chart in view', value: 0.25 },
  { id: 'epoch', label: 'Epoch', hint: 'One panel per screen', value: 1 },
  { id: 'century', label: 'Century', hint: 'Centuries legible', value: 3 },
] as const;

export interface NavRequest {
  u: number;
  align: 'center' | 'start';
  instant: boolean;
  seq: number;
}

interface ChronoState {
  mode: ViewMode;
  zoom: number;
  /** Viewport fraction (0–1) that stays fixed while zooming. */
  zoomAnchor: number;
  view: { start: number; end: number };
  nav: NavRequest | null;
  activeEventId: string | null;
  pulse: { id: string; seq: number } | null;
  focusCivId: string | null;
  soundOn: boolean;
  legendOpen: boolean;
  helpOpen: boolean;
  /** Thread of prophets (Jewish & Islamic tradition) across the Levant & Arabia lane. */
  showProphets: boolean;

  setMode: (mode: ViewMode) => void;
  setZoom: (zoom: number, anchor?: number) => void;
  setView: (start: number, end: number) => void;
  navigateTo: (u: number, opts?: { align?: 'center' | 'start'; instant?: boolean }) => void;
  unfoldTo: (u: number) => void;
  openEvent: (id: string) => void;
  closeEvent: () => void;
  pulseEvent: (id: string) => void;
  setFocusCiv: (id: string | null) => void;
  toggleSound: () => void;
  toggleLegend: () => void;
  setHelpOpen: (open: boolean) => void;
  toggleProphets: () => void;
}

let navSeq = 0;
let pulseSeq = 0;

export const useChronoStore = create<ChronoState>((set) => ({
  mode: 'fold',
  zoom: 1,
  zoomAnchor: 0.5,
  view: { start: 0, end: 0.25 },
  nav: null,
  activeEventId: null,
  pulse: null,
  focusCivId: null,
  soundOn: false,
  legendOpen: true,
  helpOpen: false,
  showProphets: true,

  setMode: (mode) => set({ mode }),
  setZoom: (zoom, anchor = 0.5) =>
    set({ zoom: Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, zoom)), zoomAnchor: anchor }),
  setView: (start, end) => set({ view: { start, end } }),
  navigateTo: (u, opts = {}) =>
    set({ nav: { u, align: opts.align ?? 'center', instant: opts.instant ?? false, seq: ++navSeq } }),
  unfoldTo: (u) =>
    set({ mode: 'panorama', nav: { u, align: 'start', instant: true, seq: ++navSeq } }),
  openEvent: (id) => set({ activeEventId: id }),
  closeEvent: () => set({ activeEventId: null }),
  pulseEvent: (id) => set({ pulse: { id, seq: ++pulseSeq } }),
  setFocusCiv: (id) => set({ focusCivId: id }),
  toggleSound: () => set((s) => ({ soundOn: !s.soundOn })),
  toggleLegend: () => set((s) => ({ legendOpen: !s.legendOpen })),
  setHelpOpen: (open) => set({ helpOpen: open }),
  toggleProphets: () => set((s) => ({ showProphets: !s.showProphets })),
}));
