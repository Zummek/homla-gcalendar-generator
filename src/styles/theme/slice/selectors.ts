import { createSelector } from '@reduxjs/toolkit';
import { initialState } from '.';
import { RootState } from '../../../types';
import { palettes } from '../customPalette';
import { isSystemDark } from '../utils';

export const selectTheme = createSelector([(state: RootState) => state.theme || initialState], (theme) => {
  if (theme.selected === 'system') {
    return isSystemDark ? palettes.dark : palettes.light;
  }
  return palettes[theme.selected];
});

export const selectThemeKey = createSelector([(state: RootState) => state.theme || initialState], (theme) => {
  console.log('selectThemeKey', theme);
  if (theme.selected === 'system') {
    return isSystemDark ? 'dark' : 'light';
  }
  return theme.selected;
});
