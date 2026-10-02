import { civilizationById, timelineEvents } from '../data/timelineData';
import { SvgDefs } from './SvgDefs';
import { WoodcutBadge } from './WoodcutBadge';

/** Dev-only contact sheet of every medallion (open /#gallery). */
export function VignetteGallery() {
  return (
    <div className="paper h-dvh overflow-auto p-4">
      <SvgDefs />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5">
        {timelineEvents.map((e) => (
          <figure key={e.id} className="flex flex-col items-center gap-2">
            <WoodcutBadge iconType={e.iconType} color={civilizationById[e.civilizationId].color} importance={e.importance} size={170} />
            <div className="flex items-center gap-3">
              <WoodcutBadge iconType={e.iconType} color={civilizationById[e.civilizationId].color} importance={e.importance} size={54} />
              <WoodcutBadge iconType={e.iconType} color={civilizationById[e.civilizationId].color} importance="regional" size={40} />
            </div>
            <figcaption className="text-center font-mono text-[10px] text-ink-soft">{e.id}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
