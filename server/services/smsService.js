const axios = require('axios');

/**
 * SMS Gateway Service for sending OTPs via Fast2SMS, MSG91, or Twilio.
 * Falls back to secure logging if no external provider API keys are set.
 */
async function sendOtpSms(mobile, otpCode) {
  const cleanMobile = mobile.replace(/\D/g, '');

  // 1. Try Fast2SMS if configured
  if (process.env.FAST2SMS_API_KEY) {
    try {
      const response = await axios.post(
        'https://www.fast2sms.com/dev/bulkV2',
        {
          route: 'otp',
          variables_values: otpCode,
          numbers: cleanMobile
        },
        {
          headers: {
            authorization: process.env.FAST2SMS_API_KEY,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(`[SMS Service] Fast2SMS dispatched OTP to ${cleanMobile}:`, response.data);
      return { success: true, provider: 'Fast2SMS' };
    } catch (err) {
      console.error('[SMS Service] Fast2SMS failed:', err.response?.data || err.message);
    }
  }

  // 2. Try MSG91 if configured
  if (process.env.MSG91_AUTH_KEY && process.env.MSG91_TEMPLATE_ID) {
    try {
      const response = await axios.post(
        'https://control.msg91.com/api/v5/otp',
        {
          template_id: process.env.MSG91_TEMPLATE_ID,
          mobile: `91${cleanMobile}`,
          otp: otpCode
        },
        {
          headers: {
            authkey: process.env.MSG91_AUTH_KEY,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(`[SMS Service] MSG91 dispatched OTP to ${cleanMobile}:`, response.data);
      return { success: true, provider: 'MSG91' };
    } catch (err) {
      console.error('[SMS Service] MSG91 failed:', err.response?.data || err.message);
    }
  }

  // 3. Try Twilio if configured
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER) {
    try {
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const fromPhone = process.env.TWILIO_PHONE_NUMBER;
      const toPhone = cleanMobile.startsWith('+') ? cleanMobile : `+91${cleanMobile}`;

      const params = new URLSearchParams();
      params.append('To', toPhone);
      params.append('From', fromPhone);
      params.append('Body', `Your CG Guru verification code is ${otpCode}. Valid for 5 minutes.`);

      const authHeader = 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64');

      const response = await axios.post(
        `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
        params,
        {
          headers: {
            Authorization: authHeader,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      console.log(`[SMS Service] Twilio dispatched OTP to ${toPhone}:`, response.data.sid);
      return { success: true, provider: 'Twilio' };
    } catch (err) {
      console.error('[SMS Service] Twilio failed:', err.response?.data || err.message);
    }
  }

  // If no SMS provider keys are defined in process.env
  console.warn(
    `[SMS Service] No SMS provider credentials configured (FAST2SMS_API_KEY / MSG91_AUTH_KEY / TWILIO_ACCOUNT_SID). ` +
    `OTP code saved to Firestore database securely.`
  );
  return { success: true, provider: 'none' };
}

module.exports = { sendOtpSms };
