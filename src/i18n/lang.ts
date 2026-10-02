import { useMemo } from 'react';
import { create } from 'zustand';
import { ui, type UiKey } from './ui';

export type Lang = 'en' | 'ar';

const KEY = 'chronosfold:lang';
const AR_DIGITS = '٠١٢٣٤٥٦٧٨٩';

function initialLang(): Lang {
  try {
    const v = localStorage.getItem(KEY);
    if (v === 'ar' || v === 'en') return v;
  } catch {
    /* storage unavailable */
  }
  return 'en';
}

/** Mirror the language onto <html> so CSS (fonts, direction) and assistive tech follow it. */
export function applyLang(lang: Lang) {
  const el = document.documentElement;
  el.lang = lang === 'ar' ? 'ar-EG' : 'en';
  el.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.title = lang === 'ar' ? 'كرونوس فولد — نهر التاريخ البشري' : 'ChronosFold';
}

interface LangState {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
}

export const useLang = create<LangState>((set, get) => ({
  lang: initialLang(),
  setLang: (lang) => {
    try {
      localStorage.setItem(KEY, lang);
    } catch {
      /* storage unavailable */
    }
    applyLang(lang);
    set({ lang });
  },
  toggle: () => get().setLang(get().lang === 'en' ? 'ar' : 'en'),
}));

/** Western → Eastern Arabic digits (the form used in Egypt), leaving Latin tokens such as "H1N1" alone. */
export function arDigits(s: string): string {
  return s
    .replace(/(?<=\d)\.(?=\d)/g, '٫')
    .replace(/(?<=\d),(?=\d{3})/g, '٬')
    .replace(/(?<![A-Za-z])(?<!\b(?:Sb|EA) )\d+(?![A-Za-z])/g, (m) => m.replace(/\d/g, (d) => AR_DIGITS[Number(d)]));
}

export function localizeDigits(s: string, lang: Lang): string {
  return lang === 'ar' ? arDigits(s) : s;
}

export type TFn = (key: UiKey, vars?: Record<string, string | number>) => string;

export interface I18n {
  lang: Lang;
  dir: 'ltr' | 'rtl';
  isAr: boolean;
  t: TFn;
  /** Localise digits in an arbitrary string or number. */
  ld: (v: string | number) => string;
  /** Pick the English/Arabic half of a bilingual pair. */
  pick: (pair: readonly [string, string]) => string;
}

export function makeI18n(lang: Lang): I18n {
  const isAr = lang === 'ar';
  const ld = (v: string | number) => localizeDigits(String(v), lang);
  const t: TFn = (key, vars) => {
    let s: string = ui[key][isAr ? 1 : 0];
    if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v));
    return ld(s);
  };
  return { lang, dir: isAr ? 'rtl' : 'ltr', isAr, t, ld, pick: (pair) => ld(pair[isAr ? 1 : 0]) };
}

/** Translation helpers bound to the current language; re-renders the caller when it changes. */
export function useI18n(): I18n {
  const lang = useLang((s) => s.lang);
  return useMemo(() => makeI18n(lang), [lang]);
}
