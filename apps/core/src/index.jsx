import React from 'react';
import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import App from './App';
import * as serviceWorker from './serviceWorker';

// webfonts
import '@myorg/shared/fonts/inter/inter.css';

if (import.meta.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({
    environment: Boolean(import.meta.env.BASE_URL) ? 'review' : 'production',
    dsn: import.meta.env.REACT_APP_SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1,
    initialScope: scope => {},
    ...(import.meta.env.REACT_APP_HEAD_COMMIT
      ? { release: import.meta.env.REACT_APP_HEAD_COMMIT }
      : {})
  });
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
