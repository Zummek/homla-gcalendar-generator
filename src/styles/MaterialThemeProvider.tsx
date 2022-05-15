import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectTheme, selectThemeKey } from './theme/slice/selectors';

interface MaterialThemeProviderProps {
  children: React.ReactNode;
}

const MaterialThemeProvider: React.FC<MaterialThemeProviderProps> = (props) => {
  const themeMode = useSelector(selectThemeKey);
  const themeColors = useSelector(selectTheme);

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

  return <ThemeProvider theme={theme}>{React.Children.only(props.children)}</ThemeProvider>;
};

export default MaterialThemeProvider;
