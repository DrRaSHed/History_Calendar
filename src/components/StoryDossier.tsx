import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BookOpen,
  ChartNoAxesColumn,
  ExternalLink,
  Gem,
  Library,
  type LucideIcon,
  MapPin,
  Quote,
  Scale,
  ScrollText,
  Search,
  User,
  Users,
} from 'lucide-react';
import { eventExtras } from '../data/extras';
import { type Content, useContent } from '../i18n/content';
import { segmentAt } from '../lib/ribbonGeometry';
import { formatYear } from '../lib/timeScale';
import type { CivilizationStream, FoldPanel, HistoricalEvent, HistoricalSource, KeyFigure } from '../types/timeline';
import { Infographic } from './Infographic';
import { Fleuron } from './Ornaments';

type TabId = 'synopsis' | 'infographic' | 'perspectives' | 'figures' | 'sources';

const TABS: { id: TabId; key: 'tabSynopsis' | 'tabInfographic' | 'tabPerspectives' | 'tabFigures' | 'tabSources'; icon: LucideIcon }[] = [
  { id: 'synopsis', key: 'tabSynopsis', icon: ScrollText },
  { id: 'infographic', key: 'tabInfographic', icon: ChartNoAxesColumn },
  { id: 'perspectives', key: 'tabPerspectives', icon: Scale },
  { id: 'figures', key: 'tabFigures', icon: Users },
  { id: 'sources', key: 'tabSources', icon: Library },
];

const SOURCE_TONE: Record<HistoricalSource['sourceType'], string> = {
  primary: 'bg-crimson text-vellum',
  academic: 'bg-lapis text-vellum',
  secondary: 'bg-jade text-vellum',
  archaeological: 'bg-ochre text-ink',
};

const KIND_ICON: Record<KeyFigure['kind'], LucideIcon> = { person: User, artifact: Gem, place: MapPin, text: BookOpen };

interface StoryDossierProps {
  event: HistoricalEvent;
  civ: CivilizationStream;
  panel: FoldPanel;
}

/** The scholarly side of the story: synopsis, numbers, historiography, figures and a verified bibliography. */
export function StoryDossier({ event: baseEvent, civ: baseCiv, panel: basePanel }: StoryDossierProps) {
  const c = useContent();
  const event = c.event(baseEvent);
  const civ = c.civ(baseCiv);
  const panel = c.panel(basePanel);
  const [tab, setTab] = useState<TabId>('synopsis');
  const base = useId();
  const st = event.storytelling;

  const onTabKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const i = TABS.findIndex((t) => t.id === tab);
    // Arrow keys follow the visual order, which flips in RTL.
    const fwd = c.isAr ? 'ArrowLeft' : 'ArrowRight';
    const back = c.isAr ? 'ArrowRight' : 'ArrowLeft';
    let next = -1;
    if (e.key === fwd) next = (i + 1) % TABS.length;
    if (e.key === back) next = (i - 1 + TABS.length) % TABS.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = TABS.length - 1;
    if (next < 0) return;
    e.preventDefault();
    setTab(TABS[next].id);
    document.getElementById(`${base}-tab-${TABS[next].id}`)?.focus();
  };

  return (
    <section aria-label={c.t('dossierAria')} className="flex min-h-0 flex-col bg-vellum/40">
      <div role="tablist" aria-label={c.t('sectionsAria')} className="thin-scroll sticky top-0 z-10 flex overflow-x-auto border-b border-ink/40 bg-parchment px-2 lg:static" onKeyDown={onTabKey}>
        {TABS.map((t) => {
          const selected = t.id === tab;
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              id={`${base}-tab-${t.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${base}-panel-${t.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setTab(t.id)}
              className={`relative flex shrink-0 items-center gap-1.5 px-3 py-2.5 font-display text-[10.5px] font-semibold uppercase tracking-[0.13em] transition ${
                selected ? 'text-ink' : 'text-ink-soft hover:text-ink'
              }`}
            >
              <Icon size={13} aria-hidden="true" />
              {c.t(t.key)}
              {t.id === 'sources' && <span className="font-mono text-[9.5px] text-sepia">({c.ld(st.sources.length)})</span>}
              {selected && <motion.span layoutId={`${base}-underline`} className="absolute inset-x-2 bottom-0 h-[3px] bg-crimson" />}
            </button>
          );
        })}
      </div>

      <div
        id={`${base}-panel-${tab}`}
        role="tabpanel"
        aria-labelledby={`${base}-tab-${tab}`}
        tabIndex={0}
        className="thin-scroll min-h-0 flex-1 overflow-y-auto px-5 py-4 sm:px-7"
      >
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}>
            {tab === 'synopsis' && <SynopsisTab event={event} civ={civ} baseCiv={baseCiv} panel={panel} c={c} />}
            {tab === 'infographic' &&
              (eventExtras[event.id] ? <Infographic extras={eventExtras[event.id]} civ={civ} c={c} /> : null)}
            {tab === 'perspectives' && <PerspectivesTab event={event} civ={civ} c={c} />}
            {tab === 'figures' && <FiguresTab event={event} civ={civ} c={c} />}
            {tab === 'sources' && <SourcesTab sources={st.sources} c={c} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

interface TabProps {
  event: HistoricalEvent;
  civ: CivilizationStream;
  c: Content;
}

function SynopsisTab({ event, civ, baseCiv, panel, c }: TabProps & { panel: FoldPanel; baseCiv: CivilizationStream }) {
  const st = event.storytelling;
  const era = segmentAt(civ.id, event.year);
  const eraText = era ? c.segment(baseCiv, era) : null;
  const place = eventExtras[event.id]?.place;
  const dropCap = c.isAr
    ? ''
    : 'first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:font-display first-letter:text-[46px] first-letter:font-bold first-letter:leading-[0.8] first-letter:text-crimson';
  const dt = 'font-display text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-soft';
  return (
    <div className="space-y-4">
      {st.heroQuote && (
        <figure className="relative border-y-[3px] border-double border-ink/50 px-2 py-3 ps-9">
          <Quote size={22} className="absolute start-1 top-3 text-gold" aria-hidden="true" />
          <blockquote className="font-garamond text-[20px] italic leading-snug text-ink">{st.heroQuote}</blockquote>
          {st.heroQuoteAttribution && <figcaption className="mt-1 font-garamond text-[14px] text-ink-soft">— {st.heroQuoteAttribution}</figcaption>}
        </figure>
      )}
      <p className={`font-serif text-[15px] leading-relaxed text-ink ${dropCap}`}>{st.synopsis}</p>
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 border-t border-ink/25 pt-3 text-[13.5px]">
        <dt className={dt}>{c.t('fDate')}</dt>
        <dd className="font-mono text-[12.5px] text-ink">{event.yearLabel}</dd>
        {place && (
          <>
            <dt className={dt}>{c.t('fPlace')}</dt>
            <dd className="font-serif text-ink">{c.pick(place)}</dd>
          </>
        )}
        <dt className={dt}>{c.t('fStream')}</dt>
        <dd className="font-serif text-ink">
          <span className="me-1.5 inline-block h-2.5 w-2.5 rounded-full border border-ink/60 align-middle" style={{ background: civ.color }} />
          {civ.name} <span className="text-ink-soft">— {civ.originRegion}</span>
        </dd>
        {era && eraText && (
          <>
            <dt className={dt}>{c.t('fEra')}</dt>
            <dd className="font-serif text-ink">
              {eraText.label}{' '}
              <span className="font-mono text-[11px] text-sepia" dir="ltr">
                ({formatYear(era.startYear, { lang: c.lang })} – {era.endYear >= 2030 ? c.t('present') : formatYear(era.endYear, { lang: c.lang })})
              </span>
            </dd>
          </>
        )}
        <dt className={dt}>{c.t('fLeaf')}</dt>
        <dd className="font-serif text-ink">{c.t('leafValue', { numeral: panel.numeral, title: panel.title })}</dd>
        <dt className={dt}>{c.t('fSignificance')}</dt>
        <dd className="font-serif text-ink">{c.t(`imp_${event.importance}` as const)}</dd>
      </dl>
    </div>
  );
}

function PerspectivesTab({ event, civ, c }: TabProps) {
  const st = event.storytelling;
  return (
    <div className="space-y-4">
      <h3 className="font-display text-[15px] font-semibold uppercase tracking-[0.12em] text-ink">{c.t('perspectivesHead')}</h3>
      <p className="font-serif text-[14.5px] leading-relaxed text-ink">{st.historiographyPerspective}</p>
      {st.perspectives && (
        <div className="grid gap-3">
          {st.perspectives.map((p) => (
            <article key={p.lens} className="border-s-[3px] bg-vellum/70 py-1.5 ps-3 pe-2" style={{ borderColor: civ.color }}>
              <h4 className="font-display text-[11.5px] font-semibold uppercase tracking-[0.14em] text-ink">{p.lens}</h4>
              <p className="mt-0.5 font-serif text-[13.5px] leading-snug text-ink/90">{p.view}</p>
            </article>
          ))}
        </div>
      )}
      {st.consensus && (
        <div className="engraved bg-parchment/45 p-3.5">
          <h4 className="flex items-center gap-1.5 font-display text-[11.5px] font-semibold uppercase tracking-[0.14em] text-ink">
            <Scale size={14} aria-hidden="true" /> {c.t('consensusHead')}
          </h4>
          <p className="mt-1 font-serif text-[14px] leading-snug text-ink">{st.consensus}</p>
        </div>
      )}
      <p className="font-garamond text-[13px] italic text-ink-soft">{c.t('neutralNote')}</p>
    </div>
  );
}

function FiguresTab({ event, civ, c }: TabProps) {
  const figures = event.storytelling.keyFigures ?? [];
  const plates = event.storytelling.beats.filter((b) => b.artifactCaption);
  return (
    <div className="space-y-4">
      <div className="grid gap-2.5 sm:grid-cols-2">
        {figures.map((f) => {
          const Icon = KIND_ICON[f.kind];
          return (
            <article key={f.name} className="paper relative flex gap-3 border border-ink/50 p-3">
              <span
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 bg-vellum"
                style={{ borderColor: civ.color, color: civ.secondaryColor }}
              >
                <Icon size={18} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[9.5px] uppercase tracking-wider text-sepia">
                  {c.t(`kind_${f.kind}` as const)}
                  {f.dates ? ` · ${f.dates}` : ''}
                </p>
                <h4 className="font-display text-[13px] font-semibold leading-snug text-ink">{f.name}</h4>
                <p className="mt-0.5 font-serif text-[12.5px] leading-snug text-ink/85">{f.role}</p>
              </div>
            </article>
          );
        })}
      </div>
      {plates.length > 0 && (
        <>
          <Fleuron />
          <h4 className="font-display text-[11.5px] font-semibold uppercase tracking-[0.14em] text-ink">{c.t('artifactsOnPlates')}</h4>
          <ul className="space-y-1.5">
            {plates.map((b) => (
              <li key={b.id} className="flex gap-2 font-garamond text-[14.5px] italic leading-snug text-ink">
                <Gem size={13} className="mt-1 shrink-0 text-gold" aria-hidden="true" />
                {b.artifactCaption}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function worldCatUrl(s: HistoricalSource) {
  const author = s.authorOrInstitution.split('·')[0].trim();
  return `https://search.worldcat.org/search?q=${encodeURIComponent(`${s.title} ${author}`)}`;
}

function SourcesTab({ sources, c }: { sources: HistoricalSource[]; c: Content }) {
  const [filter, setFilter] = useState<HistoricalSource['sourceType'] | 'all'>('all');
  const types = ['primary', 'academic', 'secondary', 'archaeological'] as const;
  const present = types.filter((t) => sources.some((s) => s.sourceType === t));
  const shown = filter === 'all' ? sources : sources.filter((s) => s.sourceType === filter);

  return (
    <div className="space-y-3">
      <h3 className="font-display text-[15px] font-semibold uppercase tracking-[0.12em] text-ink">{c.t('sourcesHead')}</h3>
      <div className="flex flex-wrap gap-1.5" role="group" aria-label={c.t('filterAria')}>
        {(['all', ...present] as const).map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={filter === t}
            onClick={() => setFilter(t)}
            className={`border border-ink/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
              filter === t ? 'bg-ink text-vellum' : 'bg-vellum text-ink-soft hover:bg-parchment'
            }`}
            title={t === 'all' ? undefined : c.t(`srcHint_${t}` as const)}
          >
            {t === 'all'
              ? c.t('allCount', { n: sources.length })
              : `${c.t(`src_${t}` as const)} (${c.ld(sources.filter((s) => s.sourceType === t).length)})`}
          </button>
        ))}
      </div>
      <ol className="space-y-2.5">
        {shown.map((s) => {
          const isPublication = s.yearPublished !== undefined && s.sourceType !== 'archaeological';
          const href = s.url ?? (isPublication ? worldCatUrl(s) : undefined);
          return (
            <li key={s.title} className="border-b border-ink/15 pb-2.5">
              <div className="flex items-start gap-2">
                <span className={`mt-0.5 shrink-0 px-1.5 py-px font-mono text-[9px] uppercase tracking-wider ${SOURCE_TONE[s.sourceType]}`} title={c.t(`srcHint_${s.sourceType}` as const)}>
                  {c.t(`src_${s.sourceType}` as const)}
                </span>
                {/* Bibliographic data stays in its original language and direction. */}
                <div className="min-w-0 flex-1" dir="ltr" lang="en" style={{ textAlign: 'left' }}>
                  <p className="font-serif text-[14px] leading-snug text-ink">
                    <cite>{s.title}</cite>
                  </p>
                  <p className="font-garamond text-[14px] text-ink-soft">
                    {s.authorOrInstitution}
                    {s.yearPublished !== undefined ? ` · ${s.yearPublished}` : ''}
                  </p>
                  {href && (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      lang={c.lang === 'ar' ? 'ar' : 'en'}
                      dir={c.dir}
                      className="mt-0.5 inline-flex items-center gap-1 font-mono text-[10.5px] text-lapis underline decoration-dotted underline-offset-2 hover:text-crimson"
                    >
                      {s.url ? <ExternalLink size={11} aria-hidden="true" /> : <Search size={11} aria-hidden="true" />}
                      {s.url ? c.t('visitSource') : c.t('findLibrary')}
                      <span className="sr-only">{c.t('newTab')}</span>
                    </a>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
      <p className="font-garamond text-[13px] italic text-ink-soft">{c.t('sourcesNote')}</p>
    </div>
  );
}
