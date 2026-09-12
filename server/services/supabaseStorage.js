const { createClient } = require('@supabase/supabase-js');

const DEFAULT_SUPABASE_URL = "https://qduvlyvueztczchfloog.supabase.co";
const DEFAULT_SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkdXZseXZ1ZXp0Y3pjaGZsb29nIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4OTIyMzE1NSwiZXhwIjoyMTA0Nzk5MTU1fQ.LxKljEifO4ZKcOIKn4y1GZfgm6-4lPgyVilMOS3XKto";
const bucketName = process.env.SUPABASE_BUCKET || 'PDF notes';

let supabase = null;

const getClient = () => {
  if (!supabase) {
    const url = process.env.SUPABASE_URL || DEFAULT_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || DEFAULT_SUPABASE_KEY;
    if (url && key) {
      supabase = createClient(url, key);
    } else {
      throw new Error('Supabase credentials not configured in environment.');
    }
  }
  return supabase;
};

async function uploadTopicPdf(storagePath, buffer, contentType = 'application/pdf') {
  const client = getClient();
  const { data, error } = await client.storage
    .from(bucketName)
    .upload(storagePath, buffer, {
      contentType,
      upsert: true
    });
  if (error) throw error;
  return data;
}

async function createSignedPdfUrl(storagePath, expiresIn = 3600) {
  const client = getClient();
  const { data, error } = await client.storage
    .from(bucketName)
    .createSignedUrl(storagePath, expiresIn);
  if (error) throw error;
  return data.signedUrl;
}

async function deleteTopicPdf(storagePath) {
  const client = getClient();
  const { data, error } = await client.storage
    .from(bucketName)
    .remove([storagePath]);
  if (error) throw error;
  return data;
}

module.exports = {
  uploadTopicPdf,
  createSignedPdfUrl,
  deleteTopicPdf,
  bucketName
};
