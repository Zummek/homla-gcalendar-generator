import * as React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider as OriginalThemeProvider } from 'styled-components';
import { useThemeSlice } from './slice';
import { selectTheme } from './slice/selectors';

export const ThemeProvider = (props: React.PropsWithChildren<unknown>) => {
  useThemeSlice();

  const theme = useSelector(selectTheme);
  return <OriginalThemeProvider theme={theme}>{React.Children.only(props.children)}</OriginalThemeProvider>;
};
