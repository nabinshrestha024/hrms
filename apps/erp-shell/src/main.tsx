import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/app.css';
import App from './app/app';

async function bootstrap() {
  // Start MSW in development mode
  if (import.meta.env.DEV) {
    const { initMsw } = await import('./mocks/init-msw');
    await initMsw();
  }

  const rootEl = document.getElementById('root');
  if (!rootEl) throw new Error('Root element #root not found in document');
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

bootstrap();
