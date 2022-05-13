import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';

interface MaterialThemeProviderProps {
  children: React.ReactNode;
}

const MaterialThemeProvider: React.FC<MaterialThemeProviderProps> = (props) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light'
        }
      }),
    [prefersDarkMode]
  );

  return <ThemeProvider theme={theme}>{React.Children.only(props.children)}</ThemeProvider>;
};

export default MaterialThemeProvider;
