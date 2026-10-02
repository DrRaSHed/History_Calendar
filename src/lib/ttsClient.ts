import { useEffect, useState } from 'react';

/** Optional Egyptian-Arabic TTS server (tts-server/). Absent in static hosting → callers fall back to browser voices. */
export const ttsUrl = (textId: string) => `/api/tts/${encodeURIComponent(textId)}`;
export const prefetchTts = (textId: string) => void fetch(`${ttsUrl(textId)}/prefetch`, { method: 'POST' }).catch(() => {});

let probe: Promise<boolean> | null = null;
const probeServer = () =>
  (probe ??= fetch('/api/tts/health')
    .then((r) => (r.ok && (r.headers.get('content-type') ?? '').includes('json') ? r.json() : null))
    .then((j) => j?.ok === true)
    .catch(() => false));

export function useTtsServer(): boolean {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    let live = true;
    probeServer().then((v) => live && setOk(v));
    return () => {
      live = false;
    };
  }, []);
  return ok;
}
