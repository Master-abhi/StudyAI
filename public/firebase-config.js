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
  apiKey: "AIzaSyC1zPetkyHD_07pr_ZIqLBE942NxIOJMxw",
  authDomain: "cg-guru.firebaseapp.com",
  projectId: "cg-guru",
  storageBucket: "cg-guru.firebasestorage.app",
  messagingSenderId: "166390114183",
  appId: "1:166390114183:web:397f8c629cebf14ec71522"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.log('[Firebase] Client SDK initialized ✅');
