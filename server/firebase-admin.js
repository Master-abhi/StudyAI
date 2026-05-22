const admin = require('firebase-admin');

if (!admin.apps.length) {
  let credential;

  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
      let raw = process.env.FIREBASE_SERVICE_ACCOUNT;

      // Try base64 decode first; if it produces valid JSON, use it
      let json;
      try {
        const decoded = Buffer.from(raw, 'base64').toString('utf-8');
        json = JSON.parse(decoded);
      } catch {
        // Not base64 – try parsing raw string directly
        json = JSON.parse(raw);
      }

      const serviceAccount = json;
      credential = admin.credential.cert(serviceAccount);
    } catch (e) {
      console.error('[Firebase Admin] Failed to parse FIREBASE_SERVICE_ACCOUNT env var:', e.message);
      process.exit(1);
    }
  } else {
    // Local development: place service-account.json in server/ directory
    try {
      const serviceAccount = require('./service-account.json');
      credential = admin.credential.cert(serviceAccount);
    } catch (e) {
      console.error('[Firebase Admin] service-account.json not found.\n  → Download it from Firebase Console → Project Settings → Service Accounts → Generate new private key\n  → Save as server/service-account.json');
      process.exit(1);
    }
  }

  admin.initializeApp({
    credential,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'cg-guru.firebasestorage.app'
  });

  console.log('[Firebase Admin] Initialized ✅');
}

const db = admin.firestore();
const bucket = admin.storage().bucket();
const authAdmin = admin.auth();

module.exports = { admin, db, bucket, authAdmin };
