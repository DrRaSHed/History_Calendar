import { Columns4, GalleryHorizontalEnd, Keyboard, Languages, Layers, Volume2, VolumeX, ZoomIn, ZoomOut } from 'lucide-react';
import { foldPanels } from '../data/timelineData';
import { useContent } from '../i18n/content';
import { useLang } from '../i18n/lang';
import { sfx } from '../lib/sound';
import { panelIndexAt } from '../lib/timeScale';
import { useChronoStore, ZOOM_MAX, ZOOM_MIN, ZOOM_PRESETS } from '../store/useChronoStore';

function ChartMark() {
  return (
    <svg width="34" height="34" viewBox="0 0 32 32" aria-hidden="true" className="shrink-0">
      <path d="M4 9l6-3 6 3 6-3 6 3v17l-6-3-6 3-6-3-6 3z" fill="#EADECA" stroke="#2E2A26" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 6v17M16 9v17M22 6v17" stroke="#2E2A26" strokeWidth="0.9" />
      <path d="M4 13c4-2 8 2 12 0s8-2 12 0" stroke="#2A7B88" strokeWidth="1.8" fill="none" />
      <path d="M4 17.5c4-3 8 3 12 0s8-3 12 0" stroke="#B83A24" strokeWidth="2.2" fill="none" />
      <path d="M4 21.5c4-1.5 8 1.5 12 0s8-1.5 12 0" stroke="#C2882E" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

const btn =
  'inline-flex h-8 items-center justify-center gap-1.5 border border-ink/70 px-2.5 font-display text-[11px] font-semibold uppercase tracking-[0.12em] transition disabled:cursor-not-allowed disabled:opacity-40';

function LangButton({ className = '' }: { className?: string }) {
  const c = useContent();
  const toggleLang = useLang((s) => s.toggle);
  return (
    <button
      type="button"
      onClick={toggleLang}
      title={c.t('langTitle')}
      lang={c.isAr ? 'en' : 'ar'}
      className={`${btn} bg-gold text-ink hover:bg-gold-soft ${className}`}
    >
      <Languages size={14} aria-hidden="true" />
      <span className={c.isAr ? 'font-serif normal-case' : 'font-serif text-[13px]'}>{c.t('langLabel')}</span>
    </button>
  );
}

/** Title cartouche, view-mode toggle, era jumps, zoom, language and settings. */
export function HeaderControls() {
  const c = useContent();
  const { t, ld } = c;
  const mode = useChronoStore((s) => s.mode);
  const zoom = useChronoStore((s) => s.zoom);
  const soundOn = useChronoStore((s) => s.soundOn);
  const legendOpen = useChronoStore((s) => s.legendOpen);
  const currentPanel = useChronoStore((s) => panelIndexAt((s.view.start + s.view.end) / 2));
  const { setMode, setZoom, toggleSound, toggleLegend, setHelpOpen, navigateTo, unfoldTo } = useChronoStore.getState();
  const panorama = mode === 'panorama';

  const zoomLabels = {
    millennial: [t('zoomMillennia'), t('zoomMillenniaHint')],
    epoch: [t('zoomEpoch'), t('zoomEpochHint')],
    century: [t('zoomCentury'), t('zoomCenturyHint')],
  } as const;

  const switchMode = (next: 'panorama' | 'fold') => {
    if (next === mode) return;
    sfx.fold();
    if (next === 'panorama') unfoldTo(useChronoStore.getState().view.start);
    else setMode('fold');
  };

  const jump = (i: number) => {
    sfx.tick();
    if (panorama) navigateTo(i / 4, { align: 'start' });
    else unfoldTo(i / 4);
  };

  return (
    <header className="paper relative z-20 border-b-[3px] border-double border-ink/80">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-3 py-2 sm:px-5">
        <div className="flex min-w-0 items-center gap-2.5">
          <ChartMark />
          <div className="min-w-0">
            <h1 className="font-display text-[19px] font-bold leading-none tracking-[0.16em] text-ink max-[359px]:text-[16px] max-[359px]:tracking-[0.1em] sm:text-[22px]" dir="ltr">
              ChronosFold
            </h1>
            <p className="hidden truncate font-garamond text-[13.5px] italic leading-tight text-ink-soft lg:block">{t('tagline')}</p>
          </div>
        </div>

        {/* Phones: the language switch rides on the title row; from sm up it joins the settings group. */}
        <LangButton className="ms-auto roomy:hidden" />

        <div className="flex w-full flex-wrap items-center gap-x-2 gap-y-2 roomy:ms-auto roomy:w-auto roomy:gap-x-3">
          <div role="group" aria-label={t('viewGroup')} className="flex">
            <button
              type="button"
              aria-pressed={!panorama}
              onClick={() => switchMode('fold')}
              className={`${btn} ${!panorama ? 'bg-ink text-vellum' : 'bg-vellum text-ink hover:bg-parchment'}`}
              title={t('modeFoldTitle')}
            >
              <Columns4 size={14} aria-hidden="true" />
              <span className="hidden sm:inline">{t('modeFold')}</span>
            </button>
            <button
              type="button"
              aria-pressed={panorama}
              onClick={() => switchMode('panorama')}
              className={`${btn} -ms-px ${panorama ? 'bg-ink text-vellum' : 'bg-vellum text-ink hover:bg-parchment'}`}
              title={t('modePanoramaTitle')}
            >
              <GalleryHorizontalEnd size={14} aria-hidden="true" />
              <span className="hidden sm:inline">{t('modePanorama')}</span>
            </button>
          </div>

          <nav aria-label={t('jumpAria')} className="flex" dir="ltr">
            {foldPanels.map((p, i) => {
              const active = panorama && currentPanel === i;
              const lp = c.panel(p);
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => jump(i)}
                  aria-current={active ? 'true' : undefined}
                  title={t('jumpTitle', { numeral: p.numeral, title: lp.title, range: lp.rangeLabel, n: i + 1 })}
                  className={`${btn} -ml-px min-w-9 first:ml-0 ${active ? 'bg-crimson text-vellum' : 'bg-vellum text-ink hover:bg-parchment'}`}
                >
                  {p.numeral}
                </button>
              );
            })}
          </nav>

          <div
            role="group"
            aria-label={t('zoomGroup')}
            className={`order-4 flex items-center gap-2 max-sm:w-full roomy:order-none ${panorama ? '' : 'opacity-40 compact:hidden'}`}
          >
            <div className="flex max-sm:w-full">
              {ZOOM_PRESETS.map((z, i) => {
                const active = Math.abs(zoom - z.value) < 0.02;
                const [label, hint] = zoomLabels[z.id];
                return (
                  <button
                    key={z.id}
                    type="button"
                    disabled={!panorama}
                    onClick={() => setZoom(z.value)}
                    aria-pressed={active}
                    title={t('zoomTitle', { label, hint })}
                    className={`${btn} ${i > 0 ? '-ms-px' : ''} normal-case max-sm:flex-1 ${active ? 'bg-ink text-vellum' : 'bg-vellum text-ink hover:bg-parchment'}`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            <label className="hidden items-center gap-1 text-ink xl:flex" dir="ltr">
              <ZoomOut size={15} aria-hidden="true" />
              <span className="sr-only">{t('zoomLevelSr')}</span>
              <input
                type="range"
                className="engraved-range w-24"
                min={Math.log(ZOOM_MIN)}
                max={Math.log(ZOOM_MAX)}
                step={0.01}
                value={Math.log(zoom)}
                disabled={!panorama}
                onChange={(e) => setZoom(Math.exp(Number(e.target.value)))}
                aria-valuetext={t('zoomValue', { v: ld(zoom.toFixed(2)) })}
              />
              <ZoomIn size={15} aria-hidden="true" />
            </label>
          </div>

          <div className="order-3 flex roomy:order-none">
            <button
              type="button"
              onClick={toggleLegend}
              aria-pressed={legendOpen}
              title={t('legendToggle')}
              className={`${btn} ${legendOpen ? 'bg-parchment text-ink' : 'bg-vellum text-ink'} hover:bg-parchment`}
            >
              <Layers size={14} aria-hidden="true" />
              <span className="sr-only">{t('legendToggleSr')}</span>
            </button>
            <button
              type="button"
              onClick={toggleSound}
              aria-pressed={soundOn}
              title={t('soundTitle')}
              className={`${btn} -ms-px ${soundOn ? 'bg-parchment text-ink' : 'bg-vellum text-ink'} hover:bg-parchment`}
            >
              {soundOn ? <Volume2 size={14} aria-hidden="true" /> : <VolumeX size={14} aria-hidden="true" />}
              <span className="sr-only">{soundOn ? t('soundOnSr') : t('soundOffSr')}</span>
            </button>
            <button
              type="button"
              onClick={() => setHelpOpen(true)}
              title={t('helpTitle')}
              className={`${btn} -ms-px bg-vellum text-ink hover:bg-parchment`}
            >
              <Keyboard size={14} aria-hidden="true" />
              <span className="sr-only">{t('helpSr')}</span>
            </button>
            <LangButton className="-ms-px compact:hidden" />
          </div>
        </div>
      </div>
    </header>
  );
}
