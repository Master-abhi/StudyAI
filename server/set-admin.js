/**
 * set-admin.js — Run this ONCE to grant admin powers to a user
 *
 * Usage:
 *   cd server
 *   node set-admin.js
 */

require('dotenv').config();
require('./firebase-admin'); // initializes the Admin SDK

const { authAdmin } = require('./firebase-admin');

// ===================================================
// PUT YOUR ADMIN USER-ID HERE (the one you signed up with)
// Email format internally: adminUserID@studyworld.app
// Example: if you signed up with UserID "admin01",
//          put "admin01" below
// ===================================================
const ADMIN_USER_ID = 'admin01'; // ← CHANGE THIS

const adminEmail = `${ADMIN_USER_ID.toLowerCase()}@studyworld.app`;

async function setAdmin() {
  try {
    console.log(`Looking up user: ${adminEmail}`);
    const user = await authAdmin.getUserByEmail(adminEmail);

    console.log(`Found user: ${user.uid}`);
    await authAdmin.setCustomUserClaims(user.uid, { admin: true });

    console.log(`\n✅ Admin claim set successfully!`);
    console.log(`   Email : ${adminEmail}`);
    console.log(`   UID   : ${user.uid}`);
    console.log(`\n⚠️  Important: Admin must SIGN OUT and SIGN BACK IN`);
    console.log(`   for the new admin claim to take effect.\n`);
  } catch (err) {
    if (err.code === 'auth/user-not-found') {
      console.error(`\n❌ User not found: ${adminEmail}`);
      console.error(`   Make sure you've signed up with UserID "${ADMIN_USER_ID}" in the app first.\n`);
    } else {
      console.error('\n❌ Error:', err.message);
    }
  }
  process.exit(0);
}

setAdmin();
