import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Capacitor } from '@capacitor/core'

// Redirect API calls to the production server when running as a native app
if (Capacitor.isNativePlatform()) {
  const originalFetch = window.fetch;
  window.fetch = function (input: RequestInfo | URL, init?: RequestInit) {
    let url = typeof input === 'string' ? input : (input instanceof URL ? input.toString() : input.url);
    if (url.startsWith('/api/')) {
      url = `https://study-ai-olive.vercel.app${url}`;
    } else if (url.startsWith('http://localhost:3000/api/')) {
      url = url.replace('http://localhost:3000', 'https://study-ai-olive.vercel.app');
    }
    if (input instanceof Request) {
      const newRequest = new Request(url, input);
      return originalFetch(newRequest, init);
    }
    return originalFetch(url, init);
  };
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Register Service Worker in production environment for offline PWA support
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch((error) => {
        console.log('ServiceWorker registration failed: ', error);
      });
  });
}

