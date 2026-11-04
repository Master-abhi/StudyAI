/**
 * Utility to resolve backend API endpoints dynamically.
 * Works seamlessly across:
 * - Local development (Vite dev server -> Express localhost:3000)
 * - Firebase hosting (cg-guru.web.app -> Vercel server)
 * - Native Android APK (Capacitor localhost -> Vercel server)
 */
import { Capacitor } from '@capacitor/core';

export const isCapacitorNative = (): boolean => {
  try {
    if (typeof window !== 'undefined') {
      if ((window as any).Capacitor && typeof (window as any).Capacitor.isNativePlatform === 'function') {
        if ((window as any).Capacitor.isNativePlatform()) return true;
      }
      if (typeof Capacitor !== 'undefined' && typeof Capacitor.isNativePlatform === 'function') {
        if (Capacitor.isNativePlatform()) return true;
      }
    }
  } catch (_) {}
  return false;
};

export const getApiUrl = (path: string = ''): string => {
  // If path is already a full URL, return it
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // 1. If running inside Capacitor Native Android/iOS APK, route API calls to cloud backend
  if (isCapacitorNative()) {
    return `https://study-ai-olive.vercel.app${path}`;
  }

  if (typeof window === 'undefined') {
    return `https://study-ai-olive.vercel.app${path}`;
  }

  const hostname = window.location.hostname;
  const port = window.location.port;

  // 2. In Capacitor Android/iOS WebView, hostname is localhost or capacitor://localhost with no explicit dev port
  if (hostname === 'localhost' && (!port || port === '' || port === '80' || port === '443')) {
    return `https://study-ai-olive.vercel.app${path}`;
  }

  // 3. If running on Vite dev server (ports 5173, 5174, 4173, etc.), route to local Express backend
  const isLocal = hostname === 'localhost' ||
                  hostname === '127.0.0.1' ||
                  hostname === '[::1]' ||
                  hostname.startsWith('192.168.');

  if (isLocal && (port === '5173' || port === '5174' || port === '4173' || (port && port !== '3000'))) {
    return `http://localhost:3000${path}`;
  }

  // 4. Default for production web hosting (cgguru.in, *.web.app, *.firebaseapp.com, etc.)
  return `https://study-ai-olive.vercel.app${path}`;
};
