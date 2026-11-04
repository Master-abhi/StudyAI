import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'katex/dist/katex.min.css'
import './index.css'
import App from './App.tsx'
import { Capacitor } from '@capacitor/core'

// Expose Capacitor globally on window so any module or legacy script can access it
if (typeof window !== 'undefined') {
  (window as any).Capacitor = Capacitor;
}

// Redirect API calls to the production server when running as a native app or in native webview
const isNative = typeof window !== 'undefined' && (
  Capacitor.isNativePlatform() ||
  (window.location.hostname === 'localhost' && (!window.location.port || window.location.port === '' || window.location.port === '80' || window.location.port === '443'))
);

if (isNative) {
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

// Register Service Worker in production web environment for offline PWA support (skip in native APK)
if (!isNative && 'serviceWorker' in navigator && import.meta.env.PROD) {
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
