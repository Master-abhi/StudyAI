/**
 * Utility to resolve backend API endpoints dynamically.
 * Works seamlessly across:
 * - Local development (Vite dev server -> Express localhost:3000)
 * - Firebase hosting (cg-guru.web.app -> Vercel server)
 * - Native Android APK (Capacitor localhost -> Vercel server)
 */
export const isCapacitorNative = (): boolean => {
  return typeof window !== 'undefined' &&
    (window as any).Capacitor !== undefined &&
    typeof (window as any).Capacitor.isNativePlatform === 'function' &&
    (window as any).Capacitor.isNativePlatform();
};

export const getApiUrl = (path: string = ''): string => {
  // If path is already a full URL, return it
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // If running inside Capacitor Native Android/iOS APK, route API calls to cloud backend
  if (isCapacitorNative()) {
    return `https://study-ai-olive.vercel.app${path}`;
  }

  if (typeof window === 'undefined') {
    return `https://study-ai-olive.vercel.app${path}`;
  }

  const hostname = window.location.hostname;
  const isLocal = hostname === 'localhost' ||
                  hostname === '127.0.0.1' ||
                  hostname === '[::1]' ||
                  hostname.startsWith('192.168.');

  // If running locally in a browser on a port other than 3000 (e.g. Vite on 5173)
  if (isLocal && window.location.port !== '3000') {
    return `http://localhost:3000${path}`;
  }

  // If running on web hosting or capacitor local origin without native flag
  if (hostname.endsWith('.web.app') || hostname.endsWith('.firebaseapp.com') || hostname === 'localhost') {
    return `https://study-ai-olive.vercel.app${path}`;
  }

  return path;
};
