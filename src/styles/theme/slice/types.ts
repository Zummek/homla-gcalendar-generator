import { palettes } from '../customPalette';

export type ThemeKeyType = keyof typeof palettes | 'system';

export interface ThemeState {
  selected: ThemeKeyType;
}
