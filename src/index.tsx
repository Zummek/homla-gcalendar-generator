import { StyledEngineProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import './locales/i18n';
import './service/Sentry';
import { configureAppStore } from './store/configureStore';
import MaterialThemeProvider from './styles/MaterialThemeProvider';
import { ThemeProvider } from './styles/theme/ThemeProvider';

const store = configureAppStore();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <ThemeProvider>
      <MaterialThemeProvider>
        <StyledEngineProvider injectFirst>
          <HelmetProvider>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </HelmetProvider>
        </StyledEngineProvider>
      </MaterialThemeProvider>
    </ThemeProvider>
  </Provider>
);
