/**
 * Tiny Web Audio sound kit — synthesised paper rustles, page flicks, a soft chime, and the regional
 * soundscapes in ./soundscapes. No audio files.
 */
import { duckScape, isRegion, setRegionScape } from './soundscapes';

let ctx: AudioContext | null = null;
let enabled = false;
let noise: AudioBuffer | null = null;

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
  if (!on && ctx) setRegionScape(ctx, null);
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

/** Background: the soundscape of the region the listener has gone into (story open / stream focused), else silence. */
export function setAmbientRegion(region: string | null) {
  const target = enabled && isRegion(region) ? region : null;
  if (!target && !ctx) return; // nothing playing and nothing to start
  setRegionScape(audio(), target);
}

export { duckScape as duckAmbient };
