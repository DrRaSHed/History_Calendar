import { useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useI18n } from '../i18n/lang';
import type { UiKey } from '../i18n/ui';
import { useChronoStore } from '../store/useChronoStore';
import { CornerBrackets, Fleuron } from './Ornaments';

const SHORTCUTS: [keys: string | UiKey, desc: UiKey][] = [
  ['F', 'sc_fold'],
  ['← →', 'sc_travel'],
  ['Shift + ← →', 'sc_panel'],
  ['1 – 4', 'sc_jump'],
  ['+  −  0', 'sc_zoom'],
  ['sc_wheelKey', 'sc_wheel'],
  ['N  /  P', 'sc_event'],
  ['Enter', 'sc_enter'],
  ['Space', 'sc_space'],
  ['L  /  M', 'sc_toggle'],
  ['Esc', 'sc_esc'],
];

export function HelpDialog() {
  const open = useChronoStore((s) => s.helpOpen);
  return <AnimatePresence>{open && <HelpContent />}</AnimatePresence>;
}

function HelpContent() {
  const ref = useRef<HTMLDivElement>(null);
  const { t, dir } = useI18n();
  const setHelpOpen = useChronoStore((s) => s.setHelpOpen);
  const close = () => setHelpOpen(false);
  useFocusTrap(ref, close);

  return (
    <motion.div className="fixed inset-0 z-50 grid place-items-center p-3" dir={dir} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-[rgba(30,24,18,0.5)]" onClick={close} aria-hidden="true" />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="help-title"
        tabIndex={-1}
        className="paper engraved thin-scroll relative max-h-[90dvh] w-full max-w-2xl overflow-y-auto p-6 outline-none sm:p-8"
        initial={{ y: 20, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 12, opacity: 0 }}
      >
        <CornerBrackets size={20} inset={6} className="text-ink/70" />
        <button
          type="button"
          onClick={close}
          aria-label={t('helpClose')}
          className="absolute end-4 top-4 grid h-8 w-8 place-items-center border border-ink bg-ink text-vellum hover:bg-crimson"
        >
          <X size={16} aria-hidden="true" />
        </button>
        <p className="font-mono text-[10px] uppercase tracking-engraved text-sepia">{t('helpKicker')}</p>
        <h2 id="help-title" className="font-display text-2xl font-semibold tracking-[0.1em] text-ink">
          {t('helpHead')}
        </h2>
        <div className="mt-3 space-y-3 font-serif text-[14.5px] leading-relaxed text-ink">
          <p>{t('help1')}</p>
          <p>{t('help2')}</p>
          <p>{t('help3')}</p>
          <p>{t('help4')}</p>
          <p className="border-s-[3px] border-gold ps-3">{t('help5')}</p>
        </div>
        <Fleuron className="my-5 text-ink/60" />
        <h3 className="font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-ink">{t('keyboardHead')}</h3>
        <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5">
          {SHORTCUTS.map(([k, v]) => (
            <div key={v} className="contents">
              <dt>
                <kbd dir="ltr" className="inline-block border border-ink/60 bg-vellum px-1.5 py-0.5 font-mono text-[11px] text-ink">
                  {k === 'sc_wheelKey' ? t('sc_wheelKey') : k}
                </kbd>
              </dt>
              <dd className="font-serif text-[14px] text-ink-soft">{t(v)}</dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </motion.div>
  );
}
