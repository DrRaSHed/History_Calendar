/**
 * Tiny Web Audio sound kit — synthesised paper rustles, page flicks, a soft chime and an
 * optional ambient drone whose root note shifts with each fold panel. No audio files.
 */
let ctx: AudioContext | null = null;
let enabled = false;
let noise: AudioBuffer | null = null;
let ambient: { oscs: OscillatorNode[]; gain: GainNode; filter: BiquadFilterNode } | null = null;

const PANEL_ROOTS = [98, 110, 130.81, 146.83]; // G2, A2, C3, D3

function audio(): AudioContext | null {
  if (typeof window === 'undefined' || !('AudioContext' in window)) return null;
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

function noiseBuffer(c: AudioContext): AudioBuffer {
  if (noise) return noise;
  const len = c.sampleRate * 1.5;
  noise = c.createBuffer(1, len, c.sampleRate);
  const data = noise.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  return noise;
}

function burst(opts: { duration: number; freq: number; q: number; gain: number; sweepTo?: number; crackle?: number }) {
  const c = audio();
  if (!c || !enabled) return;
  const t = c.currentTime;
  const src = c.createBufferSource();
  src.buffer = noiseBuffer(c);
  const filter = c.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(opts.freq, t);
  if (opts.sweepTo) filter.frequency.exponentialRampToValueAtTime(opts.sweepTo, t + opts.duration);
  filter.Q.value = opts.q;
  const g = c.createGain();
  g.gain.setValueAtTime(0, t);
  // Irregular envelope reads as paper fibres rather than hiss.
  const steps = opts.crackle ?? 6;
  for (let i = 0; i <= steps; i++) {
    const at = t + (opts.duration * i) / steps;
    const env = Math.sin((Math.PI * i) / steps);
    g.gain.linearRampToValueAtTime(opts.gain * env * (0.55 + Math.random() * 0.45), at);
  }
  g.gain.linearRampToValueAtTime(0, t + opts.duration + 0.02);
  src.connect(filter).connect(g).connect(c.destination);
  src.start(t, Math.random() * 0.5);
  src.stop(t + opts.duration + 0.05);
}

export function setSoundEnabled(on: boolean) {
  enabled = on;
  if (on) audio();
  if (!on) stopAmbient();
}

export const sfx = {
  /** Large paper movement — folding or unfolding the chart. */
  fold: () => burst({ duration: 0.65, freq: 1800, sweepTo: 700, q: 0.7, gain: 0.32, crackle: 14 }),
  /** Small page flick — advancing a story beat. */
  flick: () => burst({ duration: 0.16, freq: 3200, sweepTo: 1500, q: 1.1, gain: 0.18, crackle: 4 }),
  /** Soft tick — panning between panels. */
  tick: () => burst({ duration: 0.06, freq: 2400, q: 2, gain: 0.12, crackle: 2 }),
  /** Gentle bell — opening a story. */
  chime: () => {
    const c = audio();
    if (!c || !enabled) return;
    const t = c.currentTime;
    [659.25, 987.77, 1318.5].forEach((f, i) => {
      const o = c.createOscillator();
      const g = c.createGain();
      o.type = 'sine';
      o.frequency.value = f;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.06 / (i + 1), t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);
      o.connect(g).connect(c.destination);
      o.start(t);
      o.stop(t + 1.7);
    });
  },
};

export function startAmbient(panel: number) {
  const c = audio();
  if (!c || !enabled || ambient) return;
  const gain = c.createGain();
  gain.gain.value = 0;
  const filter = c.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 520;
  const root = PANEL_ROOTS[panel] ?? 110;
  const oscs = [1, 1.5, 2.003].map((ratio, i) => {
    const o = c.createOscillator();
    o.type = i === 0 ? 'triangle' : 'sine';
    o.frequency.value = root * ratio;
    o.detune.value = (i - 1) * 6;
    o.connect(filter);
    o.start();
    return o;
  });
  filter.connect(gain).connect(c.destination);
  gain.gain.linearRampToValueAtTime(0.035, c.currentTime + 2.5);
  ambient = { oscs, gain, filter };
}

export function setAmbientPanel(panel: number) {
  const c = audio();
  if (!c || !ambient) return;
  const root = PANEL_ROOTS[panel] ?? 110;
  [1, 1.5, 2.003].forEach((ratio, i) => {
    ambient!.oscs[i].frequency.setTargetAtTime(root * ratio, c.currentTime, 0.8);
  });
}

export function stopAmbient() {
  if (!ambient || !ctx) return;
  const { oscs, gain } = ambient;
  const t = ctx.currentTime;
  gain.gain.cancelScheduledValues(t);
  gain.gain.setValueAtTime(gain.gain.value, t);
  gain.gain.linearRampToValueAtTime(0, t + 0.8);
  oscs.forEach((o) => o.stop(t + 0.9));
  ambient = null;
}
