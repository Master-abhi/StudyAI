const pdfParse = require('pdf-parse');
const fs = require('fs');

/**
 * Extract text from a PDF.
 * @param {Buffer|string} input - Either a Buffer (from multer memory storage) or a file path string
 * @returns {Promise<string>} Extracted text
 */
async function extractTextFromPDF(input) {
  const buffer = Buffer.isBuffer(input) ? input : fs.readFileSync(input);
  const data = await pdfParse(buffer);
  return data.text;
}

module.exports = { extractTextFromPDF };
