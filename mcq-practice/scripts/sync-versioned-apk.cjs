const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../../');
const mcqDir = path.resolve(__dirname, '../');
const gradlePath = path.resolve(mcqDir, 'android/app/build.gradle');

let versionName = '1.0';
let versionCode = '1';

try {
  const gradleContent = fs.readFileSync(gradlePath, 'utf8');
  const verNameMatch = gradleContent.match(/versionName\s+["']([^"']+)["']/);
  const verCodeMatch = gradleContent.match(/versionCode\s+(\d+)/);
  if (verNameMatch) versionName = verNameMatch[1];
  if (verCodeMatch) versionCode = verCodeMatch[1];
} catch (e) {
  console.warn('[Sync APK] Could not read version from build.gradle, using fallback:', versionName);
}

const cleanVer = versionName.replace(/^v/i, '').trim();

// Locate generated APK
const debugApk = path.resolve(mcqDir, 'android/app/build/outputs/apk/debug/app-debug.apk');
const releaseApk = path.resolve(mcqDir, 'android/app/build/outputs/apk/release/app-release-unsigned.apk');

const sourceApk = fs.existsSync(debugApk) ? debugApk : (fs.existsSync(releaseApk) ? releaseApk : null);

if (!sourceApk) {
  console.error('[Sync APK] No built APK found in android/app/build/outputs/apk!');
  process.exit(1);
}

const apkTargets = [
  // Output to project root only (avoids packaging APK inside public/assets)
  path.resolve(rootDir, 'cgguru.apk'),
  path.resolve(rootDir, `CG_Guru_v${cleanVer}.apk`),
  path.resolve(rootDir, `cgguru_v${cleanVer}.apk`)
];

console.log(`[Sync APK] Syncing v${cleanVer} (Code: ${versionCode}) from: ${sourceApk}`);

apkTargets.forEach(dest => {
  try {
    const parent = path.dirname(dest);
    if (!fs.existsSync(parent)) fs.mkdirSync(parent, { recursive: true });
    fs.copyFileSync(sourceApk, dest);
  } catch (err) {
    console.warn(`[Sync APK] Failed copying to ${dest}:`, err.message);
  }
});

const sizeMb = (fs.statSync(sourceApk).size / (1024 * 1024)).toFixed(2);
console.log(`[Sync APK] Successfully generated & synced versioned APKs:`);
console.log(`  - CG_Guru_v${cleanVer}.apk (${sizeMb} MB)`);
console.log(`  - cgguru_v${cleanVer}.apk (${sizeMb} MB)`);
console.log(`  - cgguru.apk (${sizeMb} MB) ✅`);
