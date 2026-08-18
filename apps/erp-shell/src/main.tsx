import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app';
import { mocksEnabled } from './mocks/enabled';
import './styles/app.css';

async function bootstrap() {
  if (mocksEnabled) {
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
