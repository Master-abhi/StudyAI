const fs = require('fs');
const path = require('path');
const { createClient } = require('../server/node_modules/@supabase/supabase-js');

// Load environment variables if available
const envPath = path.resolve(__dirname, '../server/.env');
if (fs.existsSync(envPath)) {
  require('../server/node_modules/dotenv').config({ path: envPath });
}

const SUPABASE_URL = process.env.SUPABASE_URL || "https://qduvlyvueztczchfloog.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkdXZseXZ1ZXp0Y3pjaGZsb29nIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4OTIyMzE1NSwiZXhwIjoyMTA0Nzk5MTU1fQ.LxKljEifO4ZKcOIKn4y1GZfgm6-4lPgyVilMOS3XKto";
const BUCKET_NAME = process.env.SUPABASE_BUCKET || 'PDF notes';

async function uploadApk() {
  const apkPath = path.resolve(__dirname, '../cgguru.apk');
  if (!fs.existsSync(apkPath)) {
    console.error('❌ cgguru.apk file not found at:', apkPath);
    process.exit(1);
  }

  const fileBuffer = fs.readFileSync(apkPath);
  console.log(`📦 Preparing to upload cgguru.apk (${(fileBuffer.length / (1024 * 1024)).toFixed(2)} MB)...`);
  console.log(`🌐 Supabase URL: ${SUPABASE_URL}`);
  console.log(`📁 Target Bucket: ${BUCKET_NAME}`);

  const client = createClient(SUPABASE_URL, SUPABASE_KEY);

  try {
    const { data, error } = await client.storage
      .from(BUCKET_NAME)
      .upload('cgguru.apk', fileBuffer, {
        contentType: 'application/vnd.android.package-archive',
        upsert: true
      });

    if (error) {
      throw error;
    }

    const { data: publicUrlData } = client.storage
      .from(BUCKET_NAME)
      .getPublicUrl('cgguru.apk');

    console.log('✅ APK uploaded successfully to Supabase Storage!');
    console.log('🔗 Public Download URL:', publicUrlData?.publicUrl);
    return publicUrlData?.publicUrl;
  } catch (err) {
    console.error('❌ Upload failed:', err.message);
    if (err.message && err.message.includes('fetch failed')) {
      console.error('\n⚠️ Note: Supabase project might be paused. Go to https://supabase.com/dashboard to unpause it, or provide a new Supabase project URL & Key.');
    }
  }
}

uploadApk();
