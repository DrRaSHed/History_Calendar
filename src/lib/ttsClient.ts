import { useEffect, useState } from 'react';
import { create } from 'zustand';

/**
 * Egyptian-Arabic narration source, probed once:
 *  - 'static': pre-generated /audio/<event>-<beat>.mp3 shipped with the site (tts-server/generate_static.py)
 *  - 'server': live tts-server (dev / self-hosted)
 *  - null: neither → callers fall back to browser voices
 */
export type TtsMode = 'static' | 'server' | null;

/**
 * Pre-generated narrators, each a folder under public/audio:
 *  'v1' = NAMAA model's built-in voice (public/audio), 'female' = NAMAA + female reference voice,
 *  'aisha' = Speaktor's Egyptian "Aisha" voice.
 */
export type NarratorVoice = 'v1' | 'female' | 'aisha';
export const NARRATOR_VOICES: readonly NarratorVoice[] = ['v1', 'female', 'aisha'];
const VOICE_DIR: Record<NarratorVoice, string> = { v1: '', female: 'female/', aisha: 'aisha/' };

const VOICE_KEY = 'chronosfold:voice';
const savedVoice = (): NarratorVoice => {
  try {
    const v = localStorage.getItem(VOICE_KEY) as NarratorVoice | null;
    return v && NARRATOR_VOICES.includes(v) ? v : 'v1';
  } catch {
    return 'v1';
  }
};

/** Narration playback speeds (time-stretched in the browser, pitch preserved). */
export const NARRATION_SPEEDS = [0.8, 0.9, 1] as const;
const SPEED_KEY = 'chronosfold:speed';
const savedSpeed = (): number => {
  try {
    const v = Number(localStorage.getItem(SPEED_KEY));
    return (NARRATION_SPEEDS as readonly number[]).includes(v) ? v : 0.9;
  } catch {
    return 0.9;
  }
};

const persist = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* private mode: keep it for this session only */
  }
};

export const useNarratorVoice = create<{
  voice: NarratorVoice;
  speed: number;
  setVoice: (v: NarratorVoice) => void;
  setSpeed: (s: number) => void;
}>((set) => ({
  voice: savedVoice(),
  speed: savedSpeed(),
  setVoice: (voice) => {
    persist(VOICE_KEY, voice);
    set({ voice });
  },
  setSpeed: (speed) => {
    persist(SPEED_KEY, String(speed));
    set({ speed });
  },
}));

const staticName = (textId: string, voice: NarratorVoice = 'v1') =>
  `/audio/${VOICE_DIR[voice]}${textId.replace(':', '-')}.mp3`;
export const ttsUrl = (mode: Exclude<TtsMode, null>, textId: string, voice: NarratorVoice = 'v1') =>
  mode === 'static' ? staticName(textId, voice) : `/api/tts/${encodeURIComponent(textId)}`;
export const prefetchTts = (mode: TtsMode, textId: string) => {
  if (mode === 'server') void fetch(`${ttsUrl('server', textId)}/prefetch`, { method: 'POST' }).catch(() => {});
};

const isAudio = (r: Response) => r.ok && (r.headers.get('content-type') ?? '').startsWith('audio');

type TtsState = { mode: TtsMode; voices: NarratorVoice[] };
const ONLY_V1: NarratorVoice[] = ['v1'];

let probe: Promise<TtsState> | null = null;
const probeTts = () =>
  (probe ??= fetch(staticName('gobekli-tepe:0'), { method: 'HEAD' })
    .then(async (r) => {
      if (!isAudio(r)) throw new Error('no static audio');
      const extra = await Promise.all(
        NARRATOR_VOICES.filter((v) => v !== 'v1').map((v) =>
          fetch(staticName('gobekli-tepe:0', v), { method: 'HEAD' })
            .then((res): NarratorVoice | null => (isAudio(res) ? v : null))
            .catch((): NarratorVoice | null => null),
        ),
      );
      const voices: NarratorVoice[] = ['v1', ...extra.filter((v): v is NarratorVoice => v !== null)];
      return { mode: 'static' as const, voices };
    })
    .catch(() =>
      fetch('/api/tts/health')
        .then((r) => (r.ok && (r.headers.get('content-type') ?? '').includes('json') ? r.json() : null))
        .then((j): TtsState => ({ mode: j?.ok === true ? 'server' : null, voices: ONLY_V1 })),
    )
    .catch((): TtsState => ({ mode: null, voices: ONLY_V1 })));

/** Which narration source is available, and which pre-generated narrators ship with it. */
export function useTts(): TtsState {
  const [state, setState] = useState<TtsState>({ mode: null, voices: ONLY_V1 });
  useEffect(() => {
    let live = true;
    probeTts().then((s) => live && setState(s));
    return () => {
      live = false;
    };
  }, []);
  return state;
}
