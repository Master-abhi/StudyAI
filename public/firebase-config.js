// ═══════════════════════════════════════════
//   Firebase Client Configuration
//   CG-Guru Project
// ═══════════════════════════════════════════
//
// SETUP INSTRUCTIONS:
// 1. Go to Firebase Console → https://console.firebase.google.com
// 2. Open project: cg-guru
// 3. Project Settings (⚙️) → General tab → "Your apps" section
// 4. Click Web app (</>) → copy the firebaseConfig object below
// 5. Replace the placeholder values with your actual config
//
// NOTE: These values are safe to expose in frontend code.
// Security is enforced by Firestore/Storage Rules on the server.

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "cg-guru.firebaseapp.com",
  projectId: "cg-guru",
  storageBucket: "cg-guru.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.log('[Firebase] Client SDK initialized ✅');
