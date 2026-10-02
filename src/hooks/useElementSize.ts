import { useLayoutEffect, useState } from 'react';

/** Callback-ref based size observer; works for elements that mount after the hook. */
export function useElementSize<T extends HTMLElement>() {
  const [el, setEl] = useState<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!el) return;
    const update = (width: number, height: number) =>
      setSize((s) => (s.width === width && s.height === height ? s : { width, height }));
    const rect = el.getBoundingClientRect();
    update(Math.round(rect.width), Math.round(rect.height));
    const ro = new ResizeObserver(([entry]) => {
      update(Math.round(entry.contentRect.width), Math.round(entry.contentRect.height));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [el]);

  return [setEl, size, el] as const;
}
