/**
 * Arabic edition of an event. Narrative parts (synopsis, beats, voice-over notes) are in Egyptian colloquial Arabic;
 * quotes, historiography, perspectives and captions are in plain Modern Standard Arabic.
 */
export interface ArEvent {
  /** title */
  t: string;
  /** year label */
  y: string;
  /** short snippet */
  s: string;
  /** hero quote + attribution */
  q?: string;
  qa?: string;
  /** synopsis */
  syn: string;
  /** beats, parallel to the English beats: [subtitle, narration, voice-over note, artifact caption?] */
  b: [sub: string, text: string, hint: string, caption?: string][];
  /** historiography */
  h: string;
  /** perspectives: [lens, view] */
  p?: [lens: string, view: string][];
  /** consensus */
  c?: string;
  /** key figures: [name, role, dates?] */
  f?: [name: string, role: string, dates?: string][];
}
