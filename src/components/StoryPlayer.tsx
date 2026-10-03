import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Mic, MicOff, Pause, Play, RotateCcw } from 'lucide-react';
import { useContent, type Content } from '../i18n/content';
import { sfx } from '../lib/sound';
import { NARRATION_SPEEDS, prefetchTts, ttsUrl, useNarratorVoice, useTts } from '../lib/ttsClient';
import type { CivilizationStream, HistoricalEvent, StoryBeat } from '../types/timeline';
import { WoodcutBadge } from './WoodcutBadge';

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

function beatDuration(beat: StoryBeat) {
  return Math.min(15000, Math.max(6500, beat.narrativeChunk.length * 52));
}

/** Arabic prefers an Egyptian (ar-EG) voice, then any Arabic one; English prefers British. */
function pickVoice(lang: 'en' | 'ar'): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  const norm = (v: SpeechSynthesisVoice) => v.lang.replace('_', '-');
  if (lang === 'ar') {
    return (
      voices.find((v) => norm(v) === 'ar-EG') ??
      voices.find((v) => /egypt|مصر|hoda|shakir|salma/i.test(v.name) && norm(v).startsWith('ar')) ??
      voices.find((v) => norm(v).startsWith('ar') && v.localService) ??
      voices.find((v) => norm(v).startsWith('ar')) ??
      null
    );
  }
  return (
    voices.find((v) => norm(v) === 'en-GB' && v.localService) ??
    voices.find((v) => norm(v).startsWith('en') && v.localService) ??
    voices.find((v) => norm(v).startsWith('en')) ??
    null
  );
}

function useVoicesVersion(): number {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!('speechSynthesis' in window)) return;
    const on = () => setV((n) => n + 1);
    window.speechSynthesis.addEventListener('voiceschanged', on);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', on);
  }, []);
  return v;
}

interface PlateProps {
  event: HistoricalEvent;
  civ: CivilizationStream;
  index: number;
  total: number;
  caption?: string;
  c: Content;
}

/** Engraved illustration plate: sunburst hatching around the event medallion. */
function Plate({ event, civ, index, total, caption, c }: PlateProps) {
  return (
    <div className="relative flex min-h-[190px] flex-1 flex-col overflow-hidden border-b border-ink/40">
      <svg viewBox="0 0 600 320" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <radialGradient id={`wash-${event.id}`} cx="50%" cy="48%" r="60%">
            <stop offset="0" stopColor={civ.color} stopOpacity="0.28" />
            <stop offset="1" stopColor={civ.color} stopOpacity="0.04" />
          </radialGradient>
        </defs>
        <rect width="600" height="320" fill={`url(#wash-${event.id})`} />
        <text
          x="300"
          y="170"
          textAnchor="middle"
          dominantBaseline="central"
          style={{ fontFamily: 'var(--font-display)' }}
          fontWeight={700}
          fontSize="104"
          fill="#2E2A26"
          fillOpacity="0.06"
          letterSpacing="0.06em"
        >
          {c.ld(Math.abs(event.year))}
        </text>
        <motion.g
          animate={{ rotate: index * 6 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {Array.from({ length: 96 }, (_, i) => {
            const a = (i / 96) * Math.PI * 2;
            const r0 = 78 + (i % 2) * 8;
            const r1 = 330;
            return (
              <line
                key={i}
                x1={300 + Math.cos(a) * r0}
                y1={155 + Math.sin(a) * r0}
                x2={300 + Math.cos(a) * r1}
                y2={155 + Math.sin(a) * r1}
                stroke="#2E2A26"
                strokeOpacity={i % 4 === 0 ? 0.16 : 0.07}
                strokeWidth={i % 4 === 0 ? 1 : 0.7}
              />
            );
          })}
        </motion.g>
        <circle cx="300" cy="155" r="74" fill="none" stroke="#2E2A26" strokeOpacity="0.45" strokeWidth="1.2" />
        <circle cx="300" cy="155" r="80" fill="none" stroke="#2E2A26" strokeOpacity="0.25" strokeWidth="0.6" />
        <circle cx="300" cy="155" r="122" fill="none" stroke="#2E2A26" strokeOpacity="0.12" strokeWidth="0.6" strokeDasharray="2 5" />
      </svg>
      <div className="relative flex flex-1 items-center justify-center py-6">
        <motion.div
          key={index}
          initial={{ scale: 0.92, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <WoodcutBadge iconType={event.iconType} color={civ.color} importance={event.importance} size={122} />
        </motion.div>
      </div>
      <span className="absolute start-3 top-2 font-mono text-[10px] uppercase tracking-[0.2em] text-sepia">
        {c.t('plate', { a: ROMAN[index] ?? index + 1, b: ROMAN[total - 1] ?? total })}
      </span>
      <p className="relative border-t border-ink/30 bg-vellum/85 px-4 py-1.5 font-garamond text-[14px] italic leading-snug text-ink-soft">
        {caption ?? c.t('plateCaption', { civ: civ.name, year: event.yearLabel })}
      </p>
    </div>
  );
}

interface StoryPlayerProps {
  event: HistoricalEvent;
  civ: CivilizationStream;
}

/** Cinematic "story subtitles": auto-advancing or click-to-advance beats with optional narration. */
export function StoryPlayer({ event: baseEvent, civ: baseCiv }: StoryPlayerProps) {
  const c = useContent();
  const { lang, t } = c;
  const event = c.event(baseEvent);
  const civ = c.civ(baseCiv);
  const voicesVersion = useVoicesVersion();
  const beats = event.storytelling.beats;
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(!reduced);
  const [narrate, setNarrate] = useState(false);
  const { mode: ttsMode, female: hasFemaleVoice } = useTts();
  const narratorVoice = useNarratorVoice((s) => s.voice);
  const setNarratorVoice = useNarratorVoice((s) => s.setVoice);
  const speed = useNarratorVoice((s) => s.speed);
  const setSpeed = useNarratorVoice((s) => s.setSpeed);
  const speedRef = useRef(speed);
  speedRef.current = speed;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const voice = hasFemaleVoice ? narratorVoice : 'v1';
  const [ttsFailed, setTtsFailed] = useState(false);
  const serverVoice = narrate && lang === 'ar' && ttsMode !== null && !ttsFailed;
  const progress = useMotionValue(0);
  const width = useTransform(progress, (p) => `${p * 100}%`);
  const speechOK = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const hasVoice = speechOK && voicesVersion >= 0 && pickVoice(lang) !== null;
  const indexRef = useRef(0);
  indexRef.current = index;
  const beat = beats[index];
  const atEnd = !playing && index === beats.length - 1;

  const goTo = useCallback(
    (i: number) => {
      if (i < 0 || i >= beats.length) return;
      progress.set(0);
      setIndex(i);
      sfx.flick();
    },
    [beats.length, progress],
  );

  const advance = useCallback(() => {
    const i = indexRef.current;
    if (i < beats.length - 1) {
      progress.set(0);
      setIndex(i + 1);
      sfx.flick();
    } else {
      progress.set(1);
      setPlaying(false);
    }
  }, [beats.length, progress]);

  const togglePlay = useCallback(() => {
    if (!playing && indexRef.current === beats.length - 1 && progress.get() >= 1) goTo(0);
    setPlaying((p) => !p);
  }, [playing, beats.length, progress, goTo]);

  // Timed subtitles.
  useEffect(() => {
    if (!playing || (narrate && (speechOK || serverVoice))) return;
    const duration = beatDuration(beats[index]);
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const p = progress.get() + (now - last) / duration;
      last = now;
      if (p >= 1) {
        progress.set(1);
        advance();
        return;
      }
      progress.set(p);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, narrate, speechOK, serverVoice, index, beats, progress, advance]);

  // Egyptian TTS server: play the cached/generated wav for this beat; progress follows the audio.
  useEffect(() => {
    if (!serverVoice || !playing) return;
    const id = `${baseEvent.id}:${index}`;
    const audio = new Audio(ttsUrl(ttsMode!, id, voice));
    audio.defaultPlaybackRate = audio.playbackRate = speedRef.current; // default survives a src change (fallback)
    audioRef.current = audio;
    audio.ontimeupdate = () => audio.duration && progress.set(Math.min(0.99, audio.currentTime / audio.duration));
    audio.onended = () => {
      progress.set(1);
      advance();
    };
    const fail = () => setTtsFailed(true); // server down / model error → browser voice takes over
    audio.onerror = () => {
      if (voice === 'female' && ttsMode === 'static' && !audio.src.endsWith(ttsUrl('static', id))) {
        audio.src = ttsUrl('static', id); // second narrator missing this beat → first narrator
        audio.play().catch((e: DOMException) => e.name === 'NotAllowedError' && fail());
      } else fail();
    };
    audio.play().catch((e: DOMException) => e.name === 'NotAllowedError' && fail());
    if (index + 1 < beats.length) prefetchTts(ttsMode, `${baseEvent.id}:${index + 1}`);
    return () => {
      audio.onended = audio.onerror = audio.ontimeupdate = null;
      if (audioRef.current === audio) audioRef.current = null;
      audio.pause();
      audio.removeAttribute('src');
    };
  }, [serverVoice, ttsMode, voice, playing, index, beats.length, baseEvent.id, progress, advance]);

  // Speed changes apply to the beat already playing, without restarting it.
  useEffect(() => {
    const a = audioRef.current;
    if (a) a.defaultPlaybackRate = a.playbackRate = speed;
  }, [speed]);

  // Narrated subtitles: speak sentence by sentence; progress follows the voice.
  useEffect(() => {
    if (!speechOK || !narrate || !playing || serverVoice) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    const text = beats[index].narrativeChunk;
    const sentences = text.match(/[\s\S]+?(?:[.!?؟]+["'»”’)]*(?=\s|$)|$)/g) ?? [text];
    let offset = 0;
    let cancelled = false;
    const speak = (k: number) => {
      if (cancelled) return;
      if (k >= sentences.length) {
        advance();
        return;
      }
      const u = new SpeechSynthesisUtterance(sentences[k].trim());
      const voice = pickVoice(lang);
      if (voice) u.voice = voice;
      u.lang = voice?.lang ?? (lang === 'ar' ? 'ar-EG' : 'en-GB');
      u.rate = lang === 'ar' ? 0.92 : 0.97;
      const base = offset;
      u.onboundary = (e) => progress.set(Math.min(0.99, (base + e.charIndex) / text.length));
      u.onend = () => {
        offset += sentences[k].length;
        progress.set(Math.min(1, offset / text.length));
        speak(k + 1);
      };
      synth.speak(u);
    };
    speak(0);
    return () => {
      cancelled = true;
      synth.cancel();
    };
  }, [speechOK, narrate, playing, serverVoice, index, beats, progress, advance, lang]);

  useEffect(() => () => {
    if (speechOK) window.speechSynthesis.cancel();
  }, [speechOK]);

  // Beat navigation keys (Shift+arrows are reserved for switching events).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) return;
      if (t.closest('[role="tablist"], input, textarea, select')) return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goTo(indexRef.current + 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goTo(indexRef.current - 1);
      } else if (e.key === ' ' && !t.closest('button, a')) {
        e.preventDefault();
        togglePlay();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [goTo, togglePlay]);

  const words = beat.narrativeChunk.split(/(\s+)/);

  return (
    <section aria-label={t('subtitlesAria')} className="flex min-h-[460px] flex-col lg:min-h-0 lg:border-e lg:border-ink/40">
      <Plate event={event} civ={civ} index={index} total={beats.length} caption={beat.artifactCaption} c={c} />

      <div className="relative min-h-[178px] px-5 pb-2 pt-4 sm:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={beat.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">{beat.timestampSubtitle}</p>
            <p className="mt-2 font-serif text-[16.5px] leading-relaxed text-ink sm:text-[18px]" aria-live="polite">
              {reduced
                ? beat.narrativeChunk
                : words.map((w, i) => (
                    <motion.span
                      key={i}
                      className="subtitle-word"
                      initial={{ opacity: 0, filter: 'blur(3px)' }}
                      animate={{ opacity: 1, filter: 'blur(0px)' }}
                      transition={{ delay: 0.15 + i * 0.022, duration: 0.35 }}
                    >
                      {w}
                    </motion.span>
                  ))}
            </p>
            {beat.audioVoiceoverHint && (
              <p className="mt-2 flex items-center gap-1.5 font-garamond text-[13px] italic text-ink-soft">
                <Mic size={12} aria-hidden="true" /> {t('narrationNote')} {beat.audioVoiceoverHint}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-auto border-t border-ink/40 px-5 py-3 sm:px-8">
        <div className="flex gap-1.5" role="group" aria-label={t('beatsGroup')}>
          {beats.map((b, i) => (
            <button
              key={b.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={t('beatAria', { n: i + 1, sub: b.timestampSubtitle })}
              aria-current={i === index ? 'step' : undefined}
              className="group flex h-2.5 flex-1 items-center pointer-coarse:h-6"
            >
              <span className="relative block h-2.5 w-full overflow-hidden border border-ink/60 bg-vellum">
                <motion.span
                  className="absolute inset-y-0 left-0 bg-ink group-hover:bg-crimson"
                  style={{ width: i < index ? '100%' : i === index ? width : '0%' }}
                />
              </span>
            </button>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            className="grid h-9 w-9 place-items-center border border-ink/70 bg-vellum text-ink hover:bg-parchment disabled:opacity-35"
            aria-label={t('prevBeat')}
          >
            <ChevronLeft size={17} aria-hidden="true" className="rtl:rotate-180" />
          </button>
          <button
            type="button"
            onClick={togglePlay}
            className="flex h-9 items-center gap-1.5 border border-ink bg-ink px-3.5 font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-vellum hover:bg-crimson"
            aria-label={playing ? t('pauseAria') : atEnd ? t('replayAria') : t('playAria')}
          >
            {playing ? <Pause size={15} aria-hidden="true" /> : atEnd ? <RotateCcw size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}
            {playing ? t('pause') : atEnd ? t('replay') : t('play')}
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            disabled={index === beats.length - 1}
            className="grid h-9 w-9 place-items-center border border-ink/70 bg-vellum text-ink hover:bg-parchment disabled:opacity-35"
            aria-label={t('nextBeat')}
          >
            <ChevronRight size={17} aria-hidden="true" className="rtl:rotate-180" />
          </button>
          <span className="ms-1 whitespace-nowrap font-mono text-[11px] text-sepia">
            {c.ld(index + 1)} / {c.ld(beats.length)}
          </span>
          {speechOK && (
            <button
              type="button"
              onClick={() => setNarrate((n) => !n)}
              aria-pressed={narrate}
              className={`ms-auto flex h-9 items-center gap-1.5 border border-ink/70 px-2.5 font-display text-[10.5px] font-semibold uppercase tracking-[0.12em] ${
                narrate ? 'bg-parchment text-ink' : 'bg-vellum text-ink-soft hover:bg-parchment'
              }`}
              title={t('narrateTitle')}
            >
              {narrate ? <Mic size={14} aria-hidden="true" /> : <MicOff size={14} aria-hidden="true" />}
              {t('narrate')}
            </button>
          )}
        </div>
        {narrate && (speechOK || serverVoice) && lang === 'ar' && (
          <p className="mt-2 font-garamond text-[13px] italic text-ink-soft" role="status">
            {serverVoice ? t('aiVoice') : hasVoice ? t('egVoice') : t('noArVoice')}
          </p>
        )}
        {serverVoice && (
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
            {hasFemaleVoice && (
              <div role="radiogroup" aria-label={t('voicePick')} className="flex items-center gap-2">
                <span className="font-garamond text-[13px] italic text-ink-soft">{t('voicePick')}</span>
                <div className="flex">
                  {(['v1', 'female'] as const).map((v, i) => (
                    <button
                      key={v}
                      type="button"
                      role="radio"
                      aria-checked={voice === v}
                      onClick={() => setNarratorVoice(v)}
                      className={`h-8 border border-ink/70 px-2.5 font-display text-[11px] font-semibold ${i > 0 ? '-ms-px' : ''} ${
                        voice === v ? 'bg-ink text-vellum' : 'bg-vellum text-ink hover:bg-parchment'
                      }`}
                    >
                      {t(v === 'v1' ? 'voice1' : 'voice2')}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div role="radiogroup" aria-label={t('speedPick')} className="flex items-center gap-2">
              <span className="font-garamond text-[13px] italic text-ink-soft">{t('speedPick')}</span>
              <div className="flex" dir="ltr">
                {NARRATION_SPEEDS.map((s, i) => (
                  <button
                    key={s}
                    type="button"
                    role="radio"
                    aria-checked={speed === s}
                    onClick={() => setSpeed(s)}
                    className={`h-8 min-w-11 border border-ink/70 px-2 font-mono text-[11px] ${i > 0 ? '-ml-px' : ''} ${
                      speed === s ? 'bg-ink text-vellum' : 'bg-vellum text-ink hover:bg-parchment'
                    }`}
                  >
                    {c.ld(s === 1 ? '1' : s.toFixed(1))}×
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
