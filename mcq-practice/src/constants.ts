// Direct CDN URL for official CG Guru Android APK
export const APP_DOWNLOAD_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_APK_URL) 
  ? import.meta.env.VITE_APK_URL 
  : 'https://raw.githubusercontent.com/Master-abhi/StudyAI/main/cgguru.apk';

// Alias for backwards compatibility across existing components
export const SUPABASE_APK_URL = APP_DOWNLOAD_URL;

// Base app version definitions
export const CURRENT_APP_VERSION = '1.0';
export const CURRENT_APP_BUILD = '1';

/**
 * Compare two version strings (e.g., '1.1.0' vs '1.0.0' or 'v2.0' vs '1.9' or '2' vs '1')
 * Returns true if candidateVersion is strictly NEWER than baseVersion
 */
export const isNewerVersion = (candidateVersion?: string, baseVersion?: string): boolean => {
  if (!candidateVersion || !baseVersion) return false;

  const parseParts = (v: string): number[] => {
    return (v || '')
      .replace(/^v/i, '')
      .trim()
      .split('.')
      .map(part => parseInt(part.replace(/[^0-9]/g, ''), 10) || 0);
  };

  const cParts = parseParts(candidateVersion);
  const bParts = parseParts(baseVersion);
  const len = Math.max(cParts.length, bParts.length);

  for (let i = 0; i < len; i++) {
    const c = cParts[i] ?? 0;
    const b = bParts[i] ?? 0;
    if (c > b) return true;
    if (c < b) return false;
  }
  return false;
};

/**
 * Returns dynamic versioned APK filename (e.g. CG_Guru_v1.0.apk)
 */
export const getApkFilename = (version?: string): string => {
  const cleanVer = (version || CURRENT_APP_VERSION).replace(/^v/i, '').trim();
  return `CG_Guru_v${cleanVer || '1.0'}.apk`;
};
