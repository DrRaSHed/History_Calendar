import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChartBar, Lightbulb, MapPin, Sparkles, Table2 } from 'lucide-react';
import type { Extras } from '../data/extras';
import type { Content } from '../i18n/content';
import type { CivilizationStream } from '../types/timeline';
import { LocatorMap } from './LocatorMap';

interface InfographicProps {
  extras: Extras;
  civ: CivilizationStream;
  c: Content;
}

const NEUTRAL_BAR = '#8A7F70'; // ≥3:1 on vellum

function fmtNum(c: Content, n: number): string {
  return c.ld(Number.isInteger(n) ? n.toLocaleString('en-US') : String(n));
}

function fmtCoords(c: Content, lat: number, lon: number): string {
  const la = `${Math.abs(lat).toFixed(2)}° ${c.t(lat >= 0 ? 'coordN' : 'coordS')}`;
  const lo = `${Math.abs(lon).toFixed(2)}° ${c.t(lon >= 0 ? 'coordE' : 'coordW')}`;
  return c.ld(`${la}${c.isAr ? ' · ' : ', '}${lo}`);
}

function SectionHead({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <h3 className="mb-2 flex items-center gap-2 font-display text-[12px] font-semibold uppercase tracking-[0.14em] text-ink">
      <span className="text-gold">{icon}</span>
      {children}
      <span className="h-px flex-1 bg-ink/25" aria-hidden="true" />
    </h3>
  );
}

function CompareChart({ cmp, civ, c }: { cmp: NonNullable<Extras['compare']>; civ: CivilizationStream; c: Content }) {
  const [view, setView] = useState<'chart' | 'table'>('chart');
  const [active, setActive] = useState<number | null>(null);
  const max = Math.max(...cmp.items.map((i) => i.n));
  const unit = c.pick(cmp.unit);
  const readout = (i: number) => `${c.pick(cmp.items[i].l)} — ${fmtNum(c, cmp.items[i].n)} ${unit}`;

  return (
    <section aria-label={c.pick(cmp.title)}>
      <div className="mb-1 flex items-center justify-between gap-2">
        <h3 className="flex flex-1 items-center gap-2 font-display text-[12px] font-semibold uppercase tracking-[0.14em] text-ink">
          <span className="text-gold">
            <ChartBar size={14} aria-hidden="true" />
          </span>
          {c.t('igCompare')}: <span className="font-serif normal-case tracking-normal text-ink-soft">{c.pick(cmp.title)}</span>
        </h3>
        <div role="group" aria-label={c.t('igCompare')} className="flex shrink-0">
          {(['chart', 'table'] as const).map((v, i) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => setView(v)}
              className={`flex h-7 items-center gap-1 border border-ink/60 px-2 font-mono text-[10px] uppercase tracking-wider ${i > 0 ? '-ms-px' : ''} ${
                view === v ? 'bg-ink text-vellum' : 'bg-vellum text-ink-soft hover:bg-parchment'
              }`}
            >
              {v === 'chart' ? <ChartBar size={12} aria-hidden="true" /> : <Table2 size={12} aria-hidden="true" />}
              {c.t(v === 'chart' ? 'igChart' : 'igTable')}
            </button>
          ))}
        </div>
      </div>

      {view === 'chart' ? (
        <ul className="space-y-1.5 border border-ink/30 bg-vellum/60 px-3 py-2.5" onMouseLeave={() => setActive(null)}>
          {cmp.items.map((it, i) => {
            const pct = (it.n / max) * 80;
            const on = active === i;
            return (
              <li
                key={i}
                tabIndex={0}
                aria-label={readout(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className={`grid grid-cols-[minmax(0,38%)_1fr] items-center gap-3 rounded-sm px-1 outline-offset-0 ${on ? 'bg-parchment/70' : ''}`}
              >
                <span className={`font-serif text-[12.5px] leading-tight ${it.hi ? 'font-semibold text-ink' : 'text-ink-soft'}`}>{c.pick(it.l)}</span>
                <span className="relative block h-7 border-s border-ink/60">
                  <motion.span
                    className="absolute inset-y-[8px] start-0 rounded-e-[4px]"
                    style={{
                      background: it.hi ? civ.color : NEUTRAL_BAR,
                      boxShadow: it.hi ? 'inset 0 0 0 1px rgba(46,42,38,0.55)' : undefined,
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.7, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <span
                    className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[11px] text-ink"
                    style={{ insetInlineStart: `calc(${pct}% + 6px)` }}
                  >
                    {fmtNum(c, it.n)}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      ) : (
        <table className="w-full border border-ink/30 bg-vellum/60 text-[12.5px]">
          <thead>
            <tr className="border-b border-ink/30 font-mono text-[10px] uppercase tracking-wider text-sepia">
              <th scope="col" className="px-2.5 py-1.5 text-start font-normal">
                {c.t('igItem')}
              </th>
              <th scope="col" className="px-2.5 py-1.5 text-end font-normal">
                {c.t('igValue')} ({unit})
              </th>
            </tr>
          </thead>
          <tbody className="font-serif">
            {cmp.items.map((it, i) => (
              <tr key={i} className={`border-b border-ink/10 last:border-0 ${it.hi ? 'font-semibold text-ink' : 'text-ink-soft'}`}>
                <th scope="row" className="px-2.5 py-1 text-start font-normal">
                  {c.pick(it.l)}
                </th>
                <td className="px-2.5 py-1 text-end font-mono">{fmtNum(c, it.n)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p aria-live="polite" className="mt-1 min-h-[1.1rem] font-garamond text-[13px] text-ink-soft">
        {active !== null && view === 'chart' ? readout(active) : cmp.note ? c.pick(cmp.note) : c.t('igApprox')}
      </p>
    </section>
  );
}

/** Illustrated fact-sheet for an event: place, headline numbers, a comparison chart, a step-by-step and curiosities. */
export function Infographic({ extras, civ, c }: InfographicProps) {
  return (
    <div className="space-y-5">
      <section aria-label={c.t('igPlace')}>
        <SectionHead icon={<MapPin size={14} aria-hidden="true" />}>{c.t('igPlace')}</SectionHead>
        <div className="engraved overflow-hidden bg-vellum/60 p-1.5">
          <LocatorMap coords={extras.coords} body={extras.body} color={civ.color} label={c.pick(extras.place)} />
        </div>
        <p className="mt-1.5 font-serif text-[14px] text-ink">{c.pick(extras.place)}</p>
        {extras.coords && (
          <p className="font-mono text-[11px] text-sepia" dir="ltr" style={{ textAlign: c.isAr ? 'right' : 'left' }}>
            {fmtCoords(c, extras.coords[0], extras.coords[1])}
          </p>
        )}
      </section>

      <section aria-label={c.t('igNumbers')}>
        <SectionHead icon={<Sparkles size={14} aria-hidden="true" />}>{c.t('igNumbers')}</SectionHead>
        <div className="grid grid-cols-2 gap-2.5">
          {extras.stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 * i, duration: 0.35 }}
              className="paper relative border border-ink/50 px-3 pb-2.5 pt-3.5"
            >
              <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: civ.color }} aria-hidden="true" />
              <p className="break-words font-display text-[20px] font-bold leading-tight text-ink">{c.pick(s.v)}</p>
              <p className="mt-1 font-serif text-[12.5px] leading-snug text-ink-soft">{c.pick(s.l)}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {extras.compare && <CompareChart cmp={extras.compare} civ={civ} c={c} />}

      <section aria-label={c.t('igUnfolded')}>
        <SectionHead icon={<MapPin size={14} aria-hidden="true" />}>{c.t('igUnfolded')}</SectionHead>
        <ol className="ms-2 space-y-3 border-s-2 border-ink/30 ps-5">
          {extras.steps.map((s, i) => (
            <li key={i} className="relative">
              <span
                className="absolute -start-[27px] top-1 h-3 w-3 rounded-full border-2 border-ink"
                style={{ background: civ.color }}
                aria-hidden="true"
              />
              <p className="font-mono text-[11px] text-sepia">{c.pick(s.y)}</p>
              <p className="font-serif text-[14px] leading-snug text-ink">{c.pick(s.l)}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-label={c.t('igFacts')}>
        <SectionHead icon={<Lightbulb size={14} aria-hidden="true" />}>{c.t('igFacts')}</SectionHead>
        <ul className="grid gap-2">
          {extras.facts.map((f, i) => (
            <li key={i} className="paper relative flex gap-3 border border-ink/50 p-3">
              <span
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 bg-vellum"
                style={{ borderColor: civ.color, color: civ.secondaryColor }}
                aria-hidden="true"
              >
                <Lightbulb size={16} />
              </span>
              <p className="font-serif text-[14px] leading-snug text-ink">{c.pick(f)}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label={c.t('igLegacy')} className="engraved bg-parchment/45 p-3.5">
        <h3 className="flex items-center gap-1.5 font-display text-[12px] font-semibold uppercase tracking-[0.14em] text-ink">
          <Sparkles size={14} className="text-gold" aria-hidden="true" /> {c.t('igLegacy')}
        </h3>
        <p className="mt-1 font-serif text-[14px] leading-relaxed text-ink">{c.pick(extras.legacy)}</p>
      </section>

      <p className="font-garamond text-[13px] italic text-ink-soft">{c.t('igApprox')}</p>
    </div>
  );
}
