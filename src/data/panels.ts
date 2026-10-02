import type { FoldPanel } from '../types/timeline';

export const PRESENT_YEAR = new Date().getFullYear();

/** The four physical leaves of the folding chart. Each leaf has equal width; the time-scale changes at each crease. */
export const foldPanels: FoldPanel[] = [
  {
    id: 'panel-i',
    numeral: 'I',
    title: 'Deep Past & River Valleys',
    subtitle: 'From the first monuments to the river-valley kingdoms',
    startYear: -12000,
    endYear: -500,
    rangeLabel: 'c. 12,000 BCE – 500 BCE',
  },
  {
    id: 'panel-ii',
    numeral: 'II',
    title: 'Classical Eras & Axial Age',
    subtitle: 'Philosophies, empires and libraries across Eurasia',
    startYear: -500,
    endYear: 1000,
    rangeLabel: '500 BCE – 1000 CE',
  },
  {
    id: 'panel-iii',
    numeral: 'III',
    title: 'Age of Interchange & Revolutions',
    subtitle: 'Oceans, print, science and steam',
    startYear: 1000,
    endYear: 1914,
    rangeLabel: '1000 CE – 1914 CE',
  },
  {
    id: 'panel-iv',
    numeral: 'IV',
    title: 'The Global Acceleration',
    subtitle: 'World wars, the atom, spaceflight and the genome',
    startYear: 1914,
    endYear: 2030,
    rangeLabel: `1914 CE – Present`,
  },
];
