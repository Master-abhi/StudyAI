// Native global fetch will be used

async function runTests() {
  const host = 'http://localhost:3000';
  const testMobile = '9876543210';
  
  console.log('--- STARTING OTP ENDPOINT TESTS ---');

  // Test 1: Send OTP
  console.log('\n[Test 1] Sending OTP for mobile:', testMobile);
  const sendRes = await fetch(`${host}/api/user/send-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mobile: testMobile })
  });

  if (!sendRes.ok) {
    console.error('❌ Send OTP failed:', sendRes.status, await sendRes.text());
    process.exit(1);
  }

  const sendData = await sendRes.json();
  console.log('✅ Send OTP response:', sendData);
  const otpCode = sendData.demoOtp;
  
  if (!otpCode) {
    console.error('❌ No demoOtp returned in response');
    process.exit(1);
  }

  // Test 2: Verify incorrect OTP
  console.log('\n[Test 2] Verifying incorrect OTP (999999)');
  const verifyWrongRes = await fetch(`${host}/api/user/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mobile: testMobile, otp: '999999' })
  });

  if (verifyWrongRes.ok) {
    console.error('❌ Verify OTP succeeded for incorrect OTP (should have failed)');
    process.exit(1);
  } else {
    const errorData = await verifyWrongRes.json();
    console.log('✅ Verify OTP correctly failed with error:', errorData.error);
  }

  // Test 3: Verify correct OTP
  console.log('\n[Test 3] Verifying correct OTP:', otpCode);
  const verifyCorrectRes = await fetch(`${host}/api/user/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mobile: testMobile, otp: otpCode })
  });

  if (!verifyCorrectRes.ok) {
    console.error('❌ Verify OTP failed for correct OTP:', verifyCorrectRes.status, await verifyCorrectRes.text());
    process.exit(1);
  }

  const verifyCorrectData = await verifyCorrectRes.json();
  console.log('✅ Verify OTP response:', verifyCorrectData);
  
  console.log('\n🎉 ALL OTP TESTS COMPLETED SUCCESSFULLY! 🎉');
}

runTests();
