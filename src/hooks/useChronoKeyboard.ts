import { useEffect } from 'react';
import { eventById, timelineEvents } from '../data/timelineData';
import { setAmbientRegion, setSoundEnabled, sfx } from '../lib/sound';
import { yearToU } from '../lib/timeScale';
import { useChronoStore } from '../store/useChronoStore';

function focusEvent(direction: 1 | -1) {
  const s = useChronoStore.getState();
  const center = (s.view.start + s.view.end) / 2;
  const list = direction === 1 ? timelineEvents : [...timelineEvents].reverse();
  const target = list.find((e) => (direction === 1 ? yearToU(e.year) > center + 0.002 : yearToU(e.year) < center - 0.002));
  if (!target) return;
  s.navigateTo(yearToU(target.year), { align: 'center' });
  s.pulseEvent(target.id);
  window.setTimeout(() => {
    document.querySelector<HTMLElement>(`[data-event-id="${target.id}"]`)?.focus({ preventScroll: true });
  }, 60);
}

/** Global keyboard navigation for the chart (dialogs handle their own keys). */
export function useChronoKeyboard() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const s = useChronoStore.getState();
      if (s.activeEventId || s.helpOpen) return;
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const t = e.target as HTMLElement;
      if (t.closest('input, textarea, select, [contenteditable="true"], [role="slider"]')) return;

      const panorama = s.mode === 'panorama';
      const center = (s.view.start + s.view.end) / 2;
      const span = Math.max(0.01, s.view.end - s.view.start);
      let handled = true;

      switch (e.key) {
        case 'f':
        case 'F':
          sfx.fold();
          if (panorama) s.setMode('fold');
          else s.unfoldTo(s.view.start);
          break;
        case 'ArrowRight':
        case 'ArrowLeft': {
          if (!panorama) {
            handled = false;
            break;
          }
          const dir = e.key === 'ArrowRight' ? 1 : -1;
          if (e.shiftKey) {
            const current = Math.floor(s.view.start * 4 + 0.02);
            s.navigateTo(Math.min(3, Math.max(0, current + dir)) / 4, { align: 'start' });
            sfx.tick();
          } else {
            s.navigateTo(center + dir * span * 0.35, { align: 'center' });
          }
          break;
        }
        case 'Home':
          if (panorama) s.navigateTo(0, { align: 'start' });
          break;
        case 'End':
          if (panorama) s.navigateTo(1, { align: 'center' });
          break;
        case '+':
        case '=':
          if (panorama) s.setZoom(s.zoom * 1.4);
          break;
        case '-':
        case '_':
          if (panorama) s.setZoom(s.zoom / 1.4);
          break;
        case '0':
          if (panorama) s.setZoom(1);
          break;
        case '1':
        case '2':
        case '3':
        case '4': {
          const u = (Number(e.key) - 1) / 4;
          sfx.tick();
          if (panorama) s.navigateTo(u, { align: 'start' });
          else {
            sfx.fold();
            s.unfoldTo(u);
          }
          break;
        }
        case 'l':
        case 'L':
          s.toggleLegend();
          break;
        case 'm':
        case 'M':
          s.toggleSound();
          break;
        case 'n':
        case 'N':
          if (panorama) focusEvent(1);
          break;
        case 'p':
        case 'P':
          if (panorama) focusEvent(-1);
          break;
        case '?':
          s.setHelpOpen(true);
          break;
        default:
          handled = false;
      }
      if (handled) e.preventDefault();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
}

/** Keeps the Web Audio engine in step with the sound toggle and the region being explored. */
export function useSoundSync() {
  const soundOn = useChronoStore((s) => s.soundOn);
  // "Going into a region": an open story (its stream's region), otherwise a stream focused in the legend.
  const region = useChronoStore((s) => (s.activeEventId ? eventById[s.activeEventId]?.civilizationId : s.focusCivId) ?? null);

  useEffect(() => {
    setSoundEnabled(soundOn);
    if (soundOn) sfx.flick();
  }, [soundOn]);

  useEffect(() => {
    setAmbientRegion(soundOn ? region : null);
  }, [soundOn, region]);
}
