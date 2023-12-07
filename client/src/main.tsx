import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from '@sentry/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx';
import './index.css';
import { Layout } from './Layout.tsx';

const queryClient = new QueryClient();

Sentry.init({
  dsn: 'https://4710d329a8b8f0b2e8b02ef17ae7836c@o4505777887051776.ingest.sentry.io/4505777889017856'
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Layout>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Layout>
  </React.StrictMode>
);
