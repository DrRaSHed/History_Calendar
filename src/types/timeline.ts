export interface HistoricalSource {
  title: string;
  authorOrInstitution: string;
  yearPublished?: string | number;
  url?: string;
  sourceType: 'primary' | 'secondary' | 'archaeological' | 'academic';
}

export interface StoryBeat {
  id: string;
  timestampSubtitle: string; // e.g., "Dawn of the Nile floods, c. 3100 BCE"
  narrativeChunk: string; // Engaging, storytelling paragraph written without bias
  audioVoiceoverHint?: string;
  visualArtifactUrl?: string; // Curated illustration/icon/diagram
  artifactCaption?: string;
}

/** A scholarly lens on the event (extension of the base schema). */
export interface Perspective {
  lens: string;
  view: string;
}

/** A person, artifact, place or text connected to the event (extension). */
export interface KeyFigure {
  name: string;
  kind: 'person' | 'artifact' | 'place' | 'text';
  role: string;
  dates?: string;
}

export type Importance = 'monumental' | 'major' | 'regional';

export interface HistoricalEvent {
  id: string;
  year: number; // Negative for BCE, positive for CE
  yearLabel: string; // e.g., "1274 BCE"
  civilizationId: string;
  streamYPosition: number; // Normalized vertical position on the canvas (0-100%)
  title: string;
  shortSnippet: string;
  importance: Importance;
  iconType: string;
  storytelling: {
    heroQuote?: string;
    heroQuoteAttribution?: string;
    synopsis: string;
    beats: StoryBeat[]; // Paced subtitle-like slide progression
    historiographyPerspective: string; // Explicitly neutral: explains how different cultures/schools interpret this
    perspectives?: Perspective[];
    consensus?: string;
    keyFigures?: KeyFigure[];
    sources: HistoricalSource[];
  };
}

export interface StreamSegment {
  startYear: number;
  endYear: number;
  prominenceWidth: number; // Thickness of the ribbon at this era (% of ribbon-area height)
  description: string;
  label?: string; // Short engraved name shown on the ribbon
  centerY?: number; // Optional lane drift (0-100%), used for merges and divisions
}

export interface CivilizationStream {
  id: string;
  name: string;
  originRegion: string;
  color: string;
  secondaryColor: string;
  laneY: number; // Resting centre line of the ribbon (0-100%)
  streamSegments: StreamSegment[];
}

export interface FoldPanel {
  id: string;
  numeral: 'I' | 'II' | 'III' | 'IV';
  title: string;
  subtitle: string;
  startYear: number;
  endYear: number;
  rangeLabel: string;
}
