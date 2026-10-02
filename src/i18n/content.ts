import { useMemo } from 'react';
import { arCivs, arPanels } from '../data/ar/meta';
import { arPanelOne } from '../data/ar/events1';
import { arPanelTwo } from '../data/ar/events2';
import { arPanelThree } from '../data/ar/events3';
import { arPanelFour } from '../data/ar/events4';
import type { ArEvent } from '../data/ar/types';
import type { CivilizationStream, FoldPanel, HistoricalEvent, StreamSegment } from '../types/timeline';
import { arDigits, makeI18n, useI18n, type I18n, type Lang } from './lang';

const arEvents: Record<string, ArEvent> = { ...arPanelOne, ...arPanelTwo, ...arPanelThree, ...arPanelFour };
const eventCache = new Map<string, HistoricalEvent>();

/** The event with its narrative, notes and figures swapped for the Arabic edition (sources stay as published). */
export function localizeEvent(e: HistoricalEvent, lang: Lang): HistoricalEvent {
  if (lang === 'en') return e;
  const hit = eventCache.get(e.id);
  if (hit) return hit;
  const a = arEvents[e.id];
  if (!a) return e;
  const d = arDigits;
  const st = e.storytelling;
  const out: HistoricalEvent = {
    ...e,
    title: d(a.t),
    yearLabel: d(a.y),
    shortSnippet: d(a.s),
    storytelling: {
      ...st,
      heroQuote: a.q ? d(a.q) : undefined,
      heroQuoteAttribution: a.qa ? d(a.qa) : undefined,
      synopsis: d(a.syn),
      beats: st.beats.map((b, i) => {
        const ab = a.b[i];
        return ab
          ? { ...b, timestampSubtitle: d(ab[0]), narrativeChunk: d(ab[1]), audioVoiceoverHint: d(ab[2]), artifactCaption: ab[3] ? d(ab[3]) : undefined }
          : b;
      }),
      historiographyPerspective: d(a.h),
      perspectives: st.perspectives?.map((p, i) => (a.p?.[i] ? { lens: d(a.p[i][0]), view: d(a.p[i][1]) } : p)),
      consensus: a.c ? d(a.c) : undefined,
      keyFigures: st.keyFigures?.map((k, i) => {
        const f = a.f?.[i];
        return f ? { ...k, name: d(f[0]), role: d(f[1]), dates: f[2] ? d(f[2]) : undefined } : k;
      }),
    },
  };
  eventCache.set(e.id, out);
  return out;
}

export function localizeCiv(civ: CivilizationStream, lang: Lang): CivilizationStream {
  const a = lang === 'ar' ? arCivs[civ.id] : undefined;
  return a ? { ...civ, name: a.name, originRegion: a.originRegion } : civ;
}

export function civShortName(civ: CivilizationStream, lang: Lang): string | null {
  return lang === 'ar' ? (arCivs[civ.id]?.short ?? null) : null;
}

export function localizePanel(p: FoldPanel, lang: Lang): FoldPanel {
  const a = lang === 'ar' ? arPanels[p.id] : undefined;
  return a ? { ...p, ...a } : p;
}

export interface SegmentText {
  label: string;
  description: string;
}

export function segmentText(civ: CivilizationStream, seg: StreamSegment, lang: Lang): SegmentText {
  const idx = civ.streamSegments.indexOf(seg);
  const a = lang === 'ar' ? arCivs[civ.id]?.segments[idx] : undefined;
  return a ? { label: a[0], description: arDigits(a[1]) } : { label: seg.label ?? '', description: seg.description };
}

export interface Content extends I18n {
  event: (e: HistoricalEvent) => HistoricalEvent;
  civ: (c: CivilizationStream) => CivilizationStream;
  civShort: (c: CivilizationStream) => string;
  panel: (p: FoldPanel) => FoldPanel;
  segment: (c: CivilizationStream, s: StreamSegment) => SegmentText;
}

export function makeContent(lang: Lang): Content {
  const i = makeI18n(lang);
  return {
    ...i,
    event: (e) => localizeEvent(e, lang),
    civ: (c) => localizeCiv(c, lang),
    civShort: (c) => civShortName(c, lang) ?? localizeCiv(c, lang).name,
    panel: (p) => localizePanel(p, lang),
    segment: (c, s) => segmentText(c, s, lang),
  };
}

/** i18n helpers plus localised views of events, streams and panels. */
export function useContent(): Content {
  const { lang } = useI18n();
  return useMemo(() => makeContent(lang), [lang]);
}
