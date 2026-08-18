import { mocksEnabled } from './enabled';

export async function initMsw() {
  if (mocksEnabled) {
    const { worker } = await import('./browser');
    await worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: '/mockServiceWorker.js',
      },
    });
    console.log('[MSW] Mock API active');
  }
}
