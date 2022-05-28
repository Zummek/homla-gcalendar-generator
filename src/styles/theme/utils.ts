import { ThemeKeyType } from './slice/types';

/* istanbul ignore next line */
export const isSystemDark = window?.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)')?.matches : undefined;

export function saveTheme(theme: ThemeKeyType) {
  window.localStorage && localStorage.setItem('selected', theme);
}

/* istanbul ignore next line */
export function getThemeFromStorage(): ThemeKeyType | null {
  return window.localStorage ? (localStorage.getItem('selected') as ThemeKeyType) || null : null;
}
