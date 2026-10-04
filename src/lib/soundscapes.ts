/**
 * Regional soundscapes — soft, generative sketches of each stream's signature instruments, synthesised
 * with Web Audio (no audio files): ney & oud (Nile), lyre (Mesopotamia), santur (Persia), tanpura & sitar
 * (South Asia), guzheng & temple bell (East Asia), kora (West Africa), clay flute & slit drum (Americas),
 * chant & lute (Europe) and a modern pad (Global). Everything passes through a low-pass + reverb bus.
 */

export type Region = 'americas' | 'europe' | 'westAfrica' | 'nile' | 'mesopotamia' | 'persia' | 'southAsia' | 'eastAsia' | 'global';

type Ctx = BaseAudioContext;
type Stopper = (at: number) => void;
type State = { n: number; i: number };
interface Scape {
  level: number;
  drones?: (c: Ctx, out: AudioNode, t: number) => Stopper[];
  step: (c: Ctx, out: AudioNode, t: number, s: State) => number;
}

const hz = (m: number) => 440 * 2 ** ((m - 69) / 12);
const rnd = (a: number, b: number) => a + Math.random() * (b - a);
const pick = <T>(xs: readonly T[]): T => xs[Math.floor(Math.random() * xs.length)];
const walk = (len: number, i: number) => Math.max(0, Math.min(len - 1, i + pick([-2, -1, -1, 1, 1, 2])));

// ── Instruments ──────────────────────────────────────────────────────────────

const ksCache = new Map<string, AudioBuffer>();
/** Karplus–Strong plucked string, rendered once per pitch/brightness/decay and cached. */
function ksBuffer(c: Ctx, f: number, seconds: number, bright: number): AudioBuffer {
  const key = `${c.sampleRate}|${f.toFixed(2)}|${seconds}|${bright}`;
  const hit = ksCache.get(key);
  if (hit) return hit;
  const sr = c.sampleRate;
  const n = Math.floor(sr * seconds);
  const L = Math.max(2, Math.round(sr / f));
  const buf = c.createBuffer(1, n, sr);
  const d = buf.getChannelData(0);
  let lp = 0;
  for (let i = 0; i < Math.min(L, n); i++) {
    lp += bright * (Math.random() * 2 - 1 - lp); // darker excitation for lower brightness
    d[i] = lp;
  }
  const loss = Math.pow(0.001, 1 / (seconds * f)); // −60 dB over `seconds`
  for (let i = L; i < n; i++) d[i] = loss * 0.5 * (d[i - L] + d[i - L > 0 ? i - L - 1 : 0]);
  let peak = 1e-6;
  for (let i = 0; i < Math.min(n, L * 8); i++) peak = Math.max(peak, Math.abs(d[i]));
  for (let i = 0; i < n; i++) d[i] *= 0.9 / peak;
  ksCache.set(key, buf);
  return buf;
}

function panTo(c: Ctx, out: AudioNode, pan: number): StereoPannerNode {
  const p = c.createStereoPanner();
  p.pan.value = pan;
  p.connect(out);
  return p;
}

function pluck(c: Ctx, out: AudioNode, t: number, f: number, o: { gain: number; decay?: number; bright?: number; pan?: number; bend?: number }) {
  const decay = o.decay ?? 2.5;
  const src = c.createBufferSource();
  src.buffer = ksBuffer(c, f, decay, o.bright ?? 0.5);
  if (o.bend) {
    src.playbackRate.setValueAtTime(1, t + 0.12);
    src.playbackRate.linearRampToValueAtTime(o.bend, t + 0.45);
  }
  const g = c.createGain();
  g.gain.value = o.gain;
  const p = panTo(c, out, o.pan ?? rnd(-0.35, 0.35));
  src.connect(g).connect(p);
  src.onended = () => (src.disconnect(), g.disconnect(), p.disconnect());
  src.start(t);
  src.stop(t + decay + 0.05);
}

let noiseBuf: AudioBuffer | null = null;
function noise(c: Ctx): AudioBuffer {
  if (noiseBuf && noiseBuf.sampleRate === c.sampleRate) return noiseBuf;
  noiseBuf = c.createBuffer(1, c.sampleRate * 2, c.sampleRate);
  const d = noiseBuf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return noiseBuf;
}

/** Breathy end-blown flute (ney, ocarina): sine + octave partial + band-passed breath, vibrato that blooms. */
function flute(c: Ctx, out: AudioNode, t: number, f: number, dur: number, o: { gain: number; breath?: number; vib?: number; from?: number; pan?: number }) {
  const end = t + dur;
  const env = c.createGain();
  env.gain.setValueAtTime(0, t);
  env.gain.linearRampToValueAtTime(o.gain, t + Math.min(0.28, dur * 0.4));
  env.gain.setValueAtTime(o.gain, Math.max(t + 0.3, end - 0.25));
  env.gain.linearRampToValueAtTime(0, end + 0.35);
  const p = panTo(c, out, o.pan ?? rnd(-0.2, 0.2));
  env.connect(p);

  const osc = c.createOscillator();
  osc.frequency.setValueAtTime(o.from ?? f, t);
  if (o.from) osc.frequency.exponentialRampToValueAtTime(f, t + 0.16);
  const h2 = c.createOscillator();
  h2.frequency.setValueAtTime((o.from ?? f) * 2, t);
  if (o.from) h2.frequency.exponentialRampToValueAtTime(f * 2, t + 0.16);
  const h2g = c.createGain();
  h2g.gain.value = 0.12;
  const lfo = c.createOscillator();
  lfo.frequency.value = rnd(4.6, 5.6);
  const depth = c.createGain();
  depth.gain.setValueAtTime(0, t);
  depth.gain.linearRampToValueAtTime(f * 0.007 * (o.vib ?? 1), t + dur * 0.7);
  lfo.connect(depth).connect(osc.frequency);
  osc.connect(env);
  h2.connect(h2g).connect(env);

  const air = c.createBufferSource();
  air.buffer = noise(c);
  const bp = c.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = f * 1.5;
  bp.Q.value = 1.1;
  const ag = c.createGain();
  ag.gain.value = o.breath ?? 0.25;
  air.connect(bp).connect(ag).connect(env);

  const nodes = [osc, h2, lfo, air];
  nodes.forEach((n, i) => (n.start(t, i === 3 ? rnd(0, 1) : 0), n.stop(end + 0.4)));
  osc.onended = () => [osc, h2, h2g, lfo, depth, air, bp, ag, env, p].forEach((n) => n.disconnect());
}

/** Struck bell: inharmonic partials with long decays. */
function bell(c: Ctx, out: AudioNode, t: number, f: number, gain: number, decay = 6) {
  const p = panTo(c, out, rnd(-0.3, 0.3));
  [1, 2, 2.76, 5.4].forEach((r, i) => {
    const o = c.createOscillator();
    o.frequency.value = f * r;
    const g = c.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(gain / (i + 1.4), t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + decay / (1 + i * 0.7));
    o.connect(g).connect(p);
    o.onended = () => (o.disconnect(), g.disconnect());
    o.start(t);
    o.stop(t + decay + 0.1);
  });
}

/** Soft hand drum / slit drum: pitched thump with a tiny click. */
function drum(c: Ctx, out: AudioNode, t: number, f: number, gain: number, decay = 0.35) {
  const p = panTo(c, out, rnd(-0.25, 0.25));
  const o = c.createOscillator();
  o.frequency.setValueAtTime(f * 1.7, t);
  o.frequency.exponentialRampToValueAtTime(f, t + 0.04);
  const g = c.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(gain, t + 0.006);
  g.gain.exponentialRampToValueAtTime(0.0001, t + decay);
  o.connect(g).connect(p);
  o.onended = () => (o.disconnect(), g.disconnect(), p.disconnect());
  o.start(t);
  o.stop(t + decay + 0.05);
}

/** Slow-swelling pad (chant, modern chords): detuned voices through a gentle low-pass. */
function swell(c: Ctx, out: AudioNode, t: number, freqs: number[], dur: number, o: { gain: number; type?: OscillatorType; cutoff?: number; vowel?: number }) {
  const env = c.createGain();
  env.gain.setValueAtTime(0, t);
  env.gain.linearRampToValueAtTime(o.gain, t + Math.min(2.2, dur * 0.45));
  env.gain.setValueAtTime(o.gain, t + dur * 0.6);
  env.gain.linearRampToValueAtTime(0, t + dur + 2);
  const lp = c.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = o.cutoff ?? 1100;
  let head: AudioNode = lp;
  if (o.vowel) {
    const formant = c.createBiquadFilter(); // an "ah" formant for chant
    formant.type = 'peaking';
    formant.frequency.value = o.vowel;
    formant.Q.value = 2;
    formant.gain.value = 9;
    formant.connect(lp);
    head = formant;
  }
  lp.connect(env).connect(out);
  const oscs = freqs.flatMap((f) =>
    [-5, 5].map((cents) => {
      const osc = c.createOscillator();
      osc.type = o.type ?? 'triangle';
      osc.frequency.value = f;
      osc.detune.value = cents;
      osc.connect(head);
      osc.start(t);
      osc.stop(t + dur + 2.1);
      return osc;
    }),
  );
  oscs[0].onended = () => [...oscs, lp, env, head].forEach((n) => n.disconnect());
}

/** Held drone for the life of a scape; returns its stopper. */
function drone(c: Ctx, out: AudioNode, t: number, freqs: number[], o: { gain: number; type?: OscillatorType; cutoff?: number }): Stopper {
  const env = c.createGain();
  env.gain.setValueAtTime(0, t);
  env.gain.linearRampToValueAtTime(o.gain, t + 4);
  const lp = c.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = o.cutoff ?? 600;
  lp.connect(env).connect(out);
  const oscs = freqs.map((f, i) => {
    const osc = c.createOscillator();
    osc.type = o.type ?? 'triangle';
    osc.frequency.value = f;
    osc.detune.value = i % 2 ? 4 : -4;
    osc.connect(lp);
    osc.start(t);
    return osc;
  });
  return (at) => {
    env.gain.cancelScheduledValues(at);
    env.gain.setValueAtTime(env.gain.value, at);
    env.gain.linearRampToValueAtTime(0, at + 2.5);
    oscs.forEach((osc) => osc.stop(at + 2.6));
    oscs[0].onended = () => [...oscs, lp, env].forEach((n) => n.disconnect());
  };
}

function rainstick(c: Ctx, out: AudioNode, t: number, gain: number) {
  const src = c.createBufferSource();
  src.buffer = noise(c);
  const bp = c.createBiquadFilter();
  bp.type = 'bandpass';
  bp.Q.value = 3;
  bp.frequency.setValueAtTime(5200, t);
  bp.frequency.exponentialRampToValueAtTime(1800, t + 2.6);
  const g = c.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(gain, t + 0.6);
  g.gain.linearRampToValueAtTime(0, t + 2.8);
  src.connect(bp).connect(g).connect(out);
  src.onended = () => [src, bp, g].forEach((n) => n.disconnect());
  src.start(t, rnd(0, 0.5));
  src.stop(t + 2.9);
}

// ── Regions ──────────────────────────────────────────────────────────────────

const HIJAZ_D = [62, 63, 66, 67, 69, 70, 72, 74]; // D E♭ F♯ G A B♭ C D
const SHUR_D = [62, 63.5, 65, 67, 69, 70, 72, 74]; // D E-koron F G A B♭ C D (quarter-tone)
const LYRE_A = [57, 59, 60, 62, 64, 65, 67, 69];
const YAMAN_C = [60, 62, 64, 66, 67, 69, 71, 72];
const PENTA_D = [62, 64, 66, 69, 71, 74, 76];
const PENTA_A = [69, 72, 74, 76, 79, 81];
const DORIAN_D = [50, 52, 53, 55, 57, 59, 60, 62];

/** A short melodic phrase on a scale, played by `play(t, midi, prevMidi)`; returns its length in seconds. */
function phrase(t: number, scale: number[], notes: number, spacing: [number, number], play: (at: number, m: number, prev: number | null) => void, start?: number) {
  let i = start ?? Math.floor(rnd(1, scale.length - 2));
  let at = t;
  let prev: number | null = null;
  for (let k = 0; k < notes; k++) {
    play(at, scale[i], prev);
    prev = scale[i];
    at += rnd(spacing[0], spacing[1]);
    i = walk(scale.length, i);
  }
  return at - t;
}

const SCAPES: Record<Region, Scape> = {
  nile: {
    level: 0.6,
    drones: (c, out, t) => [drone(c, out, t, [hz(38), hz(45)], { gain: 0.05, cutoff: 520 })],
    step: (c, out, t, s) => {
      s.n++;
      if (Math.random() < 0.4) drum(c, out, t, 72, 0.1, 0.5); // soft riq/daf "dum"
      if (s.n % 3 !== 0) {
        // ney phrase in maqam Hijaz
        const len = phrase(t, HIJAZ_D, Math.floor(rnd(3, 6)), [0.7, 1.3], (at, m, prev) =>
          flute(c, out, at, hz(m), rnd(0.8, 1.4), { gain: 0.085, breath: 0.35, from: prev ? hz(prev) : undefined }),
        );
        return len + rnd(2.5, 4.5);
      }
      // oud answer, an octave lower
      const len = phrase(t, HIJAZ_D.map((m) => m - 12), Math.floor(rnd(3, 5)), [0.38, 0.55], (at, m) =>
        pluck(c, out, at, hz(m), { gain: 0.2, decay: 2, bright: 0.32 }),
      );
      return len + rnd(2, 3.5);
    },
  },
  mesopotamia: {
    level: 1.6,
    drones: (c, out, t) => [drone(c, out, t, [hz(45)], { gain: 0.035, type: 'sawtooth', cutoff: 360 })],
    step: (c, out, t) => {
      const len = phrase(t, LYRE_A, Math.floor(rnd(4, 7)), [0.55, 0.85], (at, m) =>
        pluck(c, out, at, hz(m), { gain: 0.2, decay: 3, bright: 0.45 }),
      );
      return len + rnd(1.5, 3);
    },
  },
  persia: {
    level: 1.2,
    drones: (c, out, t) => [drone(c, out, t, [hz(38)], { gain: 0.035, cutoff: 480 })],
    step: (c, out, t, s) => {
      s.n++;
      if (s.n % 4 === 0) {
        const len = phrase(t, SHUR_D, 3, [1, 1.4], (at, m, prev) =>
          flute(c, out, at, hz(m), rnd(1, 1.5), { gain: 0.075, breath: 0.32, from: prev ? hz(prev) : undefined }),
        );
        return len + rnd(2, 3.5);
      }
      // santur: each note a soft tremolo roll
      const len = phrase(t, SHUR_D, Math.floor(rnd(4, 7)), [0.45, 0.6], (at, m) => {
        const rolls = Math.floor(rnd(2, 5));
        for (let r = 0; r < rolls; r++) pluck(c, out, at + r * 0.075, hz(m), { gain: 0.11 * (1 - r * 0.18), decay: 1.6, bright: 0.78 });
      });
      return len + rnd(1.5, 3);
    },
  },
  southAsia: {
    level: 2.2,
    step: (c, out, t, s) => {
      // tanpura cycle Pa – Sa' – Sa' – Sa, with a faint detuned twin for the jawari shimmer
      const cycle = [43, 48, 48, 36];
      const m = cycle[s.n % 4];
      pluck(c, out, t, hz(m), { gain: 0.15, decay: 4.5, bright: 0.65, pan: -0.15 + (s.n % 4) * 0.1 });
      pluck(c, out, t + 0.01, hz(m) * 1.003, { gain: 0.05, decay: 4.5, bright: 0.9 });
      if (s.n % 16 === 8 && Math.random() < 0.6) {
        phrase(t + 0.4, YAMAN_C, Math.floor(rnd(4, 7)), [0.5, 0.9], (at, mm) =>
          pluck(c, out, at, hz(mm), { gain: 0.1, decay: 2.2, bright: 0.72, bend: Math.random() < 0.3 ? 1.0595 : undefined }),
        );
      }
      s.n++;
      return 1.15;
    },
  },
  eastAsia: {
    level: 2.5,
    step: (c, out, t) => {
      if (Math.random() < 0.18) bell(c, out, t, hz(50), 0.05, 7); // temple bell
      const len = phrase(t, PENTA_D, Math.floor(rnd(3, 7)), [0.4, 0.95], (at, m) =>
        pluck(c, out, at, hz(m), { gain: 0.17, decay: 3, bright: 0.55, bend: Math.random() < 0.22 ? 1.0595 : undefined }),
      );
      return len + rnd(1.5, 3.2);
    },
  },
  westAfrica: {
    level: 2.5,
    step: (c, out, t, s) => {
      // kora: interlocking bass / treble ostinato in F, with an occasional high run
      const pattern = [53, 65, 60, 69, 57, 65, 60, 67];
      const m = pattern[s.n % pattern.length];
      const bass = s.n % 4 === 0;
      pluck(c, out, t, hz(m), { gain: bass ? 0.14 : 0.1, decay: bass ? 2.4 : 1.6, bright: 0.6, pan: bass ? -0.2 : 0.2 });
      if (s.n % 32 === 16) phrase(t + 0.15, [72, 74, 76, 77, 79], 5, [0.15, 0.17], (at, mm) => pluck(c, out, at, hz(mm), { gain: 0.07, decay: 1.2, bright: 0.7 }), 0);
      s.n++;
      return 0.3 + (s.n % 2 ? 0.02 : -0.02); // a little swing
    },
  },
  americas: {
    level: 1.5,
    step: (c, out, t, s) => {
      s.n++;
      // teponaztli slit drum, two woody tones
      const beats = [0, 0.6, 0.9, 1.5];
      beats.forEach((b, k) => drum(c, out, t + b, k % 2 ? 262 : 196, 0.09, 0.22));
      if (s.n % 5 === 0 && Math.random() < 0.6) rainstick(c, out, t + 0.3, 0.03);
      const len = phrase(t + 0.3, PENTA_A, Math.floor(rnd(2, 5)), [0.55, 1.1], (at, m) =>
        flute(c, out, at, hz(m), rnd(0.5, 1), { gain: 0.07, breath: 0.15, vib: 0.4 }),
      );
      return Math.max(1.8, len) + rnd(1.5, 3);
    },
  },
  europe: {
    level: 0.6,
    step: (c, out, t, s) => {
      s.n++;
      const chords = [
        [38, 45, 50],
        [36, 43, 48],
        [41, 45, 48],
        [38, 45, 50],
      ];
      const ch = chords[s.n % chords.length];
      swell(c, out, t, ch.map(hz), 6, { gain: 0.05, type: 'sawtooth', cutoff: 1300, vowel: 750 }); // chant "ah"
      if (Math.random() < 0.12) bell(c, out, t + 1, hz(55), 0.045, 8); // distant church bell
      phrase(t + 1.2, DORIAN_D, 4, [0.6, 0.9], (at, m) => pluck(c, out, at, hz(m), { gain: 0.14, decay: 2.5, bright: 0.4 }), 3); // lute
      return 6;
    },
  },
  global: {
    level: 0.55,
    step: (c, out, t, s) => {
      const chords = [
        [48, 55, 59, 64],
        [45, 52, 55, 60],
        [41, 48, 52, 57],
        [43, 50, 52, 59],
      ];
      const ch = chords[s.n++ % chords.length];
      swell(c, out, t, ch.map(hz), 6, { gain: 0.035, type: 'sine', cutoff: 1400 });
      ch.forEach((m, k) => pluck(c, out, t + 0.6 + k * 0.75, hz(m + 12), { gain: 0.08, decay: 3, bright: 0.25 }));
      return 6;
    },
  },
};

export const isRegion = (id: string | null | undefined): id is Region => !!id && id in SCAPES;

// ── Mixing bus & live engine ─────────────────────────────────────────────────

const MASTER = 0.55;
const DUCKED = 0.35;

function impulse(c: Ctx, seconds: number): AudioBuffer {
  const len = Math.floor(c.sampleRate * seconds);
  const buf = c.createBuffer(2, len, c.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 3;
  }
  return buf;
}

/** Shared bus: low-pass for smoothness, plate-ish reverb, a ducking stage for narration, then the master level. */
function makeBus(c: Ctx, dest: AudioNode) {
  const input = c.createGain();
  const tone = c.createBiquadFilter();
  tone.type = 'lowpass';
  tone.frequency.value = 4200;
  const dry = c.createGain();
  dry.gain.value = 0.8;
  const verb = c.createConvolver();
  verb.buffer = impulse(c, 3.2);
  const wet = c.createGain();
  wet.gain.value = 0.5;
  const duck = c.createGain();
  const out = c.createGain();
  out.gain.value = MASTER;
  input.connect(tone);
  tone.connect(dry).connect(duck);
  tone.connect(verb).connect(wet).connect(duck);
  duck.connect(out).connect(dest);
  return { input, duck };
}

interface Live {
  region: Region;
  gain: GainNode;
  drones: Stopper[];
  next: number;
  state: State;
}

let liveCtx: AudioContext | null = null;
let bus: ReturnType<typeof makeBus> | null = null;
let current: Live | null = null;
let timer: ReturnType<typeof setInterval> | null = null;
let ducked = false;

function pump() {
  const c = liveCtx;
  if (!c || !current) return;
  const horizon = c.currentTime + 1.5; // schedule ahead so timers can be lazy
  while (current.next < horizon) current.next += SCAPES[current.region].step(c, current.gain, current.next, current.state);
}

function fadeOut(c: AudioContext, live: Live) {
  const t = c.currentTime;
  live.gain.gain.cancelScheduledValues(t);
  live.gain.gain.setValueAtTime(live.gain.gain.value, t);
  live.gain.gain.linearRampToValueAtTime(0, t + 2.5);
  live.drones.forEach((stop) => stop(t));
  setTimeout(() => live.gain.disconnect(), 6000); // let tails ring out, then release
}

/** Cross-fade to a region's soundscape, or fade to silence with `null`. */
export function setRegionScape(c: AudioContext | null, region: Region | null) {
  if (!c) return;
  if (current?.region === region) return;
  if (liveCtx !== c) {
    liveCtx = c;
    bus = makeBus(c, c.destination);
  }
  if (current) fadeOut(c, current);
  current = null;
  if (!region) {
    if (timer) clearInterval(timer);
    timer = null;
    return;
  }
  const t = c.currentTime + 0.05;
  const gain = c.createGain();
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(SCAPES[region].level, t + 3);
  gain.connect(bus!.input);
  current = { region, gain, drones: SCAPES[region].drones?.(c, gain, t) ?? [], next: t + 0.4, state: { n: 0, i: 0 } };
  pump();
  timer ??= setInterval(pump, 400);
}

/** Lower the soundscape while the narrator speaks. */
export function duckScape(on: boolean) {
  if (!liveCtx || !bus || ducked === on) return;
  ducked = on;
  const t = liveCtx.currentTime;
  bus.duck.gain.cancelScheduledValues(t);
  bus.duck.gain.setValueAtTime(bus.duck.gain.value, t);
  bus.duck.gain.linearRampToValueAtTime(on ? DUCKED : 1, t + 0.8);
}

/** Offline preview (tests / auditioning): schedule `seconds` of a region into any context. */
export function renderScape(c: BaseAudioContext, region: Region, seconds: number) {
  const b = makeBus(c, c.destination);
  const gain = c.createGain();
  gain.gain.setValueAtTime(0, 0);
  gain.gain.linearRampToValueAtTime(SCAPES[region].level, 3);
  gain.connect(b.input);
  SCAPES[region].drones?.(c, gain, 0);
  const s: State = { n: 0, i: 0 };
  for (let t = 0.4; t < seconds; ) t += SCAPES[region].step(c, gain, t, s);
}

/** Region currently sounding (null when silent) — for diagnostics. */
export const activeRegion = (): Region | null => current?.region ?? null;
if (import.meta.env.DEV && typeof window !== 'undefined') (window as unknown as { __activeRegion: typeof activeRegion }).__activeRegion = activeRegion;
