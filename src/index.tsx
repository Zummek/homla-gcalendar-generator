import { StyledEngineProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import './index.css';
import './locales/i18n';
import './service/Sentry';
import store, { persistor } from './store/configureStore';
import MaterialThemeProvider from './styles/MaterialThemeProvider';
import { ThemeProvider } from './styles/theme/ThemeProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
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
    </PersistGate>
  </Provider>
);
