import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { selectTheme, selectThemeKey } from './theme/slice/selectors';

interface MaterialThemeProviderProps {
  children: React.ReactNode;
}

const MaterialThemeProvider: React.FC<MaterialThemeProviderProps> = (props) => {
  const state = useSelector((state: RootState) => state);
  const themeMode = selectThemeKey(state);
  const themeColors = selectTheme(state);

  console.log({ state });
  console.log({ themeMode });

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
          ...themeColors
        }
      }),
    [themeMode, themeColors]
  );

  console.log({ theme });

  return <ThemeProvider theme={theme}>{React.Children.only(props.children)}</ThemeProvider>;
};

export default MaterialThemeProvider;
