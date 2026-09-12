const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const bucketName = process.env.SUPABASE_BUCKET || 'PDF notes';

let supabase = null;
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

const getClient = () => {
  if (!supabase) {
    if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
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
