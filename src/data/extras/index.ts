import type { Extras } from './types';
import { extrasPanelOne } from './extras1';
import { extrasPanelTwo } from './extras2';
import { extrasPanelThree } from './extras3';
import { extrasPanelFour } from './extras4';

export type { Extras } from './types';

export const eventExtras: Record<string, Extras> = {
  ...extrasPanelOne,
  ...extrasPanelTwo,
  ...extrasPanelThree,
  ...extrasPanelFour,
};
