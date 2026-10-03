import { useEffect, useState } from 'react';

/**
 * Egyptian-Arabic narration source, probed once:
 *  - 'static': pre-generated /audio/<event>-<beat>.mp3 shipped with the site (tts-server/generate_static.py)
 *  - 'server': live tts-server (dev / self-hosted)
 *  - null: neither → callers fall back to browser voices
 */
export type TtsMode = 'static' | 'server' | null;

const staticName = (textId: string) => `/audio/${textId.replace(':', '-')}.mp3`;
export const ttsUrl = (mode: Exclude<TtsMode, null>, textId: string) =>
  mode === 'static' ? staticName(textId) : `/api/tts/${encodeURIComponent(textId)}`;
export const prefetchTts = (mode: TtsMode, textId: string) => {
  if (mode === 'server') void fetch(`${ttsUrl('server', textId)}/prefetch`, { method: 'POST' }).catch(() => {});
};

let probe: Promise<TtsMode> | null = null;
const probeMode = () =>
  (probe ??= fetch(staticName('gobekli-tepe:0'), { method: 'HEAD' })
    .then((r) => (r.ok && (r.headers.get('content-type') ?? '').startsWith('audio') ? ('static' as const) : Promise.reject()))
    .catch(() =>
      fetch('/api/tts/health')
        .then((r) => (r.ok && (r.headers.get('content-type') ?? '').includes('json') ? r.json() : null))
        .then((j): TtsMode => (j?.ok === true ? 'server' : null)),
    )
    .catch((): TtsMode => null));

export function useTts(): TtsMode {
  const [mode, setMode] = useState<TtsMode>(null);
  useEffect(() => {
    let live = true;
    probeMode().then((m) => live && setMode(m));
    return () => {
      live = false;
    };
  }, []);
  return mode;
}
