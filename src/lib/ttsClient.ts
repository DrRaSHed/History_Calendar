import { useEffect, useState } from 'react';
import { create } from 'zustand';

/**
 * Egyptian-Arabic narration source, probed once:
 *  - 'static': pre-generated /audio/<event>-<beat>.mp3 shipped with the site (tts-server/generate_static.py)
 *  - 'server': live tts-server (dev / self-hosted)
 *  - null: neither → callers fall back to browser voices
 */
export type TtsMode = 'static' | 'server' | null;

/** Pre-generated narrators: 'v1' = the model's built-in voice (public/audio), 'female' = public/audio/female. */
export type NarratorVoice = 'v1' | 'female';

const VOICE_KEY = 'chronosfold:voice';
const savedVoice = (): NarratorVoice => {
  try {
    return localStorage.getItem(VOICE_KEY) === 'female' ? 'female' : 'v1';
  } catch {
    return 'v1';
  }
};

export const useNarratorVoice = create<{ voice: NarratorVoice; setVoice: (v: NarratorVoice) => void }>((set) => ({
  voice: savedVoice(),
  setVoice: (voice) => {
    try {
      localStorage.setItem(VOICE_KEY, voice);
    } catch {
      /* private mode: keep it for this session only */
    }
    set({ voice });
  },
}));

const staticName = (textId: string, voice: NarratorVoice = 'v1') =>
  `/audio/${voice === 'female' ? 'female/' : ''}${textId.replace(':', '-')}.mp3`;
export const ttsUrl = (mode: Exclude<TtsMode, null>, textId: string, voice: NarratorVoice = 'v1') =>
  mode === 'static' ? staticName(textId, voice) : `/api/tts/${encodeURIComponent(textId)}`;
export const prefetchTts = (mode: TtsMode, textId: string) => {
  if (mode === 'server') void fetch(`${ttsUrl('server', textId)}/prefetch`, { method: 'POST' }).catch(() => {});
};

const isAudio = (r: Response) => r.ok && (r.headers.get('content-type') ?? '').startsWith('audio');

let probe: Promise<{ mode: TtsMode; female: boolean }> | null = null;
const probeTts = () =>
  (probe ??= fetch(staticName('gobekli-tepe:0'), { method: 'HEAD' })
    .then(async (r) => {
      if (!isAudio(r)) throw new Error('no static audio');
      const female = await fetch(staticName('gobekli-tepe:0', 'female'), { method: 'HEAD' })
        .then(isAudio)
        .catch(() => false);
      return { mode: 'static' as const, female };
    })
    .catch(() =>
      fetch('/api/tts/health')
        .then((r) => (r.ok && (r.headers.get('content-type') ?? '').includes('json') ? r.json() : null))
        .then((j) => ({ mode: (j?.ok === true ? 'server' : null) as TtsMode, female: false })),
    )
    .catch(() => ({ mode: null as TtsMode, female: false })));

/** Which narration source is available, and whether the second (female) narrator ships with it. */
export function useTts(): { mode: TtsMode; female: boolean } {
  const [state, setState] = useState<{ mode: TtsMode; female: boolean }>({ mode: null, female: false });
  useEffect(() => {
    let live = true;
    probeTts().then((s) => live && setState(s));
    return () => {
      live = false;
    };
  }, []);
  return state;
}
