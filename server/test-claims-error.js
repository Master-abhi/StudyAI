const { authAdmin } = require('./firebase-admin');
const uid = 'MaX7P4KzYfWrEaNPiKPPJBoygj22';

async function test() {
  try {
    await authAdmin.setCustomUserClaims(uid, {});
    console.log("Success! (Wait, how?)");
  } catch (error) {
    console.log("Error properties:");
    console.log("code:", error.code);
    console.log("message:", error.message);
    console.log("errorInfo:", error.errorInfo);
  }
  process.exit(0);
}
test();
