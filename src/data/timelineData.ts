import type { HistoricalEvent } from '../types/timeline';
import { panelOneEvents } from './events/panel1';
import { panelTwoEvents } from './events/panel2';
import { panelThreeEvents } from './events/panel3';
import { panelFourEvents } from './events/panel4';

export { civilizations, civilizationById } from './civilizations';
export { foldPanels, PRESENT_YEAR } from './panels';

/** All milestone events, in chronological order. */
export const timelineEvents: HistoricalEvent[] = [
  ...panelOneEvents,
  ...panelTwoEvents,
  ...panelThreeEvents,
  ...panelFourEvents,
].sort((a, b) => a.year - b.year);

export const eventById: Record<string, HistoricalEvent> = Object.fromEntries(
  timelineEvents.map((e) => [e.id, e]),
);
