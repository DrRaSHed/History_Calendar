// Dumps the Egyptian-Arabic narration (beats + synopsis) to tts-server/texts.json, keyed "<eventId>:<beatIndex>" / "<eventId>:synopsis".
import { writeFileSync } from 'node:fs';
import { arPanelOne } from '../src/data/ar/events1';
import { arPanelTwo } from '../src/data/ar/events2';
import { arPanelThree } from '../src/data/ar/events3';
import { arPanelFour } from '../src/data/ar/events4';

const out: Record<string, string> = {};
for (const [id, ev] of Object.entries({ ...arPanelOne, ...arPanelTwo, ...arPanelThree, ...arPanelFour })) {
  ev.b.forEach((beat, i) => (out[`${id}:${i}`] = beat[1]));
  out[`${id}:synopsis`] = ev.syn;
}
writeFileSync(new URL('../tts-server/texts.json', import.meta.url), JSON.stringify(out, null, 1), 'utf8');
console.log(`exported ${Object.keys(out).length} texts`);
