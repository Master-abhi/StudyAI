// Direct CDN URL for official CG Guru Android APK
export const APP_DOWNLOAD_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_APK_URL) 
  ? import.meta.env.VITE_APK_URL 
  : 'https://raw.githubusercontent.com/Master-abhi/StudyAI/main/cgguru.apk';

// Alias for backwards compatibility across existing components
export const SUPABASE_APK_URL = APP_DOWNLOAD_URL;
