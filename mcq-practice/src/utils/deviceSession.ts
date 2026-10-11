/**
 * Device Fingerprint & Classification Utility
 * Enforces policy: Max 1 Mobile and 1 PC/Tablet per user account.
 */

export type DeviceType = 'mobile' | 'desktop';

export interface DeviceInfo {
  deviceId: string;
  deviceType: DeviceType;
  deviceName: string;
  userAgent: string;
}

export function detectDeviceType(): DeviceType {
  const ua = navigator.userAgent || '';
  // Check if mobile phone
  const isMobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  
  // Notice: iPads, Tablets, Windows, Mac, Linux desktops/laptops fall into 'desktop' (Computer/Tablet bucket)
  // Tablets have screen width / desktop browser capabilities
  const isTablet = /iPad|Tablet|PlayBook|Silk/i.test(ua) || (navigator.maxTouchPoints > 1 && /Macintosh/.test(ua));
  
  if (isTablet) {
    return 'desktop'; // Tablet counts as the Computer / Tablet slot
  }

  if (isMobile) {
    return 'mobile';
  }

  return 'desktop';
}

export function getDeviceName(): string {
  const ua = navigator.userAgent;
  let os = 'Unknown Device';
  if (/Windows/i.test(ua)) os = 'Windows PC';
  else if (/Macintosh|Mac OS/i.test(ua)) os = 'Mac';
  else if (/Linux/i.test(ua) && !/Android/i.test(ua)) os = 'Linux PC';
  else if (/Android/i.test(ua)) os = 'Android Device';
  else if (/iPhone/i.test(ua)) os = 'iPhone';
  else if (/iPad/i.test(ua)) os = 'iPad';

  let browser = 'Browser';
  if (/Edg/i.test(ua)) browser = 'Edge';
  else if (/Chrome/i.test(ua)) browser = 'Chrome';
  else if (/Firefox/i.test(ua)) browser = 'Firefox';
  else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari';

  return `${os} (${browser})`;
}

export function getOrCreateDeviceId(): string {
  let id = localStorage.getItem('cg_device_id');
  if (!id) {
    id = 'dev_' + Math.random().toString(36).substring(2, 12) + '_' + Date.now().toString(36);
    localStorage.setItem('cg_device_id', id);
  }
  return id;
}

export function getCurrentDeviceInfo(): DeviceInfo {
  return {
    deviceId: getOrCreateDeviceId(),
    deviceType: detectDeviceType(),
    deviceName: getDeviceName(),
    userAgent: navigator.userAgent
  };
}
